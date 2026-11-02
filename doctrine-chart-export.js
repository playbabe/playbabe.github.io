(() => {
    'use strict';

    const button = document.getElementById('render-png');
    const status = document.getElementById('export-status');
    const svgNamespace = 'http://www.w3.org/2000/svg';

    function dataUrl(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });
    }

    async function localAssets() {
        if (!window.doctrineExportLocal) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `data/doctrine-export-local.js?v=${Date.now()}`;
                script.onload = resolve;
                script.onerror = () => reject(new Error('Unable to load local export assets.'));
                document.head.append(script);
            });
        }
        return window.doctrineExportLocal;
    }

    async function prepareSvg() {
        await document.fonts.ready;
        const source = document.querySelector('.design-viewport');
        const clone = source.cloneNode(true);
        const { width, height } = source.viewBox.baseVal;
        clone.setAttribute('width', width);
        clone.setAttribute('height', height);
        clone.removeAttribute('class');
        clone.removeAttribute('hidden');

        const local = window.location.protocol === 'file:' ? await localAssets() : null;
        const cache = new Map();
        function embed(url) {
            if (url.startsWith('data:')) return Promise.resolve(url);
            if (!cache.has(url)) cache.set(url, (async () => {
                if (local && local.assets[url]) return local.assets[url];
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Unable to load export asset: ${url}`);
                return dataUrl(await response.blob());
            })());
            return cache.get(url);
        }

        let css;
        if (local) css = local.css;
        else {
            const response = await fetch('doctrine-chart.css', { cache: 'no-store' });
            if (!response.ok) throw new Error('Unable to load chart styles.');
            css = await response.text();
        }
        // Embed web fonts too: an SVG rendered as an image cannot load external assets.
        for (const match of [...css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)]) {
            try {
                css = css.replace(match[0], `url("${await embed(match[1])}")`);
            } catch (error) {
                // Keep the chart's existing system-font fallback when a font is unavailable.
                css = css.replace(match[0], 'url("data:font/woff2;base64,")');
            }
        }
        const style = document.createElementNS(svgNamespace, 'style');
        style.textContent = css;
        clone.prepend(style);
        await Promise.all([...clone.querySelectorAll('img, image')].map(async element => {
            const attribute = element.localName === 'img' ? 'src' : 'href';
            const url = element.getAttribute(attribute);
            if (url) element.setAttribute(attribute, await embed(url));
        }));
        return { clone, width, height };
    }

    button.addEventListener('click', async () => {
        button.disabled = true;
        button.textContent = 'Rendering...';
        status.textContent = 'Rendering chart as PNG.';
        try {
            const { clone, width, height } = await prepareSvg();
            const svg = new XMLSerializer().serializeToString(clone);
            const image = new Image();
            image.src = await dataUrl(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
            await image.decode();
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');
            if (!context) throw new Error('Canvas rendering is unavailable.');
            context.drawImage(image, 0, 0);
            const png = await new Promise((resolve, reject) => canvas.toBlob(
                blob => blob ? resolve(blob) : reject(new Error('PNG rendering failed.')), 'image/png',
            ));
            const url = URL.createObjectURL(png);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'doctrine-chart.png';
            document.body.append(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 60000);
            status.textContent = 'Chart PNG downloaded.';
        } catch (error) {
            status.textContent = `Unable to export PNG: ${error.message}`;
            window.alert(status.textContent);
            console.error(error);
        } finally {
            button.disabled = false;
            button.textContent = 'Render to PNG';
        }
    });
})();
