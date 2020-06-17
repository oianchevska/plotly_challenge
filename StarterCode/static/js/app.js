
var barColors = ["#5899DA", "#E8743B", "#19A979", "#ED4A7B", "#945ECF", "#13A4B4", "#525DF4", "#BF399E", "#6C8893", "#EE6868"];
//var barColors = ["#FF33F6","#3D0C3A","#320C3D","#290C3D","#1C0C3D","#370C3D","#CF24A3","#AE5497","#CE1B5A","#990439"]

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


    });

    // 1--get id from dropdown
    // 2--filter data by this id
    // 3--fill all form
};

function buidBar(samplesData) {

    var barChart = d3.select("#bar");
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
                 color: 'rgb(158,202,225)',
                 line: {
                            color: barColors,
                            width: 5
                        }},
                    type: "bar",
                    orientation: "h"
                };

                var layout = {
                  title: '<b>Belly Button Biodiversity</b>',
                };

                var data = [trace]

                Plotly.newPlot("plot", data,layout);

};

function buidСhart() {

    console.log("Chart")

};


function buidMetadata(metadata) {

    // console.log("Metadata");

    var metaTable = d3.select("#sample-metadata");
    metaTable.selectAll("h6").remove();

    Object.entries(metadata).forEach(function ([key,value]) {

        metaTable.append("h6").text(key+":"+value);
    });



};

function buidGauge() {

    console.log("Gauge")

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

