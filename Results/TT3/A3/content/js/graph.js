/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[5500.0, 1.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[12700.0, 1.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[52000.0, 1.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[34700.0, 1.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[53900.0, 1.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[49600.0, 1.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[324700.0, 1.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[43100.0, 1.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[43200.0, 1.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[22800.0, 1.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[339400.0, 1.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[7000.0, 1.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[42400.0, 1.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[57400.0, 1.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[65200.0, 1.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[45800.0, 1.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[9500.0, 1.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[11300.0, 1.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[53900.0, 1.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[21500.0, 1.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[14400.0, 1.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[69500.0, 1.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[7400.0, 1.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[28700.0, 1.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[7200.0, 1.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[26500.0, 1.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[13200.0, 1.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[38100.0, 1.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[61800.0, 1.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[17900.0, 1.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[85500.0, 1.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[57000.0, 1.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[11200.0, 1.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[31000.0, 1.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[254500.0, 1.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[49600.0, 1.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[18300.0, 1.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[41600.0, 1.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[18400.0, 1.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[5800.0, 1.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[76300.0, 1.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[49700.0, 1.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[10800.0, 1.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[5400.0, 1.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[84100.0, 1.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[11500.0, 1.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[20600.0, 1.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[28200.0, 1.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[8100.0, 1.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[434100.0, 1.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[45900.0, 1.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[9200.0, 1.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[19400.0, 1.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[27800.0, 1.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[426000.0, 1.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[75800.0, 1.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[19600.0, 1.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[7700.0, 1.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[9700.0, 1.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[84800.0, 1.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[35500.0, 1.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[57600.0, 1.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[5400.0, 1.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[31700.0, 1.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[8100.0, 1.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[77700.0, 1.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[23400.0, 1.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[47100.0, 1.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[8300.0, 1.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[82500.0, 1.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[365100.0, 1.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[5100.0, 1.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[88200.0, 1.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[51700.0, 1.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[9300.0, 1.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[44400.0, 1.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[19000.0, 1.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[8900.0, 1.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[148500.0, 1.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[131700.0, 1.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[35900.0, 1.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[9800.0, 1.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[10600.0, 1.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[5000.0, 1.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[60200.0, 1.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[16100.0, 1.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[9200.0, 1.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[41100.0, 1.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[523600.0, 1.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[34300.0, 1.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[38100.0, 1.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[10000.0, 1.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[11900.0, 1.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[10400.0, 1.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[45500.0, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[71100.0, 1.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[59400.0, 1.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[15000.0, 1.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[52900.0, 1.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[18400.0, 1.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[84700.0, 1.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[21200.0, 1.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[44500.0, 1.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[30000.0, 1.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[101200.0, 1.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[9500.0, 1.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[226100.0, 1.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[11300.0, 1.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[55100.0, 1.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[13500.0, 1.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[66600.0, 1.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[5900.0, 1.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[91100.0, 1.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[33500.0, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[22800.0, 1.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[95400.0, 1.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[149400.0, 1.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[30700.0, 1.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[44000.0, 1.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[20000.0, 1.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[3500.0, 1.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[28100.0, 1.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[25700.0, 1.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[5700.0, 1.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[14800.0, 1.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[32000.0, 1.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[34100.0, 1.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[8300.0, 1.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[24600.0, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[18300.0, 1.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[55600.0, 1.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[15700.0, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[38800.0, 1.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[11500.0, 1.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[5900.0, 1.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[38200.0, 1.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[6800.0, 1.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[4700.0, 1.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[12500.0, 1.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[37600.0, 1.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[25500.0, 1.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[20100.0, 1.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[3400.0, 1.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[36600.0, 1.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[6000.0, 1.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[20400.0, 1.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[39600.0, 1.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[43400.0, 1.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[9700.0, 1.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[13200.0, 1.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[56300.0, 1.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[6000.0, 1.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[37100.0, 1.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[39600.0, 1.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[52200.0, 1.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[20600.0, 1.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[11700.0, 1.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[75000.0, 1.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[8000.0, 1.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[16400.0, 1.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[14400.0, 1.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[65300.0, 1.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[19700.0, 1.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[50100.0, 1.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[295500.0, 1.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[97100.0, 1.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[27900.0, 1.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[93200.0, 1.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[3500.0, 1.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[10500.0, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[3500.0, 1.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[81600.0, 1.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[14000.0, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[6200.0, 1.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[551000.0, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 551000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 198.0, "series": [{"data": [[0.0, 2.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 2.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 198.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.69221672E12, "maxY": 1.0, "series": [{"data": [[1.6922172E12, 1.0], [1.69221768E12, 1.0], [1.69221702E12, 1.0], [1.69221774E12, 1.0], [1.69221678E12, 1.0], [1.69221714E12, 1.0], [1.69221762E12, 1.0], [1.6922169E12, 1.0], [1.69221672E12, 1.0]], "isOverall": false, "label": "G7", "isController": false}, {"data": [[1.6922172E12, 1.0], [1.69221738E12, 1.0], [1.69221684E12, 1.0], [1.69221726E12, 1.0], [1.69221696E12, 1.0], [1.69221714E12, 1.0], [1.69221708E12, 1.0], [1.69221732E12, 1.0], [1.69221672E12, 1.0]], "isOverall": false, "label": "G8", "isController": false}, {"data": [[1.69221702E12, 1.0], [1.69221738E12, 1.0], [1.69221684E12, 1.0], [1.69221696E12, 1.0], [1.69221744E12, 1.0], [1.69221678E12, 1.0], [1.69221714E12, 1.0], [1.6922169E12, 1.0], [1.6922175E12, 1.0]], "isOverall": false, "label": "G9", "isController": false}, {"data": [[1.69221738E12, 1.0], [1.69221684E12, 1.0], [1.69221726E12, 1.0], [1.69221696E12, 1.0], [1.69221744E12, 1.0], [1.69221678E12, 1.0], [1.69221732E12, 1.0], [1.6922169E12, 1.0], [1.6922175E12, 1.0], [1.69221672E12, 1.0]], "isOverall": false, "label": "T14", "isController": false}, {"data": [[1.6922172E12, 1.0], [1.69221702E12, 1.0], [1.69221684E12, 1.0], [1.69221756E12, 1.0], [1.69221678E12, 1.0], [1.69221714E12, 1.0], [1.69221762E12, 1.0], [1.69221708E12, 1.0], [1.6922169E12, 1.0], [1.69221672E12, 1.0]], "isOverall": false, "label": "G10", "isController": false}, {"data": [[1.6922172E12, 1.0], [1.69221738E12, 1.0], [1.69221786E12, 1.0], [1.69221684E12, 1.0], [1.69221726E12, 1.0], [1.69221792E12, 1.0], [1.69221678E12, 1.0], [1.69221732E12, 1.0], [1.69221672E12, 1.0]], "isOverall": false, "label": "T16", "isController": false}, {"data": [[1.6922172E12, 1.0], [1.69221702E12, 1.0], [1.69221756E12, 1.0], [1.69221696E12, 1.0], [1.69221678E12, 1.0], [1.69221714E12, 1.0], [1.69221708E12, 1.0], [1.6922169E12, 1.0], [1.6922175E12, 1.0]], "isOverall": false, "label": "T15", "isController": false}, {"data": [[1.6922172E12, 1.0], [1.69221738E12, 1.0], [1.69221684E12, 1.0], [1.69221726E12, 1.0], [1.69221696E12, 1.0], [1.69221744E12, 1.0], [1.69221792E12, 1.0], [1.69221714E12, 1.0], [1.69221732E12, 1.0], [1.6922169E12, 1.0]], "isOverall": false, "label": "T17", "isController": false}, {"data": [[1.69221768E12, 1.0], [1.69221702E12, 1.0], [1.69221684E12, 1.0], [1.69221756E12, 1.0], [1.69221774E12, 1.0], [1.69221696E12, 1.0], [1.69221678E12, 1.0], [1.69221762E12, 1.0]], "isOverall": false, "label": "T1", "isController": false}, {"data": [[1.6922172E12, 1.0], [1.69221702E12, 1.0], [1.69221684E12, 1.0], [1.69221756E12, 1.0], [1.69221696E12, 1.0], [1.69221678E12, 1.0], [1.69221714E12, 1.0], [1.69221708E12, 1.0], [1.6922169E12, 1.0]], "isOverall": false, "label": "G6", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221792E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.0, "maxY": 551058.0, "series": [{"data": [[10.0, 5507.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[10.0, 5507.0]], "isOverall": false, "label": "G6 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 12741.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[10.0, 12741.0]], "isOverall": false, "label": "G6 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 52070.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[10.0, 52070.0]], "isOverall": false, "label": "G6 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 34787.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[10.0, 34787.0]], "isOverall": false, "label": "G6 - Q13-Aggregated", "isController": false}, {"data": [[2.0, 2288.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[2.0, 2288.0]], "isOverall": false, "label": "T16 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 53999.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[10.0, 53999.0]], "isOverall": false, "label": "T16 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 49655.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[10.0, 49655.0]], "isOverall": false, "label": "G6 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 324724.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[10.0, 324724.0]], "isOverall": false, "label": "T16 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 43194.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[10.0, 43194.0]], "isOverall": false, "label": "T17 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 43280.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[10.0, 43280.0]], "isOverall": false, "label": "T16 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 22848.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[10.0, 22848.0]], "isOverall": false, "label": "T17 - Q7-Aggregated", "isController": false}, {"data": [[6.0, 339499.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[6.0, 339499.0]], "isOverall": false, "label": "G6 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 7006.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[10.0, 7006.0]], "isOverall": false, "label": "G6 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 42438.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[10.0, 42438.0]], "isOverall": false, "label": "T16 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 3078.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[10.0, 3078.0]], "isOverall": false, "label": "T17 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 57497.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[10.0, 57497.0]], "isOverall": false, "label": "T16 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 65288.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[10.0, 65288.0]], "isOverall": false, "label": "T17 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 45870.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[10.0, 45870.0]], "isOverall": false, "label": "G6 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 9575.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[10.0, 9575.0]], "isOverall": false, "label": "T17 - Q2-Aggregated", "isController": false}, {"data": [[1.0, 11398.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[1.0, 11398.0]], "isOverall": false, "label": "T16 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 53964.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[10.0, 53964.0]], "isOverall": false, "label": "G6 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 21595.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[10.0, 21595.0]], "isOverall": false, "label": "T17 - Q3-Aggregated", "isController": false}, {"data": [[1.0, 14406.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[1.0, 14406.0]], "isOverall": false, "label": "T16 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 69539.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[10.0, 69539.0]], "isOverall": false, "label": "T17 - Q1-Aggregated", "isController": false}, {"data": [[1.0, 2152.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[1.0, 2152.0]], "isOverall": false, "label": "T16 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 7436.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[10.0, 7436.0]], "isOverall": false, "label": "T16 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 28769.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[10.0, 28769.0]], "isOverall": false, "label": "T16 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 7216.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[10.0, 7216.0]], "isOverall": false, "label": "T15 - Q2-Aggregated", "isController": false}, {"data": [[7.0, 26534.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[7.0, 26534.0]], "isOverall": false, "label": "T15 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 13267.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[10.0, 13267.0]], "isOverall": false, "label": "T15 - Q3-Aggregated", "isController": false}, {"data": [[9.0, 38192.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[9.0, 38192.0]], "isOverall": false, "label": "T15 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 61891.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[10.0, 61891.0]], "isOverall": false, "label": "T15 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 17961.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[10.0, 17961.0]], "isOverall": false, "label": "T15 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 85572.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[10.0, 85572.0]], "isOverall": false, "label": "T15 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 57018.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[10.0, 57018.0]], "isOverall": false, "label": "T15 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 11244.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[10.0, 11244.0]], "isOverall": false, "label": "T15 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 31000.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[10.0, 31000.0]], "isOverall": false, "label": "T15 - Q1-Aggregated", "isController": false}, {"data": [[9.0, 254544.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[9.0, 254544.0]], "isOverall": false, "label": "T15 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 2806.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[10.0, 2806.0]], "isOverall": false, "label": "T15 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 49622.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[10.0, 49622.0]], "isOverall": false, "label": "T15 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 18346.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[10.0, 18346.0]], "isOverall": false, "label": "T15 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 5595.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[10.0, 5595.0]], "isOverall": false, "label": "G6 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 41629.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[10.0, 41629.0]], "isOverall": false, "label": "G6 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 18404.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[10.0, 18404.0]], "isOverall": false, "label": "G6 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 5814.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[10.0, 5814.0]], "isOverall": false, "label": "G6 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 76362.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[10.0, 76362.0]], "isOverall": false, "label": "G6 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 49769.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[10.0, 49769.0]], "isOverall": false, "label": "G6 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 1099.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[10.0, 1099.0]], "isOverall": false, "label": "G6 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 10860.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[10.0, 10860.0]], "isOverall": false, "label": "G6 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 5479.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[10.0, 5479.0]], "isOverall": false, "label": "G6 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 84136.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[10.0, 84136.0]], "isOverall": false, "label": "G7 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 11522.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[10.0, 11522.0]], "isOverall": false, "label": "G7 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 20685.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[10.0, 20685.0]], "isOverall": false, "label": "G7 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 28226.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[10.0, 28226.0]], "isOverall": false, "label": "G6 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 8157.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[10.0, 8157.0]], "isOverall": false, "label": "G6 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 5338.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[10.0, 5338.0]], "isOverall": false, "label": "T17 - Q8-Aggregated", "isController": false}, {"data": [[2.0, 434147.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[2.0, 434147.0]], "isOverall": false, "label": "T17 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 45905.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[10.0, 45905.0]], "isOverall": false, "label": "T15 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 9290.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[10.0, 9290.0]], "isOverall": false, "label": "T15 - Q22-Aggregated", "isController": false}, {"data": [[4.0, 19456.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[4.0, 19456.0]], "isOverall": false, "label": "G7 - Q19-Aggregated", "isController": false}, {"data": [[4.0, 27831.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[4.0, 27831.0]], "isOverall": false, "label": "G7 - Q18-Aggregated", "isController": false}, {"data": [[4.0, 2204.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[4.0, 2204.0]], "isOverall": false, "label": "G7 - Q16-Aggregated", "isController": false}, {"data": [[4.0, 426097.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[4.0, 426097.0]], "isOverall": false, "label": "G7 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 75889.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[10.0, 75889.0]], "isOverall": false, "label": "G7 - Q14-Aggregated", "isController": false}, {"data": [[4.0, 19625.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[4.0, 19625.0]], "isOverall": false, "label": "G7 - Q13-Aggregated", "isController": false}, {"data": [[5.0, 7714.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[5.0, 7714.0]], "isOverall": false, "label": "G10 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 9773.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[10.0, 9773.0]], "isOverall": false, "label": "G7 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 84857.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[10.0, 84857.0]], "isOverall": false, "label": "G7 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 35543.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[10.0, 35543.0]], "isOverall": false, "label": "G10 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 57686.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[10.0, 57686.0]], "isOverall": false, "label": "T17 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 5479.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[10.0, 5479.0]], "isOverall": false, "label": "T17 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 31758.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[10.0, 31758.0]], "isOverall": false, "label": "T17 - Q21-Aggregated", "isController": false}, {"data": [[5.0, 8194.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[5.0, 8194.0]], "isOverall": false, "label": "G10 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 77734.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[10.0, 77734.0]], "isOverall": false, "label": "G10 - Q12-Aggregated", "isController": false}, {"data": [[5.0, 23437.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[5.0, 23437.0]], "isOverall": false, "label": "G10 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 47177.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[10.0, 47177.0]], "isOverall": false, "label": "G10 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 8341.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[10.0, 8341.0]], "isOverall": false, "label": "G10 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 82562.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[10.0, 82562.0]], "isOverall": false, "label": "G10 - Q19-Aggregated", "isController": false}, {"data": [[5.0, 365107.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[5.0, 365107.0]], "isOverall": false, "label": "G10 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 5196.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[10.0, 5196.0]], "isOverall": false, "label": "G10 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 88291.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[10.0, 88291.0]], "isOverall": false, "label": "G10 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 51719.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[10.0, 51719.0]], "isOverall": false, "label": "T17 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 9331.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[10.0, 9331.0]], "isOverall": false, "label": "T17 - Q11-Aggregated", "isController": false}, {"data": [[9.0, 44497.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[9.0, 44497.0]], "isOverall": false, "label": "T17 - Q14-Aggregated", "isController": false}, {"data": [[9.0, 19004.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[9.0, 19004.0]], "isOverall": false, "label": "T17 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 8907.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[10.0, 8907.0]], "isOverall": false, "label": "T17 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 148583.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[10.0, 148583.0]], "isOverall": false, "label": "T17 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 131708.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[10.0, 131708.0]], "isOverall": false, "label": "T17 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 35982.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[10.0, 35982.0]], "isOverall": false, "label": "T15 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 9893.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[10.0, 9893.0]], "isOverall": false, "label": "T15 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 10683.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[10.0, 10683.0]], "isOverall": false, "label": "T17 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 5025.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[10.0, 5025.0]], "isOverall": false, "label": "T15 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 60291.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[10.0, 60291.0]], "isOverall": false, "label": "T15 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 16115.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[10.0, 16115.0]], "isOverall": false, "label": "G9 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 9204.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[10.0, 9204.0]], "isOverall": false, "label": "T16 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 41140.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[10.0, 41140.0]], "isOverall": false, "label": "T16 - Q7-Aggregated", "isController": false}, {"data": [[2.0, 523612.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[2.0, 523612.0]], "isOverall": false, "label": "T16 - Q9-Aggregated", "isController": false}, {"data": [[9.0, 34300.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[9.0, 34300.0]], "isOverall": false, "label": "G9 - Q21-Aggregated", "isController": false}, {"data": [[1.0, 1573.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[1.0, 1573.0]], "isOverall": false, "label": "T16 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 38196.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[10.0, 38196.0]], "isOverall": false, "label": "T16 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 3859.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[10.0, 3859.0]], "isOverall": false, "label": "T16 - Q4-Aggregated", "isController": false}, {"data": [[2.0, 3109.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[2.0, 3109.0]], "isOverall": false, "label": "T16 - Q3-Aggregated", "isController": false}, {"data": [[1.0, 10091.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[1.0, 10091.0]], "isOverall": false, "label": "T16 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 11926.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[10.0, 11926.0]], "isOverall": false, "label": "T16 - Q5-Aggregated", "isController": false}, {"data": [[5.0, 10451.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[5.0, 10451.0]], "isOverall": false, "label": "T1 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 45567.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[10.0, 45567.0]], "isOverall": false, "label": "T1 - Q10-Aggregated", "isController": false}, {"data": [[9.0, 71164.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[9.0, 71164.0]], "isOverall": false, "label": "G9 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 59403.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[10.0, 59403.0]], "isOverall": false, "label": "T1 - Q13-Aggregated", "isController": false}, {"data": [[3.0, 15027.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[3.0, 15027.0]], "isOverall": false, "label": "T1 - Q12-Aggregated", "isController": false}, {"data": [[4.0, 52943.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[4.0, 52943.0]], "isOverall": false, "label": "T1 - Q15-Aggregated", "isController": false}, {"data": [[4.0, 18492.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[4.0, 18492.0]], "isOverall": false, "label": "T1 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 84793.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[10.0, 84793.0]], "isOverall": false, "label": "G9 - Q14-Aggregated", "isController": false}, {"data": [[8.0, 21210.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[8.0, 21210.0]], "isOverall": false, "label": "G9 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 44521.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[10.0, 44521.0]], "isOverall": false, "label": "G9 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 30076.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[10.0, 30076.0]], "isOverall": false, "label": "G9 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 101218.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[10.0, 101218.0]], "isOverall": false, "label": "G9 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 9548.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[10.0, 9548.0]], "isOverall": false, "label": "G9 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 226100.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[10.0, 226100.0]], "isOverall": false, "label": "G9 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 5353.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[10.0, 5353.0]], "isOverall": false, "label": "G9 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 11302.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[10.0, 11302.0]], "isOverall": false, "label": "G8 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 55111.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[10.0, 55111.0]], "isOverall": false, "label": "G8 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 13595.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[10.0, 13595.0]], "isOverall": false, "label": "G8 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 66680.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[10.0, 66680.0]], "isOverall": false, "label": "G8 - Q19-Aggregated", "isController": false}, {"data": [[5.0, 5960.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[5.0, 5960.0]], "isOverall": false, "label": "T1 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 91134.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[10.0, 91134.0]], "isOverall": false, "label": "G8 - Q18-Aggregated", "isController": false}, {"data": [[5.0, 33521.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[5.0, 33521.0]], "isOverall": false, "label": "T1 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 22847.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[10.0, 22847.0]], "isOverall": false, "label": "G8 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 95421.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[10.0, 95421.0]], "isOverall": false, "label": "G8 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 149475.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[10.0, 149475.0]], "isOverall": false, "label": "G8 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 30795.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[10.0, 30795.0]], "isOverall": false, "label": "G8 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 44046.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[10.0, 44046.0]], "isOverall": false, "label": "G10 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 20045.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[10.0, 20045.0]], "isOverall": false, "label": "G10 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 3585.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[10.0, 3585.0]], "isOverall": false, "label": "G10 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 28178.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[10.0, 28178.0]], "isOverall": false, "label": "G10 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 25778.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[10.0, 25778.0]], "isOverall": false, "label": "G10 - Q8-Aggregated", "isController": false}, {"data": [[5.0, 4596.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[5.0, 4596.0]], "isOverall": false, "label": "G10 - Q5-Aggregated", "isController": false}, {"data": [[5.0, 5713.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[5.0, 5713.0]], "isOverall": false, "label": "G10 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 14897.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[10.0, 14897.0]], "isOverall": false, "label": "G10 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 32031.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[10.0, 32031.0]], "isOverall": false, "label": "G10 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 34120.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[10.0, 34120.0]], "isOverall": false, "label": "T14 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 8309.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[10.0, 8309.0]], "isOverall": false, "label": "T14 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 24630.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[10.0, 24630.0]], "isOverall": false, "label": "T1 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 3244.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[10.0, 3244.0]], "isOverall": false, "label": "T14 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 3656.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[10.0, 3656.0]], "isOverall": false, "label": "G8 - Q11-Aggregated", "isController": false}, {"data": [[4.0, 18379.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[4.0, 18379.0]], "isOverall": false, "label": "T1 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 3938.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[10.0, 3938.0]], "isOverall": false, "label": "G8 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 55677.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[10.0, 55677.0]], "isOverall": false, "label": "T14 - Q1-Aggregated", "isController": false}, {"data": [[3.0, 15738.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[3.0, 15738.0]], "isOverall": false, "label": "T1 - Q18-Aggregated", "isController": false}, {"data": [[9.0, 38897.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[9.0, 38897.0]], "isOverall": false, "label": "T14 - Q9-Aggregated", "isController": false}, {"data": [[9.0, 11533.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[9.0, 11533.0]], "isOverall": false, "label": "T14 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 5973.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[10.0, 5973.0]], "isOverall": false, "label": "T14 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 38202.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[10.0, 38202.0]], "isOverall": false, "label": "T14 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 6891.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[10.0, 6891.0]], "isOverall": false, "label": "T14 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 4729.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[10.0, 4729.0]], "isOverall": false, "label": "G8 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 12509.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[10.0, 12509.0]], "isOverall": false, "label": "T14 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 37663.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[10.0, 37663.0]], "isOverall": false, "label": "T14 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 25523.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[10.0, 25523.0]], "isOverall": false, "label": "G8 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 20143.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[10.0, 20143.0]], "isOverall": false, "label": "G8 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 3496.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[10.0, 3496.0]], "isOverall": false, "label": "G8 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 36650.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[10.0, 36650.0]], "isOverall": false, "label": "G8 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 6021.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[10.0, 6021.0]], "isOverall": false, "label": "G8 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 3951.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[10.0, 3951.0]], "isOverall": false, "label": "G8 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 20455.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[10.0, 20455.0]], "isOverall": false, "label": "G8 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 39607.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[10.0, 39607.0]], "isOverall": false, "label": "G8 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 43454.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[10.0, 43454.0]], "isOverall": false, "label": "G9 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 20.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[10.0, 20.0]], "isOverall": false, "label": "T1 - RF2-Aggregated", "isController": false}, {"data": [[10.0, 9712.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[10.0, 9712.0]], "isOverall": false, "label": "G9 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 5684.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[10.0, 5684.0]], "isOverall": false, "label": "G9 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 13273.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[10.0, 13273.0]], "isOverall": false, "label": "G9 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 1287.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[10.0, 1287.0]], "isOverall": false, "label": "G9 - Q2-Aggregated", "isController": false}, {"data": [[9.0, 5620.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[9.0, 5620.0]], "isOverall": false, "label": "G9 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 56313.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[10.0, 56313.0]], "isOverall": false, "label": "G9 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 6012.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[10.0, 6012.0]], "isOverall": false, "label": "G9 - Q8-Aggregated", "isController": false}, {"data": [[3.0, 5.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[3.0, 5.0]], "isOverall": false, "label": "T1 - RF1-Aggregated", "isController": false}, {"data": [[10.0, 37112.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[10.0, 37112.0]], "isOverall": false, "label": "G9 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 39672.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[10.0, 39672.0]], "isOverall": false, "label": "T14 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 52269.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[10.0, 52269.0]], "isOverall": false, "label": "T14 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 20644.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[10.0, 20644.0]], "isOverall": false, "label": "T14 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 11772.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[10.0, 11772.0]], "isOverall": false, "label": "T14 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 75068.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[10.0, 75068.0]], "isOverall": false, "label": "G7 - Q6-Aggregated", "isController": false}, {"data": [[4.0, 2877.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[4.0, 2877.0]], "isOverall": false, "label": "G7 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 8025.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[10.0, 8025.0]], "isOverall": false, "label": "G7 - Q8-Aggregated", "isController": false}, {"data": [[4.0, 16405.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[4.0, 16405.0]], "isOverall": false, "label": "G7 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 4559.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[10.0, 4559.0]], "isOverall": false, "label": "G7 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 14459.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[10.0, 14459.0]], "isOverall": false, "label": "G7 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 65300.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[10.0, 65300.0]], "isOverall": false, "label": "T14 - Q19-Aggregated", "isController": false}, {"data": [[4.0, 2778.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[4.0, 2778.0]], "isOverall": false, "label": "G7 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 19701.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[10.0, 19701.0]], "isOverall": false, "label": "G7 - Q5-Aggregated", "isController": false}, {"data": [[9.0, 50152.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[9.0, 50152.0]], "isOverall": false, "label": "T14 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 5221.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[10.0, 5221.0]], "isOverall": false, "label": "T14 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 295589.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[10.0, 295589.0]], "isOverall": false, "label": "T14 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 97120.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[10.0, 97120.0]], "isOverall": false, "label": "G7 - Q1-Aggregated", "isController": false}, {"data": [[9.0, 27985.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[9.0, 27985.0]], "isOverall": false, "label": "T14 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 93265.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[10.0, 93265.0]], "isOverall": false, "label": "T1 - Q1-Aggregated", "isController": false}, {"data": [[3.0, 1895.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[3.0, 1895.0]], "isOverall": false, "label": "T1 - Q2-Aggregated", "isController": false}, {"data": [[5.0, 3598.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[5.0, 3598.0]], "isOverall": false, "label": "T1 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 10599.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[10.0, 10599.0]], "isOverall": false, "label": "T1 - Q4-Aggregated", "isController": false}, {"data": [[4.0, 3574.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[4.0, 3574.0]], "isOverall": false, "label": "T1 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 81651.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[10.0, 81651.0]], "isOverall": false, "label": "T1 - Q6-Aggregated", "isController": false}, {"data": [[3.0, 14035.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[3.0, 14035.0]], "isOverall": false, "label": "T1 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 6284.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[10.0, 6284.0]], "isOverall": false, "label": "T1 - Q8-Aggregated", "isController": false}, {"data": [[5.0, 551058.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[5.0, 551058.0]], "isOverall": false, "label": "T1 - Q9-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 0.0, "minX": 1.69221672E12, "maxY": 20672.95, "series": [{"data": [[1.6922172E12, 502.6666666666667], [1.69221702E12, 11872.316666666668], [1.69221786E12, 131.66666666666666], [1.69221756E12, 153.68333333333334], [1.69221726E12, 9056.716666666667], [1.69221696E12, 132.56666666666666], [1.69221744E12, 13.666666666666666], [1.69221678E12, 16516.35], [1.69221714E12, 1358.55], [1.69221708E12, 136.75], [1.6922175E12, 147.5], [1.69221672E12, 1112.5], [1.69221768E12, 88.41666666666667], [1.69221738E12, 2445.383333333333], [1.69221684E12, 6073.7], [1.69221774E12, 1625.7333333333333], [1.69221792E12, 20672.95], [1.69221762E12, 8926.683333333332], [1.69221732E12, 11628.65], [1.6922169E12, 237.83333333333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6922172E12, 0.0], [1.69221702E12, 0.0], [1.69221786E12, 0.0], [1.69221756E12, 0.0], [1.69221726E12, 0.0], [1.69221696E12, 0.0], [1.69221744E12, 0.0], [1.69221678E12, 0.0], [1.69221714E12, 0.0], [1.69221708E12, 0.0], [1.6922175E12, 0.0], [1.69221672E12, 0.0], [1.69221768E12, 0.0], [1.69221738E12, 0.0], [1.69221684E12, 0.0], [1.69221774E12, 0.0], [1.69221792E12, 0.0], [1.69221762E12, 0.0], [1.69221732E12, 0.0], [1.6922169E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221792E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.69221672E12, "maxY": 551058.0, "series": [{"data": [[1.69221702E12, 5507.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[1.69221714E12, 12741.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[1.69221708E12, 52070.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[1.69221696E12, 34787.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[1.69221792E12, 2288.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[1.69221726E12, 53999.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[1.69221714E12, 49655.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[1.6922172E12, 324724.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[1.69221726E12, 43194.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[1.69221684E12, 43280.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[1.69221732E12, 22848.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[1.69221756E12, 339499.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[1.69221678E12, 7006.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[1.69221738E12, 42438.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[1.69221738E12, 3078.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[1.69221684E12, 57497.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[1.6922169E12, 65288.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1.69221702E12, 45870.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[1.6922172E12, 9575.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[1.69221792E12, 11398.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[1.69221684E12, 53964.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[1.6922172E12, 21595.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1.69221792E12, 14406.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[1.69221696E12, 69539.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[1.69221792E12, 2152.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[1.69221678E12, 7436.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[1.69221726E12, 28769.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[1.69221678E12, 7216.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[1.69221756E12, 26534.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[1.69221696E12, 13267.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[1.6922175E12, 38192.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[1.69221708E12, 61891.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[1.6922172E12, 17961.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[1.6922169E12, 85572.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[1.69221678E12, 57018.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[1.69221678E12, 11244.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[1.69221708E12, 31000.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[1.6922175E12, 254544.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[1.6922172E12, 2806.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[1.69221696E12, 49622.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[1.69221678E12, 18346.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[1.6922169E12, 5595.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[1.6922172E12, 41629.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[1.69221678E12, 18404.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[1.69221702E12, 5814.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[1.69221678E12, 76362.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[1.6922169E12, 49769.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[1.69221684E12, 1099.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[1.69221708E12, 10860.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[1.6922172E12, 5479.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[1.69221702E12, 84136.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[1.69221702E12, 11522.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[1.6922169E12, 20685.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[1.69221708E12, 28226.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[1.69221684E12, 8157.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[1.69221738E12, 5338.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[1.69221792E12, 434147.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[1.69221714E12, 45905.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[1.6922172E12, 9290.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[1.69221774E12, 19456.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[1.69221768E12, 27831.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[1.69221774E12, 2204.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[1.69221762E12, 426097.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[1.6922172E12, 75889.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[1.69221768E12, 19625.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[1.69221762E12, 7714.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[1.69221702E12, 9773.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[1.69221714E12, 84857.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[1.6922172E12, 35543.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[1.6922172E12, 57686.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[1.69221726E12, 5479.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1.69221732E12, 31758.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1.69221762E12, 8194.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[1.69221702E12, 77734.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[1.69221762E12, 23437.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[1.69221708E12, 47177.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[1.69221672E12, 8341.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[1.6922169E12, 82562.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[1.69221756E12, 365107.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[1.69221678E12, 5196.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[1.69221678E12, 88291.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[1.69221738E12, 51719.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[1.69221726E12, 9331.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[1.69221744E12, 44497.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[1.69221744E12, 19004.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[1.69221732E12, 8907.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[1.69221684E12, 148583.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[1.69221714E12, 131708.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[1.6922172E12, 35982.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[1.69221696E12, 9893.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[1.6922172E12, 10683.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1.6922172E12, 5025.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[1.69221702E12, 60291.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[1.69221702E12, 16115.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[1.69221678E12, 9204.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[1.69221732E12, 41140.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[1.69221786E12, 523612.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[1.6922175E12, 34300.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[1.69221792E12, 1573.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[1.69221672E12, 38196.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[1.69221726E12, 3859.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[1.69221792E12, 3109.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[1.69221792E12, 10091.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[1.69221738E12, 11926.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[1.69221762E12, 10451.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221696E12, 45567.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69221744E12, 71164.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[1.69221678E12, 59403.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69221774E12, 15027.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69221768E12, 52943.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69221774E12, 18492.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69221714E12, 84793.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[1.6922175E12, 21210.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[1.69221684E12, 44521.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[1.69221738E12, 30076.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[1.69221678E12, 101218.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[1.69221714E12, 9548.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[1.69221738E12, 226100.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[1.69221702E12, 5353.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[1.69221738E12, 11302.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[1.69221738E12, 55111.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[1.69221672E12, 13595.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[1.69221726E12, 66680.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[1.69221756E12, 5960.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221708E12, 91134.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[1.69221762E12, 33521.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69221738E12, 22847.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[1.69221684E12, 95421.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[1.69221696E12, 149475.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[1.69221732E12, 30795.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[1.69221714E12, 44046.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[1.69221702E12, 20045.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[1.6922169E12, 3585.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[1.69221708E12, 28178.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[1.69221684E12, 25778.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[1.69221756E12, 4596.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[1.69221762E12, 5713.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[1.69221702E12, 14897.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[1.6922172E12, 32031.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[1.69221732E12, 34120.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[1.69221696E12, 8309.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[1.69221702E12, 24630.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69221684E12, 3244.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[1.69221726E12, 3656.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[1.69221768E12, 18379.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221726E12, 3938.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[1.69221738E12, 55677.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[1.69221774E12, 15738.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.6922175E12, 38897.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[1.69221744E12, 11533.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[1.69221696E12, 5973.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[1.69221672E12, 38202.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[1.69221732E12, 6891.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[1.69221672E12, 4729.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[1.69221696E12, 12509.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[1.6922169E12, 37663.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[1.69221726E12, 25523.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[1.69221708E12, 20143.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[1.69221726E12, 3496.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[1.6922172E12, 36650.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[1.69221732E12, 6021.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[1.69221726E12, 3951.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[1.69221672E12, 20455.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[1.69221714E12, 39607.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[1.69221702E12, 43454.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[1.69221678E12, 20.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69221714E12, 9712.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[1.69221702E12, 5684.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[1.69221684E12, 13273.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[1.69221684E12, 1287.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[1.6922175E12, 5620.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[1.69221696E12, 56313.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[1.69221702E12, 6012.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[1.69221774E12, 5.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.6922169E12, 37112.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[1.69221696E12, 39672.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[1.69221684E12, 52269.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[1.69221738E12, 20644.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[1.6922169E12, 11772.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[1.69221678E12, 75068.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[1.69221768E12, 2877.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[1.69221702E12, 8025.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[1.69221768E12, 16405.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[1.69221672E12, 4559.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[1.6922172E12, 14459.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[1.69221678E12, 65300.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[1.69221768E12, 2778.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[1.69221672E12, 19701.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[1.69221744E12, 50152.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[1.69221684E12, 5221.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[1.69221726E12, 295589.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[1.6922169E12, 97120.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[1.6922175E12, 27985.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[1.69221696E12, 93265.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69221774E12, 1895.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69221756E12, 3598.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221702E12, 10599.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69221768E12, 3574.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69221684E12, 81651.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69221774E12, 14035.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69221696E12, 6284.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69221756E12, 551058.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221792E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.69221672E12, "maxY": 551058.0, "series": [{"data": [[1.69221702E12, 5505.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[1.69221714E12, 12741.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[1.69221708E12, 52069.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[1.69221696E12, 34787.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[1.69221792E12, 2271.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[1.69221726E12, 53999.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[1.69221714E12, 49655.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[1.6922172E12, 324724.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[1.69221726E12, 43194.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[1.69221684E12, 43280.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[1.69221732E12, 22848.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[1.69221756E12, 339499.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[1.69221678E12, 7002.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[1.69221738E12, 42438.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[1.69221738E12, 3078.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[1.69221684E12, 57497.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[1.6922169E12, 65288.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1.69221702E12, 45870.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[1.6922172E12, 9575.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[1.69221792E12, 11398.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[1.69221684E12, 53964.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[1.6922172E12, 21594.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1.69221792E12, 14406.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[1.69221696E12, 69539.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[1.69221792E12, 2136.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[1.69221678E12, 7436.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[1.69221726E12, 28769.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[1.69221678E12, 7215.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[1.69221756E12, 26534.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[1.69221696E12, 13265.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[1.6922175E12, 38191.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[1.69221708E12, 61891.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[1.6922172E12, 17961.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[1.6922169E12, 85572.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[1.69221678E12, 57018.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[1.69221678E12, 11210.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[1.69221708E12, 31000.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[1.6922175E12, 254544.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[1.6922172E12, 2806.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[1.69221696E12, 49622.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[1.69221678E12, 18302.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[1.6922169E12, 5595.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[1.6922172E12, 41629.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[1.69221678E12, 18404.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[1.69221702E12, 5814.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[1.69221678E12, 76361.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[1.6922169E12, 49768.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[1.69221684E12, 1098.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[1.69221708E12, 10860.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[1.6922172E12, 5479.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[1.69221702E12, 84135.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[1.69221702E12, 11521.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[1.6922169E12, 20684.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[1.69221708E12, 28226.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[1.69221684E12, 8156.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[1.69221738E12, 5338.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[1.69221792E12, 434147.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[1.69221714E12, 45905.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[1.6922172E12, 9290.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[1.69221774E12, 19456.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[1.69221768E12, 27831.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[1.69221774E12, 2204.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[1.69221762E12, 426097.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[1.6922172E12, 75889.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[1.69221768E12, 19624.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[1.69221762E12, 7714.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[1.69221702E12, 9773.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[1.69221714E12, 84857.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[1.6922172E12, 35543.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[1.6922172E12, 57686.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[1.69221726E12, 5478.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1.69221732E12, 31758.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1.69221762E12, 8194.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[1.69221702E12, 77733.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[1.69221762E12, 23437.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[1.69221708E12, 47177.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[1.69221672E12, 8339.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[1.6922169E12, 82562.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[1.69221756E12, 365107.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[1.69221678E12, 5192.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[1.69221678E12, 88291.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[1.69221738E12, 51719.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[1.69221726E12, 9309.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[1.69221744E12, 44497.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[1.69221744E12, 19004.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[1.69221732E12, 8876.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[1.69221684E12, 148583.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[1.69221714E12, 131708.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[1.6922172E12, 35982.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[1.69221696E12, 9893.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[1.6922172E12, 10683.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1.6922172E12, 5025.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[1.69221702E12, 60291.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[1.69221702E12, 16114.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[1.69221678E12, 9203.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[1.69221732E12, 41140.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[1.69221786E12, 523612.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[1.6922175E12, 34299.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[1.69221792E12, 1573.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[1.69221672E12, 38195.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[1.69221726E12, 3859.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[1.69221792E12, 3108.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[1.69221792E12, 10091.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[1.69221738E12, 11925.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[1.69221762E12, 10373.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221696E12, 45567.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69221744E12, 71164.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[1.69221678E12, 59403.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69221774E12, 15027.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69221768E12, 52943.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69221774E12, 18492.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69221714E12, 84792.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[1.6922175E12, 21210.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[1.69221684E12, 44521.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[1.69221738E12, 30076.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[1.69221678E12, 101218.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[1.69221714E12, 9546.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[1.69221738E12, 226100.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[1.69221702E12, 5352.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[1.69221738E12, 11302.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[1.69221738E12, 55111.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[1.69221672E12, 13565.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[1.69221726E12, 66680.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[1.69221756E12, 5960.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221708E12, 91134.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[1.69221762E12, 33521.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69221738E12, 22847.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[1.69221684E12, 95421.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[1.69221696E12, 149475.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[1.69221732E12, 30795.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[1.69221714E12, 44045.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[1.69221702E12, 20044.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[1.6922169E12, 3585.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[1.69221708E12, 28177.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[1.69221684E12, 25777.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[1.69221756E12, 4596.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[1.69221762E12, 5713.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[1.69221702E12, 14897.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[1.6922172E12, 32031.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[1.69221732E12, 34119.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[1.69221696E12, 8308.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[1.69221702E12, 24611.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69221684E12, 3243.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[1.69221726E12, 3656.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[1.69221768E12, 18379.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221726E12, 3938.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[1.69221738E12, 55677.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[1.69221774E12, 15738.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.6922175E12, 38897.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[1.69221744E12, 11533.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[1.69221696E12, 5973.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[1.69221672E12, 38201.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[1.69221732E12, 6891.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[1.69221672E12, 4729.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[1.69221696E12, 12509.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[1.6922169E12, 37663.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[1.69221726E12, 25522.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[1.69221708E12, 20143.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[1.69221726E12, 3495.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[1.6922172E12, 36650.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[1.69221732E12, 6021.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[1.69221726E12, 3951.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[1.69221672E12, 20455.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[1.69221714E12, 39607.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[1.69221702E12, 43454.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[1.69221678E12, 20.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69221714E12, 9711.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[1.69221702E12, 5684.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[1.69221684E12, 13273.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[1.69221684E12, 1286.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[1.6922175E12, 5620.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[1.69221696E12, 56313.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[1.69221702E12, 6012.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[1.69221774E12, 5.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.6922169E12, 37111.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[1.69221696E12, 39672.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[1.69221684E12, 52269.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[1.69221738E12, 20642.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[1.6922169E12, 11771.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[1.69221678E12, 75067.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[1.69221768E12, 2877.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[1.69221702E12, 8025.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[1.69221768E12, 16404.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[1.69221672E12, 4557.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[1.6922172E12, 14458.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[1.69221678E12, 65299.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[1.69221768E12, 2778.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[1.69221672E12, 19701.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[1.69221744E12, 50152.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[1.69221684E12, 5209.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[1.69221726E12, 295588.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[1.6922169E12, 97120.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[1.6922175E12, 27985.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[1.69221696E12, 93265.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69221774E12, 1895.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69221756E12, 3597.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221702E12, 10599.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69221768E12, 3574.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69221684E12, 81651.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69221774E12, 14035.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69221696E12, 6284.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69221756E12, 551058.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221792E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69221672E12, "maxY": 1248.0, "series": [{"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[1.69221708E12, 0.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[1.69221792E12, 0.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[1.69221732E12, 0.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[1.6922169E12, 0.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[1.69221792E12, 0.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1.69221792E12, 0.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[1.69221696E12, 1.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[1.69221792E12, 0.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[1.6922175E12, 1.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[1.69221708E12, 0.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[1.6922169E12, 0.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[1.69221678E12, 1243.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[1.69221708E12, 0.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[1.6922175E12, 0.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[1.6922169E12, 0.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[1.69221678E12, 1247.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[1.6922169E12, 0.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[1.69221708E12, 0.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[1.6922169E12, 0.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[1.69221708E12, 0.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[1.69221792E12, 0.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[1.69221774E12, 0.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[1.69221768E12, 0.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[1.69221774E12, 0.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[1.69221762E12, 0.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[1.69221768E12, 0.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[1.69221762E12, 0.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[1.6922172E12, 1.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1.69221732E12, 0.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1.69221762E12, 0.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[1.69221762E12, 0.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[1.69221708E12, 1.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[1.69221672E12, 1244.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[1.6922169E12, 0.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[1.69221678E12, 1.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[1.69221744E12, 0.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[1.69221744E12, 0.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[1.69221732E12, 0.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[1.69221684E12, 1243.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[1.69221732E12, 0.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[1.69221786E12, 0.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[1.6922175E12, 0.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[1.69221792E12, 0.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[1.69221672E12, 1240.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[1.69221726E12, 1.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[1.69221792E12, 0.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[1.69221792E12, 0.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[1.69221762E12, 0.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69221744E12, 1.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[1.69221678E12, 1245.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69221774E12, 0.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69221768E12, 0.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69221774E12, 0.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[1.6922175E12, 0.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[1.69221678E12, 1248.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[1.69221672E12, 0.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221708E12, 0.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[1.69221762E12, 0.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[1.69221684E12, 1.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[1.69221732E12, 0.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[1.6922169E12, 0.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[1.69221708E12, 0.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[1.69221762E12, 0.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[1.69221732E12, 0.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[1.69221702E12, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69221684E12, 1.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[1.69221768E12, 0.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[1.69221774E12, 0.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.6922175E12, 0.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[1.69221744E12, 1.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[1.69221672E12, 1241.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[1.69221732E12, 0.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[1.69221672E12, 1242.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[1.6922169E12, 1.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[1.69221708E12, 0.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[1.6922172E12, 1.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[1.69221732E12, 0.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[1.69221672E12, 0.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69221714E12, 0.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[1.6922175E12, 1.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[1.69221774E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.6922169E12, 0.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[1.69221738E12, 0.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[1.6922169E12, 1.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[1.69221768E12, 0.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[1.69221702E12, 0.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[1.69221768E12, 0.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[1.69221672E12, 1243.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[1.6922172E12, 0.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[1.69221678E12, 0.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[1.69221768E12, 0.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[1.69221672E12, 0.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[1.69221744E12, 0.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[1.69221684E12, 1.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[1.69221726E12, 0.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[1.6922169E12, 0.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[1.6922175E12, 0.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69221774E12, 0.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221702E12, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69221768E12, 0.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69221684E12, 0.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69221774E12, 0.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69221696E12, 0.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221792E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.69221672E12, "maxY": 551058.0, "series": [{"data": [[1.6922172E12, 324724.0], [1.69221702E12, 84136.0], [1.69221786E12, 523612.0], [1.69221756E12, 551058.0], [1.69221726E12, 295589.0], [1.69221696E12, 149475.0], [1.69221744E12, 71164.0], [1.69221678E12, 101218.0], [1.69221714E12, 131708.0], [1.69221708E12, 91134.0], [1.6922175E12, 254544.0], [1.69221672E12, 38202.0], [1.69221768E12, 52943.0], [1.69221738E12, 226100.0], [1.69221684E12, 148583.0], [1.69221774E12, 19456.0], [1.69221792E12, 434147.0], [1.69221762E12, 426097.0], [1.69221732E12, 41140.0], [1.6922169E12, 97120.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6922172E12, 125655.99999999983], [1.69221702E12, 78374.20000000001], [1.69221786E12, 523612.0], [1.69221756E12, 551058.0], [1.69221726E12, 204025.3999999999], [1.69221696E12, 121370.0], [1.69221744E12, 71164.0], [1.69221678E12, 92169.1], [1.69221714E12, 127022.90000000002], [1.69221708E12, 91134.0], [1.6922175E12, 254544.0], [1.69221672E12, 38202.0], [1.69221768E12, 52943.0], [1.69221738E12, 174973.10000000018], [1.69221684E12, 116685.80000000002], [1.69221774E12, 19456.0], [1.69221792E12, 434147.0], [1.69221762E12, 426097.0], [1.69221732E12, 41140.0], [1.6922169E12, 94810.40000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6922172E12, 324724.0], [1.69221702E12, 84136.0], [1.69221786E12, 523612.0], [1.69221756E12, 551058.0], [1.69221726E12, 295589.0], [1.69221696E12, 149475.0], [1.69221744E12, 71164.0], [1.69221678E12, 101218.0], [1.69221714E12, 131708.0], [1.69221708E12, 91134.0], [1.6922175E12, 254544.0], [1.69221672E12, 38202.0], [1.69221768E12, 52943.0], [1.69221738E12, 226100.0], [1.69221684E12, 148583.0], [1.69221774E12, 19456.0], [1.69221792E12, 434147.0], [1.69221762E12, 426097.0], [1.69221732E12, 41140.0], [1.6922169E12, 97120.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6922172E12, 324724.0], [1.69221702E12, 84136.0], [1.69221786E12, 523612.0], [1.69221756E12, 551058.0], [1.69221726E12, 295589.0], [1.69221696E12, 149475.0], [1.69221744E12, 71164.0], [1.69221678E12, 101218.0], [1.69221714E12, 131708.0], [1.69221708E12, 91134.0], [1.6922175E12, 254544.0], [1.69221672E12, 38202.0], [1.69221768E12, 52943.0], [1.69221738E12, 226100.0], [1.69221684E12, 148583.0], [1.69221774E12, 19456.0], [1.69221792E12, 434147.0], [1.69221762E12, 426097.0], [1.69221732E12, 41140.0], [1.6922169E12, 97120.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6922172E12, 2806.0], [1.69221702E12, 5353.0], [1.69221786E12, 523612.0], [1.69221756E12, 3598.0], [1.69221726E12, 3496.0], [1.69221696E12, 5973.0], [1.69221744E12, 11533.0], [1.69221678E12, 20.0], [1.69221714E12, 9548.0], [1.69221708E12, 10860.0], [1.6922175E12, 5620.0], [1.69221672E12, 4559.0], [1.69221768E12, 2778.0], [1.69221738E12, 3078.0], [1.69221684E12, 1099.0], [1.69221774E12, 5.0], [1.69221792E12, 1573.0], [1.69221762E12, 5713.0], [1.69221732E12, 6021.0], [1.6922169E12, 3585.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6922172E12, 21595.0], [1.69221702E12, 13209.5], [1.69221786E12, 523612.0], [1.69221756E12, 26534.0], [1.69221726E12, 9331.0], [1.69221696E12, 37229.5], [1.69221744E12, 44497.0], [1.69221678E12, 18375.0], [1.69221714E12, 44975.5], [1.69221708E12, 31000.0], [1.6922175E12, 34300.0], [1.69221672E12, 16648.0], [1.69221768E12, 17392.0], [1.69221738E12, 26461.5], [1.69221684E12, 43280.0], [1.69221774E12, 14531.0], [1.69221792E12, 6600.0], [1.69221762E12, 10451.0], [1.69221732E12, 26821.5], [1.6922169E12, 37663.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221792E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 19212.0, "minX": 1.0, "maxY": 38202.0, "series": [{"data": [[2.0, 19212.0], [1.0, 20455.0], [3.0, 38202.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 19211.5, "minX": 1.0, "maxY": 38201.0, "series": [{"data": [[2.0, 19211.5], [1.0, 20455.0], [3.0, 38201.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69221672E12, "maxY": 0.3, "series": [{"data": [[1.6922172E12, 0.2833333333333333], [1.69221702E12, 0.3], [1.69221786E12, 0.016666666666666666], [1.69221756E12, 0.08333333333333333], [1.69221726E12, 0.21666666666666667], [1.69221696E12, 0.23333333333333334], [1.69221744E12, 0.08333333333333333], [1.69221678E12, 0.26666666666666666], [1.69221714E12, 0.16666666666666666], [1.69221708E12, 0.15], [1.6922175E12, 0.08333333333333333], [1.69221672E12, 0.3], [1.69221768E12, 0.13333333333333333], [1.69221738E12, 0.18333333333333332], [1.69221684E12, 0.25], [1.69221774E12, 0.1], [1.69221792E12, 0.1], [1.69221762E12, 0.1], [1.69221732E12, 0.13333333333333333], [1.6922169E12, 0.18333333333333332]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221792E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69221672E12, "maxY": 0.3, "series": [{"data": [[1.6922172E12, 0.2833333333333333], [1.69221702E12, 0.3], [1.69221786E12, 0.016666666666666666], [1.69221756E12, 0.11666666666666667], [1.69221726E12, 0.21666666666666667], [1.69221696E12, 0.23333333333333334], [1.69221744E12, 0.08333333333333333], [1.69221678E12, 0.26666666666666666], [1.69221714E12, 0.16666666666666666], [1.69221708E12, 0.15], [1.6922175E12, 0.11666666666666667], [1.69221672E12, 0.13333333333333333], [1.69221768E12, 0.13333333333333333], [1.69221738E12, 0.2], [1.69221684E12, 0.25], [1.69221774E12, 0.13333333333333333], [1.69221792E12, 0.13333333333333333], [1.69221762E12, 0.11666666666666667], [1.69221732E12, 0.13333333333333333], [1.6922169E12, 0.18333333333333332]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221792E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69221672E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q9-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q2-success", "isController": false}, {"data": [[1.69221672E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q6-success", "isController": false}, {"data": [[1.69221762E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q11-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q15-success", "isController": false}, {"data": [[1.6922175E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q3-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q4-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q14-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q19-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q10-success", "isController": false}, {"data": [[1.6922175E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q21-success", "isController": false}, {"data": [[1.69221774E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q14-success", "isController": false}, {"data": [[1.69221774E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q16-success", "isController": false}, {"data": [[1.69221732E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q7-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q15-success", "isController": false}, {"data": [[1.69221672E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q1-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q13-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q14-success", "isController": false}, {"data": [[1.69221708E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q1-success", "isController": false}, {"data": [[1.69221774E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q19-success", "isController": false}, {"data": [[1.69221774E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q7-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q22-success", "isController": false}, {"data": [[1.69221732E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q16-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q5-success", "isController": false}, {"data": [[1.69221792E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q11-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q7-success", "isController": false}, {"data": [[1.69221672E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q5-success", "isController": false}, {"data": [[1.69221708E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q14-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q3-success", "isController": false}, {"data": [[1.69221768E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q13-success", "isController": false}, {"data": [[1.69221732E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q7-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q21-success", "isController": false}, {"data": [[1.69221792E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q19-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q12-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q8-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q12-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q3-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q6-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q2-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q11-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q19-success", "isController": false}, {"data": [[1.69221672E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q16-success", "isController": false}, {"data": [[1.69221762E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q22-success", "isController": false}, {"data": [[1.69221774E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q2-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q2-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q21-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF2-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q8-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q6-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q12-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q16-success", "isController": false}, {"data": [[1.69221744E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q8-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q7-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q21-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q14-success", "isController": false}, {"data": [[1.69221744E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q14-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q8-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q11-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q5-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q1-success", "isController": false}, {"data": [[1.69221792E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q6-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q1-success", "isController": false}, {"data": [[1.69221768E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q5-success", "isController": false}, {"data": [[1.69221708E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q19-success", "isController": false}, {"data": [[1.69221792E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q3-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q9-success", "isController": false}, {"data": [[1.69221768E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q7-success", "isController": false}, {"data": [[1.69221708E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q9-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q19-success", "isController": false}, {"data": [[1.69221768E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q19-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q16-success", "isController": false}, {"data": [[1.69221786E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q9-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q8-success", "isController": false}, {"data": [[1.6922175E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q14-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q14-success", "isController": false}, {"data": [[1.69221672E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q2-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q18-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q19-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q12-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q8-success", "isController": false}, {"data": [[1.6922175E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q4-success", "isController": false}, {"data": [[1.69221762E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q11-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q1-success", "isController": false}, {"data": [[1.69221732E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q5-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q11-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q11-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q14-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q2-success", "isController": false}, {"data": [[1.69221732E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q14-success", "isController": false}, {"data": [[1.69221762E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q4-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q11-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q11-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q15-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q6-success", "isController": false}, {"data": [[1.69221792E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q18-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q8-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q12-success", "isController": false}, {"data": [[1.69221708E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q4-success", "isController": false}, {"data": [[1.69221774E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q18-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q18-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q1-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q22-success", "isController": false}, {"data": [[1.69221768E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q9-success", "isController": false}, {"data": [[1.69221744E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q19-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q12-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q5-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q3-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q21-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q3-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q13-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q10-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q3-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q19-success", "isController": false}, {"data": [[1.69221672E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q7-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q7-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q11-success", "isController": false}, {"data": [[1.69221774E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF1-success", "isController": false}, {"data": [[1.69221732E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q21-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q4-success", "isController": false}, {"data": [[1.69221708E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q3-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q16-success", "isController": false}, {"data": [[1.69221768E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q4-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q16-success", "isController": false}, {"data": [[1.69221708E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q21-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q7-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q21-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q9-success", "isController": false}, {"data": [[1.69221672E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q10-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q9-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q15-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q13-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q6-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q10-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q16-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q21-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q6-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q2-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q13-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q15-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q6-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q12-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q6-success", "isController": false}, {"data": [[1.69221762E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q21-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q3-success", "isController": false}, {"data": [[1.69221792E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q9-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q10-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q5-success", "isController": false}, {"data": [[1.69221762E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q13-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q13-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q22-success", "isController": false}, {"data": [[1.69221672E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q2-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q3-success", "isController": false}, {"data": [[1.69221732E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q4-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q9-success", "isController": false}, {"data": [[1.69221768E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q18-success", "isController": false}, {"data": [[1.69221774E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q12-success", "isController": false}, {"data": [[1.69221792E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q16-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q12-success", "isController": false}, {"data": [[1.69221708E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q12-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q15-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q22-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q1-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q5-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q1-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q10-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q13-success", "isController": false}, {"data": [[1.6922175E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q13-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q16-success", "isController": false}, {"data": [[1.69221714E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q18-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q10-success", "isController": false}, {"data": [[1.6922175E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q15-success", "isController": false}, {"data": [[1.69221696E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q1-success", "isController": false}, {"data": [[1.69221732E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q5-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q22-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q22-success", "isController": false}, {"data": [[1.69221762E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q15-success", "isController": false}, {"data": [[1.6922175E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q9-success", "isController": false}, {"data": [[1.69221768E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q15-success", "isController": false}, {"data": [[1.69221744E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q13-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q2-success", "isController": false}, {"data": [[1.6922169E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q1-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q7-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q8-success", "isController": false}, {"data": [[1.69221744E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q18-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q5-success", "isController": false}, {"data": [[1.69221738E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q4-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q10-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q18-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q22-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q10-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q18-success", "isController": false}, {"data": [[1.69221792E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q2-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q22-success", "isController": false}, {"data": [[1.69221684E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q8-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q8-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q22-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q15-success", "isController": false}, {"data": [[1.69221678E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q6-success", "isController": false}, {"data": [[1.69221708E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q18-success", "isController": false}, {"data": [[1.6922172E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q4-success", "isController": false}, {"data": [[1.69221726E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q10-success", "isController": false}, {"data": [[1.69221702E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221792E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69221672E12, "maxY": 0.3, "series": [{"data": [[1.6922172E12, 0.2833333333333333], [1.69221702E12, 0.3], [1.69221786E12, 0.016666666666666666], [1.69221756E12, 0.11666666666666667], [1.69221726E12, 0.21666666666666667], [1.69221696E12, 0.23333333333333334], [1.69221744E12, 0.08333333333333333], [1.69221678E12, 0.26666666666666666], [1.69221714E12, 0.16666666666666666], [1.69221708E12, 0.15], [1.6922175E12, 0.11666666666666667], [1.69221672E12, 0.13333333333333333], [1.69221768E12, 0.13333333333333333], [1.69221738E12, 0.2], [1.69221684E12, 0.25], [1.69221774E12, 0.13333333333333333], [1.69221792E12, 0.13333333333333333], [1.69221762E12, 0.11666666666666667], [1.69221732E12, 0.13333333333333333], [1.6922169E12, 0.18333333333333332]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221792E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
