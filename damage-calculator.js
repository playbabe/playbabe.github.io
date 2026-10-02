(function() {
    "use strict";

    var units = window.damageUnits || [];
    var selected = new Map();
    var activeCategory = "ground";
    var categoryNames = { ground: "Ground", air: "Air", naval: "Naval" };
    var hpTypeNames = {
        "assets/soft-hp.svg": "Soft target",
        "assets/hard-hp.svg": "Hard target",
        "assets/fixed-wing-hp.svg": "Fixed-wing aircraft",
        "assets/rotaly-wing-hp.svg": "Rotary-wing aircraft",
        "assets/ship-hp.svg": "Surface ship",
        "assets/submarine-hp.svg": "Submarine",
        "assets/drone-hp.svg": "Drone"
    };

    function element(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function sortedSelection() {
        return Array.from(selected.values()).sort(function(left, right) {
            return right.unit.damage_weight - left.unit.damage_weight || left.unit.name.localeCompare(right.unit.name) || left.unit.id.localeCompare(right.unit.id);
        });
    }

    function applyWeightColor(row, unit) {
        var weight = unit.damage_weight;
        if (weight >= 1 && weight <= 10) {
            row.dataset.weightBand = weight <= 3 ? "low" : weight <= 6 ? "medium" : "high";
        }
    }

    function totals() {
        return Array.from(selected.values()).reduce(function(sum, entry) {
            sum.quantity += entry.quantity;
            sum.weight += entry.unit.damage_weight * entry.quantity;
            return sum;
        }, { quantity: 0, weight: 0 });
    }

    function unitIdentity(unit) {
        var identity = element("div", "unit-identity");
        identity.appendChild(element("h3", "unit-name", unit.name));
        if (unit.officer === true) {
            identity.appendChild(element("span", "officer-badge", "Officer"));
        }
        var metadata = element("div", "unit-metadata");
        var icon;
        if (unit.hp_type_icon) {
            icon = element("img", "hp-type-icon");
            icon.src = unit.hp_type_icon;
            icon.alt = hpTypeNames[unit.hp_type_icon] || "HP type";
            icon.title = icon.alt;
            icon.width = 26;
            icon.height = 26;
            if (unit.hp_type_icon === "assets/drone-hp.svg") {
                icon.classList.add("hp-type-icon--light");
            }
        } else {
            icon = element("span", "hp-type-placeholder", "HP type");
            icon.setAttribute("aria-label", "HP type not assigned");
        }
        metadata.appendChild(icon);
        if (unit.context) {
            metadata.appendChild(element("em", "unit-context", unit.context));
        }
        identity.appendChild(metadata);
        return identity;
    }

    function button(text, className, label, onClick) {
        var node = element("button", className, text);
        node.type = "button";
        if (label) node.setAttribute("aria-label", label);
        node.addEventListener("click", onClick);
        return node;
    }

    function renderCatalog() {
        var catalog = document.getElementById("unit-catalog");
        catalog.replaceChildren();
        catalog.setAttribute("aria-label", categoryNames[activeCategory] + " units");
        units.filter(function(unit) { return unit.category === activeCategory; }).sort(function(left, right) {
            var leftOrder = Number.isFinite(left.sort_order) ? left.sort_order : Infinity;
            var rightOrder = Number.isFinite(right.sort_order) ? right.sort_order : Infinity;
            return leftOrder - rightOrder || left.name.localeCompare(right.name);
        }).forEach(function(unit) {
            var row = element("div", "catalog-row");
            row.dataset.unitId = unit.id;
            applyWeightColor(row, unit);
            row.appendChild(unitIdentity(unit));
            var weight = element("div", "catalog-weight");
            weight.appendChild(element("span", "", "Damage weight"));
            weight.appendChild(element("strong", "", String(unit.damage_weight)));
            row.appendChild(weight);
            row.appendChild(button("+ Add", "add-unit-button", "Add " + categoryNames[unit.category] + " " + unit.name, function() {
                var entry = selected.get(unit.id);
                if (entry) {
                    if (entry.quantity < Number.MAX_SAFE_INTEGER) entry.quantity += 1;
                } else {
                    selected.set(unit.id, { unit: unit, quantity: 1 });
                }
                renderStack();
            }));
            catalog.appendChild(row);
        });
    }

    function renderWarnings() {
        var officerCount = 0;
        var categories = new Set();
        selected.forEach(function(entry) {
            if (entry.unit.officer === true) officerCount += entry.quantity;
            categories.add(entry.unit.category);
        });

        var messages = [];
        if (officerCount > 1) {
            messages.push("Multiple officers selected (" + officerCount + "). Officers cannot be stacked together in-game.");
        }
        if (categories.size > 1) {
            var names = Object.keys(categoryNames).filter(function(category) {
                return categories.has(category);
            }).map(function(category) { return categoryNames[category]; });
            messages.push("Mixed categories selected: " + names.join(", ") + ". Units from different categories cannot be stacked together in-game.");
        }

        var warnings = document.getElementById("stack-warnings");
        var signature = messages.join("\n");
        if (warnings.dataset.messages !== signature) {
            warnings.replaceChildren();
            messages.forEach(function(message) {
                warnings.appendChild(element("p", "stack-warning", message));
            });
            if (messages.length) {
                warnings.appendChild(element("p", "warning-note", "You can still add units and calculate their damage shares."));
            }
            warnings.dataset.messages = signature;
        }
        warnings.hidden = messages.length === 0;
    }

    function renderCalculations() {
        var sum = totals();
        sortedSelection().forEach(function(entry) {
            var calculation = document.getElementById("breakdown-" + entry.unit.id);
            calculation.replaceChildren();
            var weightedAmount = entry.unit.damage_weight * entry.quantity;
            var percentage = sum.weight ? weightedAmount / sum.weight * 100 : 0;
            var steps = element("div", "calculation-steps");
            steps.appendChild(element("p", "weight-step", entry.unit.damage_weight + " \u00d7 " + entry.quantity + " = " + weightedAmount));
            calculation.appendChild(steps);
            var share = element("div", "damage-share");
            share.appendChild(element("output", "damage-percentage", percentage.toFixed(2) + "%"));
            share.appendChild(element("span", "", "of incoming damage"));
            calculation.appendChild(share);
            var bar = element("div", "damage-bar");
            bar.setAttribute("aria-hidden", "true");
            var fill = element("span");
            fill.style.width = percentage + "%";
            bar.appendChild(fill);
            calculation.appendChild(bar);
            document.getElementById("decrease-" + entry.unit.id).disabled = entry.quantity <= 1;
        });
        document.getElementById("clear-stack").disabled = selected.size === 0;
        document.getElementById("stack-status").textContent = sum.quantity + " units selected. Total weighted amount: " + sum.weight + ".";
        renderWarnings();
    }

    function renderStack() {
        var rows = document.getElementById("stack-rows");
        // Restore keyboard focus after rebuilding selected rows.
        var focusedId = document.activeElement.id;
        var focusFallback = document.activeElement.closest(".stack-row");
        var previousRows = Array.from(rows.querySelectorAll(".stack-row"));
        var previousIndex = previousRows.indexOf(focusFallback);
        rows.replaceChildren();
        if (!selected.size) {
            var empty = element("div", "stack-empty");
            var left = element("div");
            left.appendChild(element("h3", "", "Your stack is empty"));
            left.appendChild(element("p", "", "Add a unit from the list below to get started."));
            var right = element("div");
            right.appendChild(element("h3", "", "No damage shares yet"));
            right.appendChild(element("p", "", "Each unit's calculation will appear here."));
            empty.append(left, right);
            rows.appendChild(empty);
        }
        sortedSelection().forEach(function(entry) {
            var unit = entry.unit;
            var row = element("div", "stack-row");
            row.dataset.unitId = unit.id;
            applyWeightColor(row, unit);
            var selection = element("div", "selected-unit");
            selection.appendChild(unitIdentity(unit));
            var controls = element("div", "quantity-controls");
            var unitLabel = categoryNames[unit.category] + " " + unit.name;
            var decrease = button("\u2212", "quantity-button", "Decrease " + unitLabel + " quantity", function() {
                if (entry.quantity > 1) entry.quantity -= 1;
                renderStack();
            });
            decrease.id = "decrease-" + unit.id;
            controls.appendChild(decrease);
            var input = element("input", "unit-quantity");
            input.type = "number";
            input.id = "quantity-" + unit.id;
            input.min = "1";
            input.step = "1";
            input.value = String(entry.quantity);
            input.setAttribute("aria-label", unitLabel + " quantity");
            input.addEventListener("input", function() {
                var value = Number(input.value);
                if (!Number.isSafeInteger(value) || value < 1) {
                    input.setCustomValidity("Enter a whole number of at least 1.");
                    return;
                }
                input.setCustomValidity("");
                entry.quantity = value;
                renderCalculations();
            });
            input.addEventListener("change", function() {
                // Restore the last valid quantity when an invalid edit is committed.
                if (!input.checkValidity()) {
                    input.value = String(entry.quantity);
                    input.setCustomValidity("");
                }
            });
            controls.appendChild(input);
            var increase = button("+", "quantity-button", "Increase " + unitLabel + " quantity", function() {
                if (entry.quantity < Number.MAX_SAFE_INTEGER) entry.quantity += 1;
                renderStack();
            });
            increase.id = "increase-" + unit.id;
            controls.appendChild(increase);
            var remove = button("Remove", "remove-unit-button", "Remove " + unitLabel, function() {
                selected.delete(unit.id);
                renderStack();
            });
            remove.id = "remove-" + unit.id;
            controls.appendChild(remove);
            selection.appendChild(controls);
            row.appendChild(selection);
            var breakdown = element("div", "unit-breakdown");
            breakdown.id = "breakdown-" + unit.id;
            row.appendChild(breakdown);
            rows.appendChild(row);
        });
        renderCalculations();
        var restoreFocus = focusedId && document.getElementById(focusedId);
        if (restoreFocus && !restoreFocus.disabled) {
            restoreFocus.focus();
        } else if (previousIndex >= 0) {
            var currentRows = rows.querySelectorAll(".stack-row");
            var nextRow = currentRows[Math.min(previousIndex, currentRows.length - 1)];
            if (nextRow) nextRow.querySelector(".unit-quantity").focus();
            else document.querySelector(".add-unit-button").focus();
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll("[data-unit-category]").forEach(function(categoryButton) {
            categoryButton.addEventListener("click", function() {
                activeCategory = categoryButton.dataset.unitCategory;
                document.querySelectorAll("[data-unit-category]").forEach(function(other) {
                    other.setAttribute("aria-pressed", String(other === categoryButton));
                });
                renderCatalog();
            });
        });
        document.getElementById("clear-stack").addEventListener("click", function() {
            selected.clear();
            renderStack();
            document.querySelector(".add-unit-button").focus();
        });
        renderCatalog();
        renderStack();
    });
})();
