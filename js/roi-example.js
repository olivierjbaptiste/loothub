/* LootHub example ROI calculator. User-entered/hypothetical inputs only; no GTA 6 data feed. */
(function () {
  "use strict";

  function calculate(values) {
    var upfront = values.purchase + values.upgrades;
    var netPerHour = values.revenue - values.costPerHour;
    var periodProfit = netPerHour * values.hours;
    return {
      upfront: upfront,
      netPerHour: netPerHour,
      paybackHours: upfront > 0 && netPerHour > 0 ? upfront / netPerHour : null,
      totalAfterPeriod: periodProfit - upfront,
      roiPercent: upfront > 0 ? ((periodProfit - upfront) / upfront) * 100 : null
    };
  }

  function start() {
    var form = document.getElementById("roi-form");
    if (!form) return;
    var names = ["purchase", "upgrades", "revenue", "costPerHour", "hours"];
    var results = {
      netPerHour: document.getElementById("roi-net"),
      paybackHours: document.getElementById("roi-payback"),
      totalAfterPeriod: document.getElementById("roi-return"),
      roiPercent: document.getElementById("roi-percent")
    };
    var error = document.getElementById("roi-error");
    var fmt = new Intl.NumberFormat("en-US", {maximumFractionDigits: 0});
    function money(n) { return (n < 0 ? "−$" : "$") + fmt.format(Math.abs(n)); }

    function recalculate() {
      var values = {};
      for (var i = 0; i < names.length; i++) {
        var input = form.elements.namedItem(names[i]);
        var raw = input.value.trim();
        var number = Number(raw);
        if (raw === "" || !Number.isFinite(number) || number < 0 || number > 1000000000000) {
          error.textContent = "Enter a valid non-negative number in every field (up to 1 trillion).";
          Object.keys(results).forEach(function (key) { results[key].textContent = "—"; });
          return;
        }
        values[names[i]] = number;
      }
      if (values.hours <= 0) {
        error.textContent = "The comparison period must be greater than zero hours.";
        Object.keys(results).forEach(function (key) { results[key].textContent = "—"; });
        return;
      }
      error.textContent = "";
      var c = calculate(values);
      results.netPerHour.textContent = money(c.netPerHour);
      results.paybackHours.textContent = c.upfront === 0 ? "No upfront cost" : c.paybackHours === null ? "No payback" : c.paybackHours.toFixed(1) + " hours";
      results.totalAfterPeriod.textContent = money(c.totalAfterPeriod);
      results.roiPercent.textContent = c.roiPercent === null ? "N/A (no upfront cost)" : c.roiPercent.toFixed(1) + "%";
    }

    form.addEventListener("input", recalculate);
    form.addEventListener("submit", function (event) { event.preventDefault(); recalculate(); });
    document.getElementById("roi-reset").addEventListener("click", function () { form.reset(); recalculate(); });
    recalculate();
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
  }

  // Pure helper for simple command-line verification. Has no effect in a browser.
  if (typeof module !== "undefined" && module.exports) module.exports = {calculate: calculate};
})();
