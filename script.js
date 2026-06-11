new Sortable(document.getElementById("ranking-list"), {
    animation: 150
});

document.getElementById("saveBtn").addEventListener("click", function () {

    const items = document.querySelectorAll("#ranking-list li");

    let ranking = [];

    items.forEach((item, index) => {
        ranking.push((index + 1) + ". " + item.innerText);
    });

    JFCustomWidget.sendSubmit({
        value: ranking.join(" | ")
    });
});
