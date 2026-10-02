(function() {
    var storageKey = "concal-theme";
    var savedTheme = null;
    var deviceTheme = null;
    var toggle = null;
    var root = document.documentElement;

    try {
        var storedValue = window.localStorage.getItem(storageKey);
        if (storedValue === "light" || storedValue === "dark") {
            savedTheme = storedValue;
        }
    } catch (error) {
        // The theme still works when browser storage is unavailable.
    }

    try {
        if (typeof window.matchMedia === "function") {
            deviceTheme = window.matchMedia("(prefers-color-scheme: dark)");
        }
    } catch (error) {
        // Use the light theme if device preferences cannot be read.
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        if (toggle) {
            toggle.setAttribute("aria-pressed", String(theme === "dark"));
            toggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        }
    }

    // Apply before styles load to avoid flashing the wrong theme.
    applyTheme(savedTheme || (deviceTheme && deviceTheme.matches ? "dark" : "light"));

    function followDeviceTheme(event) {
        if (!savedTheme) {
            applyTheme(event.matches ? "dark" : "light");
        }
    }

    if (deviceTheme) {
        if (typeof deviceTheme.addEventListener === "function") {
            deviceTheme.addEventListener("change", followDeviceTheme);
        } else if (typeof deviceTheme.addListener === "function") {
            deviceTheme.addListener(followDeviceTheme);
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        toggle = document.getElementById("theme-toggle");
        if (!toggle) {
            return;
        }

        applyTheme(root.getAttribute("data-theme"));
        toggle.addEventListener("click", function() {
            savedTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            applyTheme(savedTheme);
            try {
                window.localStorage.setItem(storageKey, savedTheme);
            } catch (error) {
                // Keep the selection for this visit even if it cannot be saved.
            }
        });
    });
})();
