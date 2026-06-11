```javascript
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

            if (target.id !== 'pool') {

                const cards = target.querySelectorAll('.issue');

                if (cards.length > 1) {

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

    updateSlotState('rank1');
    updateSlotState('rank2');
    updateSlotState('rank3');
    updateSlotState('rank4');

    document.getElementById('summary').innerHTML = `
        <div>1. ${ranking.rank1 || '—'}</div>
        <div>2. ${ranking.rank2 || '—'}</div>
        <div>3. ${ranking.rank3 || '—'}</div>
        <div>4. ${ranking.rank4 || '—'}</div>
    `;

    const complete =
        ranking.rank1 &&
        ranking.rank2 &&
        ranking.rank3 &&
        ranking.rank4;

    const btn = document.getElementById('submitBtn');

    if (complete) {
        btn.disabled = false;
        btn.classList.add('ready');
    } else {
        btn.disabled = true;
        btn.classList.remove('ready');
    }

    console.log(ranking);

    // Future Jotform integration
    // JFCustomWidget.sendData(JSON.stringify(ranking));
}

function getRankValue(id) {

    const slot = document.getElementById(id);

    const card = slot.querySelector('.issue');

    return card ? card.textContent.trim() : '';
}

function updateSlotState(id) {

    const slot = document.getElementById(id);

    const card = slot.querySelector('.issue');

    const placeholder = slot.querySelector('.placeholder');

    if (card) {

        slot.classList.add('filled');

        if (placeholder) {
            placeholder.style.display = 'none';
        }

    } else {

        slot.classList.remove('filled');

        if (placeholder) {
            placeholder.style.display = 'block';
        }
    }
}

// Initialize page state
updateRanking();
```
