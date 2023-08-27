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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[3800.0, 1.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[50000.0, 1.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[4200.0, 1.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[21000.0, 1.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[5700.0, 1.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[20300.0, 1.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[57600.0, 1.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[31900.0, 1.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[24700.0, 1.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[129800.0, 1.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[4700.0, 1.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[363600.0, 1.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[8500.0, 1.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[44600.0, 1.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[16200.0, 1.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[9500.0, 1.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[18700.0, 1.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[106800.0, 1.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[67300.0, 1.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[70000.0, 1.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[11500.0, 1.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[17300.0, 1.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[179900.0, 1.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[12100.0, 1.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[18700.0, 1.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[27100.0, 1.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[72800.0, 1.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[171800.0, 1.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[101900.0, 1.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[23200.0, 1.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[48300.0, 1.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[9200.0, 1.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[35300.0, 1.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[8600.0, 1.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[13400.0, 1.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[70700.0, 1.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[7500.0, 1.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[204900.0, 1.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[97400.0, 1.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[27400.0, 1.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[366800.0, 1.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[24800.0, 1.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[19400.0, 1.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[29800.0, 1.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[97900.0, 1.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[498100.0, 1.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[13800.0, 1.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[26900.0, 1.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[4700.0, 1.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[5100.0, 1.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[22800.0, 1.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[25400.0, 1.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[4400.0, 1.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[2300.0, 1.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[96500.0, 1.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[6000.0, 1.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[76100.0, 1.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[29000.0, 1.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[5400.0, 1.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[8400.0, 1.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[48800.0, 1.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[24700.0, 1.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[30300.0, 1.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[53300.0, 1.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[31400.0, 1.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[144900.0, 1.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[21700.0, 1.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[19500.0, 1.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[5800.0, 1.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[14600.0, 1.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[148300.0, 1.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[21900.0, 1.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[5900.0, 1.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[755300.0, 1.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[22100.0, 1.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[15000.0, 1.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[6700.0, 1.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[30700.0, 1.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[15600.0, 1.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[5000.0, 1.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[9200.0, 1.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[29000.0, 1.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[162200.0, 1.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[24600.0, 1.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[50800.0, 1.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[67600.0, 1.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[33600.0, 1.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[29200.0, 1.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[16800.0, 1.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[38600.0, 1.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[17600.0, 1.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[50200.0, 1.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[16500.0, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[7900.0, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[60000.0, 1.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[18900.0, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[5400.0, 1.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[20700.0, 1.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[7000.0, 1.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[25200.0, 1.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[25700.0, 1.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[470700.0, 1.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[4200.0, 1.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[20400.0, 1.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[11600.0, 1.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[21300.0, 1.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[7600.0, 1.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[53100.0, 1.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[209300.0, 1.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[34200.0, 1.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[13900.0, 1.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[51800.0, 1.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[13600.0, 1.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[8400.0, 1.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[61800.0, 1.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[83800.0, 1.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[8800.0, 1.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[30000.0, 1.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[88300.0, 1.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[19700.0, 1.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[304200.0, 1.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[4700.0, 1.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[68700.0, 1.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[11500.0, 1.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[76400.0, 1.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[8500.0, 1.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[4200.0, 1.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[64800.0, 1.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[13500.0, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[35900.0, 1.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[637800.0, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[98300.0, 1.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[52400.0, 1.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[405300.0, 1.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[21500.0, 1.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[11600.0, 1.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[51800.0, 1.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[26600.0, 1.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[11800.0, 1.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[26300.0, 1.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[8000.0, 1.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[127500.0, 1.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[5400.0, 1.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[8200.0, 1.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[29300.0, 1.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[42100.0, 1.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[4900.0, 1.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[10000.0, 1.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[68300.0, 1.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[23200.0, 1.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[29400.0, 1.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[75200.0, 1.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[29700.0, 1.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[40600.0, 1.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[20000.0, 1.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[80600.0, 1.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[398100.0, 1.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[63200.0, 1.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[450800.0, 1.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[94200.0, 1.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[10600.0, 1.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[29800.0, 1.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[91200.0, 1.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 755300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 197.0, "series": [{"data": [[0.0, 4.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 3.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 197.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69220634E12, "maxY": 1.0, "series": [{"data": [[1.69220718E12, 1.0], [1.69220766E12, 1.0], [1.692207E12, 1.0], [1.69220712E12, 1.0], [1.69220646E12, 1.0], [1.69220772E12, 1.0], [1.69220706E12, 1.0], [1.6922064E12, 1.0], [1.69220658E12, 1.0]], "isOverall": false, "label": "T4", "isController": false}, {"data": [[1.69220748E12, 1.0], [1.69220682E12, 1.0], [1.6922073E12, 1.0], [1.69220664E12, 1.0], [1.69220634E12, 1.0], [1.69220742E12, 1.0], [1.69220676E12, 1.0], [1.69220646E12, 1.0], [1.6922064E12, 1.0], [1.69220688E12, 1.0], [1.69220736E12, 1.0], [1.69220658E12, 1.0]], "isOverall": false, "label": "T5", "isController": false}, {"data": [[1.69220718E12, 1.0], [1.692207E12, 1.0], [1.69220682E12, 1.0], [1.69220634E12, 1.0], [1.69220694E12, 1.0], [1.69220676E12, 1.0], [1.69220646E12, 1.0], [1.6922064E12, 1.0], [1.69220688E12, 1.0], [1.69220658E12, 1.0]], "isOverall": false, "label": "G1", "isController": false}, {"data": [[1.6922067E12, 1.0], [1.692207E12, 1.0], [1.69220682E12, 1.0], [1.69220664E12, 1.0], [1.69220712E12, 1.0], [1.69220694E12, 1.0], [1.69220676E12, 1.0], [1.69220646E12, 1.0], [1.69220706E12, 1.0], [1.6922064E12, 1.0], [1.69220688E12, 1.0]], "isOverall": false, "label": "G2", "isController": false}, {"data": [[1.69220748E12, 1.0], [1.69220742E12, 1.0], [1.69220754E12, 1.0], [1.6922064E12, 1.0], [1.69220736E12, 1.0], [1.69220658E12, 1.0]], "isOverall": false, "label": "G3", "isController": false}, {"data": [[1.69220718E12, 1.0], [1.692207E12, 1.0], [1.69220712E12, 1.0], [1.69220694E12, 1.0], [1.69220724E12, 1.0], [1.69220646E12, 1.0], [1.69220706E12, 1.0], [1.6922064E12, 1.0]], "isOverall": false, "label": "G4", "isController": false}, {"data": [[1.6922067E12, 1.0], [1.69220766E12, 1.0], [1.69220652E12, 1.0], [1.69220748E12, 1.0], [1.69220682E12, 1.0], [1.69220664E12, 1.0], [1.6922076E12, 1.0], [1.69220742E12, 1.0], [1.69220676E12, 1.0], [1.69220646E12, 1.0], [1.69220754E12, 1.0], [1.69220658E12, 1.0]], "isOverall": false, "label": "T1", "isController": false}, {"data": [[1.6922067E12, 1.0], [1.69220682E12, 1.0], [1.6922073E12, 1.0], [1.69220664E12, 1.0], [1.69220694E12, 1.0], [1.69220724E12, 1.0], [1.69220646E12, 1.0], [1.6922064E12, 1.0], [1.69220688E12, 1.0], [1.69220658E12, 1.0]], "isOverall": false, "label": "G5", "isController": false}, {"data": [[1.69220748E12, 1.0], [1.6922073E12, 1.0], [1.69220664E12, 1.0], [1.69220712E12, 1.0], [1.69220742E12, 1.0], [1.69220676E12, 1.0], [1.69220724E12, 1.0], [1.6922064E12, 1.0], [1.69220736E12, 1.0]], "isOverall": false, "label": "T2", "isController": false}, {"data": [[1.69220748E12, 1.0], [1.69220682E12, 1.0], [1.6922076E12, 1.0], [1.69220694E12, 1.0], [1.69220742E12, 1.0], [1.69220646E12, 1.0], [1.69220754E12, 1.0]], "isOverall": false, "label": "T3", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69220772E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 6.0, "minX": 1.0, "maxY": 755371.0, "series": [{"data": [[10.0, 3891.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[10.0, 3891.0]], "isOverall": false, "label": "G2 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 50031.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[10.0, 50031.0]], "isOverall": false, "label": "G2 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 4246.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[10.0, 4246.0]], "isOverall": false, "label": "G2 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 2758.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[10.0, 2758.0]], "isOverall": false, "label": "G2 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 21073.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[10.0, 21073.0]], "isOverall": false, "label": "G2 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 1818.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[10.0, 1818.0]], "isOverall": false, "label": "G2 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 5702.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[10.0, 5702.0]], "isOverall": false, "label": "G2 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 20333.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[10.0, 20333.0]], "isOverall": false, "label": "G2 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 57609.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[10.0, 57609.0]], "isOverall": false, "label": "G2 - Q9-Aggregated", "isController": false}, {"data": [[9.0, 31918.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[9.0, 31918.0]], "isOverall": false, "label": "G4 - Q9-Aggregated", "isController": false}, {"data": [[3.0, 24762.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[3.0, 24762.0]], "isOverall": false, "label": "T3 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 129858.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[10.0, 129858.0]], "isOverall": false, "label": "T3 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 3691.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[10.0, 3691.0]], "isOverall": false, "label": "G4 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 4743.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[10.0, 4743.0]], "isOverall": false, "label": "G4 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 363678.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[10.0, 363678.0]], "isOverall": false, "label": "T3 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 8574.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[10.0, 8574.0]], "isOverall": false, "label": "G4 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 44671.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[10.0, 44671.0]], "isOverall": false, "label": "G4 - Q6-Aggregated", "isController": false}, {"data": [[5.0, 16206.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[5.0, 16206.0]], "isOverall": false, "label": "T3 - Q14-Aggregated", "isController": false}, {"data": [[9.0, 5214.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[9.0, 5214.0]], "isOverall": false, "label": "G4 - Q3-Aggregated", "isController": false}, {"data": [[9.0, 9576.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[9.0, 9576.0]], "isOverall": false, "label": "G4 - Q4-Aggregated", "isController": false}, {"data": [[4.0, 3036.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[4.0, 3036.0]], "isOverall": false, "label": "T3 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 18797.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[10.0, 18797.0]], "isOverall": false, "label": "G4 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 1545.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[10.0, 1545.0]], "isOverall": false, "label": "G4 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 106885.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[10.0, 106885.0]], "isOverall": false, "label": "T4 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 67315.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[10.0, 67315.0]], "isOverall": false, "label": "T4 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 70076.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[10.0, 70076.0]], "isOverall": false, "label": "T4 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 11555.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[10.0, 11555.0]], "isOverall": false, "label": "T3 - Q22-Aggregated", "isController": false}, {"data": [[4.0, 17317.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[4.0, 17317.0]], "isOverall": false, "label": "T3 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 179965.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[10.0, 179965.0]], "isOverall": false, "label": "G1 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 12109.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[10.0, 12109.0]], "isOverall": false, "label": "G1 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 18711.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[10.0, 18711.0]], "isOverall": false, "label": "G1 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 27161.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[10.0, 27161.0]], "isOverall": false, "label": "G1 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 72820.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[10.0, 72820.0]], "isOverall": false, "label": "G1 - Q16-Aggregated", "isController": false}, {"data": [[9.0, 171879.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[9.0, 171879.0]], "isOverall": false, "label": "G1 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 101981.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[10.0, 101981.0]], "isOverall": false, "label": "G1 - Q18-Aggregated", "isController": false}, {"data": [[7.0, 23288.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[7.0, 23288.0]], "isOverall": false, "label": "G5 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 48349.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[10.0, 48349.0]], "isOverall": false, "label": "G5 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 3607.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[10.0, 3607.0]], "isOverall": false, "label": "G1 - Q10-Aggregated", "isController": false}, {"data": [[6.0, 9242.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[6.0, 9242.0]], "isOverall": false, "label": "T3 - Q11-Aggregated", "isController": false}, {"data": [[9.0, 35373.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[9.0, 35373.0]], "isOverall": false, "label": "G1 - Q19-Aggregated", "isController": false}, {"data": [[4.0, 8699.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[4.0, 8699.0]], "isOverall": false, "label": "T3 - Q10-Aggregated", "isController": false}, {"data": [[3.0, 13426.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[3.0, 13426.0]], "isOverall": false, "label": "T3 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 70725.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[10.0, 70725.0]], "isOverall": false, "label": "T3 - Q12-Aggregated", "isController": false}, {"data": [[7.0, 7515.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[7.0, 7515.0]], "isOverall": false, "label": "T2 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 204909.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[10.0, 204909.0]], "isOverall": false, "label": "T2 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 97421.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[10.0, 97421.0]], "isOverall": false, "label": "T2 - Q19-Aggregated", "isController": false}, {"data": [[5.0, 27416.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[5.0, 27416.0]], "isOverall": false, "label": "T2 - Q18-Aggregated", "isController": false}, {"data": [[7.0, 5542.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[7.0, 5542.0]], "isOverall": false, "label": "T2 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 366827.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[10.0, 366827.0]], "isOverall": false, "label": "T2 - Q15-Aggregated", "isController": false}, {"data": [[6.0, 24885.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[6.0, 24885.0]], "isOverall": false, "label": "T2 - Q14-Aggregated", "isController": false}, {"data": [[6.0, 19408.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[6.0, 19408.0]], "isOverall": false, "label": "T2 - Q13-Aggregated", "isController": false}, {"data": [[6.0, 29840.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[6.0, 29840.0]], "isOverall": false, "label": "T2 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 97948.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[10.0, 97948.0]], "isOverall": false, "label": "T2 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 6180.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[10.0, 6180.0]], "isOverall": false, "label": "T2 - Q10-Aggregated", "isController": false}, {"data": [[1.0, 498108.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.0, 498108.0]], "isOverall": false, "label": "T4 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 5639.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[10.0, 5639.0]], "isOverall": false, "label": "T4 - Q8-Aggregated", "isController": false}, {"data": [[1.0, 13895.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.0, 13895.0]], "isOverall": false, "label": "T4 - Q7-Aggregated", "isController": false}, {"data": [[1.0, 26977.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.0, 26977.0]], "isOverall": false, "label": "T4 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 4700.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[10.0, 4700.0]], "isOverall": false, "label": "T4 - Q5-Aggregated", "isController": false}, {"data": [[9.0, 5128.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[9.0, 5128.0]], "isOverall": false, "label": "T4 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 22866.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[10.0, 22866.0]], "isOverall": false, "label": "T4 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 3869.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[10.0, 3869.0]], "isOverall": false, "label": "T4 - Q2-Aggregated", "isController": false}, {"data": [[9.0, 25495.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[9.0, 25495.0]], "isOverall": false, "label": "T4 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 4482.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[10.0, 4482.0]], "isOverall": false, "label": "G5 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 2308.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[10.0, 2308.0]], "isOverall": false, "label": "G5 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 96594.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[10.0, 96594.0]], "isOverall": false, "label": "G5 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 6092.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[10.0, 6092.0]], "isOverall": false, "label": "G5 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 76133.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[10.0, 76133.0]], "isOverall": false, "label": "G5 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 3772.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[10.0, 3772.0]], "isOverall": false, "label": "G5 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 4801.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[10.0, 4801.0]], "isOverall": false, "label": "G5 - Q4-Aggregated", "isController": false}, {"data": [[7.0, 29077.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[7.0, 29077.0]], "isOverall": false, "label": "G5 - Q9-Aggregated", "isController": false}, {"data": [[7.0, 5486.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[7.0, 5486.0]], "isOverall": false, "label": "G5 - Q8-Aggregated", "isController": false}, {"data": [[6.0, 8425.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[6.0, 8425.0]], "isOverall": false, "label": "T5 - Q3-Aggregated", "isController": false}, {"data": [[6.0, 5629.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[6.0, 5629.0]], "isOverall": false, "label": "T5 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 48819.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[10.0, 48819.0]], "isOverall": false, "label": "T5 - Q5-Aggregated", "isController": false}, {"data": [[6.0, 24740.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[6.0, 24740.0]], "isOverall": false, "label": "T5 - Q6-Aggregated", "isController": false}, {"data": [[6.0, 30355.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[6.0, 30355.0]], "isOverall": false, "label": "T5 - Q1-Aggregated", "isController": false}, {"data": [[6.0, 1087.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[6.0, 1087.0]], "isOverall": false, "label": "T5 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 53362.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[10.0, 53362.0]], "isOverall": false, "label": "T5 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 31429.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[10.0, 31429.0]], "isOverall": false, "label": "T5 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 144937.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[10.0, 144937.0]], "isOverall": false, "label": "T5 - Q9-Aggregated", "isController": false}, {"data": [[4.0, 21734.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[4.0, 21734.0]], "isOverall": false, "label": "G3 - Q19-Aggregated", "isController": false}, {"data": [[4.0, 19530.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[4.0, 19530.0]], "isOverall": false, "label": "G3 - Q18-Aggregated", "isController": false}, {"data": [[6.0, 3818.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[6.0, 3818.0]], "isOverall": false, "label": "G3 - Q3-Aggregated", "isController": false}, {"data": [[5.0, 700.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[5.0, 700.0]], "isOverall": false, "label": "G3 - Q2-Aggregated", "isController": false}, {"data": [[6.0, 5863.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[6.0, 5863.0]], "isOverall": false, "label": "G3 - Q5-Aggregated", "isController": false}, {"data": [[6.0, 3997.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[6.0, 3997.0]], "isOverall": false, "label": "G3 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 14625.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[10.0, 14625.0]], "isOverall": false, "label": "G3 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 148320.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[10.0, 148320.0]], "isOverall": false, "label": "G3 - Q6-Aggregated", "isController": false}, {"data": [[6.0, 21922.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[6.0, 21922.0]], "isOverall": false, "label": "G3 - Q9-Aggregated", "isController": false}, {"data": [[6.0, 5917.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[6.0, 5917.0]], "isOverall": false, "label": "G3 - Q8-Aggregated", "isController": false}, {"data": [[6.0, 755371.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[6.0, 755371.0]], "isOverall": false, "label": "G3 - Q15-Aggregated", "isController": false}, {"data": [[6.0, 3327.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[6.0, 3327.0]], "isOverall": false, "label": "G3 - Q16-Aggregated", "isController": false}, {"data": [[6.0, 22179.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[6.0, 22179.0]], "isOverall": false, "label": "G3 - Q13-Aggregated", "isController": false}, {"data": [[4.0, 15065.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[4.0, 15065.0]], "isOverall": false, "label": "G3 - Q14-Aggregated", "isController": false}, {"data": [[5.0, 6726.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[5.0, 6726.0]], "isOverall": false, "label": "G3 - Q11-Aggregated", "isController": false}, {"data": [[6.0, 30738.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[6.0, 30738.0]], "isOverall": false, "label": "G3 - Q12-Aggregated", "isController": false}, {"data": [[4.0, 15651.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[4.0, 15651.0]], "isOverall": false, "label": "G3 - Q1-Aggregated", "isController": false}, {"data": [[5.0, 5003.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[5.0, 5003.0]], "isOverall": false, "label": "G3 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 9206.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[10.0, 9206.0]], "isOverall": false, "label": "G1 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 29037.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[10.0, 29037.0]], "isOverall": false, "label": "G1 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 162236.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[10.0, 162236.0]], "isOverall": false, "label": "T1 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 2900.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[10.0, 2900.0]], "isOverall": false, "label": "G1 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 4826.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[10.0, 4826.0]], "isOverall": false, "label": "G1 - Q4-Aggregated", "isController": false}, {"data": [[3.0, 3188.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[3.0, 3188.0]], "isOverall": false, "label": "T1 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 24659.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[10.0, 24659.0]], "isOverall": false, "label": "T1 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 50811.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[10.0, 50811.0]], "isOverall": false, "label": "G1 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 67645.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[10.0, 67645.0]], "isOverall": false, "label": "T1 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 757.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[10.0, 757.0]], "isOverall": false, "label": "G1 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 33686.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[10.0, 33686.0]], "isOverall": false, "label": "G1 - Q1-Aggregated", "isController": false}, {"data": [[4.0, 29237.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[4.0, 29237.0]], "isOverall": false, "label": "T1 - Q15-Aggregated", "isController": false}, {"data": [[3.0, 16876.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[3.0, 16876.0]], "isOverall": false, "label": "T1 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 38653.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[10.0, 38653.0]], "isOverall": false, "label": "G1 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 17682.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[10.0, 17682.0]], "isOverall": false, "label": "G1 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 50231.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[10.0, 50231.0]], "isOverall": false, "label": "T1 - Q22-Aggregated", "isController": false}, {"data": [[3.0, 16597.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[3.0, 16597.0]], "isOverall": false, "label": "T1 - Q21-Aggregated", "isController": false}, {"data": [[2.0, 7922.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[2.0, 7922.0]], "isOverall": false, "label": "T1 - Q16-Aggregated", "isController": false}, {"data": [[4.0, 60092.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[4.0, 60092.0]], "isOverall": false, "label": "T1 - Q19-Aggregated", "isController": false}, {"data": [[3.0, 18916.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[3.0, 18916.0]], "isOverall": false, "label": "T1 - Q18-Aggregated", "isController": false}, {"data": [[6.0, 5239.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[6.0, 5239.0]], "isOverall": false, "label": "T5 - Q11-Aggregated", "isController": false}, {"data": [[6.0, 5404.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[6.0, 5404.0]], "isOverall": false, "label": "T5 - Q10-Aggregated", "isController": false}, {"data": [[4.0, 20746.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[4.0, 20746.0]], "isOverall": false, "label": "T3 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 7011.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[10.0, 7011.0]], "isOverall": false, "label": "T3 - Q8-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "T1 - RF2-Aggregated", "isController": false}, {"data": [[3.0, 2760.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[3.0, 2760.0]], "isOverall": false, "label": "T3 - Q5-Aggregated", "isController": false}, {"data": [[6.0, 25216.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[6.0, 25216.0]], "isOverall": false, "label": "T3 - Q6-Aggregated", "isController": false}, {"data": [[9.0, 25752.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[9.0, 25752.0]], "isOverall": false, "label": "G4 - Q21-Aggregated", "isController": false}, {"data": [[6.0, 470764.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[6.0, 470764.0]], "isOverall": false, "label": "T3 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 4285.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[10.0, 4285.0]], "isOverall": false, "label": "G4 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 20487.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[10.0, 20487.0]], "isOverall": false, "label": "T3 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 6.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[10.0, 6.0]], "isOverall": false, "label": "G1 - RF2-Aggregated", "isController": false}, {"data": [[10.0, 11640.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[10.0, 11640.0]], "isOverall": false, "label": "T3 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 7.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[10.0, 7.0]], "isOverall": false, "label": "G1 - RF1-Aggregated", "isController": false}, {"data": [[6.0, 162.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[6.0, 162.0]], "isOverall": false, "label": "T1 - RF1-Aggregated", "isController": false}, {"data": [[3.0, 21351.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[3.0, 21351.0]], "isOverall": false, "label": "T3 - Q1-Aggregated", "isController": false}, {"data": [[3.0, 7636.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[3.0, 7636.0]], "isOverall": false, "label": "T3 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 53147.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[10.0, 53147.0]], "isOverall": false, "label": "G2 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 4884.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[10.0, 4884.0]], "isOverall": false, "label": "G1 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 209326.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[10.0, 209326.0]], "isOverall": false, "label": "G2 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 34256.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[10.0, 34256.0]], "isOverall": false, "label": "G2 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 13999.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[10.0, 13999.0]], "isOverall": false, "label": "G2 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 51852.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[10.0, 51852.0]], "isOverall": false, "label": "G2 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 13660.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[10.0, 13660.0]], "isOverall": false, "label": "G2 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 8460.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[10.0, 8460.0]], "isOverall": false, "label": "G2 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 6165.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[10.0, 6165.0]], "isOverall": false, "label": "G5 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 61826.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[10.0, 61826.0]], "isOverall": false, "label": "G5 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 83825.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[10.0, 83825.0]], "isOverall": false, "label": "G5 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 8840.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[10.0, 8840.0]], "isOverall": false, "label": "G5 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 30088.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[10.0, 30088.0]], "isOverall": false, "label": "G1 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 88316.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[10.0, 88316.0]], "isOverall": false, "label": "G5 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 19751.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[10.0, 19751.0]], "isOverall": false, "label": "G5 - Q18-Aggregated", "isController": false}, {"data": [[7.0, 304297.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[7.0, 304297.0]], "isOverall": false, "label": "G5 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 4721.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[10.0, 4721.0]], "isOverall": false, "label": "G5 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 68748.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[10.0, 68748.0]], "isOverall": false, "label": "G5 - Q19-Aggregated", "isController": false}, {"data": [[2.0, 11580.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[2.0, 11580.0]], "isOverall": false, "label": "T1 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 76444.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[10.0, 76444.0]], "isOverall": false, "label": "T1 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 8535.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[10.0, 8535.0]], "isOverall": false, "label": "T1 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 5237.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[10.0, 5237.0]], "isOverall": false, "label": "T1 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 4247.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[10.0, 4247.0]], "isOverall": false, "label": "T1 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 64805.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[10.0, 64805.0]], "isOverall": false, "label": "T1 - Q6-Aggregated", "isController": false}, {"data": [[2.0, 13512.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[2.0, 13512.0]], "isOverall": false, "label": "T1 - Q7-Aggregated", "isController": false}, {"data": [[4.0, 5602.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[4.0, 5602.0]], "isOverall": false, "label": "T1 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 35992.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[10.0, 35992.0]], "isOverall": false, "label": "G2 - Q19-Aggregated", "isController": false}, {"data": [[6.0, 637890.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[6.0, 637890.0]], "isOverall": false, "label": "T1 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 98308.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[10.0, 98308.0]], "isOverall": false, "label": "G2 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 6308.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[10.0, 6308.0]], "isOverall": false, "label": "G2 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 52482.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[10.0, 52482.0]], "isOverall": false, "label": "G2 - Q21-Aggregated", "isController": false}, {"data": [[1.0, 2133.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.0, 2133.0]], "isOverall": false, "label": "T4 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 405362.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[10.0, 405362.0]], "isOverall": false, "label": "T4 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 21515.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[10.0, 21515.0]], "isOverall": false, "label": "T4 - Q14-Aggregated", "isController": false}, {"data": [[1.0, 11697.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.0, 11697.0]], "isOverall": false, "label": "T4 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 51874.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[10.0, 51874.0]], "isOverall": false, "label": "T4 - Q19-Aggregated", "isController": false}, {"data": [[9.0, 26611.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[9.0, 26611.0]], "isOverall": false, "label": "T4 - Q18-Aggregated", "isController": false}, {"data": [[9.0, 5578.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[9.0, 5578.0]], "isOverall": false, "label": "T4 - Q22-Aggregated", "isController": false}, {"data": [[1.0, 11882.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.0, 11882.0]], "isOverall": false, "label": "T4 - Q21-Aggregated", "isController": false}, {"data": [[6.0, 26390.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[6.0, 26390.0]], "isOverall": false, "label": "T2 - Q1-Aggregated", "isController": false}, {"data": [[9.0, 8071.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[9.0, 8071.0]], "isOverall": false, "label": "T2 - Q3-Aggregated", "isController": false}, {"data": [[5.0, 2496.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[5.0, 2496.0]], "isOverall": false, "label": "T2 - Q2-Aggregated", "isController": false}, {"data": [[7.0, 127553.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[7.0, 127553.0]], "isOverall": false, "label": "T2 - Q9-Aggregated", "isController": false}, {"data": [[6.0, 5446.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[6.0, 5446.0]], "isOverall": false, "label": "T2 - Q8-Aggregated", "isController": false}, {"data": [[9.0, 4085.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[9.0, 4085.0]], "isOverall": false, "label": "G4 - Q16-Aggregated", "isController": false}, {"data": [[7.0, 8281.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[7.0, 8281.0]], "isOverall": false, "label": "T2 - Q5-Aggregated", "isController": false}, {"data": [[7.0, 29330.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[7.0, 29330.0]], "isOverall": false, "label": "T2 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 42133.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[10.0, 42133.0]], "isOverall": false, "label": "G4 - Q18-Aggregated", "isController": false}, {"data": [[6.0, 4988.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[6.0, 4988.0]], "isOverall": false, "label": "T5 - Q22-Aggregated", "isController": false}, {"data": [[6.0, 10014.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[6.0, 10014.0]], "isOverall": false, "label": "T2 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 68326.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[10.0, 68326.0]], "isOverall": false, "label": "G4 - Q19-Aggregated", "isController": false}, {"data": [[6.0, 23245.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[6.0, 23245.0]], "isOverall": false, "label": "T2 - Q6-Aggregated", "isController": false}, {"data": [[6.0, 29432.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[6.0, 29432.0]], "isOverall": false, "label": "T5 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 75227.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[10.0, 75227.0]], "isOverall": false, "label": "T5 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 29764.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[10.0, 29764.0]], "isOverall": false, "label": "G4 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 40605.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[10.0, 40605.0]], "isOverall": false, "label": "T5 - Q12-Aggregated", "isController": false}, {"data": [[8.0, 20018.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[8.0, 20018.0]], "isOverall": false, "label": "G4 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 80652.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[10.0, 80652.0]], "isOverall": false, "label": "G4 - Q14-Aggregated", "isController": false}, {"data": [[7.0, 398132.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[7.0, 398132.0]], "isOverall": false, "label": "T5 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 63217.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[10.0, 63217.0]], "isOverall": false, "label": "T5 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 450814.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[10.0, 450814.0]], "isOverall": false, "label": "G4 - Q15-Aggregated", "isController": false}, {"data": [[6.0, 5227.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[6.0, 5227.0]], "isOverall": false, "label": "T5 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 94208.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[10.0, 94208.0]], "isOverall": false, "label": "T5 - Q19-Aggregated", "isController": false}, {"data": [[9.0, 10681.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[9.0, 10681.0]], "isOverall": false, "label": "G4 - Q10-Aggregated", "isController": false}, {"data": [[8.0, 3204.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[8.0, 3204.0]], "isOverall": false, "label": "G4 - Q11-Aggregated", "isController": false}, {"data": [[6.0, 29881.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[6.0, 29881.0]], "isOverall": false, "label": "T5 - Q18-Aggregated", "isController": false}, {"data": [[6.0, 5337.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[6.0, 5337.0]], "isOverall": false, "label": "G3 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 91204.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}, {"data": [[10.0, 91204.0]], "isOverall": false, "label": "G3 - Q21-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.69220634E12, "maxY": 23133.9, "series": [{"data": [[1.69220718E12, 122.0], [1.69220652E12, 5.2], [1.69220748E12, 11468.483333333334], [1.69220682E12, 1968.9833333333333], [1.69220712E12, 4935.616666666667], [1.69220742E12, 11576.283333333333], [1.69220676E12, 3887.6833333333334], [1.69220646E12, 21032.75], [1.69220772E12, 54.083333333333336], [1.69220706E12, 6.65], [1.6922064E12, 207.11666666666667], [1.69220736E12, 1235.8833333333334], [1.6922067E12, 1681.5666666666666], [1.69220766E12, 23133.9], [1.692207E12, 127.8], [1.6922073E12, 6373.966666666666], [1.69220664E12, 257.81666666666666], [1.6922076E12, 432.23333333333335], [1.69220634E12, 8.133333333333333], [1.69220694E12, 127.78333333333333], [1.69220724E12, 9805.216666666667], [1.69220754E12, 133.51666666666668], [1.69220688E12, 851.7333333333333], [1.69220658E12, 37.43333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69220718E12, 0.0], [1.69220652E12, 0.0], [1.69220748E12, 0.0], [1.69220682E12, 0.0], [1.69220712E12, 0.0], [1.69220742E12, 0.0], [1.69220676E12, 0.0], [1.69220646E12, 0.0], [1.69220772E12, 0.0], [1.69220706E12, 0.0], [1.6922064E12, 0.0], [1.69220736E12, 0.0], [1.6922067E12, 0.0], [1.69220766E12, 0.0], [1.692207E12, 0.0], [1.6922073E12, 0.0], [1.69220664E12, 0.0], [1.6922076E12, 0.0], [1.69220634E12, 0.0], [1.69220694E12, 0.0], [1.69220724E12, 0.0], [1.69220754E12, 0.0], [1.69220688E12, 0.0], [1.69220658E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69220772E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 6.0, "minX": 1.69220634E12, "maxY": 755371.0, "series": [{"data": [[1.69220688E12, 3891.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[1.69220706E12, 50031.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[1.69220688E12, 4246.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[1.692207E12, 2758.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[1.69220694E12, 21073.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[1.6922067E12, 1818.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[1.69220682E12, 5702.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[1.69220646E12, 20333.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[1.69220676E12, 57609.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[1.69220712E12, 31918.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[1.6922076E12, 24762.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.69220646E12, 129858.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.692207E12, 3691.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[1.692207E12, 4743.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[1.69220682E12, 363678.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.692207E12, 8574.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[1.69220706E12, 44671.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[1.69220748E12, 16206.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69220712E12, 5214.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[1.69220718E12, 9576.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[1.69220748E12, 3036.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.692207E12, 18797.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[1.69220712E12, 1545.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[1.69220658E12, 106885.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69220646E12, 67315.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.6922064E12, 70076.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69220694E12, 11555.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69220754E12, 17317.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69220676E12, 179965.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[1.69220688E12, 12109.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[1.692207E12, 18711.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[1.69220634E12, 27161.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[1.69220646E12, 72820.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[1.69220718E12, 171879.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[1.69220658E12, 101981.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[1.69220724E12, 23288.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[1.69220664E12, 48349.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[1.69220694E12, 3607.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[1.69220742E12, 9242.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.69220718E12, 35373.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[1.69220748E12, 8699.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.6922076E12, 13426.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69220694E12, 70725.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69220724E12, 7515.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69220664E12, 204909.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.6922064E12, 97421.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69220748E12, 27416.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69220724E12, 5542.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69220712E12, 366827.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.6922073E12, 24885.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69220748E12, 19408.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.69220736E12, 29840.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.69220676E12, 97948.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69220664E12, 6180.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69220766E12, 498108.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69220712E12, 5639.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69220766E12, 13895.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.69220772E12, 26977.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.69220706E12, 4700.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.69220712E12, 5128.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.6922064E12, 22866.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69220712E12, 3869.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.69220712E12, 25495.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69220694E12, 4482.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[1.6922067E12, 2308.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[1.69220646E12, 96594.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[1.6922067E12, 6092.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[1.69220688E12, 76133.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[1.69220694E12, 3772.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[1.69220694E12, 4801.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[1.6922073E12, 29077.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[1.6922073E12, 5486.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[1.69220736E12, 8425.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69220742E12, 5629.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69220634E12, 48819.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69220736E12, 24740.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.6922073E12, 30355.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69220736E12, 1087.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69220664E12, 53362.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.6922064E12, 31429.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69220676E12, 144937.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69220754E12, 21734.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[1.69220754E12, 19530.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[1.69220742E12, 3818.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[1.69220748E12, 700.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[1.69220736E12, 5863.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[1.69220748E12, 3997.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[1.6922064E12, 14625.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[1.69220658E12, 148320.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[1.69220736E12, 21922.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[1.69220736E12, 5917.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[1.69220736E12, 755371.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[1.69220736E12, 3327.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[1.69220742E12, 22179.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[1.69220748E12, 15065.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[1.69220748E12, 6726.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[1.69220742E12, 30738.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[1.69220754E12, 15651.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[1.69220748E12, 5003.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[1.69220688E12, 9206.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[1.69220694E12, 29037.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[1.69220646E12, 162236.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.692207E12, 2900.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[1.69220694E12, 4826.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[1.6922076E12, 3188.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69220652E12, 24659.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69220682E12, 50811.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[1.69220658E12, 67645.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69220658E12, 757.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[1.69220688E12, 33686.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[1.69220754E12, 29237.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6922076E12, 16876.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.6922064E12, 38653.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[1.6922064E12, 17682.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[1.69220664E12, 50231.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69220754E12, 16597.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69220766E12, 7922.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69220748E12, 60092.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.6922076E12, 18916.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69220742E12, 5239.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69220736E12, 5404.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69220754E12, 20746.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69220694E12, 7011.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.6922076E12, 9.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69220754E12, 2760.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69220748E12, 25216.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.69220718E12, 25752.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[1.69220742E12, 470764.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69220712E12, 4285.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[1.69220646E12, 20487.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.692207E12, 6.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[1.69220694E12, 11640.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69220694E12, 7.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[1.69220742E12, 162.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69220754E12, 21351.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.6922076E12, 7636.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.6922067E12, 53147.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[1.69220694E12, 4884.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[1.69220664E12, 209326.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[1.69220688E12, 34256.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[1.69220694E12, 13999.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[1.69220682E12, 51852.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[1.692207E12, 13660.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[1.69220664E12, 8460.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[1.69220664E12, 6165.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[1.6922067E12, 61826.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[1.69220658E12, 83825.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[1.69220688E12, 8840.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[1.69220694E12, 30088.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[1.69220682E12, 88316.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[1.69220694E12, 19751.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[1.69220724E12, 304297.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[1.69220682E12, 4721.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[1.6922064E12, 68748.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[1.6922076E12, 11580.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.6922067E12, 76444.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69220676E12, 8535.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69220664E12, 5237.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.6922067E12, 4247.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69220682E12, 64805.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69220766E12, 13512.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69220754E12, 5602.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69220712E12, 35992.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[1.69220742E12, 637890.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.6922064E12, 98308.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[1.692207E12, 6308.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[1.692207E12, 52482.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[1.69220766E12, 2133.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.692207E12, 405362.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.69220706E12, 21515.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.69220772E12, 11697.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69220706E12, 51874.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69220718E12, 26611.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69220712E12, 5578.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69220772E12, 11882.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69220742E12, 26390.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69220712E12, 8071.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69220748E12, 2496.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69220724E12, 127553.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69220736E12, 5446.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69220712E12, 4085.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[1.6922073E12, 8281.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.6922073E12, 29330.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69220694E12, 42133.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[1.69220742E12, 4988.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.69220742E12, 10014.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.6922064E12, 68326.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[1.69220742E12, 23245.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.69220748E12, 29432.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.69220646E12, 75227.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69220706E12, 29764.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[1.69220688E12, 40605.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69220724E12, 20018.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[1.69220646E12, 80652.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[1.6922073E12, 398132.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69220682E12, 63217.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.69220694E12, 450814.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[1.6922073E12, 5227.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.69220658E12, 94208.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69220718E12, 10681.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[1.69220724E12, 3204.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[1.69220742E12, 29881.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69220742E12, 5337.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[1.6922064E12, 91204.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69220772E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 6.0, "minX": 1.69220634E12, "maxY": 755371.0, "series": [{"data": [[1.69220688E12, 3891.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[1.69220706E12, 50030.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[1.69220688E12, 4246.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[1.692207E12, 2758.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[1.69220694E12, 21073.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[1.6922067E12, 1818.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[1.69220682E12, 5701.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[1.69220646E12, 20332.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[1.69220676E12, 57608.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[1.69220712E12, 31918.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[1.6922076E12, 24762.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.69220646E12, 129857.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.692207E12, 3691.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[1.692207E12, 4743.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[1.69220682E12, 363678.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.692207E12, 8574.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[1.69220706E12, 44671.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[1.69220748E12, 16206.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69220712E12, 5214.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[1.69220718E12, 9576.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[1.69220748E12, 2964.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.692207E12, 18797.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[1.69220712E12, 1544.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[1.69220658E12, 106885.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69220646E12, 67283.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.6922064E12, 70075.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69220694E12, 11555.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69220754E12, 17316.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69220676E12, 179965.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[1.69220688E12, 12108.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[1.692207E12, 18710.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[1.69220634E12, 27159.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[1.69220646E12, 72800.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[1.69220718E12, 171879.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[1.69220658E12, 101981.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[1.69220724E12, 23288.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[1.69220664E12, 48349.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[1.69220694E12, 3607.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[1.69220742E12, 9232.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.69220718E12, 35373.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[1.69220748E12, 8699.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.6922076E12, 13426.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69220694E12, 70725.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69220724E12, 7514.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69220664E12, 204908.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.6922064E12, 97421.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69220748E12, 27416.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69220724E12, 5532.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69220712E12, 366827.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.6922073E12, 24884.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69220748E12, 19408.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.69220736E12, 29840.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.69220676E12, 97932.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69220664E12, 6180.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69220766E12, 498108.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69220712E12, 5639.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69220766E12, 13895.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.69220772E12, 26977.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.69220706E12, 4699.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.69220712E12, 5128.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.6922064E12, 22863.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69220712E12, 3869.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.69220712E12, 25495.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69220694E12, 4482.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[1.6922067E12, 2307.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[1.69220646E12, 96594.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[1.6922067E12, 6092.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[1.69220688E12, 76133.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[1.69220694E12, 3771.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[1.69220694E12, 4800.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[1.6922073E12, 29077.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[1.6922073E12, 5486.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[1.69220736E12, 8424.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69220742E12, 5628.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69220634E12, 48818.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69220736E12, 24740.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.6922073E12, 30355.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69220736E12, 1087.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69220664E12, 53362.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.6922064E12, 31429.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69220676E12, 144937.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69220754E12, 21734.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[1.69220754E12, 19530.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[1.69220742E12, 3818.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[1.69220748E12, 700.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[1.69220736E12, 5863.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[1.69220748E12, 3997.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[1.6922064E12, 14625.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[1.69220658E12, 148320.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[1.69220736E12, 21922.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[1.69220736E12, 5917.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[1.69220736E12, 755371.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[1.69220736E12, 3326.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[1.69220742E12, 22179.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[1.69220748E12, 15065.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[1.69220748E12, 6726.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[1.69220742E12, 30737.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[1.69220754E12, 15651.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[1.69220748E12, 5003.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[1.69220688E12, 9206.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[1.69220694E12, 29037.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[1.69220646E12, 162185.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.692207E12, 2900.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[1.69220694E12, 4826.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[1.6922076E12, 3188.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69220652E12, 24659.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69220682E12, 50810.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[1.69220658E12, 67645.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69220658E12, 757.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[1.69220688E12, 33686.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[1.69220754E12, 29237.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6922076E12, 16875.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.6922064E12, 38649.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[1.6922064E12, 17682.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[1.69220664E12, 50230.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69220754E12, 16597.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69220766E12, 7896.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69220748E12, 60092.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.6922076E12, 18915.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69220742E12, 5230.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69220736E12, 5404.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69220754E12, 20746.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69220694E12, 7011.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.6922076E12, 9.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69220754E12, 2759.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69220748E12, 25216.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.69220718E12, 25752.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[1.69220742E12, 470764.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69220712E12, 4285.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[1.69220646E12, 20486.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.692207E12, 6.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[1.69220694E12, 11640.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69220694E12, 7.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[1.69220742E12, 162.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69220754E12, 21351.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.6922076E12, 7635.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.6922067E12, 53144.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[1.69220694E12, 4884.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[1.69220664E12, 209325.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[1.69220688E12, 34256.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[1.69220694E12, 13998.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[1.69220682E12, 51852.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[1.692207E12, 13660.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[1.69220664E12, 8460.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[1.69220664E12, 6164.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[1.6922067E12, 61825.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[1.69220658E12, 83825.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[1.69220688E12, 8839.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[1.69220694E12, 30088.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[1.69220682E12, 88316.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[1.69220694E12, 19751.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[1.69220724E12, 304297.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[1.69220682E12, 4719.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[1.6922064E12, 68748.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[1.6922076E12, 11579.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.6922067E12, 76443.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69220676E12, 8534.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69220664E12, 5236.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.6922067E12, 4247.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69220682E12, 64805.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69220766E12, 13512.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69220754E12, 5602.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69220712E12, 35992.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[1.69220742E12, 637890.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.6922064E12, 98307.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[1.692207E12, 6307.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[1.692207E12, 52482.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[1.69220766E12, 2114.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.692207E12, 405362.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.69220706E12, 21515.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.69220772E12, 11697.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69220706E12, 51873.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69220718E12, 26611.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69220712E12, 5578.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69220772E12, 11882.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69220742E12, 26390.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69220712E12, 8070.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69220748E12, 2496.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69220724E12, 127553.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69220736E12, 5446.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69220712E12, 4078.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[1.6922073E12, 8281.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.6922073E12, 29330.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69220694E12, 42132.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[1.69220742E12, 4988.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.69220742E12, 10014.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.6922064E12, 68326.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[1.69220742E12, 23245.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.69220748E12, 29432.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.69220646E12, 75226.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69220706E12, 29764.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[1.69220688E12, 40605.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69220724E12, 20018.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[1.69220646E12, 80652.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[1.6922073E12, 398131.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69220682E12, 63217.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.69220694E12, 450814.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[1.6922073E12, 5215.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.69220658E12, 94208.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69220718E12, 10681.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[1.69220724E12, 3203.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[1.69220742E12, 29880.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69220742E12, 5336.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[1.6922064E12, 91204.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69220772E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69220634E12, "maxY": 1323.0, "series": [{"data": [[1.69220688E12, 0.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[1.69220706E12, 0.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[1.69220688E12, 0.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[1.6922067E12, 0.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[1.69220676E12, 0.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[1.6922076E12, 0.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.69220646E12, 1315.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.692207E12, 1.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[1.69220706E12, 0.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[1.69220718E12, 0.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[1.69220658E12, 1.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.6922064E12, 1314.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69220676E12, 0.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[1.69220688E12, 0.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[1.69220634E12, 1312.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[1.69220718E12, 0.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[1.69220658E12, 0.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[1.69220724E12, 0.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.69220718E12, 0.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.6922076E12, 0.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69220694E12, 1.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69220724E12, 0.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.6922064E12, 1312.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69220724E12, 0.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.6922073E12, 0.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.69220676E12, 0.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69220766E12, 0.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69220766E12, 0.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.69220772E12, 0.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.69220706E12, 0.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.6922064E12, 0.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.69220712E12, 1.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[1.6922067E12, 0.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[1.6922067E12, 0.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[1.69220688E12, 0.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[1.6922073E12, 0.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[1.6922073E12, 1.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69220634E12, 1313.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.6922073E12, 0.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.6922064E12, 0.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69220676E12, 0.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[1.6922064E12, 0.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[1.69220658E12, 0.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[1.69220736E12, 1.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[1.69220748E12, 1.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[1.69220748E12, 1.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[1.69220748E12, 1.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[1.69220688E12, 0.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[1.69220646E12, 1323.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[1.69220694E12, 1.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[1.6922076E12, 0.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69220652E12, 0.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[1.69220658E12, 0.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69220658E12, 0.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[1.69220688E12, 0.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6922076E12, 0.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.6922064E12, 1.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[1.6922064E12, 0.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69220766E12, 0.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.6922076E12, 0.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69220694E12, 1.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.6922076E12, 0.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.69220718E12, 1.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.6922076E12, 0.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.6922067E12, 0.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[1.69220688E12, 0.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[1.6922067E12, 0.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[1.69220658E12, 0.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[1.69220688E12, 0.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[1.69220724E12, 0.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[1.6922064E12, 1313.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[1.6922076E12, 0.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.6922067E12, 0.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69220676E12, 0.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.6922067E12, 0.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69220766E12, 0.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69220754E12, 0.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[1.69220742E12, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.6922064E12, 1312.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[1.69220766E12, 0.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.69220706E12, 0.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.69220772E12, 0.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69220706E12, 0.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69220718E12, 0.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69220772E12, 0.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69220724E12, 1.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69220736E12, 0.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69220712E12, 0.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[1.6922073E12, 0.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.6922073E12, 0.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.6922064E12, 1313.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.69220748E12, 0.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69220706E12, 0.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[1.69220688E12, 0.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69220724E12, 0.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[1.6922073E12, 0.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.69220694E12, 0.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[1.6922073E12, 0.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.69220658E12, 0.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69220718E12, 0.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[1.69220724E12, 0.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69220742E12, 0.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[1.6922064E12, 1312.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69220772E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 6.0, "minX": 1.69220634E12, "maxY": 755371.0, "series": [{"data": [[1.69220718E12, 171879.0], [1.69220652E12, 24659.0], [1.69220748E12, 60092.0], [1.69220682E12, 363678.0], [1.69220712E12, 366827.0], [1.69220742E12, 637890.0], [1.69220676E12, 179965.0], [1.69220646E12, 162236.0], [1.69220772E12, 26977.0], [1.69220706E12, 51874.0], [1.6922064E12, 98308.0], [1.69220736E12, 755371.0], [1.6922067E12, 76444.0], [1.69220766E12, 498108.0], [1.692207E12, 405362.0], [1.6922073E12, 398132.0], [1.69220664E12, 209326.0], [1.6922076E12, 24762.0], [1.69220634E12, 48819.0], [1.69220694E12, 450814.0], [1.69220724E12, 304297.0], [1.69220754E12, 29237.0], [1.69220688E12, 76133.0], [1.69220658E12, 148320.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69220718E12, 171879.0], [1.69220652E12, 24659.0], [1.69220748E12, 44762.0], [1.69220682E12, 363678.0], [1.69220712E12, 234492.99999999988], [1.69220742E12, 537614.4], [1.69220676E12, 179965.0], [1.69220646E12, 162236.0], [1.69220772E12, 26977.0], [1.69220706E12, 51874.0], [1.6922064E12, 98130.6], [1.69220736E12, 610264.8000000005], [1.6922067E12, 76444.0], [1.69220766E12, 498108.0], [1.692207E12, 299498.00000000035], [1.6922073E12, 398132.0], [1.69220664E12, 209326.0], [1.6922076E12, 24762.0], [1.69220634E12, 48819.0], [1.69220694E12, 108733.90000000055], [1.69220724E12, 304297.0], [1.69220754E12, 28486.700000000004], [1.69220688E12, 76133.0], [1.69220658E12, 148320.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69220718E12, 171879.0], [1.69220652E12, 24659.0], [1.69220748E12, 60092.0], [1.69220682E12, 363678.0], [1.69220712E12, 366827.0], [1.69220742E12, 637890.0], [1.69220676E12, 179965.0], [1.69220646E12, 162236.0], [1.69220772E12, 26977.0], [1.69220706E12, 51874.0], [1.6922064E12, 98308.0], [1.69220736E12, 755371.0], [1.6922067E12, 76444.0], [1.69220766E12, 498108.0], [1.692207E12, 405362.0], [1.6922073E12, 398132.0], [1.69220664E12, 209326.0], [1.6922076E12, 24762.0], [1.69220634E12, 48819.0], [1.69220694E12, 450814.0], [1.69220724E12, 304297.0], [1.69220754E12, 29237.0], [1.69220688E12, 76133.0], [1.69220658E12, 148320.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69220718E12, 171879.0], [1.69220652E12, 24659.0], [1.69220748E12, 60092.0], [1.69220682E12, 363678.0], [1.69220712E12, 366827.0], [1.69220742E12, 637890.0], [1.69220676E12, 179965.0], [1.69220646E12, 162236.0], [1.69220772E12, 26977.0], [1.69220706E12, 51874.0], [1.6922064E12, 98308.0], [1.69220736E12, 755371.0], [1.6922067E12, 76444.0], [1.69220766E12, 498108.0], [1.692207E12, 405362.0], [1.6922073E12, 398132.0], [1.69220664E12, 209326.0], [1.6922076E12, 24762.0], [1.69220634E12, 48819.0], [1.69220694E12, 450814.0], [1.69220724E12, 304297.0], [1.69220754E12, 29237.0], [1.69220688E12, 76133.0], [1.69220658E12, 148320.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69220718E12, 9576.0], [1.69220652E12, 24659.0], [1.69220748E12, 700.0], [1.69220682E12, 4721.0], [1.69220712E12, 1545.0], [1.69220742E12, 162.0], [1.69220676E12, 8535.0], [1.69220646E12, 20333.0], [1.69220772E12, 11697.0], [1.69220706E12, 4700.0], [1.6922064E12, 14625.0], [1.69220736E12, 1087.0], [1.6922067E12, 1818.0], [1.69220766E12, 2133.0], [1.692207E12, 6.0], [1.6922073E12, 5227.0], [1.69220664E12, 5237.0], [1.6922076E12, 9.0], [1.69220634E12, 27161.0], [1.69220694E12, 7.0], [1.69220724E12, 3204.0], [1.69220754E12, 2760.0], [1.69220688E12, 3891.0], [1.69220658E12, 757.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69220718E12, 26181.5], [1.69220652E12, 24659.0], [1.69220748E12, 11882.0], [1.69220682E12, 57534.5], [1.69220712E12, 5578.0], [1.69220742E12, 10014.0], [1.69220676E12, 97948.0], [1.69220646E12, 75227.0], [1.69220772E12, 11882.0], [1.69220706E12, 37217.5], [1.6922064E12, 68326.0], [1.69220736E12, 5917.0], [1.6922067E12, 6092.0], [1.69220766E12, 13512.0], [1.692207E12, 7441.0], [1.6922073E12, 26981.0], [1.69220664E12, 48349.0], [1.6922076E12, 12503.0], [1.69220634E12, 37990.0], [1.69220694E12, 11597.5], [1.69220724E12, 20018.0], [1.69220754E12, 18423.5], [1.69220688E12, 12109.0], [1.69220658E12, 94208.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69220772E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 18622.0, "minX": 1.0, "maxY": 50231.0, "series": [{"data": [[1.0, 19530.0], [2.0, 18622.0], [3.0, 50231.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 18622.0, "minX": 1.0, "maxY": 50230.0, "series": [{"data": [[1.0, 19530.0], [2.0, 18622.0], [3.0, 50230.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69220634E12, "maxY": 0.2833333333333333, "series": [{"data": [[1.69220718E12, 0.08333333333333333], [1.69220652E12, 0.016666666666666666], [1.69220748E12, 0.21666666666666667], [1.69220682E12, 0.13333333333333333], [1.69220712E12, 0.21666666666666667], [1.69220742E12, 0.23333333333333334], [1.69220676E12, 0.08333333333333333], [1.69220646E12, 0.15], [1.69220772E12, 0.05], [1.69220706E12, 0.08333333333333333], [1.6922064E12, 0.2], [1.69220736E12, 0.18333333333333332], [1.6922067E12, 0.11666666666666667], [1.69220766E12, 0.05], [1.692207E12, 0.21666666666666667], [1.6922073E12, 0.11666666666666667], [1.69220664E12, 0.15], [1.6922076E12, 0.11666666666666667], [1.69220634E12, 0.18333333333333332], [1.69220694E12, 0.2833333333333333], [1.69220724E12, 0.1], [1.69220754E12, 0.15], [1.69220688E12, 0.15], [1.69220658E12, 0.11666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69220772E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69220634E12, "maxY": 0.3, "series": [{"data": [[1.69220718E12, 0.1], [1.69220652E12, 0.016666666666666666], [1.69220748E12, 0.23333333333333334], [1.69220682E12, 0.13333333333333333], [1.69220712E12, 0.21666666666666667], [1.69220742E12, 0.25], [1.69220676E12, 0.08333333333333333], [1.69220646E12, 0.15], [1.69220772E12, 0.05], [1.69220706E12, 0.1], [1.6922064E12, 0.18333333333333332], [1.69220736E12, 0.18333333333333332], [1.6922067E12, 0.11666666666666667], [1.69220766E12, 0.08333333333333333], [1.692207E12, 0.2], [1.6922073E12, 0.13333333333333333], [1.69220664E12, 0.15], [1.6922076E12, 0.13333333333333333], [1.69220634E12, 0.03333333333333333], [1.69220694E12, 0.3], [1.69220724E12, 0.11666666666666667], [1.69220754E12, 0.16666666666666666], [1.69220688E12, 0.15], [1.69220658E12, 0.11666666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69220772E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69220634E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q1-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q3-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - RF2-success", "isController": false}, {"data": [[1.6922067E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q16-success", "isController": false}, {"data": [[1.6922067E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q7-success", "isController": false}, {"data": [[1.69220706E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q6-success", "isController": false}, {"data": [[1.69220718E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q21-success", "isController": false}, {"data": [[1.6922076E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q13-success", "isController": false}, {"data": [[1.6922076E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q14-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q9-success", "isController": false}, {"data": [[1.69220706E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q5-success", "isController": false}, {"data": [[1.69220688E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q12-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q14-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q19-success", "isController": false}, {"data": [[1.69220688E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q11-success", "isController": false}, {"data": [[1.69220718E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q18-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q3-success", "isController": false}, {"data": [[1.69220766E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q7-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q7-success", "isController": false}, {"data": [[1.69220772E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q21-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q10-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q15-success", "isController": false}, {"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q5-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q18-success", "isController": false}, {"data": [[1.69220658E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q12-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q4-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q11-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q19-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q16-success", "isController": false}, {"data": [[1.69220658E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q14-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q8-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q9-success", "isController": false}, {"data": [[1.6922073E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q15-success", "isController": false}, {"data": [[1.6922073E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q4-success", "isController": false}, {"data": [[1.6922067E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q2-success", "isController": false}, {"data": [[1.69220724E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q16-success", "isController": false}, {"data": [[1.69220676E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q9-success", "isController": false}, {"data": [[1.69220718E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q10-success", "isController": false}, {"data": [[1.6922076E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q2-success", "isController": false}, {"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q18-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q8-success", "isController": false}, {"data": [[1.6922076E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF2-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q15-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q6-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q4-success", "isController": false}, {"data": [[1.69220718E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q19-success", "isController": false}, {"data": [[1.69220688E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q1-success", "isController": false}, {"data": [[1.6922076E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q19-success", "isController": false}, {"data": [[1.69220766E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q16-success", "isController": false}, {"data": [[1.69220688E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q11-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q1-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q10-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q8-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q18-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q7-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q2-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q8-success", "isController": false}, {"data": [[1.6922073E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q9-success", "isController": false}, {"data": [[1.69220634E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q5-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q14-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q11-success", "isController": false}, {"data": [[1.6922067E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q5-success", "isController": false}, {"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q7-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q3-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q16-success", "isController": false}, {"data": [[1.69220724E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q13-success", "isController": false}, {"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q21-success", "isController": false}, {"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q19-success", "isController": false}, {"data": [[1.6922073E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q5-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q22-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q19-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q2-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q21-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q1-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q3-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q16-success", "isController": false}, {"data": [[1.69220688E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q6-success", "isController": false}, {"data": [[1.69220676E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q11-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q11-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q6-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q7-success", "isController": false}, {"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q8-success", "isController": false}, {"data": [[1.69220766E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q9-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q14-success", "isController": false}, {"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q1-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q13-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q16-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q22-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q16-success", "isController": false}, {"data": [[1.69220634E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q13-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q4-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q19-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q9-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q10-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q2-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q8-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q22-success", "isController": false}, {"data": [[1.69220718E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q4-success", "isController": false}, {"data": [[1.6922073E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q14-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q13-success", "isController": false}, {"data": [[1.69220772E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q6-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q3-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q11-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q19-success", "isController": false}, {"data": [[1.6922076E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q18-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q22-success", "isController": false}, {"data": [[1.6922067E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q13-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q5-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q9-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q21-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q8-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q1-success", "isController": false}, {"data": [[1.6922073E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q16-success", "isController": false}, {"data": [[1.69220688E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q7-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q14-success", "isController": false}, {"data": [[1.69220676E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q3-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q21-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q3-success", "isController": false}, {"data": [[1.69220724E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q11-success", "isController": false}, {"data": [[1.6922076E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q10-success", "isController": false}, {"data": [[1.69220658E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q18-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF1-success", "isController": false}, {"data": [[1.69220706E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q14-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q12-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q7-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q15-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q3-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q10-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q15-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - RF1-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q5-success", "isController": false}, {"data": [[1.69220658E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q19-success", "isController": false}, {"data": [[1.69220688E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q5-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q4-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q11-success", "isController": false}, {"data": [[1.6922073E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q8-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q22-success", "isController": false}, {"data": [[1.69220652E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q13-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q8-success", "isController": false}, {"data": [[1.69220676E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q12-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q4-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q12-success", "isController": false}, {"data": [[1.69220718E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q15-success", "isController": false}, {"data": [[1.69220706E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q19-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q6-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q12-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q22-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q6-success", "isController": false}, {"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q21-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q11-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q14-success", "isController": false}, {"data": [[1.6922067E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q2-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q2-success", "isController": false}, {"data": [[1.69220688E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q14-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q10-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q21-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q4-success", "isController": false}, {"data": [[1.69220772E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q13-success", "isController": false}, {"data": [[1.69220706E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q6-success", "isController": false}, {"data": [[1.69220724E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q15-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q18-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q5-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q12-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q9-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q22-success", "isController": false}, {"data": [[1.69220658E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q12-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q15-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q3-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q15-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q1-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q18-success", "isController": false}, {"data": [[1.69220676E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q9-success", "isController": false}, {"data": [[1.69220724E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q21-success", "isController": false}, {"data": [[1.6922076E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q1-success", "isController": false}, {"data": [[1.69220766E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q16-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q13-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q5-success", "isController": false}, {"data": [[1.69220766E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q7-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q21-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q3-success", "isController": false}, {"data": [[1.69220736E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q10-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q22-success", "isController": false}, {"data": [[1.69220658E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q2-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q1-success", "isController": false}, {"data": [[1.6922067E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q2-success", "isController": false}, {"data": [[1.69220754E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q15-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q12-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q18-success", "isController": false}, {"data": [[1.69220658E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q6-success", "isController": false}, {"data": [[1.69220688E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q7-success", "isController": false}, {"data": [[1.6922073E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q1-success", "isController": false}, {"data": [[1.69220724E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q9-success", "isController": false}, {"data": [[1.69220724E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q22-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q10-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q13-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q10-success", "isController": false}, {"data": [[1.69220748E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q18-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q4-success", "isController": false}, {"data": [[1.69220742E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q6-success", "isController": false}, {"data": [[1.69220712E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q2-success", "isController": false}, {"data": [[1.69220706E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q12-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q8-success", "isController": false}, {"data": [[1.69220694E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q22-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69220772E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69220634E12, "maxY": 0.3, "series": [{"data": [[1.69220718E12, 0.1], [1.69220652E12, 0.016666666666666666], [1.69220748E12, 0.23333333333333334], [1.69220682E12, 0.13333333333333333], [1.69220712E12, 0.21666666666666667], [1.69220742E12, 0.25], [1.69220676E12, 0.08333333333333333], [1.69220646E12, 0.15], [1.69220772E12, 0.05], [1.69220706E12, 0.1], [1.6922064E12, 0.18333333333333332], [1.69220736E12, 0.18333333333333332], [1.6922067E12, 0.11666666666666667], [1.69220766E12, 0.08333333333333333], [1.692207E12, 0.2], [1.6922073E12, 0.13333333333333333], [1.69220664E12, 0.15], [1.6922076E12, 0.13333333333333333], [1.69220634E12, 0.03333333333333333], [1.69220694E12, 0.3], [1.69220724E12, 0.11666666666666667], [1.69220754E12, 0.16666666666666666], [1.69220688E12, 0.15], [1.69220658E12, 0.11666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69220772E12, "title": "Total Transactions Per Second"}},
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
