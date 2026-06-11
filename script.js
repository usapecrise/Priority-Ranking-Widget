const pool = document.getElementById('pool');

const containers = [
    pool,
    document.getElementById('rank1'),
    document.getElementById('rank2'),
    document.getElementById('rank3'),
    document.getElementById('rank4')
];

containers.forEach(el => {

    new Sortable(el, {
        group: 'shared',
        animation: 150,

        onAdd: function(evt) {

            const target = evt.to;

            // Only enforce single-card rule on ranking slots
            if (target.id !== 'pool') {

                const cards = target.querySelectorAll('.issue');

                if (cards.length > 1) {

                    // Move all but newest card back to pool
                    for (let i = 0; i < cards.length - 1; i++) {
                        pool.appendChild(cards[i]);
                    }
                }
            }

            updateRanking();
        },

        onRemove: updateRanking,
        onSort: updateRanking
    });
});

function updateRanking() {

    const ranking = {
        rank1: getRankValue('rank1'),
        rank2: getRankValue('rank2'),
        rank3: getRankValue('rank3'),
        rank4: getRankValue('rank4')
    };

    console.log(ranking);

    // Future Jotform integration:
    // JFCustomWidget.sendData(JSON.stringify(ranking));
}

function getRankValue(id) {

    const slot = document.getElementById(id);

    const card = slot.querySelector('.issue');

    return card ? card.textContent.trim() : '';
}
