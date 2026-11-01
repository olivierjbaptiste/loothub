/* Loothub GTA 6 launch planner — browser-only, no network/storage outside this device. */
(function () {
  'use strict';
  var KEY = 'loothub.launchPlanner.v1';
  var platform = document.getElementById('plan-platform');
  var edition = document.getElementById('plan-edition');
  var format = document.getElementById('plan-format');
  if (!platform || !edition || !format) return;

  var state = {platform: 'ps5', edition: 'standard', format: 'digital', done: {}};
  var saveAvailable = true;
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && typeof saved === 'object') {
      if (['ps5', 'xbox'].includes(saved.platform)) state.platform = saved.platform;
      if (['standard', 'ultimate'].includes(saved.edition)) state.edition = saved.edition;
      if (['digital', 'code'].includes(saved.format)) state.format = saved.format;
      if (saved.done && typeof saved.done === 'object') {
        Object.keys(saved.done).forEach(function (k) { if (/^[a-z-]{1,40}$/.test(k) && saved.done[k] === true) state.done[k] = true; });
      }
    }
  } catch (_) { saveAvailable = false; }
  function save() {
    if (!saveAvailable) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (_) { saveAvailable = false; document.getElementById('plan-save-note').textContent = 'Storage is unavailable in this browser. Checklist changes will not survive a reload.'; }
  }
  var common = [
    ['platform', 'Confirm your console', 'Rockstar lists PS5 and Xbox Series X|S; there is no announced PC edition.'],
    ['region', 'Check your account region', 'Make sure your store or download code is compatible with the country of your console account.'],
    ['budget', 'Confirm the total at checkout', 'The price shown above excludes taxes; verify the local store and any additional charges before buying.'],
    ['space', 'Check download space and internet access', 'Confirm available storage and a reliable connection; Rockstar has not published a storage requirement on this page.'],
    ['offers', 'Read the offer terms', 'Review the Vintage Vice City Pack and eligible digital GTA+ offer, including any subscription conditions.'],
    ['launch', 'Plan your first play session', 'Launch is November 19, 2026. Check your local storefront for the precise unlock time.']
  ];
  function tasks() {
    var list = common.slice(0, 3);
    if (state.format === 'digital') {
      list.push(['digital', 'Confirm the purchase is in your game library', 'Use the official store for your selected console; do not share account credentials.']);
      list.push(['preload', 'Pre-load on November 12 if available', 'Rockstar says digital pre-loading begins November 12 at local midnight.']);
    } else {
      list.push(['code', 'Collect your code-in-box Standard copy', 'This package contains a download code, not a disc. Retailer delivery timing may vary.']);
      list.push(['redeem', 'Redeem the code and start your download', 'Redeem it in the correct account region once you receive it.']);
    }
    return list.concat(common.slice(3));
  }
  function elem(tag, classname, text) {
    var e = document.createElement(tag);
    if (classname) e.className = classname;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function drawTasks() {
    var list = tasks();
    var box = document.getElementById('plan-tasks');
    box.replaceChildren();
    list.forEach(function (t) {
      var label = elem('label', 'planner-task');
      var cb = elem('input'); cb.type = 'checkbox'; cb.checked = !!state.done[t[0]];
      cb.setAttribute('aria-label', t[1]);
      cb.addEventListener('change', function () { state.done[t[0]] = cb.checked; save(); drawTasks(); });
      var copy = elem('span'); copy.appendChild(elem('strong', '', t[1])); copy.appendChild(elem('small', '', t[2]));
      label.appendChild(cb); label.appendChild(copy); box.appendChild(label);
    });
    var n = list.filter(function (t) { return !!state.done[t[0]]; }).length;
    var percent = Math.round(100 * n / list.length);
    document.getElementById('plan-progress-text').textContent = n + ' of ' + list.length + ' steps done';
    document.getElementById('plan-percent').textContent = percent + '%';
    document.getElementById('plan-progress').style.width = percent + '%';
    document.getElementById('plan-progressbar').setAttribute('aria-valuenow', String(percent));
  }
  function draw() {
    var warning = document.getElementById('plan-warning');
    if (state.edition === 'ultimate' && state.format === 'code') {
      state.format = 'digital';
      warning.hidden = false;
      warning.textContent = 'Ultimate Edition is digital only. We changed your format to Digital.';
    } else { warning.hidden = true; warning.textContent = ''; }
    platform.value = state.platform;
    edition.value = state.edition;
    format.value = state.format;
    format.querySelector('option[value="code"]').disabled = state.edition === 'ultimate';
    document.getElementById('plan-price').textContent = state.edition === 'ultimate' ? '$99.99' : '$79.99';
    var platformName = state.platform === 'ps5' ? 'PS5' : 'Xbox Series X|S';
    var editionName = state.edition === 'ultimate' ? 'Ultimate' : 'Standard';
    var formatName = state.format === 'code' ? 'Code-in-box' : 'Digital';
    document.getElementById('plan-choice').textContent = platformName + ' · ' + editionName + ' · ' + formatName;
    document.getElementById('plan-format-note').textContent = state.format === 'digital'
      ? 'Digital pre-loading begins November 12.'
      : 'The box contains a redeemable download code, not a game disc.';
    document.getElementById('plan-edition-note').textContent = state.edition === 'ultimate'
      ? 'Ultimate adds optional in-game extras. The Standard edition can be upgraded later if you prefer to decide after launch.'
      : 'Standard includes the full game. You can buy the Ultimate Edition upgrade separately later.';
    var link = document.getElementById('plan-store');
    link.href = state.platform === 'ps5'
      ? 'https://store.playstation.com/concept/10000730'
      : 'https://www.xbox.com/en-us/games/store/grand-theft-auto-vi/9nl3wwnzlzzn';
    link.textContent = state.platform === 'ps5' ? 'Check PlayStation Store' : 'Check Xbox Store';
    drawTasks(); save();
  }
  [platform, edition, format].forEach(function (select) {
    select.addEventListener('change', function () {
      state.platform = platform.value; state.edition = edition.value; state.format = format.value;
      draw();
    });
  });
  document.getElementById('plan-reset').addEventListener('click', function () {
    state.done = {}; drawTasks(); save();
  });
  if (!saveAvailable) document.getElementById('plan-save-note').textContent = 'Storage is unavailable in this browser. Checklist changes will not survive a reload.';
  draw();
})();
