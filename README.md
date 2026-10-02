# playbabe.net
This is personally repository for site hosting in github.

Open `index.html` directly in your browser to use the calculator.

Edit `data/scenarios.js` to change scenario names, resource values, or the
default scenario. Keep the `window.scenarioData =` assignment and the surrounding
braces intact. This file loads before `script.js`, so no web server is required.

Use the navigation row to open `second-calculator.html`, the damage distribution
calculator. Edit `data/units.js` to change the unit definitions. Each unit has a
unique `id`, `sort_order`, `name`, `category` (`ground`, `air`, or `naval`),
`damage_weight`, `officer` (true or false), `hp_type_icon` (a relative SVG asset
path, such as `assets/soft-hp.svg`), and optional `context`.
A unit type's share is `(damage_weight * quantity) / total stack weight * 100`.
The unit list sorts by increasing `sort_order`, following the document's tables
from left to right and then to the next row. Selected types sort by decreasing
`damage_weight`.

The 87 unit definitions were imported from the current tables in
[Conflict of Nations's teacher wiki](https://docs.google.com/document/d/1ukmdz6SSHn2atx3AYQVhXv_H3r_P-i-yeFP29GcLxxY)
on October 2, 2026: 44 Ground, 23 Air, and 20 Naval. Archived tables are excluded.
The document's subsections supply the context text; entries under "Officers &
Veterans" are tagged as officers.

HP icons use unit-family assignments. Named officers and miscellaneous units use
inferred category defaults because the weight document does not specify HP types.
Edit each unit's `hp_type_icon` path to correct these as needed. The rotary-wing
asset is currently named `assets/rotaly-wing-hp.svg`.

Selecting more than one officer (including
quantity greater than one of the same officer) or mixing categories shows a
warning without preventing selection or calculation.
