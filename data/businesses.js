/* ============================================================
   GTA 6 BUSINESS DATA  —  *** PLACEHOLDER ***
   ------------------------------------------------------------
   These numbers are EXAMPLES (loosely modeled on GTA Online)
   so the calculator works today. On launch day (Nov 19, 2026),
   replace every value below with the real GTA 6 figures the
   community datamines, then redeploy. Nothing else needs to
   change — the calculator reads straight from this file.

   Each business:
     id                 unique slug
     name               display name
     category           grouping label
     setupCost          one-time cost to acquire/set up
     baseProfitPerHour  passive profit/hr with NO upgrades
     upgrades[]         { id, name, cost, profitBonusPerHour }
   ============================================================ */
window.GTA_DATA = {
  updated: "PLACEHOLDER — pre-launch example data",
  currency: "$",
  businesses: [
    { id:"nightclub", name:"Nightclub", category:"Passive", setupCost:1700000, baseProfitPerHour:50000,
      upgrades:[
        {id:"staff", name:"Staff Upgrade", cost:475000, profitBonusPerHour:9000},
        {id:"equip", name:"Equipment Upgrade", cost:1100000, profitBonusPerHour:16000}
      ]},
    { id:"bunker", name:"Weapons Bunker", category:"Manufacturing", setupCost:1200000, baseProfitPerHour:47000,
      upgrades:[
        {id:"staff", name:"Staff Upgrade", cost:598000, profitBonusPerHour:12000},
        {id:"equip", name:"Equipment Upgrade", cost:1155000, profitBonusPerHour:20000}
      ]},
    { id:"coke", name:"Cocaine Lockup", category:"Manufacturing", setupCost:975000, baseProfitPerHour:42000,
      upgrades:[
        {id:"staff", name:"Staff Upgrade", cost:289000, profitBonusPerHour:9000},
        {id:"equip", name:"Equipment Upgrade", cost:790000, profitBonusPerHour:18000}
      ]},
    { id:"acid", name:"Acid Lab", category:"Manufacturing", setupCost:888000, baseProfitPerHour:53000,
      upgrades:[
        {id:"equip", name:"Equipment Upgrade", cost:380000, profitBonusPerHour:14000}
      ]},
    { id:"agency", name:"Agency", category:"Active", setupCost:2415000, baseProfitPerHour:35000,
      upgrades:[
        {id:"staff", name:"Staff Upgrade", cost:700000, profitBonusPerHour:10000}
      ]},
    { id:"meth", name:"Meth Lab", category:"Manufacturing", setupCost:910000, baseProfitPerHour:39000,
      upgrades:[
        {id:"staff", name:"Staff Upgrade", cost:262000, profitBonusPerHour:8000},
        {id:"equip", name:"Equipment Upgrade", cost:730000, profitBonusPerHour:16000}
      ]},
    { id:"cash", name:"Counterfeit Cash", category:"Manufacturing", setupCost:845000, baseProfitPerHour:30000,
      upgrades:[
        {id:"staff", name:"Staff Upgrade", cost:235000, profitBonusPerHour:7000},
        {id:"equip", name:"Equipment Upgrade", cost:670000, profitBonusPerHour:13000}
      ]},
    { id:"cargo", name:"Cargo Warehouse", category:"Active", setupCost:1500000, baseProfitPerHour:60000,
      upgrades:[] }
  ]
};
