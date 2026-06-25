/* ============================================================
   Business ROI Calculator — logic
   Reads window.GTA_DATA (from data/businesses.js).
   Persists upgrade selections + sort in localStorage.
   ============================================================ */
(function () {
  "use strict";
  var DATA = (window.GTA_DATA && window.GTA_DATA.businesses) || [];
  var CUR = (window.GTA_DATA && window.GTA_DATA.currency) || "$";
  var LS_KEY = "gta6_roi_v1";

  // ---- state ----
  var state = load();
  function load() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function sel(bizId) { return (state.up && state.up[bizId]) || []; }
  function setSel(bizId, arr) {
    state.up = state.up || {}; state.up[bizId] = arr; save();
  }

  // ---- money formatting ----
  function money(n) {
    if (n == null || isNaN(n)) return "\u2014";
    if (Math.abs(n) >= 1e6) return CUR + (n / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
    if (Math.abs(n) >= 1e3) return CUR + Math.round(n / 1e3) + "K";
    return CUR + Math.round(n);
  }
  function hrs(n) {
    if (n == null || !isFinite(n)) return "\u2014";
    return n < 1 ? n.toFixed(1) + " hr" : Math.round(n) + " hr";
  }

  // ---- per-business computed numbers ----
  function compute(biz) {
    var chosen = sel(biz.id);
    var profit = biz.baseProfitPerHour || 0;
    var invest = biz.setupCost || 0;
    (biz.upgrades || []).forEach(function (u) {
      if (chosen.indexOf(u.id) !== -1) {
        profit += u.profitBonusPerHour || 0;
        invest += u.cost || 0;
      }
    });
    var payback = profit > 0 ? invest / profit : Infinity;     // hours to recoup
    var roi = invest > 0 ? (profit / invest) * 100 : 0;        // % returned per hour
    return { profit: profit, invest: invest, payback: payback, roi: roi };
  }

  // ---- sorting ----
  var METRICS = {
    profit:  { label: "Profit / hour", dir: -1, get: function (c) { return c.profit; } },
    payback: { label: "Fastest payback", dir:  1, get: function (c) { return c.payback; } },
    roi:     { label: "Best ROI %",     dir: -1, get: function (c) { return c.roi; } }
  };
  function currentMetric() { return state.sort && METRICS[state.sort] ? state.sort : "profit"; }

  // ---- render ----
  function render() {
    var metricKey = currentMetric();
    var metric = METRICS[metricKey];
    var rows = DATA.map(function (b) { return { biz: b, c: compute(b) }; });
    rows.sort(function (a, b) {
      return (metric.get(a.c) - metric.get(b.c)) * metric.dir;
    });
    var bestId = rows.length ? rows[0].biz.id : null;

    var grid = document.getElementById("grid");
    grid.innerHTML = rows.map(function (r) {
      var b = r.biz, c = r.c, isBest = b.id === bestId;
      var ups = (b.upgrades || []).map(function (u) {
        var on = sel(b.id).indexOf(u.id) !== -1;
        return '<label class="up"><input type="checkbox" data-biz="' + b.id + '" data-up="' + u.id + '"' +
          (on ? " checked" : "") + "> " + u.name +
          '<span class="uc">+' + money(u.profitBonusPerHour) + "/hr</span></label>";
      }).join("");
      if (!ups) ups = '<div style="color:var(--muted);font-size:12px">No upgrades</div>';

      return '<div class="biz' + (isBest ? " best" : "") + '">' +
        (isBest ? '<span class="crown">Top &middot; ' + metric.label + "</span>" : "") +
        "<h3>" + b.name + '<span class="cat">' + (b.category || "") + "</span></h3>" +
        '<div class="headline">' +
          '<div class="m"><div class="v pink">' + money(c.profit) + '</div><div class="k">Profit / hr</div></div>' +
          '<div class="m"><div class="v cyan">' + hrs(c.payback) + '</div><div class="k">Payback</div></div>' +
          '<div class="m"><div class="v gold">' + money(c.invest) + '</div><div class="k">Total cost</div></div>' +
        "</div>" +
        '<div class="ups">' + ups + "</div>" +
      "</div>";
    }).join("");

    grid.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener("change", function () {
        var id = cb.getAttribute("data-biz"), up = cb.getAttribute("data-up");
        var arr = sel(id).slice();
        var i = arr.indexOf(up);
        if (cb.checked && i === -1) arr.push(up);
        if (!cb.checked && i !== -1) arr.splice(i, 1);
        setSel(id, arr);
        render();
      });
    });
  }

  // ---- wire up controls ----
  function init() {
    var sortSel = document.getElementById("sort");
    sortSel.value = currentMetric();
    sortSel.addEventListener("change", function () {
      state.sort = sortSel.value; save(); render();
    });
    document.getElementById("reset").addEventListener("click", function () {
      state = {}; save();
      sortSel.value = "profit";
      render();
    });
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
