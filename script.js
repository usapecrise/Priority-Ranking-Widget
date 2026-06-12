const selects = document.querySelectorAll(".rank-select");

function updateDropdowns() {

    // Get selected values
    const selectedValues = [];

    selects.forEach(select => {
        if (select.value !== "") {
            selectedValues.push(select.value);
        }
    });

    // Update every dropdown
    selects.forEach(currentSelect => {

        const currentValue = currentSelect.value;

        currentSelect.querySelectorAll("option").forEach(option => {

            if (option.value === "") {
                option.disabled = false;
                return;
            }

            option.disabled = false;

            if (
                selectedValues.includes(option.value) &&
                option.value !== currentValue
            ) {
                option.disabled = true;
            }
        });
    });
}

selects.forEach(select => {
    select.addEventListener("change", updateDropdowns);
});
