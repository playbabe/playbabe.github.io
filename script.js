var scenarioData = null;
var currentScenario = null;

document.addEventListener("DOMContentLoaded", function() {
    loadScenarioData();

    document.getElementById("a").addEventListener("input", ResCalCity);
    document.getElementById("b").addEventListener("input", ResCalCity);
    document.getElementById("c").addEventListener("input", ResCalCity);
    document.getElementById("d").addEventListener("input", ResCalCity);
    document.getElementById("e").addEventListener("input", ResCalCity);
    document.getElementById("f").addEventListener("input", ResCalCity);
    document.getElementById("g").addEventListener("input", ResCalCity);

    document.getElementById("o").addEventListener("input", ResCalProvince);
    document.getElementById("p").addEventListener("input", ResCalProvince);

    document.getElementById("scenario-select").addEventListener("change", function(event) {
        currentScenario = event.target.value;
        ResCalCity();
        ResCalProvince();
    });
});

function loadScenarioData() {
    fetch("data/scenarios.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            scenarioData = data;
            currentScenario = data.defaultScenario;
            populateScenarioSelect();
            ResCalCity();
            ResCalProvince();
        })
        .catch(function(error) {
            console.error("Failed to load scenario data:", error);
        });
}

function populateScenarioSelect() {
    var scenarioSelect = document.getElementById("scenario-select");
    scenarioSelect.innerHTML = "";

    Object.keys(scenarioData.scenarios).forEach(function(scenarioKey) {
        var option = document.createElement("option");
        option.value = scenarioKey;
        option.textContent = scenarioData.scenarios[scenarioKey].name;

        if (scenarioKey === currentScenario) {
            option.selected = true;
        }

        scenarioSelect.appendChild(option);
    });
}

function getSelectedScenario() {
    if (!scenarioData || !currentScenario) {
        return null;
    }

    return scenarioData.scenarios[currentScenario];
}

function getPopulationMultiplier(population) {
    var populationFactorMap = {
        1: 0.2,
        2: 0.4,
        3: 0.6,
        4: 0.8,
        5: 1.0,
        6: 1.05,
        7: 1.10,
        8: 1.15,
        9: 1.25,
        10: 1.35
    };

    var lowerPop = Math.floor(population);
    var upperPop = Math.ceil(population);

    if (population <= 1) {
        return populationFactorMap[1];
    }

    if (population >= 10) {
        return populationFactorMap[10];
    }

    if (lowerPop === upperPop) {
        return populationFactorMap[lowerPop];
    }

    var lowerFactor = populationFactorMap[lowerPop];
    var upperFactor = populationFactorMap[upperPop];
    var progress = population - lowerPop;

    return lowerFactor + ((upperFactor - lowerFactor) * progress);
}

function outputResource(elementId, value) {
    var outputElement = document.getElementById(elementId);

    if (outputElement) {
        outputElement.innerText = Math.round(value);
    }
}

function ResCalCity() {
    var selectedScenario = getSelectedScenario();

    if (!selectedScenario) {
        return;
    }

    var a = parseFloat(document.getElementById("a").value) || 0;
    var b = parseFloat(document.getElementById("b").value) || 0;
    var c = parseFloat(document.getElementById("c").value) || 0;
    var d = parseFloat(document.getElementById("d").value) || 0;
    var e = parseFloat(document.getElementById("e").value) || 0;
    var f = parseFloat(document.getElementById("f").value) || 0;
    var g = parseFloat(document.getElementById("g").value) || 0;

    var h = ((a / 100) * 0.8) + 0.25;
    var i = 1 + (((d * 10) + (e * 5) + ((f - 1) * 5)) * 0.01);
    var j = getPopulationMultiplier(b);

    var k = j * h * i * g * c;

    Object.keys(selectedScenario.resources).forEach(function(resourceKey) {
        var baseValue = selectedScenario.resources[resourceKey];
        outputResource("rsoutput-" + resourceKey, k * baseValue * 3000);
    });

    var l = Math.floor(d);
    var valueMap = {
        5: 200,
        4: 185,
        3: 165,
        2: 135,
        1: 100,
        0: 0
    };

    var m = valueMap[l] || 0;

    outputResource("rsoutput-money", (k * selectedScenario.resources.money * 3000) + m);
}

function ResCalProvince() {
    var selectedScenario = getSelectedScenario();

    if (!selectedScenario) {
        return;
    }

    var o = parseFloat(document.getElementById("o").value) || 0;
    var p = parseFloat(document.getElementById("p").value) || 0;

    var r = ((o / 100) * 0.8) + 0.25;
    var s = p * q * r;

    var industryMultipliers = {
        0: 0.1,
        1: 0.15,
        2: 0.2,
        3: 0.3
    };

    Object.keys(industryMultipliers).forEach(function(industryLevel) {
        var industryMultiplier = industryMultipliers[industryLevel];

        Object.keys(selectedScenario.resources).forEach(function(resourceKey) {
            if (resourceKey === "money") {
                return;
            }

            var baseValue = selectedScenario.resources[resourceKey];
            outputResource(
                "rsoutput-" + resourceKey + "-p-" + industryLevel,
                s * baseValue * industryMultiplier * 3000
            );
        });
    });

    outputResource("rsoutput-money-p", s * selectedScenario.resources.money * 3000);
}
