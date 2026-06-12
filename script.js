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
