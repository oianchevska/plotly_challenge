
var barColors1 = ["#5899DA", "#E8743B", "#19A979", "#ED4A7B", "#945ECF", "#13A4B4", "#525DF4", "#BF399E", "#4dc3ff", "#EE6868"];
var gaugeColors = ["#5899DA", "#E8743B", "#19A979", "#ED4A7B", "#945ECF", "#13A4B4", "#525DF4", "#BF399E", "#4dc3ff","rgba(255, 255, 255, 0)"]


function build() {

    console.log("build");
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");

    // filtering subject id
    d3.json("static/js/samples.json").then(function (data) {

        var metadata=data.metadata.filter(function (rec) {
                return rec.id==dataset;
        });

        console.log(metadata)

        var samplesData=data.samples.filter(function (rec) {
            return rec.id==dataset;
        });

        console.log(samplesData)

        buidMetadata(metadata[0]);
        buidBar(samplesData[0]);
        buidСhart(samplesData[0]);
        buidGauge(metadata[0])

    });

};

function buidBar(samplesData) {

    var id=samplesData.id;
    var otu_ids=samplesData.otu_ids;
    var otu_labels=samplesData.otu_labels;
    var sample_values=samplesData.sample_values;

    var otuStr=otu_ids.map(a => 'OTU '.concat(a));

    var trace= { x: sample_values.slice(0,10).reverse(),
                 y: otuStr.slice(0,10).reverse(),
                  text:otu_labels,
                  marker: {
                 color: barColors1,
                 line: {
                            color: 'rgb(10, 0, 7)',
                            width: 1
                        }},
                    type: "bar",
                    orientation: "h"
                };

                var layout = {
                  title: '<b>Belly Button Biodiversity</b>',
                };

                var data = [trace]

                Plotly.newPlot("bar", data,layout);

};

function buidСhart(samplesData) {


    var id=samplesData.id;
    var otu_ids=samplesData.otu_ids;
    var otu_labels=samplesData.otu_labels;
    var sample_values=samplesData.sample_values;


    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: barColors1,
            size: sample_values,
            line: {
                color: 'rgb(10, 0, 7)',
                width: 1
            }
        },
    };
    var data = [trace1];

    var layout = {
        title: '<b>Belly Button Bubble Chart</b>',
        showlegend: false,
        height: 600,
        width: 1200
    };

    Plotly.newPlot("bubble", data,layout)

};


function buidMetadata(metadata) {


    var metaTable = d3.select("#sample-metadata");
    metaTable.selectAll("tr").remove();

    Object.entries(metadata).forEach(function ([key,value]) {
       tr = metaTable.append("tr");
       tr.append("td").text(key);
       tr.append("td").text(value);
    });



};

function buidGauge(metadata) {


    if (metadata.wfreq==null) {
        metadata.wfreq=0
    };

        var level = parseFloat(metadata.wfreq) * 20;

        var degrees = 180 - level;
        var radius = 0.5;
        var radians = (degrees * Math.PI) / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);


        var mainPath = "M -.0 -0.05 L .0 0.05 L ";
        var pathX = String(x);
        var space = " ";
        var pathY = String(y);
        var pathEnd = " Z";
        var path = mainPath.concat(pathX, space, pathY, pathEnd);

        var data = [
            {
                type: "scatter",
                x: [0],
                y: [0],
                marker: { size: 12, color: "850000" },
                showlegend: false,
                name: "Freq",
                text: level,
                hoverinfo: "text+name"
            },
            {
                values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
                rotation: 90,
                text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
                textinfo: "text",
                textposition: "inside",
                marker: {
                     colors: gaugeColors
                },
                labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
                hoverinfo: "label",
                hole: 0.5,
                type: "pie",
                showlegend: false
            }
        ];

        var layout = {
            shapes: [
                {
                    type: "path",
                    path: path,
                    fillcolor: "850000",
                    line: {
                        color: "850000"
                    }
                }
            ],
            title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
            height: 550,
            width: 420,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            }
        };


        Plotly.newPlot('gauge', data, layout);

};

function init () {

    console.log("init");
    d3.json("static/js/samples.json").then(function (data) {
        var names = data.names;
        var dropdownMenu = d3.select("#selDataset");

        console.log(names);
        names.forEach(function (name) {
            dropdownMenu.append("option").property("value", name).text(name);
        });

        build();

    });
};


//event action
d3.selectAll("#selDataset").on("change", dataSubmit);

//update
function dataSubmit() {
    console.log("update");
    build();
};


init();

