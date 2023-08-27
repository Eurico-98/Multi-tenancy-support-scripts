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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[2900.0, 1.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[31900.0, 1.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[43500.0, 1.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[300900.0, 1.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[12600.0, 1.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[22600.0, 1.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[20100.0, 1.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[19400.0, 1.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[20500.0, 1.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[16200.0, 1.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[3400.0, 1.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[11600.0, 1.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[15700.0, 1.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[66000.0, 1.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[10000.0, 1.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[8400.0, 1.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[30400.0, 1.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[13900.0, 1.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[52500.0, 1.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[8800.0, 1.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[107200.0, 1.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[16200.0, 1.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[43900.0, 1.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[161500.0, 1.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[57800.0, 1.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[18600.0, 1.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[272200.0, 1.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[42000.0, 1.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[9700.0, 1.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[17900.0, 1.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[16800.0, 1.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[6800.0, 1.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[17400.0, 1.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[86200.0, 1.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[9200.0, 1.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[23300.0, 1.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[86800.0, 1.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[16200.0, 1.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[96300.0, 1.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[48700.0, 1.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[12000.0, 1.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[7800.0, 1.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[32700.0, 1.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[13600.0, 1.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[60200.0, 1.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[48800.0, 1.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[89600.0, 1.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[6600.0, 1.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[18300.0, 1.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[30400.0, 1.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[11200.0, 1.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[37500.0, 1.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[16300.0, 1.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[31100.0, 1.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[14700.0, 1.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[6900.0, 1.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[7100.0, 1.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[30300.0, 1.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[5800.0, 1.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[46300.0, 1.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[159600.0, 1.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[11000.0, 1.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[16200.0, 1.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[13800.0, 1.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[8100.0, 1.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[22000.0, 1.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[37100.0, 1.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[37300.0, 1.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[500900.0, 1.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[47300.0, 1.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[48000.0, 1.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[40300.0, 1.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[38300.0, 1.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[56500.0, 1.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[5700.0, 1.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[19300.0, 1.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[89800.0, 1.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[36100.0, 1.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[22100.0, 1.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[24500.0, 1.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[9000.0, 1.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[30300.0, 1.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[25700.0, 1.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[13600.0, 1.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[56500.0, 1.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[2300.0, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[53000.0, 1.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[15400.0, 1.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[12500.0, 1.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[106400.0, 1.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[35500.0, 1.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[145900.0, 1.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[14700.0, 1.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[9000.0, 1.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[11600.0, 1.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[12700.0, 1.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[18500.0, 1.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[9200.0, 1.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[449900.0, 1.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[8400.0, 1.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[10400.0, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[11600.0, 1.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[103700.0, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[21500.0, 1.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[4400.0, 1.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[158100.0, 1.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[24000.0, 1.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[18700.0, 1.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[28400.0, 1.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[60800.0, 1.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[5900.0, 1.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[17400.0, 1.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[22100.0, 1.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[119500.0, 1.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[5100.0, 1.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[76600.0, 1.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[24600.0, 1.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[312200.0, 1.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[10300.0, 1.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[23500.0, 1.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[18200.0, 1.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[2300.0, 1.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[9200.0, 1.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[21400.0, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[12900.0, 1.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[71700.0, 1.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[532000.0, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[17400.0, 1.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[13400.0, 1.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[95100.0, 1.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[16800.0, 1.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[16000.0, 1.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[15200.0, 1.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[19300.0, 1.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[397600.0, 1.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[4700.0, 1.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[4600.0, 1.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[7700.0, 1.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[34200.0, 1.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[36800.0, 1.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[30600.0, 1.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[50300.0, 1.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[29600.0, 1.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[103300.0, 1.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[6200.0, 1.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[9800.0, 1.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[33300.0, 1.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 532000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69221426E12, "maxY": 1.0, "series": [{"data": [[1.69221492E12, 1.0], [1.6922154E12, 1.0], [1.69221552E12, 1.0], [1.69221486E12, 1.0], [1.69221546E12, 1.0], [1.6922148E12, 1.0], [1.6922145E12, 1.0]], "isOverall": false, "label": "T23", "isController": false}, {"data": [[1.69221462E12, 1.0], [1.69221522E12, 1.0], [1.69221456E12, 1.0], [1.69221474E12, 1.0], [1.69221534E12, 1.0], [1.69221468E12, 1.0], [1.69221516E12, 1.0], [1.6922148E12, 1.0], [1.69221528E12, 1.0]], "isOverall": false, "label": "T22", "isController": false}, {"data": [[1.6922154E12, 1.0], [1.69221462E12, 1.0], [1.69221456E12, 1.0], [1.69221474E12, 1.0], [1.69221534E12, 1.0], [1.69221468E12, 1.0], [1.69221486E12, 1.0], [1.69221546E12, 1.0], [1.6922148E12, 1.0]], "isOverall": false, "label": "T25", "isController": false}, {"data": [[1.6922154E12, 1.0], [1.69221462E12, 1.0], [1.69221504E12, 1.0], [1.69221474E12, 1.0], [1.69221534E12, 1.0], [1.69221468E12, 1.0], [1.69221486E12, 1.0], [1.6922148E12, 1.0]], "isOverall": false, "label": "T24", "isController": false}, {"data": [[1.69221444E12, 1.0], [1.69221462E12, 1.0], [1.69221504E12, 1.0], [1.69221474E12, 1.0], [1.69221438E12, 1.0], [1.69221432E12, 1.0], [1.6922148E12, 1.0], [1.6922145E12, 1.0], [1.69221498E12, 1.0]], "isOverall": false, "label": "G1", "isController": false}, {"data": [[1.69221444E12, 1.0], [1.69221492E12, 1.0], [1.69221462E12, 1.0], [1.69221474E12, 1.0], [1.69221468E12, 1.0], [1.69221438E12, 1.0], [1.69221486E12, 1.0], [1.69221432E12, 1.0], [1.6922145E12, 1.0]], "isOverall": false, "label": "G2", "isController": false}, {"data": [[1.69221444E12, 1.0], [1.69221462E12, 1.0], [1.69221456E12, 1.0], [1.69221474E12, 1.0], [1.69221468E12, 1.0], [1.69221438E12, 1.0], [1.6922145E12, 1.0]], "isOverall": false, "label": "G3", "isController": false}, {"data": [[1.69221444E12, 1.0], [1.69221462E12, 1.0], [1.69221426E12, 1.0], [1.69221474E12, 1.0], [1.69221534E12, 1.0], [1.69221432E12, 1.0], [1.6922148E12, 1.0], [1.6922145E12, 1.0]], "isOverall": false, "label": "T1", "isController": false}, {"data": [[1.69221444E12, 1.0], [1.69221462E12, 1.0], [1.69221456E12, 1.0], [1.69221474E12, 1.0], [1.69221468E12, 1.0], [1.69221438E12, 1.0], [1.69221486E12, 1.0], [1.6922148E12, 1.0]], "isOverall": false, "label": "G4", "isController": false}, {"data": [[1.69221444E12, 1.0], [1.69221492E12, 1.0], [1.69221462E12, 1.0], [1.69221456E12, 1.0], [1.6922145E12, 1.0], [1.69221498E12, 1.0]], "isOverall": false, "label": "G5", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221552E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 5.0, "minX": 1.0, "maxY": 532011.0, "series": [{"data": [[2.0, 2992.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[2.0, 2992.0]], "isOverall": false, "label": "T23 - Q11-Aggregated", "isController": false}, {"data": [[2.0, 5560.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[2.0, 5560.0]], "isOverall": false, "label": "T23 - Q10-Aggregated", "isController": false}, {"data": [[7.0, 31980.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[7.0, 31980.0]], "isOverall": false, "label": "T23 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 43535.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[9.0, 43535.0]], "isOverall": false, "label": "T23 - Q12-Aggregated", "isController": false}, {"data": [[9.0, 300969.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[9.0, 300969.0]], "isOverall": false, "label": "T23 - Q15-Aggregated", "isController": false}, {"data": [[2.0, 12640.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[2.0, 12640.0]], "isOverall": false, "label": "T23 - Q14-Aggregated", "isController": false}, {"data": [[6.0, 5682.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[6.0, 5682.0]], "isOverall": false, "label": "G2 - Q5-Aggregated", "isController": false}, {"data": [[6.0, 22641.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[6.0, 22641.0]], "isOverall": false, "label": "G2 - Q6-Aggregated", "isController": false}, {"data": [[2.0, 3150.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[2.0, 3150.0]], "isOverall": false, "label": "T23 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 20182.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[10.0, 20182.0]], "isOverall": false, "label": "G2 - Q7-Aggregated", "isController": false}, {"data": [[2.0, 19441.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[2.0, 19441.0]], "isOverall": false, "label": "T23 - Q19-Aggregated", "isController": false}, {"data": [[3.0, 3180.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[3.0, 3180.0]], "isOverall": false, "label": "G2 - Q8-Aggregated", "isController": false}, {"data": [[2.0, 20548.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[2.0, 20548.0]], "isOverall": false, "label": "T23 - Q18-Aggregated", "isController": false}, {"data": [[6.0, 16243.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[6.0, 16243.0]], "isOverall": false, "label": "G2 - Q1-Aggregated", "isController": false}, {"data": [[6.0, 913.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[6.0, 913.0]], "isOverall": false, "label": "G2 - Q2-Aggregated", "isController": false}, {"data": [[5.0, 3417.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[5.0, 3417.0]], "isOverall": false, "label": "G2 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 11684.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[10.0, 11684.0]], "isOverall": false, "label": "G2 - Q4-Aggregated", "isController": false}, {"data": [[6.0, 15794.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[6.0, 15794.0]], "isOverall": false, "label": "G2 - Q9-Aggregated", "isController": false}, {"data": [[9.0, 66007.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[9.0, 66007.0]], "isOverall": false, "label": "G4 - Q9-Aggregated", "isController": false}, {"data": [[9.0, 10056.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[9.0, 10056.0]], "isOverall": false, "label": "G4 - Q7-Aggregated", "isController": false}, {"data": [[9.0, 8409.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[9.0, 8409.0]], "isOverall": false, "label": "G4 - Q8-Aggregated", "isController": false}, {"data": [[6.0, 4365.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[6.0, 4365.0]], "isOverall": false, "label": "G4 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 30491.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[10.0, 30491.0]], "isOverall": false, "label": "G4 - Q6-Aggregated", "isController": false}, {"data": [[6.0, 5324.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[6.0, 5324.0]], "isOverall": false, "label": "G4 - Q3-Aggregated", "isController": false}, {"data": [[9.0, 13925.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[9.0, 13925.0]], "isOverall": false, "label": "G4 - Q4-Aggregated", "isController": false}, {"data": [[9.0, 52536.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[9.0, 52536.0]], "isOverall": false, "label": "G4 - Q1-Aggregated", "isController": false}, {"data": [[9.0, 8865.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[9.0, 8865.0]], "isOverall": false, "label": "G4 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 107230.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[10.0, 107230.0]], "isOverall": false, "label": "G1 - Q12-Aggregated", "isController": false}, {"data": [[9.0, 6186.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[9.0, 6186.0]], "isOverall": false, "label": "G1 - Q11-Aggregated", "isController": false}, {"data": [[5.0, 16211.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[5.0, 16211.0]], "isOverall": false, "label": "G1 - Q14-Aggregated", "isController": false}, {"data": [[6.0, 43966.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[6.0, 43966.0]], "isOverall": false, "label": "G1 - Q13-Aggregated", "isController": false}, {"data": [[3.0, 1978.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[3.0, 1978.0]], "isOverall": false, "label": "G1 - Q16-Aggregated", "isController": false}, {"data": [[7.0, 161582.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[7.0, 161582.0]], "isOverall": false, "label": "G1 - Q15-Aggregated", "isController": false}, {"data": [[9.0, 57825.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[9.0, 57825.0]], "isOverall": false, "label": "G1 - Q18-Aggregated", "isController": false}, {"data": [[6.0, 18646.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[6.0, 18646.0]], "isOverall": false, "label": "G5 - Q21-Aggregated", "isController": false}, {"data": [[3.0, 3841.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[3.0, 3841.0]], "isOverall": false, "label": "T24 - Q8-Aggregated", "isController": false}, {"data": [[4.0, 272260.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[4.0, 272260.0]], "isOverall": false, "label": "T24 - Q9-Aggregated", "isController": false}, {"data": [[9.0, 42007.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[9.0, 42007.0]], "isOverall": false, "label": "T24 - Q6-Aggregated", "isController": false}, {"data": [[5.0, 9780.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[5.0, 9780.0]], "isOverall": false, "label": "T24 - Q7-Aggregated", "isController": false}, {"data": [[6.0, 3864.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[6.0, 3864.0]], "isOverall": false, "label": "G5 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 17924.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[10.0, 17924.0]], "isOverall": false, "label": "T24 - Q4-Aggregated", "isController": false}, {"data": [[9.0, 5388.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[9.0, 5388.0]], "isOverall": false, "label": "G1 - Q10-Aggregated", "isController": false}, {"data": [[3.0, 3661.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[3.0, 3661.0]], "isOverall": false, "label": "T24 - Q5-Aggregated", "isController": false}, {"data": [[3.0, 16820.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[3.0, 16820.0]], "isOverall": false, "label": "G1 - Q19-Aggregated", "isController": false}, {"data": [[3.0, 2292.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[3.0, 2292.0]], "isOverall": false, "label": "T24 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 6814.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[10.0, 6814.0]], "isOverall": false, "label": "T24 - Q3-Aggregated", "isController": false}, {"data": [[5.0, 17487.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[5.0, 17487.0]], "isOverall": false, "label": "T24 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 86207.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[10.0, 86207.0]], "isOverall": false, "label": "T24 - Q21-Aggregated", "isController": false}, {"data": [[3.0, 2495.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[3.0, 2495.0]], "isOverall": false, "label": "T24 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 9204.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[10.0, 9204.0]], "isOverall": false, "label": "T25 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 23303.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[10.0, 23303.0]], "isOverall": false, "label": "T25 - Q3-Aggregated", "isController": false}, {"data": [[2.0, 2769.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[2.0, 2769.0]], "isOverall": false, "label": "T25 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 86841.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[10.0, 86841.0]], "isOverall": false, "label": "T25 - Q1-Aggregated", "isController": false}, {"data": [[5.0, 16228.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[5.0, 16228.0]], "isOverall": false, "label": "T22 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 96377.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[10.0, 96377.0]], "isOverall": false, "label": "T22 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 48790.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[10.0, 48790.0]], "isOverall": false, "label": "T22 - Q12-Aggregated", "isController": false}, {"data": [[5.0, 6341.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[5.0, 6341.0]], "isOverall": false, "label": "T22 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 12038.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[10.0, 12038.0]], "isOverall": false, "label": "T22 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 7840.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[10.0, 7840.0]], "isOverall": false, "label": "T22 - Q16-Aggregated", "isController": false}, {"data": [[5.0, 32759.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[5.0, 32759.0]], "isOverall": false, "label": "T22 - Q15-Aggregated", "isController": false}, {"data": [[5.0, 13656.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[5.0, 13656.0]], "isOverall": false, "label": "T22 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 60216.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[10.0, 60216.0]], "isOverall": false, "label": "T22 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 48801.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[9.0, 48801.0]], "isOverall": false, "label": "T25 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 89697.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[10.0, 89697.0]], "isOverall": false, "label": "T25 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 6667.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[10.0, 6667.0]], "isOverall": false, "label": "G5 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 18336.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[10.0, 18336.0]], "isOverall": false, "label": "T25 - Q16-Aggregated", "isController": false}, {"data": [[6.0, 659.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[6.0, 659.0]], "isOverall": false, "label": "G5 - Q2-Aggregated", "isController": false}, {"data": [[7.0, 30468.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[7.0, 30468.0]], "isOverall": false, "label": "G5 - Q1-Aggregated", "isController": false}, {"data": [[2.0, 11274.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[2.0, 11274.0]], "isOverall": false, "label": "T25 - Q14-Aggregated", "isController": false}, {"data": [[2.0, 37535.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[2.0, 37535.0]], "isOverall": false, "label": "T25 - Q15-Aggregated", "isController": false}, {"data": [[6.0, 3620.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[6.0, 3620.0]], "isOverall": false, "label": "G5 - Q7-Aggregated", "isController": false}, {"data": [[2.0, 16321.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[2.0, 16321.0]], "isOverall": false, "label": "T25 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 31163.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[10.0, 31163.0]], "isOverall": false, "label": "G5 - Q6-Aggregated", "isController": false}, {"data": [[3.0, 14733.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[3.0, 14733.0]], "isOverall": false, "label": "T25 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 6948.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[9.0, 6948.0]], "isOverall": false, "label": "T25 - Q10-Aggregated", "isController": false}, {"data": [[7.0, 3763.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[7.0, 3763.0]], "isOverall": false, "label": "G5 - Q5-Aggregated", "isController": false}, {"data": [[7.0, 3606.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[7.0, 3606.0]], "isOverall": false, "label": "G5 - Q4-Aggregated", "isController": false}, {"data": [[3.0, 7131.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[3.0, 7131.0]], "isOverall": false, "label": "T25 - Q11-Aggregated", "isController": false}, {"data": [[7.0, 30373.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[7.0, 30373.0]], "isOverall": false, "label": "G5 - Q9-Aggregated", "isController": false}, {"data": [[7.0, 5801.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[7.0, 5801.0]], "isOverall": false, "label": "G5 - Q8-Aggregated", "isController": false}, {"data": [[5.0, 3774.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[5.0, 3774.0]], "isOverall": false, "label": "T22 - Q22-Aggregated", "isController": false}, {"data": [[9.0, 46316.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[9.0, 46316.0]], "isOverall": false, "label": "T22 - Q21-Aggregated", "isController": false}, {"data": [[5.0, 159626.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[5.0, 159626.0]], "isOverall": false, "label": "T24 - Q15-Aggregated", "isController": false}, {"data": [[2.0, 3934.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[2.0, 3934.0]], "isOverall": false, "label": "T25 - Q8-Aggregated", "isController": false}, {"data": [[9.0, 11075.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[9.0, 11075.0]], "isOverall": false, "label": "T24 - Q16-Aggregated", "isController": false}, {"data": [[2.0, 16261.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[2.0, 16261.0]], "isOverall": false, "label": "T25 - Q7-Aggregated", "isController": false}, {"data": [[2.0, 13809.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[2.0, 13809.0]], "isOverall": false, "label": "T25 - Q6-Aggregated", "isController": false}, {"data": [[1.0, 2416.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[1.0, 2416.0]], "isOverall": false, "label": "T23 - Q22-Aggregated", "isController": false}, {"data": [[9.0, 8130.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[9.0, 8130.0]], "isOverall": false, "label": "T25 - Q5-Aggregated", "isController": false}, {"data": [[8.0, 22007.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[8.0, 22007.0]], "isOverall": false, "label": "T23 - Q21-Aggregated", "isController": false}, {"data": [[3.0, 37184.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[3.0, 37184.0]], "isOverall": false, "label": "T24 - Q18-Aggregated", "isController": false}, {"data": [[9.0, 37336.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[9.0, 37336.0]], "isOverall": false, "label": "T24 - Q19-Aggregated", "isController": false}, {"data": [[3.0, 500990.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[3.0, 500990.0]], "isOverall": false, "label": "T25 - Q9-Aggregated", "isController": false}, {"data": [[3.0, 2631.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[3.0, 2631.0]], "isOverall": false, "label": "T24 - Q10-Aggregated", "isController": false}, {"data": [[3.0, 2927.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[3.0, 2927.0]], "isOverall": false, "label": "T24 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 47305.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[10.0, 47305.0]], "isOverall": false, "label": "T24 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 48073.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[10.0, 48073.0]], "isOverall": false, "label": "T24 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 40346.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[9.0, 40346.0]], "isOverall": false, "label": "T24 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 38354.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[10.0, 38354.0]], "isOverall": false, "label": "G3 - Q19-Aggregated", "isController": false}, {"data": [[6.0, 56596.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[6.0, 56596.0]], "isOverall": false, "label": "G3 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 6144.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[10.0, 6144.0]], "isOverall": false, "label": "G3 - Q3-Aggregated", "isController": false}, {"data": [[6.0, 901.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[6.0, 901.0]], "isOverall": false, "label": "G3 - Q2-Aggregated", "isController": false}, {"data": [[6.0, 5792.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[6.0, 5792.0]], "isOverall": false, "label": "G3 - Q5-Aggregated", "isController": false}, {"data": [[6.0, 5571.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[6.0, 5571.0]], "isOverall": false, "label": "G3 - Q4-Aggregated", "isController": false}, {"data": [[6.0, 4810.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[6.0, 4810.0]], "isOverall": false, "label": "G3 - Q7-Aggregated", "isController": false}, {"data": [[7.0, 19358.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[7.0, 19358.0]], "isOverall": false, "label": "G3 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 89841.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[10.0, 89841.0]], "isOverall": false, "label": "G3 - Q9-Aggregated", "isController": false}, {"data": [[6.0, 5349.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[6.0, 5349.0]], "isOverall": false, "label": "G3 - Q8-Aggregated", "isController": false}, {"data": [[6.0, 36176.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[6.0, 36176.0]], "isOverall": false, "label": "G3 - Q15-Aggregated", "isController": false}, {"data": [[6.0, 3807.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[6.0, 3807.0]], "isOverall": false, "label": "G3 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 22159.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[10.0, 22159.0]], "isOverall": false, "label": "G3 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 24572.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[10.0, 24572.0]], "isOverall": false, "label": "G3 - Q14-Aggregated", "isController": false}, {"data": [[6.0, 9000.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[6.0, 9000.0]], "isOverall": false, "label": "G3 - Q11-Aggregated", "isController": false}, {"data": [[6.0, 30326.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[6.0, 30326.0]], "isOverall": false, "label": "G3 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 25749.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[10.0, 25749.0]], "isOverall": false, "label": "G3 - Q1-Aggregated", "isController": false}, {"data": [[8.0, 4353.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[8.0, 4353.0]], "isOverall": false, "label": "G3 - Q10-Aggregated", "isController": false}, {"data": [[6.0, 13639.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[6.0, 13639.0]], "isOverall": false, "label": "G1 - Q7-Aggregated", "isController": false}, {"data": [[6.0, 56579.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[6.0, 56579.0]], "isOverall": false, "label": "G1 - Q6-Aggregated", "isController": false}, {"data": [[6.0, 4049.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[6.0, 4049.0]], "isOverall": false, "label": "G1 - Q5-Aggregated", "isController": false}, {"data": [[4.0, 3160.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[4.0, 3160.0]], "isOverall": false, "label": "T1 - Q11-Aggregated", "isController": false}, {"data": [[1.0, 2345.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.0, 2345.0]], "isOverall": false, "label": "T1 - Q10-Aggregated", "isController": false}, {"data": [[3.0, 2871.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[3.0, 2871.0]], "isOverall": false, "label": "G1 - Q4-Aggregated", "isController": false}, {"data": [[6.0, 53060.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[6.0, 53060.0]], "isOverall": false, "label": "T1 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 15482.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[9.0, 15482.0]], "isOverall": false, "label": "G1 - Q3-Aggregated", "isController": false}, {"data": [[1.0, 12511.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.0, 12511.0]], "isOverall": false, "label": "T1 - Q12-Aggregated", "isController": false}, {"data": [[6.0, 3051.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[6.0, 3051.0]], "isOverall": false, "label": "G1 - Q2-Aggregated", "isController": false}, {"data": [[6.0, 106423.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[6.0, 106423.0]], "isOverall": false, "label": "T1 - Q15-Aggregated", "isController": false}, {"data": [[9.0, 35510.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[9.0, 35510.0]], "isOverall": false, "label": "G1 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 145929.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[10.0, 145929.0]], "isOverall": false, "label": "T1 - Q14-Aggregated", "isController": false}, {"data": [[2.0, 14756.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[2.0, 14756.0]], "isOverall": false, "label": "T25 - Q21-Aggregated", "isController": false}, {"data": [[9.0, 9030.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[9.0, 9030.0]], "isOverall": false, "label": "T25 - Q22-Aggregated", "isController": false}, {"data": [[1.0, 1818.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[1.0, 1818.0]], "isOverall": false, "label": "T23 - Q4-Aggregated", "isController": false}, {"data": [[2.0, 3999.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[2.0, 3999.0]], "isOverall": false, "label": "T23 - Q3-Aggregated", "isController": false}, {"data": [[1.0, 11678.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[1.0, 11678.0]], "isOverall": false, "label": "T23 - Q6-Aggregated", "isController": false}, {"data": [[2.0, 3154.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[2.0, 3154.0]], "isOverall": false, "label": "T23 - Q5-Aggregated", "isController": false}, {"data": [[2.0, 3258.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[2.0, 3258.0]], "isOverall": false, "label": "T23 - Q8-Aggregated", "isController": false}, {"data": [[1.0, 12713.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[1.0, 12713.0]], "isOverall": false, "label": "T23 - Q7-Aggregated", "isController": false}, {"data": [[6.0, 18571.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[6.0, 18571.0]], "isOverall": false, "label": "G1 - Q9-Aggregated", "isController": false}, {"data": [[6.0, 9270.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[6.0, 9270.0]], "isOverall": false, "label": "G1 - Q8-Aggregated", "isController": false}, {"data": [[3.0, 449937.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[3.0, 449937.0]], "isOverall": false, "label": "T23 - Q9-Aggregated", "isController": false}, {"data": [[7.0, 8406.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[7.0, 8406.0]], "isOverall": false, "label": "T1 - Q22-Aggregated", "isController": false}, {"data": [[2.0, 10428.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[2.0, 10428.0]], "isOverall": false, "label": "T1 - Q21-Aggregated", "isController": false}, {"data": [[1.0, 6327.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.0, 6327.0]], "isOverall": false, "label": "T1 - Q16-Aggregated", "isController": false}, {"data": [[1.0, 11635.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.0, 11635.0]], "isOverall": false, "label": "T1 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 103788.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[10.0, 103788.0]], "isOverall": false, "label": "T1 - Q18-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "T1 - RF2-Aggregated", "isController": false}, {"data": [[6.0, 21593.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[6.0, 21593.0]], "isOverall": false, "label": "G4 - Q21-Aggregated", "isController": false}, {"data": [[6.0, 4550.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[6.0, 4550.0]], "isOverall": false, "label": "G4 - Q22-Aggregated", "isController": false}, {"data": [[5.0, 6.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[5.0, 6.0]], "isOverall": false, "label": "G1 - RF2-Aggregated", "isController": false}, {"data": [[6.0, 5.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[6.0, 5.0]], "isOverall": false, "label": "G1 - RF1-Aggregated", "isController": false}, {"data": [[4.0, 20.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[4.0, 20.0]], "isOverall": false, "label": "T1 - RF1-Aggregated", "isController": false}, {"data": [[3.0, 1768.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[3.0, 1768.0]], "isOverall": false, "label": "G2 - Q16-Aggregated", "isController": false}, {"data": [[5.0, 4480.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[5.0, 4480.0]], "isOverall": false, "label": "G1 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 158197.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[10.0, 158197.0]], "isOverall": false, "label": "G2 - Q15-Aggregated", "isController": false}, {"data": [[6.0, 24097.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[6.0, 24097.0]], "isOverall": false, "label": "G2 - Q14-Aggregated", "isController": false}, {"data": [[6.0, 18734.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[6.0, 18734.0]], "isOverall": false, "label": "G2 - Q13-Aggregated", "isController": false}, {"data": [[6.0, 28498.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[6.0, 28498.0]], "isOverall": false, "label": "G2 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 60842.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[10.0, 60842.0]], "isOverall": false, "label": "G2 - Q11-Aggregated", "isController": false}, {"data": [[3.0, 2524.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[3.0, 2524.0]], "isOverall": false, "label": "G2 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 5976.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[10.0, 5976.0]], "isOverall": false, "label": "G5 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 17482.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[10.0, 17482.0]], "isOverall": false, "label": "G5 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 22124.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[9.0, 22124.0]], "isOverall": false, "label": "G5 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 119526.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[10.0, 119526.0]], "isOverall": false, "label": "G1 - Q21-Aggregated", "isController": false}, {"data": [[7.0, 5118.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[7.0, 5118.0]], "isOverall": false, "label": "G5 - Q11-Aggregated", "isController": false}, {"data": [[6.0, 76642.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[6.0, 76642.0]], "isOverall": false, "label": "G5 - Q12-Aggregated", "isController": false}, {"data": [[6.0, 24660.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[6.0, 24660.0]], "isOverall": false, "label": "G5 - Q18-Aggregated", "isController": false}, {"data": [[8.0, 312203.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[8.0, 312203.0]], "isOverall": false, "label": "G5 - Q15-Aggregated", "isController": false}, {"data": [[7.0, 2910.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[7.0, 2910.0]], "isOverall": false, "label": "G5 - Q16-Aggregated", "isController": false}, {"data": [[1.0, 10309.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.0, 10309.0]], "isOverall": false, "label": "T1 - Q1-Aggregated", "isController": false}, {"data": [[7.0, 23526.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[7.0, 23526.0]], "isOverall": false, "label": "G5 - Q19-Aggregated", "isController": false}, {"data": [[2.0, 1961.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[2.0, 1961.0]], "isOverall": false, "label": "T1 - Q2-Aggregated", "isController": false}, {"data": [[9.0, 18293.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[9.0, 18293.0]], "isOverall": false, "label": "T1 - Q3-Aggregated", "isController": false}, {"data": [[2.0, 2208.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[2.0, 2208.0]], "isOverall": false, "label": "T1 - Q4-Aggregated", "isController": false}, {"data": [[1.0, 2393.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.0, 2393.0]], "isOverall": false, "label": "T1 - Q5-Aggregated", "isController": false}, {"data": [[1.0, 9250.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.0, 9250.0]], "isOverall": false, "label": "T1 - Q6-Aggregated", "isController": false}, {"data": [[4.0, 21483.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[4.0, 21483.0]], "isOverall": false, "label": "T1 - Q7-Aggregated", "isController": false}, {"data": [[9.0, 12982.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[9.0, 12982.0]], "isOverall": false, "label": "T1 - Q8-Aggregated", "isController": false}, {"data": [[8.0, 71742.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[8.0, 71742.0]], "isOverall": false, "label": "G2 - Q19-Aggregated", "isController": false}, {"data": [[4.0, 532011.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[4.0, 532011.0]], "isOverall": false, "label": "T1 - Q9-Aggregated", "isController": false}, {"data": [[5.0, 17455.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[5.0, 17455.0]], "isOverall": false, "label": "G2 - Q18-Aggregated", "isController": false}, {"data": [[5.0, 4575.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[5.0, 4575.0]], "isOverall": false, "label": "G2 - Q22-Aggregated", "isController": false}, {"data": [[9.0, 13406.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[9.0, 13406.0]], "isOverall": false, "label": "T23 - Q2-Aggregated", "isController": false}, {"data": [[9.0, 95180.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[9.0, 95180.0]], "isOverall": false, "label": "G2 - Q21-Aggregated", "isController": false}, {"data": [[2.0, 16851.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[2.0, 16851.0]], "isOverall": false, "label": "T23 - Q1-Aggregated", "isController": false}, {"data": [[5.0, 16021.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[5.0, 16021.0]], "isOverall": false, "label": "T22 - Q1-Aggregated", "isController": false}, {"data": [[5.0, 15224.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[5.0, 15224.0]], "isOverall": false, "label": "T22 - Q6-Aggregated", "isController": false}, {"data": [[5.0, 19313.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[5.0, 19313.0]], "isOverall": false, "label": "T22 - Q7-Aggregated", "isController": false}, {"data": [[5.0, 3712.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[5.0, 3712.0]], "isOverall": false, "label": "T22 - Q8-Aggregated", "isController": false}, {"data": [[5.0, 397618.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[5.0, 397618.0]], "isOverall": false, "label": "T22 - Q9-Aggregated", "isController": false}, {"data": [[5.0, 4709.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[5.0, 4709.0]], "isOverall": false, "label": "T22 - Q2-Aggregated", "isController": false}, {"data": [[5.0, 4628.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[5.0, 4628.0]], "isOverall": false, "label": "T22 - Q3-Aggregated", "isController": false}, {"data": [[5.0, 2547.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[5.0, 2547.0]], "isOverall": false, "label": "T22 - Q4-Aggregated", "isController": false}, {"data": [[5.0, 3321.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[5.0, 3321.0]], "isOverall": false, "label": "T22 - Q5-Aggregated", "isController": false}, {"data": [[5.0, 7786.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[5.0, 7786.0]], "isOverall": false, "label": "G4 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 34256.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[10.0, 34256.0]], "isOverall": false, "label": "G4 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 36895.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[10.0, 36895.0]], "isOverall": false, "label": "G4 - Q19-Aggregated", "isController": false}, {"data": [[6.0, 30614.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[6.0, 30614.0]], "isOverall": false, "label": "G4 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 50399.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[10.0, 50399.0]], "isOverall": false, "label": "G4 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 29697.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[10.0, 29697.0]], "isOverall": false, "label": "G4 - Q14-Aggregated", "isController": false}, {"data": [[9.0, 103391.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[9.0, 103391.0]], "isOverall": false, "label": "G4 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 6341.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[10.0, 6341.0]], "isOverall": false, "label": "G4 - Q10-Aggregated", "isController": false}, {"data": [[6.0, 6243.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[6.0, 6243.0]], "isOverall": false, "label": "G4 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 9811.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[10.0, 9811.0]], "isOverall": false, "label": "G3 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 33325.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}, {"data": [[10.0, 33325.0]], "isOverall": false, "label": "G3 - Q21-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.69221426E12, "maxY": 32959.1, "series": [{"data": [[1.69221444E12, 948.2166666666667], [1.6922154E12, 8482.816666666668], [1.69221504E12, 144.86666666666667], [1.69221474E12, 261.06666666666666], [1.69221516E12, 142.58333333333334], [1.69221486E12, 269.95], [1.69221546E12, 11568.833333333334], [1.6922148E12, 11781.766666666666], [1.6922145E12, 480.85], [1.69221492E12, 362.0], [1.69221462E12, 223.03333333333333], [1.69221522E12, 331.71666666666664], [1.69221456E12, 11520.4], [1.69221552E12, 7.966666666666667], [1.69221426E12, 11559.5], [1.69221534E12, 32959.1], [1.69221468E12, 10502.966666666667], [1.69221438E12, 5592.216666666666], [1.69221432E12, 4852.85], [1.69221528E12, 20.35], [1.69221498E12, 1973.0166666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69221444E12, 0.0], [1.6922154E12, 0.0], [1.69221504E12, 0.0], [1.69221474E12, 0.0], [1.69221516E12, 0.0], [1.69221486E12, 0.0], [1.69221546E12, 0.0], [1.6922148E12, 0.0], [1.6922145E12, 0.0], [1.69221492E12, 0.0], [1.69221462E12, 0.0], [1.69221522E12, 0.0], [1.69221456E12, 0.0], [1.69221552E12, 0.0], [1.69221426E12, 0.0], [1.69221534E12, 0.0], [1.69221468E12, 0.0], [1.69221438E12, 0.0], [1.69221432E12, 0.0], [1.69221528E12, 0.0], [1.69221498E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221552E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 5.0, "minX": 1.69221426E12, "maxY": 532011.0, "series": [{"data": [[1.6922154E12, 2992.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[1.6922154E12, 5560.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[1.69221492E12, 31980.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[1.69221486E12, 43535.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[1.6922148E12, 300969.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[1.6922154E12, 12640.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[1.69221438E12, 5682.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[1.69221444E12, 22641.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[1.69221546E12, 3150.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[1.69221468E12, 20182.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[1.6922154E12, 19441.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[1.69221432E12, 3180.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[1.69221546E12, 20548.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[1.69221444E12, 16243.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[1.6922145E12, 913.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[1.69221438E12, 3417.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[1.69221468E12, 11684.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[1.69221444E12, 15794.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[1.69221486E12, 66007.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[1.6922148E12, 10056.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[1.6922148E12, 8409.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[1.69221444E12, 4365.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[1.69221456E12, 30491.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[1.69221438E12, 5324.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[1.69221486E12, 13925.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[1.6922148E12, 52536.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[1.69221486E12, 8865.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[1.69221462E12, 107230.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[1.6922148E12, 6186.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[1.69221432E12, 16211.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[1.69221444E12, 43966.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[1.69221432E12, 1978.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[1.69221498E12, 161582.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[1.6922145E12, 57825.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[1.69221444E12, 18646.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[1.6922154E12, 3841.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[1.69221534E12, 272260.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[1.6922148E12, 42007.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[1.69221504E12, 9780.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[1.69221444E12, 3864.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[1.69221462E12, 17924.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[1.6922148E12, 5388.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[1.6922154E12, 3661.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[1.69221432E12, 16820.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[1.69221534E12, 2292.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[1.69221474E12, 6814.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[1.69221504E12, 17487.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[1.69221462E12, 86207.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[1.6922154E12, 2495.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[1.69221468E12, 9204.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[1.69221468E12, 23303.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[1.6922154E12, 2769.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[1.69221462E12, 86841.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[1.69221528E12, 16228.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[1.69221462E12, 96377.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[1.69221456E12, 48790.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[1.69221534E12, 6341.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[1.69221474E12, 12038.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[1.69221468E12, 7840.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[1.69221528E12, 32759.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[1.69221522E12, 13656.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[1.69221474E12, 60216.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[1.6922148E12, 48801.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[1.69221474E12, 89697.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[1.69221456E12, 6667.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[1.69221456E12, 18336.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[1.6922145E12, 659.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[1.69221498E12, 30468.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[1.69221546E12, 11274.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[1.6922154E12, 37535.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[1.6922145E12, 3620.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[1.69221546E12, 16321.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[1.69221456E12, 31163.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[1.69221534E12, 14733.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[1.69221486E12, 6948.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[1.69221498E12, 3763.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[1.69221498E12, 3606.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[1.69221534E12, 7131.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[1.69221492E12, 30373.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[1.69221492E12, 5801.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[1.69221528E12, 3774.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[1.6922148E12, 46316.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[1.69221504E12, 159626.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[1.69221546E12, 3934.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[1.6922148E12, 11075.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[1.69221546E12, 16261.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[1.6922154E12, 13809.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[1.69221552E12, 2416.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[1.69221486E12, 8130.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[1.69221492E12, 22007.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[1.69221534E12, 37184.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[1.69221486E12, 37336.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[1.69221534E12, 500990.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[1.69221534E12, 2631.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[1.69221534E12, 2927.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[1.69221468E12, 47305.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[1.69221474E12, 48073.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[1.6922148E12, 40346.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[1.69221456E12, 38354.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[1.69221444E12, 56596.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[1.69221468E12, 6144.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[1.69221438E12, 901.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[1.69221444E12, 5792.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[1.69221438E12, 5571.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[1.69221438E12, 4810.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[1.6922145E12, 19358.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[1.69221474E12, 89841.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[1.69221438E12, 5349.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[1.69221438E12, 36176.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[1.69221438E12, 3807.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[1.69221462E12, 22159.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[1.69221462E12, 24572.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[1.69221438E12, 9000.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[1.6922145E12, 30326.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[1.69221456E12, 25749.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[1.6922145E12, 4353.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[1.69221438E12, 13639.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[1.69221444E12, 56579.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[1.69221498E12, 4049.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[1.69221534E12, 3160.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221426E12, 2345.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69221432E12, 2871.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[1.6922145E12, 53060.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.6922148E12, 15482.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[1.69221426E12, 12511.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.6922145E12, 3051.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[1.69221444E12, 106423.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6922148E12, 35510.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[1.69221474E12, 145929.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69221546E12, 14756.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[1.6922148E12, 9030.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[1.69221546E12, 1818.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[1.6922154E12, 3999.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[1.69221546E12, 11678.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[1.69221546E12, 3154.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[1.69221546E12, 3258.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[1.69221552E12, 12713.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[1.69221504E12, 18571.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[1.69221498E12, 9270.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[1.6922154E12, 449937.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[1.6922145E12, 8406.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221432E12, 10428.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69221426E12, 6327.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69221432E12, 11635.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221462E12, 103788.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69221426E12, 7.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69221444E12, 21593.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[1.69221444E12, 4550.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[1.69221432E12, 6.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[1.69221498E12, 5.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[1.69221432E12, 20.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69221432E12, 1768.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[1.69221438E12, 4480.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[1.69221462E12, 158197.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[1.69221444E12, 24097.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[1.6922145E12, 18734.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[1.69221438E12, 28498.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[1.69221474E12, 60842.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[1.69221432E12, 2524.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[1.69221462E12, 5976.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[1.69221456E12, 17482.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[1.69221456E12, 22124.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[1.69221474E12, 119526.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[1.69221492E12, 5118.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[1.69221444E12, 76642.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[1.6922145E12, 24660.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[1.69221492E12, 312203.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[1.69221498E12, 2910.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[1.69221432E12, 10309.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.6922145E12, 23526.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[1.69221432E12, 1961.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.6922148E12, 18293.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221432E12, 2208.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69221426E12, 2393.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69221426E12, 9250.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69221432E12, 21483.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.6922148E12, 12982.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69221492E12, 71742.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[1.69221534E12, 532011.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69221432E12, 17455.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[1.69221438E12, 4575.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[1.6922145E12, 13406.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[1.69221486E12, 95180.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[1.69221546E12, 16851.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[1.69221516E12, 16021.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[1.69221528E12, 15224.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[1.69221522E12, 19313.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[1.69221528E12, 3712.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[1.69221516E12, 397618.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[1.69221522E12, 4709.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[1.69221528E12, 4628.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[1.69221528E12, 2547.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[1.69221528E12, 3321.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[1.69221438E12, 7786.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[1.69221462E12, 34256.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[1.69221468E12, 36895.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[1.69221438E12, 30614.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[1.69221474E12, 50399.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[1.69221462E12, 29697.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[1.69221456E12, 103391.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[1.69221462E12, 6341.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[1.69221444E12, 6243.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[1.69221468E12, 9811.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[1.69221468E12, 33325.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221552E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 5.0, "minX": 1.69221426E12, "maxY": 532011.0, "series": [{"data": [[1.6922154E12, 2986.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[1.6922154E12, 5560.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[1.69221492E12, 31980.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[1.69221486E12, 43535.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[1.6922148E12, 300968.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[1.6922154E12, 12640.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[1.69221438E12, 5682.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[1.69221444E12, 22641.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[1.69221546E12, 3143.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[1.69221468E12, 20182.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[1.6922154E12, 19441.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[1.69221432E12, 3180.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[1.69221546E12, 20547.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[1.69221444E12, 16243.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[1.6922145E12, 912.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[1.69221438E12, 3413.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[1.69221468E12, 11684.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[1.69221444E12, 15793.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[1.69221486E12, 66007.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[1.6922148E12, 10056.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[1.6922148E12, 8409.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[1.69221444E12, 4364.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[1.69221456E12, 30491.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[1.69221438E12, 5323.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[1.69221486E12, 13924.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[1.6922148E12, 52535.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[1.69221486E12, 8865.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[1.69221462E12, 107230.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[1.6922148E12, 6184.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[1.69221432E12, 16211.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[1.69221444E12, 43966.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[1.69221432E12, 1971.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[1.69221498E12, 161582.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[1.6922145E12, 57824.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[1.69221444E12, 18646.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[1.6922154E12, 3841.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[1.69221534E12, 272260.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[1.6922148E12, 42006.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[1.69221504E12, 9780.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[1.69221444E12, 3864.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[1.69221462E12, 17924.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[1.6922148E12, 5388.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[1.6922154E12, 3661.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[1.69221432E12, 16820.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[1.69221534E12, 2292.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[1.69221474E12, 6813.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[1.69221504E12, 17487.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[1.69221462E12, 86207.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[1.6922154E12, 2495.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[1.69221468E12, 9204.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[1.69221468E12, 23302.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[1.6922154E12, 2769.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[1.69221462E12, 86840.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[1.69221528E12, 16227.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[1.69221462E12, 96376.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[1.69221456E12, 48790.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[1.69221534E12, 6306.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[1.69221474E12, 12037.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[1.69221468E12, 7823.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[1.69221528E12, 32759.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[1.69221522E12, 13655.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[1.69221474E12, 60216.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[1.6922148E12, 48800.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[1.69221474E12, 89697.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[1.69221456E12, 6666.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[1.69221456E12, 18327.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[1.6922145E12, 659.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[1.69221498E12, 30468.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[1.69221546E12, 11274.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[1.6922154E12, 37535.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[1.6922145E12, 3620.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[1.69221546E12, 16321.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[1.69221456E12, 31163.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[1.69221534E12, 14733.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[1.69221486E12, 6948.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[1.69221498E12, 3763.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[1.69221498E12, 3606.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[1.69221534E12, 7117.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[1.69221492E12, 30373.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[1.69221492E12, 5801.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[1.69221528E12, 3773.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[1.6922148E12, 46315.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[1.69221504E12, 159626.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[1.69221546E12, 3934.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[1.6922148E12, 11063.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[1.69221546E12, 16261.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[1.6922154E12, 13809.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[1.69221552E12, 2416.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[1.69221486E12, 8130.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[1.69221492E12, 22006.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[1.69221534E12, 37184.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[1.69221486E12, 37336.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[1.69221534E12, 500990.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[1.69221534E12, 2631.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[1.69221534E12, 2859.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[1.69221468E12, 47305.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[1.69221474E12, 48073.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[1.6922148E12, 40346.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[1.69221456E12, 38354.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[1.69221444E12, 56596.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[1.69221468E12, 6143.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[1.69221438E12, 901.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[1.69221444E12, 5792.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[1.69221438E12, 5571.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[1.69221438E12, 4810.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[1.6922145E12, 19358.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[1.69221474E12, 89841.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[1.69221438E12, 5349.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[1.69221438E12, 36176.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[1.69221438E12, 3805.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[1.69221462E12, 22159.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[1.69221462E12, 24571.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[1.69221438E12, 9000.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[1.6922145E12, 30326.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[1.69221456E12, 25748.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[1.6922145E12, 4352.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[1.69221438E12, 13638.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[1.69221444E12, 56578.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[1.69221498E12, 4049.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[1.69221534E12, 3141.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221426E12, 2344.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69221432E12, 2871.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[1.6922145E12, 53060.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.6922148E12, 15481.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[1.69221426E12, 12509.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.6922145E12, 3051.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[1.69221444E12, 106423.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6922148E12, 35510.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[1.69221474E12, 145929.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69221546E12, 14756.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[1.6922148E12, 9030.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[1.69221546E12, 1818.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[1.6922154E12, 3998.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[1.69221546E12, 11678.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[1.69221546E12, 3154.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[1.69221546E12, 3258.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[1.69221552E12, 12713.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[1.69221504E12, 18571.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[1.69221498E12, 9270.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[1.6922154E12, 449936.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[1.6922145E12, 8406.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221432E12, 10427.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69221426E12, 6263.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69221432E12, 11635.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221462E12, 103787.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69221426E12, 7.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69221444E12, 21593.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[1.69221444E12, 4550.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[1.69221432E12, 6.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[1.69221498E12, 5.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[1.69221432E12, 20.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69221432E12, 1765.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[1.69221438E12, 4480.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[1.69221462E12, 158197.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[1.69221444E12, 24097.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[1.6922145E12, 18734.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[1.69221438E12, 28498.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[1.69221474E12, 60842.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[1.69221432E12, 2524.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[1.69221462E12, 5975.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[1.69221456E12, 17482.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[1.69221456E12, 22124.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[1.69221474E12, 119525.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[1.69221492E12, 5118.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[1.69221444E12, 76642.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[1.6922145E12, 24660.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[1.69221492E12, 312202.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[1.69221498E12, 2907.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[1.69221432E12, 10308.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.6922145E12, 23526.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[1.69221432E12, 1959.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.6922148E12, 18291.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221432E12, 2208.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69221426E12, 2393.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69221426E12, 9250.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69221432E12, 21483.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.6922148E12, 12982.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69221492E12, 71742.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[1.69221534E12, 532011.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69221432E12, 17455.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[1.69221438E12, 4575.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[1.6922145E12, 13405.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[1.69221486E12, 95180.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[1.69221546E12, 16851.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[1.69221516E12, 16021.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[1.69221528E12, 15224.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[1.69221522E12, 19313.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[1.69221528E12, 3712.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[1.69221516E12, 397618.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[1.69221522E12, 4709.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[1.69221528E12, 4628.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[1.69221528E12, 2547.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[1.69221528E12, 3321.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[1.69221438E12, 7783.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[1.69221462E12, 34255.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[1.69221468E12, 36895.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[1.69221438E12, 30614.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[1.69221474E12, 50399.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[1.69221462E12, 29697.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[1.69221456E12, 103391.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[1.69221462E12, 6341.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[1.69221444E12, 6241.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[1.69221468E12, 9811.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[1.69221468E12, 33325.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221552E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69221426E12, "maxY": 603.0, "series": [{"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[1.69221492E12, 0.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[1.69221486E12, 0.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G2 - Q5", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G2 - Q6", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "G2 - Q7", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[1.69221432E12, 95.0]], "isOverall": false, "label": "G2 - Q8", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G2 - Q1", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G2 - Q2", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G2 - Q3", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "G2 - Q4", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G2 - Q9", "isController": false}, {"data": [[1.69221486E12, 0.0]], "isOverall": false, "label": "G4 - Q9", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "G4 - Q7", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "G4 - Q8", "isController": false}, {"data": [[1.69221444E12, 1.0]], "isOverall": false, "label": "G4 - Q5", "isController": false}, {"data": [[1.69221456E12, 0.0]], "isOverall": false, "label": "G4 - Q6", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G4 - Q3", "isController": false}, {"data": [[1.69221486E12, 0.0]], "isOverall": false, "label": "G4 - Q4", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "G4 - Q1", "isController": false}, {"data": [[1.69221486E12, 0.0]], "isOverall": false, "label": "G4 - Q2", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "G1 - Q12", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "G1 - Q11", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "G1 - Q14", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G1 - Q13", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "G1 - Q16", "isController": false}, {"data": [[1.69221498E12, 0.0]], "isOverall": false, "label": "G1 - Q15", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G1 - Q18", "isController": false}, {"data": [[1.69221444E12, 1.0]], "isOverall": false, "label": "G5 - Q21", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[1.69221504E12, 0.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G5 - Q22", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "G1 - Q10", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[1.69221432E12, 122.0]], "isOverall": false, "label": "G1 - Q19", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[1.69221474E12, 0.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[1.69221504E12, 0.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[1.69221462E12, 134.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[1.6922154E12, 1.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[1.69221528E12, 0.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[1.69221456E12, 134.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[1.69221474E12, 0.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[1.69221528E12, 0.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[1.69221522E12, 0.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[1.69221474E12, 1.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[1.69221474E12, 0.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[1.69221456E12, 0.0]], "isOverall": false, "label": "G5 - Q3", "isController": false}, {"data": [[1.69221456E12, 142.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G5 - Q2", "isController": false}, {"data": [[1.69221498E12, 0.0]], "isOverall": false, "label": "G5 - Q1", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G5 - Q7", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[1.69221456E12, 0.0]], "isOverall": false, "label": "G5 - Q6", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[1.69221486E12, 0.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[1.69221498E12, 0.0]], "isOverall": false, "label": "G5 - Q5", "isController": false}, {"data": [[1.69221498E12, 0.0]], "isOverall": false, "label": "G5 - Q4", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[1.69221492E12, 0.0]], "isOverall": false, "label": "G5 - Q9", "isController": false}, {"data": [[1.69221492E12, 0.0]], "isOverall": false, "label": "G5 - Q8", "isController": false}, {"data": [[1.69221528E12, 0.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[1.69221504E12, 0.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[1.69221552E12, 0.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[1.69221486E12, 0.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[1.69221492E12, 0.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[1.69221486E12, 0.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[1.69221534E12, 1.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[1.69221474E12, 0.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[1.69221456E12, 0.0]], "isOverall": false, "label": "G3 - Q19", "isController": false}, {"data": [[1.69221444E12, 1.0]], "isOverall": false, "label": "G3 - Q18", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "G3 - Q3", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G3 - Q2", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G3 - Q5", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G3 - Q4", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G3 - Q7", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G3 - Q6", "isController": false}, {"data": [[1.69221474E12, 0.0]], "isOverall": false, "label": "G3 - Q9", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G3 - Q8", "isController": false}, {"data": [[1.69221438E12, 111.0]], "isOverall": false, "label": "G3 - Q15", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G3 - Q16", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "G3 - Q13", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "G3 - Q14", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G3 - Q11", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G3 - Q12", "isController": false}, {"data": [[1.69221456E12, 0.0]], "isOverall": false, "label": "G3 - Q1", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G3 - Q10", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G1 - Q7", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G1 - Q6", "isController": false}, {"data": [[1.69221498E12, 0.0]], "isOverall": false, "label": "G1 - Q5", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221426E12, 0.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "G1 - Q4", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "G1 - Q3", "isController": false}, {"data": [[1.69221426E12, 603.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G1 - Q2", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "G1 - Q1", "isController": false}, {"data": [[1.69221474E12, 0.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[1.69221552E12, 0.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[1.69221504E12, 0.0]], "isOverall": false, "label": "G1 - Q9", "isController": false}, {"data": [[1.69221498E12, 0.0]], "isOverall": false, "label": "G1 - Q8", "isController": false}, {"data": [[1.6922154E12, 0.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221432E12, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69221426E12, 0.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221462E12, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69221426E12, 0.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G4 - Q21", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G4 - Q22", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "G1 - RF2", "isController": false}, {"data": [[1.69221498E12, 0.0]], "isOverall": false, "label": "G1 - RF1", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "G2 - Q16", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G1 - Q22", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "G2 - Q15", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G2 - Q14", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G2 - Q13", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G2 - Q12", "isController": false}, {"data": [[1.69221474E12, 0.0]], "isOverall": false, "label": "G2 - Q11", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "G2 - Q10", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "G5 - Q10", "isController": false}, {"data": [[1.69221456E12, 0.0]], "isOverall": false, "label": "G5 - Q13", "isController": false}, {"data": [[1.69221456E12, 0.0]], "isOverall": false, "label": "G5 - Q14", "isController": false}, {"data": [[1.69221474E12, 0.0]], "isOverall": false, "label": "G1 - Q21", "isController": false}, {"data": [[1.69221492E12, 0.0]], "isOverall": false, "label": "G5 - Q11", "isController": false}, {"data": [[1.69221444E12, 133.0]], "isOverall": false, "label": "G5 - Q12", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G5 - Q18", "isController": false}, {"data": [[1.69221492E12, 0.0]], "isOverall": false, "label": "G5 - Q15", "isController": false}, {"data": [[1.69221498E12, 0.0]], "isOverall": false, "label": "G5 - Q16", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.6922145E12, 0.0]], "isOverall": false, "label": "G5 - Q19", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69221426E12, 0.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69221426E12, 0.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.6922148E12, 0.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69221492E12, 0.0]], "isOverall": false, "label": "G2 - Q19", "isController": false}, {"data": [[1.69221534E12, 0.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69221432E12, 0.0]], "isOverall": false, "label": "G2 - Q18", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G2 - Q22", "isController": false}, {"data": [[1.6922145E12, 137.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[1.69221486E12, 0.0]], "isOverall": false, "label": "G2 - Q21", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[1.69221516E12, 0.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[1.69221528E12, 0.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[1.69221522E12, 0.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[1.69221528E12, 0.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[1.69221516E12, 0.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[1.69221522E12, 0.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[1.69221528E12, 0.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[1.69221528E12, 0.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[1.69221528E12, 0.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[1.69221438E12, 133.0]], "isOverall": false, "label": "G4 - Q16", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "G4 - Q18", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "G4 - Q19", "isController": false}, {"data": [[1.69221438E12, 0.0]], "isOverall": false, "label": "G4 - Q12", "isController": false}, {"data": [[1.69221474E12, 0.0]], "isOverall": false, "label": "G4 - Q13", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "G4 - Q14", "isController": false}, {"data": [[1.69221456E12, 0.0]], "isOverall": false, "label": "G4 - Q15", "isController": false}, {"data": [[1.69221462E12, 0.0]], "isOverall": false, "label": "G4 - Q10", "isController": false}, {"data": [[1.69221444E12, 0.0]], "isOverall": false, "label": "G4 - Q11", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "G3 - Q22", "isController": false}, {"data": [[1.69221468E12, 0.0]], "isOverall": false, "label": "G3 - Q21", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221552E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 5.0, "minX": 1.69221426E12, "maxY": 532011.0, "series": [{"data": [[1.69221444E12, 106423.0], [1.6922154E12, 449937.0], [1.69221504E12, 159626.0], [1.69221474E12, 145929.0], [1.69221516E12, 397618.0], [1.69221486E12, 95180.0], [1.69221546E12, 20548.0], [1.6922148E12, 300969.0], [1.6922145E12, 57825.0], [1.69221492E12, 312203.0], [1.69221462E12, 158197.0], [1.69221522E12, 19313.0], [1.69221456E12, 103391.0], [1.69221552E12, 12713.0], [1.69221426E12, 12511.0], [1.69221534E12, 532011.0], [1.69221468E12, 47305.0], [1.69221438E12, 36176.0], [1.69221432E12, 21483.0], [1.69221528E12, 32759.0], [1.69221498E12, 161582.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69221444E12, 85576.30000000002], [1.6922154E12, 326216.40000000043], [1.69221504E12, 159626.0], [1.69221474E12, 143288.7], [1.69221516E12, 397618.0], [1.69221486E12, 95180.0], [1.69221546E12, 19438.900000000005], [1.6922148E12, 127065.90000000018], [1.6922145E12, 55442.5], [1.69221492E12, 312203.0], [1.69221462E12, 137810.19999999998], [1.69221522E12, 19313.0], [1.69221456E12, 97930.90000000002], [1.69221552E12, 12713.0], [1.69221426E12, 12511.0], [1.69221534E12, 525806.8], [1.69221468E12, 46264.0], [1.69221438E12, 32282.600000000006], [1.69221432E12, 18663.4], [1.69221528E12, 32759.0], [1.69221498E12, 161582.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69221444E12, 106423.0], [1.6922154E12, 449937.0], [1.69221504E12, 159626.0], [1.69221474E12, 145929.0], [1.69221516E12, 397618.0], [1.69221486E12, 95180.0], [1.69221546E12, 20548.0], [1.6922148E12, 300969.0], [1.6922145E12, 57825.0], [1.69221492E12, 312203.0], [1.69221462E12, 158197.0], [1.69221522E12, 19313.0], [1.69221456E12, 103391.0], [1.69221552E12, 12713.0], [1.69221426E12, 12511.0], [1.69221534E12, 532011.0], [1.69221468E12, 47305.0], [1.69221438E12, 36176.0], [1.69221432E12, 21483.0], [1.69221528E12, 32759.0], [1.69221498E12, 161582.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69221444E12, 106423.0], [1.6922154E12, 449937.0], [1.69221504E12, 159626.0], [1.69221474E12, 145929.0], [1.69221516E12, 397618.0], [1.69221486E12, 95180.0], [1.69221546E12, 20548.0], [1.6922148E12, 300969.0], [1.6922145E12, 57825.0], [1.69221492E12, 312203.0], [1.69221462E12, 158197.0], [1.69221522E12, 19313.0], [1.69221456E12, 103391.0], [1.69221552E12, 12713.0], [1.69221426E12, 12511.0], [1.69221534E12, 532011.0], [1.69221468E12, 47305.0], [1.69221438E12, 36176.0], [1.69221432E12, 21483.0], [1.69221528E12, 32759.0], [1.69221498E12, 161582.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69221444E12, 3864.0], [1.6922154E12, 2495.0], [1.69221504E12, 9780.0], [1.69221474E12, 6814.0], [1.69221516E12, 16021.0], [1.69221486E12, 6948.0], [1.69221546E12, 1818.0], [1.6922148E12, 5388.0], [1.6922145E12, 659.0], [1.69221492E12, 5118.0], [1.69221462E12, 5976.0], [1.69221522E12, 4709.0], [1.69221456E12, 6667.0], [1.69221552E12, 2416.0], [1.69221426E12, 7.0], [1.69221534E12, 2292.0], [1.69221468E12, 6144.0], [1.69221438E12, 901.0], [1.69221432E12, 6.0], [1.69221528E12, 2547.0], [1.69221498E12, 5.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69221444E12, 20119.5], [1.6922154E12, 4779.5], [1.69221504E12, 18029.0], [1.69221474E12, 60529.0], [1.69221516E12, 206819.5], [1.69221486E12, 25630.5], [1.69221546E12, 11476.0], [1.6922148E12, 16887.5], [1.6922145E12, 16070.0], [1.69221492E12, 30373.0], [1.69221462E12, 34256.0], [1.69221522E12, 13656.0], [1.69221456E12, 28120.0], [1.69221552E12, 7564.5], [1.69221426E12, 4360.0], [1.69221534E12, 7131.0], [1.69221468E12, 15933.0], [1.69221438E12, 5460.0], [1.69221432E12, 3025.5], [1.69221528E12, 4201.0], [1.69221498E12, 3906.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221552E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 13639.0, "minX": 1.0, "maxY": 42007.0, "series": [{"data": [[1.0, 13639.0], [2.0, 15119.0], [3.0, 42007.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 13638.0, "minX": 1.0, "maxY": 42006.0, "series": [{"data": [[1.0, 13638.0], [2.0, 15118.5], [3.0, 42006.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69221426E12, "maxY": 0.3333333333333333, "series": [{"data": [[1.69221444E12, 0.26666666666666666], [1.6922154E12, 0.18333333333333332], [1.69221504E12, 0.05], [1.69221474E12, 0.15], [1.69221516E12, 0.03333333333333333], [1.69221486E12, 0.11666666666666667], [1.69221546E12, 0.18333333333333332], [1.6922148E12, 0.26666666666666666], [1.6922145E12, 0.2833333333333333], [1.69221492E12, 0.1], [1.69221462E12, 0.21666666666666667], [1.69221522E12, 0.05], [1.69221456E12, 0.18333333333333332], [1.69221552E12, 0.016666666666666666], [1.69221426E12, 0.11666666666666667], [1.69221534E12, 0.15], [1.69221468E12, 0.16666666666666666], [1.69221438E12, 0.2833333333333333], [1.69221432E12, 0.3333333333333333], [1.69221528E12, 0.13333333333333333], [1.69221498E12, 0.11666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221552E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.69221426E12, "maxY": 0.26666666666666666, "series": [{"data": [[1.69221444E12, 0.26666666666666666], [1.6922154E12, 0.2], [1.69221504E12, 0.06666666666666667], [1.69221474E12, 0.16666666666666666], [1.69221516E12, 0.03333333333333333], [1.69221486E12, 0.13333333333333333], [1.69221546E12, 0.2], [1.6922148E12, 0.26666666666666666], [1.6922145E12, 0.23333333333333334], [1.69221492E12, 0.11666666666666667], [1.69221462E12, 0.21666666666666667], [1.69221522E12, 0.05], [1.69221456E12, 0.16666666666666666], [1.69221552E12, 0.03333333333333333], [1.69221426E12, 0.1], [1.69221534E12, 0.18333333333333332], [1.69221468E12, 0.16666666666666666], [1.69221438E12, 0.26666666666666666], [1.69221432E12, 0.26666666666666666], [1.69221528E12, 0.13333333333333333], [1.69221498E12, 0.13333333333333333]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221552E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69221426E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q1-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q3-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q13-success", "isController": false}, {"data": [[1.69221522E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q2-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q3-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - RF2-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q16-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q6-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q7-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q21-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q14-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q14-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q9-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q18-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q14-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q11-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q7-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q8-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q8-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q10-success", "isController": false}, {"data": [[1.69221492E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q21-success", "isController": false}, {"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q15-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q6-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q12-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q11-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q18-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q16-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q4-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q2-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q3-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q11-success", "isController": false}, {"data": [[1.69221504E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q15-success", "isController": false}, {"data": [[1.69221492E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q19-success", "isController": false}, {"data": [[1.69221486E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q12-success", "isController": false}, {"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q14-success", "isController": false}, {"data": [[1.69221486E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q9-success", "isController": false}, {"data": [[1.69221498E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q8-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q2-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q9-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q10-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q18-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q15-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q9-success", "isController": false}, {"data": [[1.69221426E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF2-success", "isController": false}, {"data": [[1.69221522E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q7-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q5-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q19-success", "isController": false}, {"data": [[1.69221498E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q4-success", "isController": false}, {"data": [[1.69221426E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q16-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q1-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q1-success", "isController": false}, {"data": [[1.69221492E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q11-success", "isController": false}, {"data": [[1.69221528E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q15-success", "isController": false}, {"data": [[1.69221552E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q22-success", "isController": false}, {"data": [[1.69221498E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q1-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q2-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q10-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q18-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q7-success", "isController": false}, {"data": [[1.69221492E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q13-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q8-success", "isController": false}, {"data": [[1.69221492E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q9-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q18-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q10-success", "isController": false}, {"data": [[1.69221426E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q5-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q16-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q16-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q13-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q22-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q4-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q6-success", "isController": false}, {"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q19-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q19-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q19-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q22-success", "isController": false}, {"data": [[1.69221528E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q4-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q2-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q1-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q16-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q3-success", "isController": false}, {"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q6-success", "isController": false}, {"data": [[1.69221516E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q1-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q6-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q7-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q8-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q11-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q18-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q10-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q13-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q13-success", "isController": false}, {"data": [[1.69221498E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q16-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q22-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q16-success", "isController": false}, {"data": [[1.69221516E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q9-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q13-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q19-success", "isController": false}, {"data": [[1.69221504E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q9-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q10-success", "isController": false}, {"data": [[1.69221528E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q22-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q5-success", "isController": false}, {"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q16-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q10-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q13-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q3-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q7-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q22-success", "isController": false}, {"data": [[1.69221486E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q4-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q13-success", "isController": false}, {"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q3-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q18-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q19-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q16-success", "isController": false}, {"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q13-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q1-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q5-success", "isController": false}, {"data": [[1.69221486E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q10-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q8-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q22-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q11-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q7-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q14-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q3-success", "isController": false}, {"data": [[1.69221486E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q21-success", "isController": false}, {"data": [[1.69221528E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q6-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q11-success", "isController": false}, {"data": [[1.69221426E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q10-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q14-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q18-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q4-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q4-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF1-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q12-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q3-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q10-success", "isController": false}, {"data": [[1.69221486E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q19-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q15-success", "isController": false}, {"data": [[1.69221498E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - RF1-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q5-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q2-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q5-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q4-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q11-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q15-success", "isController": false}, {"data": [[1.69221492E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q8-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q22-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q13-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q8-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q12-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q9-success", "isController": false}, {"data": [[1.69221498E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q15-success", "isController": false}, {"data": [[1.69221504E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q7-success", "isController": false}, {"data": [[1.6922154E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q19-success", "isController": false}, {"data": [[1.69221426E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q6-success", "isController": false}, {"data": [[1.69221486E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q5-success", "isController": false}, {"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q12-success", "isController": false}, {"data": [[1.69221528E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q3-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q22-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q18-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q21-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q11-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q14-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q2-success", "isController": false}, {"data": [[1.69221486E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q2-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q14-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q21-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q4-success", "isController": false}, {"data": [[1.69221528E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q19-success", "isController": false}, {"data": [[1.69221456E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q6-success", "isController": false}, {"data": [[1.69221492E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q15-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q12-success", "isController": false}, {"data": [[1.69221498E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q5-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q9-success", "isController": false}, {"data": [[1.69221426E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q12-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q12-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q15-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q21-success", "isController": false}, {"data": [[1.69221528E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q8-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q8-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q18-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q21-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q1-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q14-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q11-success", "isController": false}, {"data": [[1.6922148E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q6-success", "isController": false}, {"data": [[1.69221498E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q5-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q3-success", "isController": false}, {"data": [[1.69221474E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q21-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q22-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q1-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G1 - Q2-success", "isController": false}, {"data": [[1.69221504E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q1-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q15-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q2-success", "isController": false}, {"data": [[1.69221444E12, 0.016666666666666666]], "isOverall": false, "label": "G5 - Q12-success", "isController": false}, {"data": [[1.69221522E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q14-success", "isController": false}, {"data": [[1.69221462E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q21-success", "isController": false}, {"data": [[1.6922145E12, 0.016666666666666666]], "isOverall": false, "label": "G3 - Q6-success", "isController": false}, {"data": [[1.69221468E12, 0.016666666666666666]], "isOverall": false, "label": "G2 - Q7-success", "isController": false}, {"data": [[1.69221534E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q9-success", "isController": false}, {"data": [[1.69221552E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q7-success", "isController": false}, {"data": [[1.69221438E12, 0.016666666666666666]], "isOverall": false, "label": "G4 - Q12-success", "isController": false}, {"data": [[1.69221528E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q5-success", "isController": false}, {"data": [[1.69221432E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q4-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q21-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221552E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.69221426E12, "maxY": 0.26666666666666666, "series": [{"data": [[1.69221444E12, 0.26666666666666666], [1.6922154E12, 0.2], [1.69221504E12, 0.06666666666666667], [1.69221474E12, 0.16666666666666666], [1.69221516E12, 0.03333333333333333], [1.69221486E12, 0.13333333333333333], [1.69221546E12, 0.2], [1.6922148E12, 0.26666666666666666], [1.6922145E12, 0.23333333333333334], [1.69221492E12, 0.11666666666666667], [1.69221462E12, 0.21666666666666667], [1.69221522E12, 0.05], [1.69221456E12, 0.16666666666666666], [1.69221552E12, 0.03333333333333333], [1.69221426E12, 0.1], [1.69221534E12, 0.18333333333333332], [1.69221468E12, 0.16666666666666666], [1.69221438E12, 0.26666666666666666], [1.69221432E12, 0.26666666666666666], [1.69221528E12, 0.13333333333333333], [1.69221498E12, 0.13333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221552E12, "title": "Total Transactions Per Second"}},
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
