// Damage distribution weights from the current tables in:
// https://docs.google.com/document/d/1ukmdz6SSHn2atx3AYQVhXv_H3r_P-i-yeFP29GcLxxY
// Imported 2026-10-02. Archived values are intentionally excluded.
// Units under Officers & Veterans are tagged officer: true.
// Keep IDs unique, damage_weight positive, and officer a boolean.
// sort_order follows the document: left cell, right cell, then the next row.
// Lower sort_order values appear first in the unit list.
// hp_type_icon is a relative asset path, editable separately for every unit.
// Named officers and miscellaneous units use inferred category defaults; adjust to match in-game HP types.
window.damageUnits = [
    // ground / Infantry
    { id: "ground-motorized-infantry", sort_order: 1, name: "Motorized Infantry", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 3, officer: false, context: "Infantry" },
    { id: "ground-mountain-infantry", sort_order: 2, name: "Mountain Infantry", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 3, officer: false, context: "Infantry" },
    { id: "ground-mechanized-infantry", sort_order: 3, name: "Mechanized Infantry", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 7, officer: false, context: "Infantry" },
    { id: "ground-marine-infantry", sort_order: 4, name: "Marine Infantry", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 5, officer: false, context: "Infantry" },
    { id: "ground-airborne-infantry", sort_order: 5, name: "Airborne Infantry", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 5, officer: false, context: "Infantry" },
    { id: "ground-special-forces", sort_order: 6, name: "Special Forces", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 1, officer: false, context: "Infantry" },
    { id: "ground-national-guard", sort_order: 7, name: "National Guard", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 4, officer: false, context: "Infantry" },
    { id: "ground-mercenaries", sort_order: 8, name: "Mercenaries", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 10, officer: false, context: "Infantry" },

    // ground / Armored
    { id: "ground-combat-recon-vehicle", sort_order: 9, name: "Combat Recon Vehicle", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 2, officer: false, context: "Armored" },
    { id: "ground-armored-fighting-vehicle", sort_order: 10, name: "Armored Fighting Vehicle", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 7, officer: false, context: "Armored" },
    { id: "ground-amphibious-combat-vehicle", sort_order: 11, name: "Amphibious Combat Vehicle", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 6, officer: false, context: "Armored" },
    { id: "ground-main-battle-tank", sort_order: 12, name: "Main Battle Tank", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 9, officer: false, context: "Armored" },
    { id: "ground-tank-destroyer", sort_order: 13, name: "Tank Destroyer", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 8, officer: false, context: "Armored" },

    // ground / Support
    { id: "ground-towed-artillery", sort_order: 14, name: "Towed Artillery", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 2, officer: false, context: "Support" },
    { id: "ground-mobile-artillery", sort_order: 15, name: "Mobile Artillery", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 6, officer: false, context: "Support" },
    { id: "ground-multiple-rocket-launcher", sort_order: 16, name: "Multiple Rocket Launcher", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 6, officer: false, context: "Support" },
    { id: "ground-mobile-anti-aircraft", sort_order: 17, name: "Mobile Anti-Aircraft", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 4, officer: false, context: "Support" },
    { id: "ground-sam", sort_order: 18, name: "SAM", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 3, officer: false, context: "Support" },
    { id: "ground-tds", sort_order: 19, name: "TDS", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Support" },
    { id: "ground-mobile-radar", sort_order: 20, name: "Mobile Radar", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 1, officer: false, context: "Support" },

    // ground / Officers & Veterans
    { id: "ground-infantry-veteran", sort_order: 21, name: "Infantry Veteran", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 2, officer: true },
    { id: "ground-tank-veteran", sort_order: 22, name: "Tank Veteran", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 5, officer: true },
    { id: "ground-airborne-veteran", sort_order: 23, name: "Airborne Veteran", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 1, officer: true },
    { id: "ground-john-chupacabra-reyes", sort_order: 24, name: "John 'Chupacabra' Reyes", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 2, officer: true },
    { id: "ground-hana-skyguard-fujimoto", sort_order: 25, name: "Hana 'Skyguard' Fujimoto", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 2, officer: true },
    { id: "ground-aleksei-grom-potapov", sort_order: 26, name: "Aleksei 'Grom' Potapov", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 4, officer: true },
    { id: "ground-narawit-krait-sornchai", sort_order: 27, name: "Narawit 'Krait' Sornchai", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 5, officer: true },

    // ground / Seasons
    { id: "ground-elite-main-battle-tank", sort_order: 28, name: "Elite Main Battle Tank", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 7, officer: false, context: "Seasons" },
    { id: "ground-elite-railgun", sort_order: 29, name: "Elite Railgun", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 7, officer: false, context: "Seasons" },
    { id: "ground-elite-ugv", sort_order: 30, name: "Elite UGV", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1.5, officer: false, context: "Seasons" },
    { id: "ground-elite-special-forces", sort_order: 31, name: "Elite Special Forces", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 2, officer: false, context: "Seasons" },
    { id: "ground-elite-drone-operator", sort_order: 32, name: "Elite Drone Operator", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 2, officer: false, context: "Seasons" },
    { id: "ground-elite-armored-fighting-vehicle", sort_order: 33, name: "Elite Armored Fighting Vehicle", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Seasons" },

    // ground / Static Unit
    { id: "ground-coastal-battery", sort_order: 34, name: "Coastal Battery", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Static Unit" },
    { id: "ground-radar-station", sort_order: 35, name: "Radar Station", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Static Unit" },
    { id: "ground-anti-aircraft-platform", sort_order: 36, name: "Anti-Aircraft Platform", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Static Unit" },

    // ground / Missiles
    { id: "ground-icbm-launcher", sort_order: 37, name: "ICBM Launcher", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Missiles" },
    { id: "ground-bm-launcher", sort_order: 38, name: "BM Launcher", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Missiles" },
    { id: "ground-cm-launcher", sort_order: 39, name: "CM Launcher", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Missiles" },

    // ground / Misc.
    { id: "ground-mindless-zombie", sort_order: 40, name: "Mindless Zombie", category: "ground", hp_type_icon: "assets/soft-hp.svg", damage_weight: 1, officer: false, context: "Misc." },
    { id: "ground-howler", sort_order: 41, name: "Howler", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Misc." },
    { id: "ground-bone-crusher", sort_order: 42, name: "Bone Crusher", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Misc." },
    { id: "ground-siege-breaker", sort_order: 43, name: "Siege Breaker", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Misc." },
    { id: "ground-titan", sort_order: 44, name: "Titan", category: "ground", hp_type_icon: "assets/hard-hp.svg", damage_weight: 1, officer: false, context: "Misc." },

    // air / Fixed Wing
    { id: "air-air-superiority-fighter", sort_order: 45, name: "Air Superiority Fighter", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 10, officer: false, context: "Fixed Wing" },
    { id: "air-naval-air-superiority-fighter", sort_order: 46, name: "Naval Air Superiority Fighter", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 9, officer: false, context: "Fixed Wing" },
    { id: "air-stealth-air-superiority-fighter", sort_order: 47, name: "Stealth Air Superiority Fighter", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 5, officer: false, context: "Fixed Wing" },
    { id: "air-strike-fighter", sort_order: 48, name: "Strike Fighter", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 5, officer: false, context: "Fixed Wing" },
    { id: "air-naval-strike-fighter", sort_order: 49, name: "Naval Strike Fighter", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 5, officer: false, context: "Fixed Wing" },
    { id: "air-stealth-strike-fighter", sort_order: 50, name: "Stealth Strike Fighter", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 3, officer: false, context: "Fixed Wing" },
    { id: "air-uav", sort_order: 51, name: "UAV", category: "air", hp_type_icon: "assets/drone-hp.svg", damage_weight: 2, officer: false, context: "Fixed Wing" },

    // air / Rotary Wing
    { id: "air-helicopter-gunship", sort_order: 52, name: "Helicopter Gunship", category: "air", hp_type_icon: "assets/rotaly-wing-hp.svg", damage_weight: 8, officer: false, context: "Rotary Wing" },
    { id: "air-attack-helicopter", sort_order: 53, name: "Attack Helicopter", category: "air", hp_type_icon: "assets/rotaly-wing-hp.svg", damage_weight: 7, officer: false, context: "Rotary Wing" },
    { id: "air-asw-helicopter", sort_order: 54, name: "ASW Helicopter", category: "air", hp_type_icon: "assets/rotaly-wing-hp.svg", damage_weight: 5, officer: false, context: "Rotary Wing" },

    // air / Heavy
    { id: "air-naval-patrol-aircraft", sort_order: 55, name: "Naval Patrol Aircraft", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 3, officer: false, context: "Heavy" },
    { id: "air-awacs", sort_order: 56, name: "AWACS", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 1, officer: false, context: "Heavy" },
    { id: "air-naval-awacs", sort_order: 57, name: "Naval AWACS", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 1, officer: false, context: "Heavy" },
    { id: "air-heavy-bomber", sort_order: 58, name: "Heavy Bomber", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 4, officer: false, context: "Heavy" },
    { id: "air-stealth-bomber", sort_order: 59, name: "Stealth Bomber", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 1, officer: false, context: "Heavy" },

    // air / Officers & Veterans
    { id: "air-fixed-wing-officer", sort_order: 60, name: "Fixed wing Officer", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 2, officer: true },
    { id: "air-rotary-wing-officer", sort_order: 61, name: "Rotary wing Officer", category: "air", hp_type_icon: "assets/rotaly-wing-hp.svg", damage_weight: 3, officer: true },
    { id: "air-tom-skull-hanniker", sort_order: 62, name: "Tom 'Skull' Hanniker", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 3, officer: true },
    { id: "air-rafael-jaguar-teixeira", sort_order: 63, name: "Rafael 'Jaguar' Teixeira", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 3, officer: true },
    { id: "air-edward-reaper-harris", sort_order: 64, name: "Edward 'Reaper' Harris", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 3, officer: true },

    // air / Seasons
    { id: "air-elite-attack-helicopter", sort_order: 65, name: "Elite Attack Helicopter", category: "air", hp_type_icon: "assets/rotaly-wing-hp.svg", damage_weight: 6, officer: false, context: "Seasons" },
    { id: "air-elite-bomber", sort_order: 66, name: "Elite Bomber", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 3, officer: false, context: "Seasons" },
    { id: "air-elite-attack-aircraft", sort_order: 67, name: "Elite Attack Aircraft", category: "air", hp_type_icon: "assets/fixed-wing-hp.svg", damage_weight: 7, officer: false, context: "Seasons" },

    // naval / Surface Vessels
    { id: "naval-patrol-boat", sort_order: 68, name: "Patrol Boat", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 8, officer: false, context: "Surface Vessels" },
    { id: "naval-corvette", sort_order: 69, name: "Corvette", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 5, officer: false, context: "Surface Vessels" },
    { id: "naval-frigate", sort_order: 70, name: "Frigate", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 4, officer: false, context: "Surface Vessels" },
    { id: "naval-destroyer", sort_order: 71, name: "Destroyer", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 8, officer: false, context: "Surface Vessels" },
    { id: "naval-cruiser", sort_order: 72, name: "Cruiser", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 5, officer: false, context: "Surface Vessels" },
    { id: "naval-aircraft-carrier", sort_order: 73, name: "Aircraft Carrier", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 2, officer: false, context: "Surface Vessels" },

    // naval / Submarine
    { id: "naval-attack-submarine", sort_order: 74, name: "Attack Submarine", category: "naval", hp_type_icon: "assets/submarine-hp.svg", damage_weight: 4, officer: false, context: "Submarine" },
    { id: "naval-missiles-submarine", sort_order: 75, name: "Missiles Submarine", category: "naval", hp_type_icon: "assets/submarine-hp.svg", damage_weight: 1, officer: false, context: "Submarine" },

    // naval / Officers & Veterans
    { id: "naval-naval-officer", sort_order: 76, name: "Naval Officer", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 2, officer: true },
    { id: "naval-submarine-commander", sort_order: 77, name: "Submarine Commander", category: "naval", hp_type_icon: "assets/submarine-hp.svg", damage_weight: 1, officer: true },
    { id: "naval-don-iron-tide-wolf", sort_order: 78, name: "Don 'Iron Tide' Wolf", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 2, officer: true },
    { id: "naval-mathieu-kraken-renaud", sort_order: 79, name: "Mathieu 'Kraken' Renaud", category: "naval", hp_type_icon: "assets/submarine-hp.svg", damage_weight: 1, officer: true },

    // naval / Seasons
    { id: "naval-elite-aip-submarine", sort_order: 80, name: "Elite AIP Submarine", category: "naval", hp_type_icon: "assets/submarine-hp.svg", damage_weight: 2, officer: false, context: "Seasons" },
    { id: "naval-elite-frigate", sort_order: 81, name: "Elite Frigate", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 3, officer: false, context: "Seasons" },
    { id: "naval-helicopter-carrier", sort_order: 82, name: "Helicopter Carrier", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 3, officer: false, context: "Seasons" },
    { id: "naval-elite-drone-mothership", sort_order: 83, name: "Elite Drone Mothership", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 8, officer: false, context: "Seasons" },
    { id: "naval-sea-drone", sort_order: 84, name: "Sea Drone", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 1, officer: false, context: "Seasons" },
    { id: "naval-elite-cruiser", sort_order: 85, name: "Elite Cruiser", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 8, officer: false, context: "Seasons" },

    // naval / Misc.
    { id: "naval-transport-ship", sort_order: 86, name: "Transport Ship", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 3, officer: false, context: "Misc." },
    { id: "naval-elite-transport-ship", sort_order: 87, name: "Elite Transport Ship", category: "naval", hp_type_icon: "assets/ship-hp.svg", damage_weight: 1, officer: false, context: "Misc." }
];
