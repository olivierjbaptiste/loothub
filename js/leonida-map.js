/* ============================================================
   LootHubGG — Interactive Leonida map (Phase 3A foundation)
   Reads window.LEONIDA_LOCATIONS (data/leonida-locations.js) and
   drives BOTH the zoomable map and the searchable directory from
   one dataset, so they always stay in sync.

   Base image is our own schematic (not to scale, clearly labeled).
   Only entries with a position (x,y) appear as map markers; the
   rest stay in the directory until a position is verified.
   ============================================================ */
(function () {
  "use strict";
  var D = window.LEONIDA_LOCATIONS;
  if (!D || !window.L) return;

  var H = D.base.height, W = D.base.width;
  var CAT = {}; D.categories.forEach(function (c) { CAT[c.id] = c; });
  var STAT = {}; D.statuses.forEach(function (s) { STAT[s.id] = s; });

  // ---------- state ----------
  var activeCats = {}; D.categories.forEach(function (c) { activeCats[c.id] = true; });
  var query = "";
  var selectedId = null;

  // ---------- dom ----------
  var $ = function (id) { return document.getElementById(id); };
  var mapEl = $("lm-map"), catsEl = $("lm-cats"), legendEl = $("lm-legend"),
      searchEl = $("lm-search"), infoEl = $("lm-info"), dirEl = $("lm-dir"), countEl = $("lm-count");
  if (!mapEl) return;

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  // ---------- map ----------
  var map = L.map(mapEl, {
    crs: L.CRS.Simple, minZoom: -2, maxZoom: 2, zoomSnap: 0.25,
    zoomControl: true, attributionControl: false, scrollWheelZoom: false, keyboard: true
  });
  var bounds = [[0, 0], [H, W]];
  L.imageOverlay(D.base.image, bounds, { alt: "Schematic map of the state of Leonida" }).addTo(map);
  map.fitBounds(bounds);
  map.setMaxBounds(L.latLngBounds(bounds).pad(0.25));
  // Don't trap page scroll on mobile/desktop: wheel-zoom only once the map is focused/clicked.
  map.on("focus click", function () { map.scrollWheelZoom.enable(); });
  map.on("blur", function () { map.scrollWheelZoom.disable(); });

  function toLatLng(loc) { return [H - loc.y, loc.x]; } // schematic px (x from left, y from top)

  function markerIcon(loc, selected) {
    var c = (CAT[loc.cat] || {}).color || "#fff";
    var catLabel = (CAT[loc.cat] || {}).label || loc.cat;
    var statLabel = (STAT[loc.status] || {}).label || loc.status;
    var cls = "lm-pin lm-" + esc(loc.status) + (selected ? " lm-sel" : "");
    var inner = loc.status === "verified" ? "✓" : "";
    // Every data-derived value is HTML-escaped so location data can never inject markup.
    return L.divIcon({ className: "", iconSize: [20, 20], iconAnchor: [10, 10],
      html: '<span class="' + cls + '" style="--c:' + esc(c) + '" role="img" aria-label="' +
            esc(loc.name + " (" + catLabel + ", " + statLabel + ")") + '">' + inner + '</span>' });
  }

  var marks = {}; // id -> {loc, layer}
  D.locations.forEach(function (loc) {
    if (loc.x == null || loc.y == null) return;
    var mk = L.marker(toLatLng(loc), { icon: markerIcon(loc, false), keyboard: true,
      title: loc.name, riseOnHover: true });
    mk.on("click keypress", function () { select(loc.id, false); });
    marks[loc.id] = { loc: loc, layer: mk };
  });

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function matches(loc) {
    if (!activeCats[loc.cat]) return false;
    if (query) {
      var hay = (loc.name + " " + loc.desc + " " + loc.region + " " + (CAT[loc.cat] || {}).label).toLowerCase();
      if (hay.indexOf(query) === -1) return false;
    }
    return true;
  }

  // ---------- render: markers ----------
  function renderMarkers() {
    Object.keys(marks).forEach(function (id) {
      var e = marks[id], show = matches(e.loc), on = map.hasLayer(e.layer);
      if (show && !on) e.layer.addTo(map);
      else if (!show && on) map.removeLayer(e.layer);
      if (show) e.layer.setIcon(markerIcon(e.loc, id === selectedId));
    });
  }

  // ---------- render: directory ----------
  function statusBadge(loc) {
    var b = el("span", "lm-badge lm-b-" + loc.status, (STAT[loc.status] || {}).label);
    return b;
  }
  function renderDirectory() {
    dirEl.textContent = "";
    var rows = D.locations.filter(matches);
    if (!rows.length) {
      dirEl.appendChild(el("div", "lm-empty", "No locations match. Try clearing the search or turning a category back on."));
    } else {
      rows.forEach(function (loc) {
        var row = el("button", "lm-row" + (loc.id === selectedId ? " on" : ""));
        row.type = "button";
        row.setAttribute("aria-pressed", loc.id === selectedId ? "true" : "false");
        var head = el("div", "lm-row-h");
        var dot = el("span", "lm-dot"); dot.style.background = (CAT[loc.cat] || {}).color;
        head.appendChild(dot);
        head.appendChild(el("span", "lm-row-n", loc.name));
        head.appendChild(statusBadge(loc));
        row.appendChild(head);
        var sub = el("div", "lm-row-s",
          (CAT[loc.cat] || {}).label + " · " + loc.region +
          (marks[loc.id] ? (loc.status !== "verified" ? " · on map (approx.)" : " · on map") : " · directory only"));
        row.appendChild(sub);
        row.addEventListener("click", function () { select(loc.id, true); });
        dirEl.appendChild(row);
      });
    }
    var shown = rows.length, onMap = rows.filter(function (l) { return marks[l.id]; }).length;
    countEl.textContent = shown + " location" + (shown === 1 ? "" : "s") + " shown · " + onMap + " on the map";
  }

  // ---------- info panel ----------
  function renderInfo(loc) {
    infoEl.textContent = "";
    if (!loc) {
      infoEl.appendChild(el("p", "lm-info-empty", "Select a marker or a directory entry to see its details."));
      return;
    }
    var h = el("div", "lm-info-h");
    var dot = el("span", "lm-dot"); dot.style.background = (CAT[loc.cat] || {}).color; h.appendChild(dot);
    h.appendChild(el("strong", null, loc.name));
    infoEl.appendChild(h);
    var meta = el("div", "lm-info-m");
    meta.appendChild(el("span", "lm-badge lm-b-" + loc.status, (STAT[loc.status] || {}).label));
    meta.appendChild(el("span", "lm-tag", (CAT[loc.cat] || {}).label));
    meta.appendChild(el("span", "lm-tag", loc.region));
    infoEl.appendChild(meta);
    infoEl.appendChild(el("p", "lm-info-d", loc.desc));
    if (loc.shot) {
      var img = new Image(); img.src = loc.shot; img.alt = loc.name + " — our screenshot"; img.className = "lm-shot"; img.loading = "lazy";
      infoEl.appendChild(img);
    }
    if (marks[loc.id] && loc.status !== "verified") {
      infoEl.appendChild(el("p", "lm-approx",
        "Position: approximate placement on our own schematic — NOT a verified in-game coordinate." +
        (loc.status === "official" ? " The region's name is officially confirmed; its position here is our estimate." : "")));
    }
    var foot = el("p", "lm-info-f");
    if (!marks[loc.id]) foot.appendChild(el("em", null, "Not on the map yet — position pending verification. "));
    if (loc.src) {
      var a = el("a", null, loc.status === "official" ? "Source (confirms the name)" : "Source");
      a.href = loc.src.u; a.target = "_blank"; a.rel = "noopener noreferrer"; a.title = loc.src.t;
      foot.appendChild(a);
    }
    infoEl.appendChild(foot);
  }

  // ---------- selection ----------
  function select(id, fromDir) {
    selectedId = id;
    var loc = D.locations.filter(function (l) { return l.id === id; })[0];
    renderInfo(loc);
    renderMarkers();
    renderDirectory();
    if (loc && marks[id]) {
      map.panTo(toLatLng(loc));
      if (map.getZoom() < 0) map.setZoom(0);
      if (!fromDir) { var r = dirEl.querySelector(".lm-row.on"); if (r && r.scrollIntoView) r.scrollIntoView({ block: "nearest" }); }
    }
    if (fromDir && loc && marks[id] && marks[id].layer.openPopup) { /* marker has no popup; info panel is used */ }
  }

  // ---------- controls ----------
  function buildCats() {
    var all = el("button", "lm-chip lm-chip-all on"); all.type = "button"; all.textContent = "All";
    all.setAttribute("aria-pressed", "true");
    all.addEventListener("click", function () {
      // "All" is a reset action: never hide everything when already selected.
      D.categories.forEach(function (c) { activeCats[c.id] = true; });
      syncChips(); renderAll();
    });
    catsEl.appendChild(all);
    D.categories.forEach(function (c) {
      var chip = el("button", "lm-chip on"); chip.type = "button"; chip.dataset.cat = c.id;
      chip.setAttribute("aria-pressed", "true");
      var dot = el("span", "lm-dot"); dot.style.background = c.color; chip.appendChild(dot);
      chip.appendChild(document.createTextNode(c.label));
      chip.addEventListener("click", function () {
        activeCats[c.id] = !activeCats[c.id];
        syncChips(); renderAll();
      });
      catsEl.appendChild(chip);
    });
  }
  function syncChips() {
    [].forEach.call(catsEl.querySelectorAll(".lm-chip"), function (chip) {
      if (chip.classList.contains("lm-chip-all")) {
        var allOn = D.categories.every(function (c) { return activeCats[c.id]; });
        chip.classList.toggle("on", allOn); chip.setAttribute("aria-pressed", allOn ? "true" : "false");
      } else {
        var on = activeCats[chip.dataset.cat];
        chip.classList.toggle("on", on); chip.setAttribute("aria-pressed", on ? "true" : "false");
      }
    });
  }
  function buildLegend() {
    if (!legendEl) return;
    D.statuses.forEach(function (s) {
      var item = el("span", "lm-leg");
      // Legend pins show the status SHAPE (solid / hollow / glowing+check) in a
      // single neutral color, so --c must be set here just like real markers.
      var pin = el("span", "lm-pin lm-" + s.id + " lm-leg-pin", s.id === "verified" ? "✓" : "");
      pin.style.setProperty("--c", "#cbd0e6");
      item.appendChild(pin);
      item.appendChild(el("span", "lm-leg-t", s.label));
      item.title = s.desc;
      legendEl.appendChild(item);
    });
  }

  function renderAll() { renderMarkers(); renderDirectory(); }

  // ---------- init ----------
  buildCats(); buildLegend();
  if (searchEl) searchEl.addEventListener("input", function () {
    query = searchEl.value.trim().toLowerCase(); renderAll();
  });
  renderInfo(null);
  renderAll();
  // The map lives in a CSS grid; make sure Leaflet measures the final size.
  setTimeout(function () { map.invalidateSize(); map.fitBounds(bounds); }, 150);
  window.addEventListener("resize", function () { map.invalidateSize(); });
})();
