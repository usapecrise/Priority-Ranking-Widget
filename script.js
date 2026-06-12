let topics = [];
let selects = [];

function getTopics() {

    try {

        const settings =
            JFCustomWidget.getWidgetSettings();

        if (settings && settings.topics) {

            if (Array.isArray(settings.topics)) {
                return settings.topics;
            }

            return JSON.parse(settings.topics);
        }

    } catch (e) {
        console.log(e);
    }

return [

{
    title: "Grid Readiness & Power Infrastructure",
    description:
    "Planning for high-density AI electricity demand through grid modernization, transmission expansion, and flexible generation."
},

{
    title: "Regulatory Frameworks & Permitting",
    description:
    "Regulatory certainty, interconnection processes, permitting timelines, and energy market structures needed to support AI infrastructure deployment."
},

{
    title: "Emerging Energy Technologies",
    description:
    "Advanced cooling systems, energy storage, distributed energy resources, and AI-enabled energy management solutions."
},

{
    title: "System-Level Impacts",
    description:
    "Water resources, workforce development, community impacts, land-use considerations, and natural gas infrastructure requirements."
}

];
}

function buildTable() {

    const tableBody =
        document.getElementById("tableBody");

    tableBody.innerHTML = "";

    topics.forEach((topic) => {

        let options =
            '<option value="">-</option>';

        for (let i = 1; i <= topics.length; i++) {

            options += `
                <option value="${i}">
                    ${i}
                </option>
            `;
        }

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td class="topic-cell">

    <span class="topic-title">
        ${topic.title}
    </span>

    <span class="tooltip">
        ⓘ

        <span class="tooltip-text">
            ${topic.description}
        </span>
    </span>

</td>
            <td class="rank-cell">

                <select class="rank-select">
                    ${options}
                </select>

            </td>
        `;

        tableBody.appendChild(row);
    });

    selects =
        document.querySelectorAll(".rank-select");

    selects.forEach(select => {

        select.addEventListener(
            "change",
            updateOptions
        );

    });
}

function updateOptions() {

    const usedRanks = [];

    selects.forEach(select => {

        if (select.value !== "") {
            usedRanks.push(select.value);
        }

    });

    selects.forEach(currentSelect => {

        const currentValue =
            currentSelect.value;

        currentSelect
            .querySelectorAll("option")
            .forEach(option => {

                if (option.value === "") {
                    option.disabled = false;
                    return;
                }

                option.disabled = false;

                if (
                    usedRanks.includes(option.value)
                    &&
                    option.value !== currentValue
                ) {
                    option.disabled = true;
                }

            });

    });

    sendLiveData();
}

function isComplete() {

    return [...selects].every(
        select => select.value !== ""
    );
}

function buildOutput() {

    return topics.map((topic, index) => {

        return {
            topic: topic,
            rank: selects[index].value
        };

    });
}

function sendLiveData() {

    if (!isComplete()) {
        return;
    }

    const output =
        JSON.stringify(buildOutput());

    JFCustomWidget.sendData({
        value: output
    });
}

JFCustomWidget.subscribe(
    "submit",
    function () {

        const error =
            document.getElementById("error");

        if (!isComplete()) {

            error.innerHTML =
                "Please rank all items before continuing.";

            JFCustomWidget.sendSubmit({
                valid: false
            });

            return;
        }

        error.innerHTML = "";

        JFCustomWidget.sendSubmit(
            JSON.stringify(
                buildOutput()
            )
        );
    }
);

topics = getTopics();

buildTable();
