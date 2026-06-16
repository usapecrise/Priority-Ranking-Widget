const topics = [
    {
        title: "Grid Readiness & Power Infrastructure",
        description: "Planning for high-density AI electricity demand through grid modernization, transmission expansion, and flexible generation."
    },
    {
        title: "Regulatory Frameworks & Permitting",
        description: "Regulatory certainty, interconnection processes, permitting timelines, and energy market structures needed to support AI infrastructure deployment."
    },
    {
        title: "Emerging Energy Technologies",
        description: "Advanced cooling systems, energy storage, distributed energy resources, and AI-enabled energy management solutions."
    },
    {
        title: "Other System-Level Impacts",
        description: "Effects of AI-driven infrastructure growth on water resources, communities, workforce, land-use dynamics, and supporting fuel infrastructure."
    }
];

const container = document.getElementById("rankingContainer");

for (let t = 0; t < topics.length; t++) {

    const card = document.createElement("div");

    card.className = "ranking-item";

    let options = '<option value="">Select</option>';

    for (let i = 1; i <= topics.length; i++) {
        options += `<option value="${i}">${i}</option>`;
    }

    card.innerHTML = `
        <div class="topic-row">
            <div class="topic-title">${topics[t].title}</div>
            <select class="rank-select">
                ${options}
            </select>
        </div>

        <div class="topic-description">
            ${topics[t].description}
        </div>
    `;

    container.appendChild(card);
}

const selects = document.querySelectorAll(".rank-select");

selects.forEach(function (select) {
    select.addEventListener("change", function () {
        updateOptions();
        sendLiveData();
    });
});

function updateOptions() {

    const used = [];

    selects.forEach(function (s) {
        if (s.value !== "") {
            used.push(s.value);
        }
    });

    selects.forEach(function (s) {

        const current = s.value;

        Array.from(s.options).forEach(function (option) {

            if (option.value === "") {
                option.disabled = false;
                return;
            }

            option.disabled =
                used.includes(option.value) &&
                option.value !== current;
        });
    });
}

function buildOutput() {

    const results = [];

    selects.forEach(function (select, index) {

        results.push({
            topic: topics[index].title,
            rank: select.value
        });

    });

    return JSON.stringify(results);
}

function sendLiveData() {

    if (typeof JFCustomWidget !== "undefined") {

        JFCustomWidget.sendData({
            value: buildOutput()
        });

    }
}

if (typeof JFCustomWidget !== "undefined") {

    JFCustomWidget.subscribe("ready", function () {
        sendLiveData();
    });

    JFCustomWidget.subscribe("submit", function () {

        const incomplete = Array.from(selects).some(
            select => select.value === ""
        );

        if (incomplete) {

            document.getElementById("error").innerHTML =
                "Please rank all issue areas before continuing.";

            JFCustomWidget.sendSubmit({
                valid: false,
                value: ""
            });

            return;
        }

        document.getElementById("error").innerHTML = "";

        JFCustomWidget.sendSubmit({
            valid: true,
            value: buildOutput()
        });

    });

}
