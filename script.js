const topics = [
    "Grid Readiness & Power Infrastructure",
    "Regulatory Frameworks & Permitting",
    "Emerging Energy Technologies",
    "System-Level Impacts"
];

const container =
    document.getElementById("rankingContainer");

for(let t = 0; t < topics.length; t++) {

    const card =
        document.createElement("div");

    card.className =
        "ranking-item";

    let options =
        '<option value="">Select</option>';

    for(let i = 1; i <= topics.length; i++) {

        options +=
            '<option value="' + i + '">' +
            i +
            '</option>';

    }

    card.innerHTML =
        '<div class="topic-title">' +
        topics[t] +
        '</div>' +

        '<div class="rank-row">' +

            '<span class="rank-label">' +
            'Rank:' +
            '</span>' +

            '<select class="rank-select">' +
            options +
            '</select>' +

        '</div>';

    container.appendChild(card);

}

const selects =
    document.querySelectorAll(".rank-select");

selects.forEach(function(select){

    select.addEventListener(
        "change",
        updateOptions
    );

});

function updateOptions() {

    const usedRanks = [];

    selects.forEach(function(select){

        if(select.value !== "") {

            usedRanks.push(
                select.value
            );

        }

    });

    selects.forEach(function(currentSelect){

        const currentValue =
            currentSelect.value;

        const options =
            currentSelect.querySelectorAll("option");

        options.forEach(function(option){

            if(option.value === "") {

                option.disabled = false;
                return;

            }

            option.disabled = false;

            if(
                usedRanks.includes(option.value) &&
                option.value !== currentValue
            ) {

                option.disabled = true;

            }

        });

    });

}
