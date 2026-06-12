let topics = [];

let selects = [];

function getTopics() {

```
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
```

}

function buildCards() {

```
const container =
    document.getElementById("rankingContainer");

container.innerHTML = "";

topics.forEach(topic => {

    let options =
        '<option value="">Select</option>';

    for (let i = 1; i <= topics.length; i++) {

        options += `
            <option value="${i}">
                ${i}
            </option>
        `;
    }

    const card =
        document.createElement("div");

    card.className =
        "ranking-item";

    card.innerHTML = `

        <div class="topic-title">

            ${topic.title}

            <span class="tooltip">

                ⓘ

                <span class="tooltip-text">
                    ${topic.description}
                </span>

            </span>

        </div>

        <div class="rank-row">

            <span class="rank-label">
                Rank
            </span>

            <select class="rank-select">
                ${options}
            </select>

        </div>

    `;

    container.appendChild(card);
});

selects =
    document.querySelectorAll(".rank-select");

selects.forEach(select => {

    select.addEventListener(
        "change",
        updateOptions
    );

});
```

}

function updateOptions() {

```
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
```

}

function isComplete() {

```
return [...selects].every(
    select => select.value !== ""
);
```

}

function buildOutput() {

```
return topics.map((topic, index) => {

    return {
        topic: topic.title,
        rank: selects[index].value
    };

});
```

}

function sendLiveData() {

```
if (!isComplete()) {
    return;
}

const output =
    JSON.stringify(buildOutput());

if (
    typeof JFCustomWidget !== "undefined"
) {

    JFCustomWidget.sendData({
        value: output
    });

}
```

}

if (
typeof JFCustomWidget !== "undefined"
) {

```
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
```

}

topics = getTopics();

buildCards();
