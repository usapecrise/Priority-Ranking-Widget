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
        title: "System-Level Impacts",
        description: "Water resources, workforce development, community impacts, land-use considerations, and natural gas infrastructure requirements."
    }
];

const container =
    document.getElementById("rankingContainer");

topics.forEach(topic => {

    const card =
        document.createElement("div");

    card.className = "ranking-item";

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
                Rank:
            </span>

            <select class="rank-select">
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

        </div>
    `;

    container.appendChild(card);

});
