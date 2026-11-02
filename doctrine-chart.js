(() => {
    'use strict';

    const columns = [
        { key: 'us', label: 'WESTERN', icon: 'us_doctrine_icon.svg' },
        { key: 'eu', label: 'EUROPEAN', icon: 'eu_doctrine_icon.svg' },
        { key: 'ru', label: 'EASTERN', icon: 'ru_doctrine_icon.svg' },
    ];
    const fixedTextPerks = new Set(['reduce_terrain_penalty', 'detect_5', 'earlier_airlift']);
    const escape = value => String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[char]);
    const image = (name, className = '') => `<img src="assets/doctrine/${name}" alt="" class="${className}">`;

    function researchMarker(type, legend = false) {
        const fast = type === 'fast_research';
        const label = fast ? 'Earlier research' : 'Later research';
        const art = legend
            ? `${image('2536d.svg')}<span class="${fast ? 'fast' : 'slow'}-marker" aria-hidden="true">${image(fast ? '41192.svg' : '0610c.svg')}</span>`
            : image(fast ? 'c75e4.svg' : '89b06.svg');
        return `<div class="research-marker research-marker--${legend ? 'legend' : 'cell'}">${art}<span class="sr-only">${label}</span></div>`;
    }

    function perkBadge(perk, definitions) {
        const key = typeof perk === 'string' ? perk : Object.keys(perk)[0];
        if (key === 'fast_research' || key === 'slow_research') return researchMarker(key);
        const definition = definitions[key];
        if (!definition) throw new Error(`Missing perk SVG definition: ${key}`);
        const value = typeof perk === 'object' ? perk[key] : '';
        const fixed = fixedTextPerks.has(key);
        const label = `${key.replace(/_/g, ' ')}${!fixed && value !== '' ? `: ${value}` : ''}`;
        const { width, valueX } = definition;
        return `<svg class="perk-template" width="${width}" height="63" viewBox="0 0 ${width} 63" role="img" aria-label="${escape(label)}">
            <image href="assets/perks/${escape(key)}.svg" width="${width}" height="63" />
            ${fixed ? '' : `<rect x="${valueX}" y="31" width="${width - valueX}" height="31" fill="white" />
            <text x="${(valueX + width) / 2}" y="48" dominant-baseline="middle" text-anchor="middle" fill="#213740" font-family="'Barlow:SemiBold', Arial, sans-serif" font-weight="600" font-size="24">${escape(value)}</text>`}
        </svg>`;
    }

    async function loadJson(path) {
        const response = await fetch(path, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
        return response.json();
    }

    async function loadChartData() {
        if (window.location.protocol !== 'file:') {
            return Promise.all([
                loadJson('data/doctrine-compare.json'), loadJson('data/perk-assets.json'),
            ]);
        }
        // Local pages cannot fetch JSON. A regular script can supply the same data.
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `data/doctrine-local.js?v=${Date.now()}`;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Unable to load data/doctrine-local.js'));
            document.head.append(script);
        });
        if (!window.doctrineLocalData) throw new Error('Local doctrine data is missing');
        return [window.doctrineLocalData.chart, window.doctrineLocalData.perks];
    }

    async function renderChart() {
        const status = document.getElementById('chart-status');
        try {
            const [data, definitions] = await loadChartData();
            const chart = data.doctrine_compare;
            const header = `<div class="table-header"><div class="header-panel header-panel--unit"></div>
                ${columns.map(c => `<div class="header-panel header-panel--${c.key}"></div>`).join('')}
                <span class="unit-heading">UNIT</span>
                ${columns.map(c => `<div class="doctrine-heading doctrine-heading--${c.key}">${image(c.icon)}<span>${c.label}</span></div>`).join('')}</div>`;
            const rows = chart.rows.map((unit, index) => {
                const alternate = index % 2 ? ' table-cell--alternate' : '';
                return `<div class="contents"><div class="table-cell unit-cell${alternate}">${escape(unit.unit)}</div>
                    ${columns.map(c => {
                        const perks = unit[c.key];
                        const highlight = perks.includes('highlight') ? ` doctrine-cell--highlighted doctrine-cell--${c.key}` : '';
                        return `<div class="table-cell${alternate}"><div class="doctrine-cell${highlight}"><div class="perk-list">${perks.filter(p => p !== 'highlight').map(p => perkBadge(p, definitions)).join('')}</div></div></div>`;
                    }).join('')}</div>`;
            }).join('');
            const legend = ['fast', 'slow'].map(type => `<div class="legend-item legend-item--${type}">${researchMarker(`${type}_research`, true)}<p>Later Levels are<br>unlocked ${type === 'fast' ? 'earlier' : 'later'}<br>than other.</p></div>`).join('');
            document.getElementById('doctrine-chart').innerHTML = `
                <div class="background-layer" aria-hidden="true">${image('1affa.png')}</div>
                <header class="chart-title">${image('f3851.svg', 'title-flag')}<h1 id="chart-title">${escape(chart.title)}</h1>${image('d2976.svg', 'title-line')}<p>${escape(chart.subtitle)}</p></header>
                ${header}<div class="comparison-grid">${rows}</div><footer class="legend">${legend}</footer>`;
            const viewport = document.querySelector('.design-viewport');
            viewport.removeAttribute('hidden');
            const page = document.getElementById('doctrine-chart');
            const grid = page.querySelector('.comparison-grid');
            const footer = page.querySelector('.legend');
            // Include the final row's overlapping 3px border and a 40px gap.
            const legendTop = grid.offsetTop + grid.offsetHeight + 3 + 40;
            footer.style.top = `${legendTop}px`;
            const chartHeight = legendTop + footer.offsetHeight + 48;
            page.style.height = `${chartHeight}px`;
            viewport.setAttribute('viewBox', `0 0 1700 ${chartHeight}`);
            viewport.querySelector('foreignObject').setAttribute('height', chartHeight);
            status.hidden = true;
            document.getElementById('render-png').disabled = false;
        } catch (error) {
            status.textContent = `Unable to load the doctrine chart: ${error.message}`;
            console.error(error);
        }
    }

    renderChart();
})();
