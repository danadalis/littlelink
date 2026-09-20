// danadalis.se

// Contact links
// mailto: links silently do nothing on devices without a mail app,
// so they also copy their value and confirm it on screen.
(function () {
  const toast = document.getElementById('toast');
  if (!toast) return;
  let timer;

  function show(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  document.querySelectorAll('[data-copy]').forEach((link) => {
    link.addEventListener('click', () => {
      const value = link.getAttribute('data-copy');
      if (!navigator.clipboard) return show(value);
      navigator.clipboard.writeText(value).then(
        () => show(value + ' – kopierat'),
        () => show(value)
      );
    });
  });
})();

// GitHub contributions
// Public data for one user, drawn as a heatmap. The block stays hidden if the
// request fails, so the account links below it are all that is left.
(function () {
  const USER = 'danadalis';
  const API = 'https://github-contributions-api.jogruber.de/v4/' + USER + '?y=last';
  const CELL = 12; // px, keep in sync with .heat in site.css
  const GAP = 3;

  const block = document.getElementById('gh-block');
  const heat = document.getElementById('gh-heat');
  const total = document.getElementById('gh-total');
  if (!block || !heat || !total || !window.fetch) return;

  let weeks = [];

  // As many whole weeks as the column is wide, newest to the right.
  function weeksThatFit() {
    const width = heat.parentNode.clientWidth;
    const fit = Math.floor((width + GAP) / (CELL + GAP));
    return Math.max(8, Math.min(weeks.length, fit));
  }

  function label(day) {
    const date = new Date(day.date + 'T00:00:00Z').toLocaleDateString('sv-SE', {
      day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
    });
    return day.count + ' bidrag · ' + date;
  }

  function render() {
    heat.innerHTML = weeks.slice(-weeksThatFit()).map((week) =>
      week.map((day) => day
        ? '<i class="l' + day.level + '" title="' + label(day) + '"></i>'
        : '<i class="pad"></i>'
      ).join('')
    ).join('');
  }

  fetch(API)
    .then((response) => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then((data) => {
      const days = data.contributions || [];
      if (!days.length) throw new Error('no data');

      // Rows are weekdays (Sunday first, like GitHub), so pad the first week.
      const offset = new Date(days[0].date + 'T00:00:00Z').getUTCDay();
      const cells = new Array(offset).fill(null).concat(days);
      weeks = [];
      for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

      total.textContent = data.total && data.total.lastYear != null
        ? data.total.lastYear
        : days.reduce((sum, day) => sum + day.count, 0);

      block.hidden = false;
      render();
      if (window.ResizeObserver) new ResizeObserver(render).observe(heat.parentNode);
    })
    .catch(() => { /* leave the block hidden */ });
})();
