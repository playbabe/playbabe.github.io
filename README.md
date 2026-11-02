# playbabe.net
This is personally repository for site hosting in github.
Go to https://playbabe.github.io/ to use it.

## Doctrine chart

`doctrine-chart.html` preserves the original full-page chart design with its own
`doctrine-chart.css`, while calculator navigation links to this root-level page.
`doctrine-chart.js` loads unit rows from `data/doctrine-compare.json` and SVG
badge dimensions from `data/perk-assets.json`. Perk badges are in `assets/perks/`;
doctrine icons and research markers are in `assets/doctrine/`.

Edit JSON values as display text (for example `"+10%"` or `"+0.1"`). The
`reduce_terrain_penalty`, `detect_5`, and `earlier_airlift` perks use their SVG's
built-in text. HTTP pages load the JSON directly; no build is needed.
Opening the HTML locally uses `data/doctrine-local.js` because browsers block
JSON fetches from `file://` pages. After editing JSON, refresh that local fallback
with `node data/update-doctrine-local.cjs`.
For automatic updates while editing locally, keep
`node data/update-doctrine-local.cjs --watch` running, then reload the chart after saving.
Unit rows render from top to bottom in JSON array order; reorder the array to reorder the chart.

The top-left **Render to PNG** button downloads the full-size chart without the
button. Export works over HTTP and from local files. After changing SVG assets
or chart CSS, refresh local-file export assets with
`node data/update-doctrine-export-local.cjs`. JSON edits need only the normal
local data watcher described above.
