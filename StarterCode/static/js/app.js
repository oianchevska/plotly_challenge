
var barColors = ["#5899DA", "#E8743B", "#19A979", "#ED4A7B", "#945ECF", "#13A4B4", "#525DF4", "#BF399E", "#6C8893", "#EE6868"];
var col = ["#FF33F6","#3D0C3A","#320C3D","#290C3D","#1C0C3D","#370C3D","#CF24A3","#AE5497","#CE1B5A","#990439","#F5B041","#7D3C98","#138D75"]

function build() {

    console.log("build")

    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    console.log(dataset);

    d3.json("static/js/samples.json").then(function (data) {

        var metadata=data.metadata.filter(function (rec) {
                return rec.id==dataset;
        });

        var samplesData=data.samples.filter(function (rec) {
            return rec.id==dataset;
        });

        console.log(metadata);
        buidMetadata(metadata[0]);
        buidBar(samplesData[0]);
        buidСhart(samplesData[0]);
        buidGauge(metadata[0])

    });

    // 1--get id from dropdown
    // 2--filter data by this id
    // 3--fill all form
};

function buidBar(samplesData) {

    //var barChart = d3.select("#bar");
    // metaTable.selectAll("").remove();

    console.log(samplesData);

    var id=samplesData.id;
    var otu_ids=samplesData.otu_ids;
    var otu_labels=samplesData.otu_labels;
    var sample_values=samplesData.sample_values;
    console.log(otu_ids);

    var otuStr=otu_ids.map(a => 'OTU '.concat(a));
    // var sample_values_sorted=sample_values.sort(function (a,b)  {
    //     return b-a
    //     });

    var trace= { x: sample_values.slice(0,10).reverse(),
                 y: otuStr.slice(0,10).reverse(),
                  text:otu_labels,
                  marker: {
                 color: barColors,
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

    //var bubbleChart = d3.select("#bubble");
    // metaTable.selectAll("").remove();

    console.log(samplesData);

    var id=samplesData.id;
    var otu_ids=samplesData.otu_ids;
    var otu_labels=samplesData.otu_labels;
    var sample_values=samplesData.sample_values;
    console.log(otu_ids);

    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: barColors,
            size: sample_values,
            line: {
                color: 'rgb(10, 0, 7)',
                width: 1
            }
        },
    };
    var data = [trace1];

    var layout = {
        title: 'Bubble Chart Hover Text',
        showlegend: false,
        height: 800,
        width: 1400
    };

    Plotly.newPlot("bubble", data,layout)

};


function buidMetadata(metadata) {

    // console.log("Metadata");

    var metaTable = d3.select("#sample-metadata");
    metaTable.selectAll("h6").remove();

    Object.entries(metadata).forEach(function ([key,value]) {

        metaTable.append("h6").text(key+":"+value);
    });



};

function buidGauge(metadata) {

    console.log("Gauge")

    if (metadata.wfreq==null) {
        metadata.wfreq=0
    };
        // Enter the washing frequency between 0 and 180
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
                    colors: [
                        "rgba(0, 105, 11, .5)",
                        "rgba(10, 120, 22, .5)",
                        "rgba(14, 127, 0, .5)",
                        "rgba(110, 154, 22, .5)",
                        "rgba(170, 202, 42, .5)",
                        "rgba(202, 209, 95, .5)",
                        "rgba(210, 206, 145, .5)",
                        "rgba(232, 226, 202, .5)",
                        "rgba(240, 230, 215, .5)",
                        "rgba(255, 255, 255, 0)"
                    ]
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
            height: 500,
            width: 500,
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

        names.forEach(function (name) {
            dropdownMenu.append("option").property("value", name).text(name);
        });

        build();

    });
};


        //  var id=samples.id;
        //  var otu_ids=samples.otu_ids;
        //  var otu_labels=samples.otu_labels;
        //  var sample_values=samples.sample_values;
        //
        //  var otuStr=otu_ids.map(a => 'OTU '.concat(a));
        //  console.log(otuStr);

         // var sample_values_sorted=sample_values.sort(function (a,b)  {
         //     return b-a
         // })

 //         var trace= { x: sample_values.slice(0,10).reverse(),
 //             y: otuStr.slice(0,10).reverse(),
 //             text:otu_labels,
 //             marker: {
 //                 color: 'rgb(158,202,225)',
 //                 line: {
 //                     color: barColors,
 //                     width: 5
 //                 }},
 //             type: "bar",
 //             orientation: "h"
 //         };
 //
 //         var layout = {
 //             title: '<b>Belly Button Biodiversity</b>',
 //         };
 //
 //         var data = [trace]
 //
 //         Plotly.newPlot("plot", data,layout);
 //
 //
 //     });
 // };


// On change to the DOM, call getData()

d3.selectAll("#selDataset").on("change", dataSubmit);

function dataSubmit() {
    console.log("dataSubmit")
    build();
};


init();

