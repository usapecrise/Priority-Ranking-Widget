const dropdowns = document.querySelectorAll(".ranking");
const error = document.getElementById("error");

function updateOptions() {

    const usedRanks = [];

    dropdowns.forEach(select => {
        if (select.value !== "") {
            usedRanks.push(select.value);
        }
    });

    dropdowns.forEach(select => {

        const currentValue = select.value;

        select.querySelectorAll("option").forEach(option => {

            if (option.value === "") {
                option.disabled = false;
                return;
            }

            option.disabled = false;

            if (
                usedRanks.includes(option.value) &&
                option.value !== currentValue
            ) {
                option.disabled = true;
            }
        });
    });

    validate();
}

function validate() {

    let count = 0;

    dropdowns.forEach(select => {
        if (select.value !== "") {
            count++;
        }
    });

    if (count < 4) {
        error.innerHTML =
            "Please assign a unique ranking from 1–4 to each topic.";
        return false;
    }

    error.innerHTML = "";
    return true;
}

dropdowns.forEach(select => {
    select.addEventListener("change", updateOptions);
});

updateOptions();
