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
        title: "Other System-Level Impacts",
        description: "Effects of AI-driven infrastructure growth on water resources, communities, workforce, land-use dynamics, and supporting fuel infrastructure."
    }
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

    '<div class="topic-row">' +

        '<div class="topic-title">' +
            topics[t].title +
        '</div>' +

        '<select class="rank-select">' +
            options +
        '</select>' +

    '</div>' +

    '<div class="topic-description">' +
        topics[t].description +
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

function buildOutput() {

    const results = [];

    selects.forEach(function(select, index){

        results.push({
            topic: topics[index].title,
            rank: select.value
        });

    });

    return JSON.stringify(results);
}

if(typeof JFCustomWidget !== "undefined") {

    JFCustomWidget.subscribe(
        "submit",
        function() {

            let complete = true;

            selects.forEach(function(select){

                if(select.value === "") {
                    complete = false;
                }

            });

            if(!complete){

                document.getElementById("error").innerHTML =
                    "Please rank all issue areas before continuing.";

                JFCustomWidget.sendSubmit({
                    valid:false
                });

                return;
            }

            document.getElementById("error").innerHTML = "";

            JFCustomWidget.sendSubmit(
                buildOutput()
            );

        }
    );

}
            

            

        });

    });

});
