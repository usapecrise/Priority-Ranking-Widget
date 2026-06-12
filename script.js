const topics = [
    "Grid Readiness & Power Infrastructure",
    "Regulatory Frameworks & Permitting",
    "Emerging Energy Technologies",
    "Other System-Level Impacts"
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

            '<select class="rank-select">' +
            options +
            '</select>' +

        '</div>';

    container.appendChild(card);

}

const selects =
    document.querySelectorAll(".rank-select");

selects.forEach(function(select){

    select.addEventListener("change", function(){

        const used = [];

        selects.forEach(function(s){

            if(s.value !== ""){
                used.push(s.value);
            }

        });

        selects.forEach(function(s){

            const current =
                s.value;

            const options =
                s.options;

            for(let i = 0; i < options.length; i++){

                const option =
                    options[i];

                if(option.value === ""){
                    option.disabled = false;
                    continue;
                }

                option.disabled = false;

                if(
                    used.includes(option.value) &&
                    option.value !== current
                ){
                    option.disabled = true;
                }

            }

        });

    });

});
