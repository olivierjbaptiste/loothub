/* ============================================================
   GTA 6 COLLECTIBLES MAP DATA  —  *** PLACEHOLDER ***
   ------------------------------------------------------------
   These markers are EXAMPLES so the map works today. At launch
   (Nov 19, 2026): (1) replace data/leonida-map.svg with the real
   GTA 6 map image, (2) set width/height to that image's pixel
   size, (3) replace the markers below with the real collectible
   locations the community datamines. Nothing in map.js changes.

   Coordinates: x = pixels from the LEFT of the image,
                y = pixels from the TOP of the image.
   ============================================================ */
window.GTA_MAP_DATA = {
  image:  "data/leonida-map.svg",
  width:  1600,
  height: 1600,

  // collectible categories (id, label, marker color)
  types: [
    { id: "package",  name: "Hidden Package",   color: "#ffd34e" },
    { id: "jump",     name: "Stunt Jump",       color: "#25e7ea" },
    { id: "card",     name: "Collectible Card",  color: "#ff2d95" },
    { id: "landmark", name: "Landmark",          color: "#b14aed" }
  ],

  markers: [
    { type: "card",     name: "Collectible Card #1", x: 980,  y: 540,  note: "Downtown Vice City rooftop." },
    { type: "card",     name: "Collectible Card #2", x: 1050, y: 640,  note: "Behind a neon storefront." },
    { type: "package",  name: "Hidden Package #1",   x: 940,  y: 690,  note: "Vice City marina." },
    { type: "jump",     name: "Stunt Jump #1",       x: 1080, y: 560,  note: "Off a parking ramp." },
    { type: "landmark", name: "Lighthouse",          x: 1140, y: 430,  note: "Northern point landmark." },
    { type: "package",  name: "Hidden Package #2",   x: 650,  y: 300,  note: "Mount Kalaga trailhead." },
    { type: "landmark", name: "Summit Marker",       x: 700,  y: 250,  note: "Top of Mount Kalaga." },
    { type: "jump",     name: "Stunt Jump #2",       x: 600,  y: 360,  note: "Mountain switchback." },
    { type: "package",  name: "Hidden Package #3",   x: 430,  y: 500,  note: "Port Gellhorn docks." },
    { type: "card",     name: "Collectible Card #3", x: 400,  y: 560,  note: "Inside a warehouse." },
    { type: "landmark", name: "Old Pier",            x: 360,  y: 620,  note: "Port Gellhorn waterfront." },
    { type: "package",  name: "Hidden Package #4",   x: 700,  y: 760,  note: "Ambrosia outskirts." },
    { type: "jump",     name: "Stunt Jump #3",       x: 760,  y: 820,  note: "Highway overpass." },
    { type: "card",     name: "Collectible Card #4", x: 720,  y: 1040, note: "Grassrivers airboat dock." },
    { type: "package",  name: "Hidden Package #5",   x: 820,  y: 1100, note: "Deep in the wetlands." },
    { type: "landmark", name: "Ranger Station",      x: 680,  y: 1080, note: "Grassrivers landmark." },
    { type: "card",     name: "Collectible Card #5", x: 855,  y: 1365, note: "On a key, near a bar." },
    { type: "landmark", name: "Keys Sandbar",        x: 1025, y: 1420, note: "Southernmost key." }
  ]
};
