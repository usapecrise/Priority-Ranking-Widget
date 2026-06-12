const container = document.getElementById("rankingContainer");

container.innerHTML = `
    <div class="ranking-item">
        <div class="topic-title">
            Test Topic
        </div>

        <div class="rank-row">
            <span class="rank-label">Rank:</span>

            <select class="rank-select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        </div>
    </div>
`;
