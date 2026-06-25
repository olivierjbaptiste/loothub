/* ============================================================
   Loothub — Interactive Collectibles Map
   Reads window.GTA_MAP_DATA (data/collectibles.js).
   Click a marker to mark it found; progress saves in your browser.
   ============================================================ */
(function () {
  "use strict";
  var DATA = window.GTA_MAP_DATA;
  if (!DATA || !window.L) { return; }
  var H = DATA.height, W = DATA.width;
  var LS_KEY = "gta6_map_found_v1";

  // type lookup
  var TYPE = {};
  (DATA.types || []).forEach(function (t) { TYPE[t.id] = t; });

  // ---- state ----
  var found = loadFound();              // Set of marker keys
  var activeTypes = {};                 // typeId -> bool (visible)
  (DATA.types || []).forEach(function (t) { activeTypes[t.id] = true; });
  var hideFound = false;

  function loadFound() {
    try { return new Set(JSON.parse(localStorage.getItem(LS_KEY)) || []); }
    catch (e) { return new Set(); }
  }
  function saveFound() {
    try { localStorage.setItem(LS_KEY, JSON.stringify([].concat(Array.from(found)))); } catch (e) {}
  }
  function keyOf(m) { return m.type + "::" + m.name; }

  // ---- map ----
  var map = L.map("map", {
    crs: L.CRS.Simple, minZoom: -2, maxZoom: 2,
    zoomControl: true, attributionControl: false
  });
  var bounds = [[0, 0], [H, W]];
  L.imageOverlay(DATA.image, bounds).addTo(map);
  map.fitBounds(bounds);
  map.setMaxBounds(map.getBounds().pad(0.25));

  // image pixel (x from left, y from top) -> Leaflet latLng
  function toLatLng(m) { return [H - m.y, m.x]; }

  function makeIcon(m, isFound) {
    var color = (TYPE[m.type] || {}).color || "#fff";
    var html = '<div class="mk' + (isFound ? " found" : "") + '" style="background:' + color + '">' +
               (isFound ? '<span class="mkck">\u2713</span>' : "") + "</div>";
    return L.divIcon({ className: "", html: html, iconSize: [18, 18], iconAnchor: [9, 9] });
  }
  function tooltipHtml(m) {
    var t = TYPE[m.type] || {};
    return '<span class="pop-c" style="color:' + (t.color || "#fff") + '">' + (t.name || m.type) + "</span>" +
           '<span class="pop-t">' + m.name + "</span>" +
           (m.note ? '<span class="pop-s">' + m.note + "</span>" : "") +
           '<span class="pop-s" style="margin-top:6px">Click to toggle found</span>';
  }

  // build marker layers
  var entries = (DATA.markers || []).map(function (m) {
    var k = keyOf(m);
    var mk = L.marker(toLatLng(m), { icon: makeIcon(m, found.has(k)) });
    mk.bindTooltip(tooltipHtml(m), { direction: "top", offset: [0, -8], className: "mk-tip" });
    mk.on("click", function () {
      if (found.has(k)) found.delete(k); else found.add(k);
      saveFound();
      mk.setIcon(makeIcon(m, found.has(k)));
      updateProgress();
      applyFilters();
    });
    return { m: m, k: k, layer: mk };
  });

  // ---- filters ----
  function visible(e) {
    if (!activeTypes[e.m.type]) return false;
    if (hideFound && found.has(e.k)) return false;
    return true;
  }
  function applyFilters() {
    entries.forEach(function (e) {
      var show = visible(e);
      var on = map.hasLayer(e.layer);
      if (show && !on) e.layer.addTo(map);
      else if (!show && on) map.removeLayer(e.layer);
    });
  }

  // ---- progress ----
  function updateProgress() {
    var total = entries.length;
    var got = entries.filter(function (e) { return found.has(e.k); }).length;
    var pct = total ? Math.round((got / total) * 100) : 0;
    document.getElementById("prog-fill").style.width = pct + "%";
    document.getElementById("prog-text").innerHTML =
      "<b>" + got + " / " + total + "</b> collectibles found";
    document.getElementById("prog-pct").textContent = pct + "%";
  }

  // ---- build controls ----
  function buildControls() {
    var box = document.getElementById("type-chips");
    box.innerHTML = (DATA.types || []).map(function (t) {
      return '<span class="chip" data-type="' + t.id + '">' +
             '<span class="dot" style="background:' + t.color + '"></span>' + t.name + "</span>";
    }).join("");
    box.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var id = chip.getAttribute("data-type");
        activeTypes[id] = !activeTypes[id];
        chip.classList.toggle("off", !activeTypes[id]);
        applyFilters();
      });
    });
    document.getElementById("toggle-found").addEventListener("click", function () {
      hideFound = !hideFound;
      this.textContent = hideFound ? "Show found" : "Hide found";
      applyFilters();
    });
    document.getElementById("reset-map").addEventListener("click", function () {
      found = new Set(); saveFound();
      entries.forEach(function (e) { e.layer.setIcon(makeIcon(e.m, false)); });
      updateProgress(); applyFilters();
    });
  }

  buildControls();
  applyFilters();
  updateProgress();
})();
