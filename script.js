const container = document.getElementById("rankingContainer");

const card = document.createElement("div");

card.className = "ranking-item";

card.innerHTML =
    '<div class="topic-title">Grid Readiness & Power Infrastructure</div>' +
    '<div class="rank-row">' +
    '<span class="rank-label">Rank:</span>' +
    '<select class="rank-select">' +
    '<option>1</option>' +
    '<option>2</option>' +
    '<option>3</option>' +
    '<option>4</option>' +
    '</select>' +
    '</div>';

container.appendChild(card);
