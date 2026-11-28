/* ============================================================
   LootHubGG — Leonida location dataset (Phase 3A)
   Single source of truth for BOTH the interactive map and the
   searchable location directory on map.html.

   IMPORTANT — accuracy rules:
   - Positions (x,y) are pixel coordinates on OUR OWN schematic
     base image (data/leonida-map.svg), which is illustrative and
     NOT to scale. They are NOT in-game GPS coordinates.
   - The six regions below have OFFICIALLY CONFIRMED NAMES, but their
     x,y here are our APPROXIMATE placement on the schematic — not
     verified in-game positions. Any non-"verified" marker is shown
     as approximate in the UI.
   - If you swap the base image (data/leonida-map.svg), you must
     RECALIBRATE every x,y to the new image's pixel space and update
     base.width/base.height — it is not just an image swap.
   - We only give a map position to entries whose placement we can
     justify from our schematic (the confirmed regions). Everything
     else has x:null / y:null and appears in the directory only,
     until we verify a real position in-game.
   - We never fabricate a specific gameplay marker (a particular
     bank, store, etc.) at an invented position.

   Per-entry schema:
     id         unique slug
     name       display name
     cat        category id (see categories[])
     region     parent region / area (text)
     status     "official" | "reported" | "verified"
     desc       description shown in the info panel
     src        { u: url, t: source label }  (optional)
     shot       screenshot path (optional; from our own capture)
     x, y       position on the schematic base, or null
   ============================================================ */
(function () {
  var SRC_MAP   = { u: "https://www.pcgamer.com/games/grand-theft-auto/gta6-map", t: "PC Gamer — GTA 6 map" };
  var SRC_MONEY = { u: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-how-to-make-money/", t: "PC Gamer — GTA 6 money" };

  window.LEONIDA_LOCATIONS = {
    base: { image: "data/leonida-map.svg", width: 1600, height: 1600, schematic: true },

    // category id -> label + marker color. Gameplay categories are prepared
    // now; they stay empty until verified positions exist.
    categories: [
      { id: "region",      label: "Regions",             color: "#b14aed" },
      { id: "bank",        label: "Banks",               color: "#3ddc84" },
      { id: "jewelry",     label: "Jewelry Stores",      color: "#ffd34e" },
      { id: "mission",     label: "Missions",            color: "#ff2d95" },
      { id: "robbery",     label: "Robberies",           color: "#ff5470" },
      { id: "store",       label: "Stores",              color: "#25e7ea" },
      { id: "money",       label: "Money Opportunities", color: "#7df0c0" },
      { id: "collectible", label: "Collectibles",        color: "#c08cff" },
      { id: "vehicle",     label: "Vehicles",            color: "#74e3ea" },
      { id: "safehouse",   label: "Safehouses",          color: "#ff9f45" },
      { id: "useful",      label: "Useful",              color: "#9b95b8" }
    ],

    // verification statuses, most-trusted first
    statuses: [
      { id: "verified", label: "Verified by LootHub", desc: "we confirmed its position in our own game" },
      { id: "official", label: "Official",            desc: "confirmed by Rockstar / official materials" },
      { id: "reported", label: "Reported",            desc: "from a third-party source, not verified by us" }
    ],

    locations: [
      /* --- Confirmed regions: positioned on our schematic base --- */
      { id: "vice-city", name: "Vice City", cat: "region", region: "Leonida", status: "official",
        x: 1010, y: 470, src: SRC_MAP,
        desc: "The Miami-inspired vacation capital in south-central Leonida. Includes districts such as Ocean Beach, Little Cuba and the Tisha-Wocka flea market, plus Vice City International Airport." },
      { id: "mount-kalaga", name: "Mount Kalaga", cat: "region", region: "Leonida", status: "official",
        x: 655, y: 300, src: SRC_MAP,
        desc: "A national park on Leonida's northern border — billed for hunting, fishing and off-roading." },
      { id: "port-gellhorn", name: "Port Gellhorn", cat: "region", region: "Leonida", status: "official",
        x: 445, y: 470, src: SRC_MAP,
        desc: "A struggling former-resort coast of motels and closed attractions, with industries tied to drugs, alcohol and energy drinks." },
      { id: "ambrosia", name: "Ambrosia", cat: "region", region: "Leonida", status: "official",
        x: 705, y: 770, src: SRC_MAP,
        desc: "A one-company town built around the Allied Crystal sugar refinery, home to the Final Chapter biker gang." },
      { id: "grassrivers", name: "Grassrivers", cat: "region", region: "Leonida", status: "official",
        x: 760, y: 1080, src: SRC_MAP,
        desc: "A wetland region with alligators and other predators." },
      { id: "leonida-keys", name: "Leonida Keys", cat: "region", region: "Leonida", status: "official",
        x: 965, y: 1420, src: SRC_MAP,
        desc: "Island waters to the south, with a more southerly airport that may be a military base." },

      /* --- Directory-only: real, but no verified map position yet --- */
      { id: "lummox", name: "Lummox County", cat: "region", region: "Leonida", status: "reported",
        x: null, y: null, src: SRC_MONEY,
        desc: "A rural county reported as the base for hunting work (for a character named Bret). Position pending our own verification." },
      { id: "vc-airport", name: "Vice City International Airport", cat: "useful", region: "Vice City", status: "reported",
        x: null, y: null, src: SRC_MAP,
        desc: "The main airport within Vice City. Exact map position pending verification." },
      { id: "ambrosia-raceway", name: "Ambrosia Raceway", cat: "money", region: "Ambrosia", status: "reported",
        x: null, y: null, src: SRC_MONEY,
        desc: "Reported home of repeatable Demolition Derby events — see the money guide for reported payouts. Position pending verification." },
      { id: "lake-leonida-mod", name: "Lake Leonida mod shop", cat: "vehicle", region: "Leonida", status: "reported",
        x: null, y: null, src: SRC_MAP,
        desc: "Reported location of the One-Eyed Willie's mod shop. Position pending verification." },
      { id: "paradise-garage", name: "Paradise Garage", cat: "vehicle", region: "Watson Bay", status: "reported",
        x: null, y: null, src: SRC_MAP,
        desc: "Believed location of the Paradise Garage. Position pending verification." }
    ]
  };
})();
