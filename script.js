const containers = [
    document.getElementById("pool"),
    document.getElementById("rank1"),
    document.getElementById("rank2"),
    document.getElementById("rank3"),
    document.getElementById("rank4")
];

// Initialize Sortable on every container
containers.forEach(container => {

    new Sortable(container, {
        group: "shared",
        animation: 150,

        onEnd: function () {
            updateRanking();
        }
    });

});

function getCardText(slotId) {

    const slot = document.getElementById(slotId);

    const card = slot.querySelector(".issue");

    return card ? card.textContent.trim() : "";
}

function updateRanking() {

    const ranking = {
        rank1: getCardText("rank1"),
        rank2: getCardText("rank2"),
        rank3: getCardText("rank3"),
        rank4: getCardText("rank4")
    };

    // Update summary
    document.getElementById("summary").innerHTML = `
        <div>1. ${ranking.rank1 || "—"}</div>
        <div>2. ${ranking.rank2 || "—"}</div>
        <div>3. ${ranking.rank3 || "—"}</div>
        <div>4. ${ranking.rank4 || "—"}</div>
    `;

    // Check completion
    const complete =
        ranking.rank1 &&
        ranking.rank2 &&
        ranking.rank3 &&
        ranking.rank4;

    const btn = document.getElementById("submitBtn");

    if (complete) {
        btn.disabled = false;
        btn.classList.add("ready");
    } else {
        btn.disabled = true;
        btn.classList.remove("ready");
    }

    console.log(ranking);
}

// Run once on page load
updateRanking();
