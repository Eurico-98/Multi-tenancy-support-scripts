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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[28600.0, 1.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[10700.0, 1.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[45500.0, 1.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[57400.0, 1.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[319100.0, 1.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[39700.0, 1.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[20400.0, 1.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[75700.0, 1.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[119800.0, 1.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[61100.0, 1.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[36600.0, 1.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[7900.0, 1.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[5400.0, 1.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[28800.0, 1.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[34600.0, 1.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[73800.0, 1.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "T20 - Q8", "isController": false}, {"data": [[69700.0, 1.0]], "isOverall": false, "label": "T20 - Q9", "isController": false}, {"data": [[24100.0, 1.0]], "isOverall": false, "label": "T20 - Q2", "isController": false}, {"data": [[9900.0, 1.0]], "isOverall": false, "label": "T20 - Q3", "isController": false}, {"data": [[88900.0, 1.0]], "isOverall": false, "label": "T20 - Q1", "isController": false}, {"data": [[121700.0, 1.0]], "isOverall": false, "label": "T20 - Q6", "isController": false}, {"data": [[42500.0, 1.0]], "isOverall": false, "label": "T20 - Q7", "isController": false}, {"data": [[4200.0, 1.0]], "isOverall": false, "label": "T20 - Q4", "isController": false}, {"data": [[23700.0, 1.0]], "isOverall": false, "label": "T20 - Q5", "isController": false}, {"data": [[14600.0, 1.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[67300.0, 1.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[78400.0, 1.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[38000.0, 1.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[37800.0, 1.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[8500.0, 1.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[101500.0, 1.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[6000.0, 1.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[12400.0, 1.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[50900.0, 1.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[67300.0, 1.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[80800.0, 1.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[11600.0, 1.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[4400.0, 1.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[22400.0, 1.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[65400.0, 1.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[102200.0, 1.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[114000.0, 1.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[28600.0, 1.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[65800.0, 1.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[54900.0, 1.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[128400.0, 1.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[23700.0, 1.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[4900.0, 1.0]], "isOverall": false, "label": "T21 - Q22", "isController": false}, {"data": [[28400.0, 1.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[74300.0, 1.0]], "isOverall": false, "label": "T21 - Q21", "isController": false}, {"data": [[292400.0, 1.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[201300.0, 1.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[169300.0, 1.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[17200.0, 1.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[17900.0, 1.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[8400.0, 1.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[195000.0, 1.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[101300.0, 1.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[18100.0, 1.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[118700.0, 1.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[69800.0, 1.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[79900.0, 1.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[545000.0, 1.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[113300.0, 1.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[23900.0, 1.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[17500.0, 1.0]], "isOverall": false, "label": "T19 - Q22", "isController": false}, {"data": [[74300.0, 1.0]], "isOverall": false, "label": "T19 - Q21", "isController": false}, {"data": [[36600.0, 1.0]], "isOverall": false, "label": "T18 - Q16", "isController": false}, {"data": [[357100.0, 1.0]], "isOverall": false, "label": "T18 - Q15", "isController": false}, {"data": [[81000.0, 1.0]], "isOverall": false, "label": "T18 - Q14", "isController": false}, {"data": [[26900.0, 1.0]], "isOverall": false, "label": "T18 - Q13", "isController": false}, {"data": [[39000.0, 1.0]], "isOverall": false, "label": "T19 - Q19", "isController": false}, {"data": [[87700.0, 1.0]], "isOverall": false, "label": "T18 - Q12", "isController": false}, {"data": [[37700.0, 1.0]], "isOverall": false, "label": "T18 - Q11", "isController": false}, {"data": [[23100.0, 1.0]], "isOverall": false, "label": "T18 - Q10", "isController": false}, {"data": [[96100.0, 1.0]], "isOverall": false, "label": "T19 - Q18", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[18600.0, 1.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[41600.0, 1.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[196200.0, 1.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[52700.0, 1.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[17700.0, 1.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[52600.0, 1.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[142700.0, 1.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[66300.0, 1.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[105600.0, 1.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[466400.0, 1.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[444100.0, 1.0]], "isOverall": false, "label": "T19 - Q15", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "T19 - Q16", "isController": false}, {"data": [[34300.0, 1.0]], "isOverall": false, "label": "T19 - Q13", "isController": false}, {"data": [[73400.0, 1.0]], "isOverall": false, "label": "T19 - Q14", "isController": false}, {"data": [[7300.0, 1.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[28600.0, 1.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T19 - Q11", "isController": false}, {"data": [[65300.0, 1.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[52100.0, 1.0]], "isOverall": false, "label": "T19 - Q12", "isController": false}, {"data": [[65700.0, 1.0]], "isOverall": false, "label": "T18 - Q19", "isController": false}, {"data": [[17400.0, 1.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[99700.0, 1.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T19 - Q10", "isController": false}, {"data": [[84000.0, 1.0]], "isOverall": false, "label": "T18 - Q18", "isController": false}, {"data": [[10600.0, 1.0]], "isOverall": false, "label": "T18 - Q22", "isController": false}, {"data": [[94200.0, 1.0]], "isOverall": false, "label": "T18 - Q21", "isController": false}, {"data": [[13300.0, 1.0]], "isOverall": false, "label": "T18 - Q4", "isController": false}, {"data": [[20800.0, 1.0]], "isOverall": false, "label": "T18 - Q3", "isController": false}, {"data": [[18600.0, 1.0]], "isOverall": false, "label": "T18 - Q2", "isController": false}, {"data": [[60400.0, 1.0]], "isOverall": false, "label": "T18 - Q1", "isController": false}, {"data": [[15500.0, 1.0]], "isOverall": false, "label": "T18 - Q8", "isController": false}, {"data": [[29600.0, 1.0]], "isOverall": false, "label": "T18 - Q7", "isController": false}, {"data": [[67300.0, 1.0]], "isOverall": false, "label": "T18 - Q6", "isController": false}, {"data": [[65500.0, 1.0]], "isOverall": false, "label": "T20 - Q19", "isController": false}, {"data": [[20100.0, 1.0]], "isOverall": false, "label": "T18 - Q5", "isController": false}, {"data": [[696600.0, 1.0]], "isOverall": false, "label": "T21 - Q9", "isController": false}, {"data": [[77500.0, 1.0]], "isOverall": false, "label": "T20 - Q18", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "T21 - Q8", "isController": false}, {"data": [[32300.0, 1.0]], "isOverall": false, "label": "T21 - Q7", "isController": false}, {"data": [[5100.0, 1.0]], "isOverall": false, "label": "T20 - Q16", "isController": false}, {"data": [[21100.0, 1.0]], "isOverall": false, "label": "T21 - Q6", "isController": false}, {"data": [[6400.0, 1.0]], "isOverall": false, "label": "T21 - Q5", "isController": false}, {"data": [[444600.0, 1.0]], "isOverall": false, "label": "T20 - Q15", "isController": false}, {"data": [[3500.0, 1.0]], "isOverall": false, "label": "T21 - Q4", "isController": false}, {"data": [[80400.0, 1.0]], "isOverall": false, "label": "T20 - Q14", "isController": false}, {"data": [[8500.0, 1.0]], "isOverall": false, "label": "T21 - Q3", "isController": false}, {"data": [[13700.0, 1.0]], "isOverall": false, "label": "T20 - Q13", "isController": false}, {"data": [[94600.0, 1.0]], "isOverall": false, "label": "T20 - Q12", "isController": false}, {"data": [[9900.0, 1.0]], "isOverall": false, "label": "T21 - Q2", "isController": false}, {"data": [[74400.0, 1.0]], "isOverall": false, "label": "T21 - Q1", "isController": false}, {"data": [[7600.0, 1.0]], "isOverall": false, "label": "T20 - Q11", "isController": false}, {"data": [[15100.0, 1.0]], "isOverall": false, "label": "T20 - Q10", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[17500.0, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[18900.0, 1.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[14300.0, 1.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[530900.0, 1.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[14600.0, 1.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[92800.0, 1.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[14500.0, 1.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[4900.0, 1.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[32700.0, 1.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[47400.0, 1.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[76800.0, 1.0]], "isOverall": false, "label": "T18 - Q9", "isController": false}, {"data": [[16400.0, 1.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[63100.0, 1.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[104400.0, 1.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[13600.0, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[125500.0, 1.0]], "isOverall": false, "label": "T21 - Q15", "isController": false}, {"data": [[87400.0, 1.0]], "isOverall": false, "label": "T21 - Q14", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "T21 - Q16", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "T21 - Q11", "isController": false}, {"data": [[10300.0, 1.0]], "isOverall": false, "label": "T21 - Q10", "isController": false}, {"data": [[24100.0, 1.0]], "isOverall": false, "label": "T21 - Q13", "isController": false}, {"data": [[84600.0, 1.0]], "isOverall": false, "label": "T21 - Q12", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[95600.0, 1.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[115600.0, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[57300.0, 1.0]], "isOverall": false, "label": "T21 - Q19", "isController": false}, {"data": [[114300.0, 1.0]], "isOverall": false, "label": "T21 - Q18", "isController": false}, {"data": [[13000.0, 1.0]], "isOverall": false, "label": "T20 - Q22", "isController": false}, {"data": [[32300.0, 1.0]], "isOverall": false, "label": "T20 - Q21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[15800.0, 1.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[12400.0, 1.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[3400.0, 1.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[6000.0, 1.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[91100.0, 1.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[46500.0, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[7200.0, 1.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[545400.0, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[19800.0, 1.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[45900.0, 1.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[138400.0, 1.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[79300.0, 1.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[45900.0, 1.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[40600.0, 1.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[115900.0, 1.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[50900.0, 1.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[17600.0, 1.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[114400.0, 1.0]], "isOverall": false, "label": "T19 - Q1", "isController": false}, {"data": [[6900.0, 1.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "T19 - Q2", "isController": false}, {"data": [[9800.0, 1.0]], "isOverall": false, "label": "T19 - Q3", "isController": false}, {"data": [[7100.0, 1.0]], "isOverall": false, "label": "T19 - Q4", "isController": false}, {"data": [[24100.0, 1.0]], "isOverall": false, "label": "T19 - Q5", "isController": false}, {"data": [[69300.0, 1.0]], "isOverall": false, "label": "T19 - Q6", "isController": false}, {"data": [[32700.0, 1.0]], "isOverall": false, "label": "T19 - Q7", "isController": false}, {"data": [[16000.0, 1.0]], "isOverall": false, "label": "T19 - Q8", "isController": false}, {"data": [[531100.0, 1.0]], "isOverall": false, "label": "T19 - Q9", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 696600.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 200.0, "series": [{"data": [[0.0, 2.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 200.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69217772E12, "maxY": 1.0, "series": [{"data": [[1.6921794E12, 1.0], [1.69217922E12, 1.0], [1.69217808E12, 1.0], [1.69217856E12, 1.0], [1.69217814E12, 1.0], [1.69217802E12, 1.0], [1.6921785E12, 1.0], [1.69217832E12, 1.0], [1.69217838E12, 1.0], [1.69217934E12, 1.0], [1.6921782E12, 1.0]], "isOverall": false, "label": "T21", "isController": false}, {"data": [[1.69217826E12, 1.0], [1.69217874E12, 1.0], [1.69217922E12, 1.0], [1.69217856E12, 1.0], [1.69217814E12, 1.0], [1.69217844E12, 1.0], [1.69217802E12, 1.0], [1.6921785E12, 1.0], [1.69217838E12, 1.0], [1.6921782E12, 1.0], [1.69217868E12, 1.0]], "isOverall": false, "label": "T20", "isController": false}, {"data": [[1.69217856E12, 1.0], [1.69217862E12, 1.0], [1.69217892E12, 1.0], [1.69217802E12, 1.0], [1.69217898E12, 1.0], [1.69217874E12, 1.0], [1.69217904E12, 1.0], [1.69217814E12, 1.0], [1.6921791E12, 1.0], [1.6921785E12, 1.0], [1.6921788E12, 1.0], [1.69217886E12, 1.0], [1.6921782E12, 1.0]], "isOverall": false, "label": "T23", "isController": false}, {"data": [[1.69217826E12, 1.0], [1.69217922E12, 1.0], [1.69217856E12, 1.0], [1.69217862E12, 1.0], [1.69217892E12, 1.0], [1.69217838E12, 1.0], [1.69217868E12, 1.0], [1.69217814E12, 1.0], [1.6921791E12, 1.0], [1.6921785E12, 1.0], [1.6921788E12, 1.0], [1.69217886E12, 1.0], [1.69217916E12, 1.0]], "isOverall": false, "label": "T22", "isController": false}, {"data": [[1.69217826E12, 1.0], [1.69217874E12, 1.0], [1.69217808E12, 1.0], [1.69217862E12, 1.0], [1.69217844E12, 1.0], [1.6921785E12, 1.0], [1.69217982E12, 1.0], [1.69217832E12, 1.0], [1.69217928E12, 1.0], [1.69217976E12, 1.0], [1.6921782E12, 1.0], [1.69217868E12, 1.0]], "isOverall": false, "label": "T25", "isController": false}, {"data": [[1.69217874E12, 1.0], [1.69217808E12, 1.0], [1.69217904E12, 1.0], [1.69217814E12, 1.0], [1.69217862E12, 1.0], [1.69217892E12, 1.0], [1.6921785E12, 1.0], [1.69217832E12, 1.0], [1.6921788E12, 1.0], [1.69217838E12, 1.0], [1.69217886E12, 1.0], [1.69217868E12, 1.0]], "isOverall": false, "label": "T24", "isController": false}, {"data": [[1.69217826E12, 1.0], [1.69217892E12, 1.0], [1.69217802E12, 1.0], [1.69217898E12, 1.0], [1.69217832E12, 1.0], [1.69217838E12, 1.0], [1.69217808E12, 1.0], [1.6921791E12, 1.0], [1.69217844E12, 1.0], [1.6921785E12, 1.0], [1.69217886E12, 1.0], [1.6921782E12, 1.0], [1.69217916E12, 1.0]], "isOverall": false, "label": "T18", "isController": false}, {"data": [[1.69217826E12, 1.0], [1.69217856E12, 1.0], [1.69217796E12, 1.0], [1.69217898E12, 1.0], [1.69217832E12, 1.0], [1.69217868E12, 1.0], [1.69217904E12, 1.0], [1.69217814E12, 1.0], [1.6921791E12, 1.0], [1.69217844E12, 1.0], [1.6921785E12, 1.0], [1.6921779E12, 1.0], [1.6921782E12, 1.0], [1.69217916E12, 1.0]], "isOverall": false, "label": "T17", "isController": false}, {"data": [[1.69217778E12, 1.0], [1.69217874E12, 1.0], [1.69217922E12, 1.0], [1.69217856E12, 1.0], [1.69217862E12, 1.0], [1.69217844E12, 1.0], [1.69217832E12, 1.0], [1.69217928E12, 1.0], [1.69217838E12, 1.0], [1.69217772E12, 1.0]], "isOverall": false, "label": "T1", "isController": false}, {"data": [[1.69217826E12, 1.0], [1.69217874E12, 1.0], [1.69217808E12, 1.0], [1.69217958E12, 1.0], [1.69217904E12, 1.0], [1.69217796E12, 1.0], [1.69217802E12, 1.0], [1.69217898E12, 1.0], [1.6921788E12, 1.0], [1.69217886E12, 1.0], [1.6921782E12, 1.0]], "isOverall": false, "label": "T19", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69217982E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 7.0, "minX": 1.0, "maxY": 696604.0, "series": [{"data": [[10.0, 28683.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[10.0, 28683.0]], "isOverall": false, "label": "T23 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 10719.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[10.0, 10719.0]], "isOverall": false, "label": "T23 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 45572.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[10.0, 45572.0]], "isOverall": false, "label": "T23 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 57430.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[9.0, 57430.0]], "isOverall": false, "label": "T23 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 319108.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[10.0, 319108.0]], "isOverall": false, "label": "T23 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 39751.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[10.0, 39751.0]], "isOverall": false, "label": "T23 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 20402.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[10.0, 20402.0]], "isOverall": false, "label": "T23 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 75757.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[10.0, 75757.0]], "isOverall": false, "label": "T23 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 119861.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[10.0, 119861.0]], "isOverall": false, "label": "T23 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 61120.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[10.0, 61120.0]], "isOverall": false, "label": "T17 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 36695.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[10.0, 36695.0]], "isOverall": false, "label": "T17 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 7939.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[10.0, 7939.0]], "isOverall": false, "label": "T17 - Q4-Aggregated", "isController": false}, {"data": [[2.0, 5435.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[2.0, 5435.0]], "isOverall": false, "label": "T17 - Q5-Aggregated", "isController": false}, {"data": [[5.0, 28839.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[5.0, 28839.0]], "isOverall": false, "label": "T17 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 34668.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[10.0, 34668.0]], "isOverall": false, "label": "T17 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 73815.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[10.0, 73815.0]], "isOverall": false, "label": "T17 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 5526.0]], "isOverall": false, "label": "T20 - Q8", "isController": false}, {"data": [[10.0, 5526.0]], "isOverall": false, "label": "T20 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 69766.0]], "isOverall": false, "label": "T20 - Q9", "isController": false}, {"data": [[10.0, 69766.0]], "isOverall": false, "label": "T20 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 24129.0]], "isOverall": false, "label": "T20 - Q2", "isController": false}, {"data": [[10.0, 24129.0]], "isOverall": false, "label": "T20 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 9904.0]], "isOverall": false, "label": "T20 - Q3", "isController": false}, {"data": [[10.0, 9904.0]], "isOverall": false, "label": "T20 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 88960.0]], "isOverall": false, "label": "T20 - Q1", "isController": false}, {"data": [[10.0, 88960.0]], "isOverall": false, "label": "T20 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 121730.0]], "isOverall": false, "label": "T20 - Q6", "isController": false}, {"data": [[10.0, 121730.0]], "isOverall": false, "label": "T20 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 42592.0]], "isOverall": false, "label": "T20 - Q7", "isController": false}, {"data": [[10.0, 42592.0]], "isOverall": false, "label": "T20 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 4210.0]], "isOverall": false, "label": "T20 - Q4", "isController": false}, {"data": [[10.0, 4210.0]], "isOverall": false, "label": "T20 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 23706.0]], "isOverall": false, "label": "T20 - Q5", "isController": false}, {"data": [[10.0, 23706.0]], "isOverall": false, "label": "T20 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 14623.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[10.0, 14623.0]], "isOverall": false, "label": "T24 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 67305.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[10.0, 67305.0]], "isOverall": false, "label": "T24 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 78451.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[10.0, 78451.0]], "isOverall": false, "label": "T24 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 38074.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[10.0, 38074.0]], "isOverall": false, "label": "T24 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 5601.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[10.0, 5601.0]], "isOverall": false, "label": "T24 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 37812.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[10.0, 37812.0]], "isOverall": false, "label": "T24 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 8507.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[10.0, 8507.0]], "isOverall": false, "label": "T17 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 101501.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[10.0, 101501.0]], "isOverall": false, "label": "T17 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 6035.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[10.0, 6035.0]], "isOverall": false, "label": "T24 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 12436.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[10.0, 12436.0]], "isOverall": false, "label": "T24 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 50962.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[10.0, 50962.0]], "isOverall": false, "label": "T24 - Q1-Aggregated", "isController": false}, {"data": [[7.0, 67368.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[7.0, 67368.0]], "isOverall": false, "label": "T17 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 80817.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[10.0, 80817.0]], "isOverall": false, "label": "T24 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 11632.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[10.0, 11632.0]], "isOverall": false, "label": "T24 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 4435.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[10.0, 4435.0]], "isOverall": false, "label": "T17 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 22498.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[10.0, 22498.0]], "isOverall": false, "label": "T25 - Q4-Aggregated", "isController": false}, {"data": [[3.0, 5317.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[3.0, 5317.0]], "isOverall": false, "label": "T25 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 65486.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[10.0, 65486.0]], "isOverall": false, "label": "T17 - Q21-Aggregated", "isController": false}, {"data": [[3.0, 3809.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[3.0, 3809.0]], "isOverall": false, "label": "T25 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 102203.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[10.0, 102203.0]], "isOverall": false, "label": "T25 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 114048.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[10.0, 114048.0]], "isOverall": false, "label": "T17 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 28639.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[10.0, 28639.0]], "isOverall": false, "label": "T17 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 65875.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[10.0, 65875.0]], "isOverall": false, "label": "T22 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 54926.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[10.0, 54926.0]], "isOverall": false, "label": "T17 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 128406.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[10.0, 128406.0]], "isOverall": false, "label": "T22 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 23771.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[10.0, 23771.0]], "isOverall": false, "label": "T17 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 4946.0]], "isOverall": false, "label": "T21 - Q22", "isController": false}, {"data": [[10.0, 4946.0]], "isOverall": false, "label": "T21 - Q22-Aggregated", "isController": false}, {"data": [[9.0, 28468.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[9.0, 28468.0]], "isOverall": false, "label": "T17 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 74385.0]], "isOverall": false, "label": "T21 - Q21", "isController": false}, {"data": [[10.0, 74385.0]], "isOverall": false, "label": "T21 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 292453.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[10.0, 292453.0]], "isOverall": false, "label": "T17 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 201302.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[10.0, 201302.0]], "isOverall": false, "label": "T17 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 169331.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[10.0, 169331.0]], "isOverall": false, "label": "T22 - Q12-Aggregated", "isController": false}, {"data": [[5.0, 17207.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[5.0, 17207.0]], "isOverall": false, "label": "T22 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 17975.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[10.0, 17975.0]], "isOverall": false, "label": "T22 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 8415.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[10.0, 8415.0]], "isOverall": false, "label": "T22 - Q16-Aggregated", "isController": false}, {"data": [[9.0, 195020.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[9.0, 195020.0]], "isOverall": false, "label": "T22 - Q15-Aggregated", "isController": false}, {"data": [[2.0, 4047.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[2.0, 4047.0]], "isOverall": false, "label": "T17 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 101379.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[10.0, 101379.0]], "isOverall": false, "label": "T22 - Q14-Aggregated", "isController": false}, {"data": [[5.0, 18109.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[5.0, 18109.0]], "isOverall": false, "label": "T22 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 118770.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[10.0, 118770.0]], "isOverall": false, "label": "T25 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 69882.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[10.0, 69882.0]], "isOverall": false, "label": "T25 - Q19-Aggregated", "isController": false}, {"data": [[1.0, 2144.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[1.0, 2144.0]], "isOverall": false, "label": "T25 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 79922.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[10.0, 79922.0]], "isOverall": false, "label": "T25 - Q14-Aggregated", "isController": false}, {"data": [[3.0, 545016.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[3.0, 545016.0]], "isOverall": false, "label": "T25 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 113318.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[10.0, 113318.0]], "isOverall": false, "label": "T25 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 23982.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[10.0, 23982.0]], "isOverall": false, "label": "T25 - Q13-Aggregated", "isController": false}, {"data": [[3.0, 3119.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[3.0, 3119.0]], "isOverall": false, "label": "T25 - Q10-Aggregated", "isController": false}, {"data": [[1.0, 2625.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[1.0, 2625.0]], "isOverall": false, "label": "T25 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 17550.0]], "isOverall": false, "label": "T19 - Q22", "isController": false}, {"data": [[10.0, 17550.0]], "isOverall": false, "label": "T19 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 74340.0]], "isOverall": false, "label": "T19 - Q21", "isController": false}, {"data": [[10.0, 74340.0]], "isOverall": false, "label": "T19 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 36646.0]], "isOverall": false, "label": "T18 - Q16", "isController": false}, {"data": [[10.0, 36646.0]], "isOverall": false, "label": "T18 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 357184.0]], "isOverall": false, "label": "T18 - Q15", "isController": false}, {"data": [[10.0, 357184.0]], "isOverall": false, "label": "T18 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 81093.0]], "isOverall": false, "label": "T18 - Q14", "isController": false}, {"data": [[10.0, 81093.0]], "isOverall": false, "label": "T18 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 26925.0]], "isOverall": false, "label": "T18 - Q13", "isController": false}, {"data": [[10.0, 26925.0]], "isOverall": false, "label": "T18 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 39039.0]], "isOverall": false, "label": "T19 - Q19", "isController": false}, {"data": [[10.0, 39039.0]], "isOverall": false, "label": "T19 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 87742.0]], "isOverall": false, "label": "T18 - Q12", "isController": false}, {"data": [[10.0, 87742.0]], "isOverall": false, "label": "T18 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 37739.0]], "isOverall": false, "label": "T18 - Q11", "isController": false}, {"data": [[10.0, 37739.0]], "isOverall": false, "label": "T18 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 23115.0]], "isOverall": false, "label": "T18 - Q10", "isController": false}, {"data": [[10.0, 23115.0]], "isOverall": false, "label": "T18 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 96160.0]], "isOverall": false, "label": "T19 - Q18", "isController": false}, {"data": [[10.0, 96160.0]], "isOverall": false, "label": "T19 - Q18-Aggregated", "isController": false}, {"data": [[6.0, 3859.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[6.0, 3859.0]], "isOverall": false, "label": "T22 - Q22-Aggregated", "isController": false}, {"data": [[6.0, 18668.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[6.0, 18668.0]], "isOverall": false, "label": "T22 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 41642.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[10.0, 41642.0]], "isOverall": false, "label": "T25 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 196240.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[10.0, 196240.0]], "isOverall": false, "label": "T24 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 52739.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[10.0, 52739.0]], "isOverall": false, "label": "T25 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 2717.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[10.0, 2717.0]], "isOverall": false, "label": "T24 - Q16-Aggregated", "isController": false}, {"data": [[9.0, 17796.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[9.0, 17796.0]], "isOverall": false, "label": "T23 - Q22-Aggregated", "isController": false}, {"data": [[1.0, 52686.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[1.0, 52686.0]], "isOverall": false, "label": "T25 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 142735.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[10.0, 142735.0]], "isOverall": false, "label": "T24 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 66306.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[10.0, 66306.0]], "isOverall": false, "label": "T23 - Q21-Aggregated", "isController": false}, {"data": [[1.0, 3391.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[1.0, 3391.0]], "isOverall": false, "label": "T25 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 105653.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[10.0, 105653.0]], "isOverall": false, "label": "T24 - Q19-Aggregated", "isController": false}, {"data": [[1.0, 466452.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[1.0, 466452.0]], "isOverall": false, "label": "T25 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 444173.0]], "isOverall": false, "label": "T19 - Q15", "isController": false}, {"data": [[10.0, 444173.0]], "isOverall": false, "label": "T19 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 2950.0]], "isOverall": false, "label": "T19 - Q16", "isController": false}, {"data": [[10.0, 2950.0]], "isOverall": false, "label": "T19 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 34377.0]], "isOverall": false, "label": "T19 - Q13", "isController": false}, {"data": [[10.0, 34377.0]], "isOverall": false, "label": "T19 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 73423.0]], "isOverall": false, "label": "T19 - Q14", "isController": false}, {"data": [[10.0, 73423.0]], "isOverall": false, "label": "T19 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 7373.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[10.0, 7373.0]], "isOverall": false, "label": "T24 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 28676.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[10.0, 28676.0]], "isOverall": false, "label": "T24 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 3168.0]], "isOverall": false, "label": "T19 - Q11", "isController": false}, {"data": [[10.0, 3168.0]], "isOverall": false, "label": "T19 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 65366.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[10.0, 65366.0]], "isOverall": false, "label": "T24 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 52180.0]], "isOverall": false, "label": "T19 - Q12", "isController": false}, {"data": [[10.0, 52180.0]], "isOverall": false, "label": "T19 - Q12-Aggregated", "isController": false}, {"data": [[8.0, 65755.0]], "isOverall": false, "label": "T18 - Q19", "isController": false}, {"data": [[8.0, 65755.0]], "isOverall": false, "label": "T18 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 17446.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[10.0, 17446.0]], "isOverall": false, "label": "T24 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 99792.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[10.0, 99792.0]], "isOverall": false, "label": "T24 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 3912.0]], "isOverall": false, "label": "T19 - Q10", "isController": false}, {"data": [[10.0, 3912.0]], "isOverall": false, "label": "T19 - Q10-Aggregated", "isController": false}, {"data": [[9.0, 84074.0]], "isOverall": false, "label": "T18 - Q18", "isController": false}, {"data": [[9.0, 84074.0]], "isOverall": false, "label": "T18 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 10668.0]], "isOverall": false, "label": "T18 - Q22", "isController": false}, {"data": [[10.0, 10668.0]], "isOverall": false, "label": "T18 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 94229.0]], "isOverall": false, "label": "T18 - Q21", "isController": false}, {"data": [[10.0, 94229.0]], "isOverall": false, "label": "T18 - Q21-Aggregated", "isController": false}, {"data": [[8.0, 13339.0]], "isOverall": false, "label": "T18 - Q4", "isController": false}, {"data": [[8.0, 13339.0]], "isOverall": false, "label": "T18 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 20809.0]], "isOverall": false, "label": "T18 - Q3", "isController": false}, {"data": [[10.0, 20809.0]], "isOverall": false, "label": "T18 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 18605.0]], "isOverall": false, "label": "T18 - Q2", "isController": false}, {"data": [[10.0, 18605.0]], "isOverall": false, "label": "T18 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 60460.0]], "isOverall": false, "label": "T18 - Q1", "isController": false}, {"data": [[10.0, 60460.0]], "isOverall": false, "label": "T18 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 15585.0]], "isOverall": false, "label": "T18 - Q8", "isController": false}, {"data": [[10.0, 15585.0]], "isOverall": false, "label": "T18 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 29612.0]], "isOverall": false, "label": "T18 - Q7", "isController": false}, {"data": [[10.0, 29612.0]], "isOverall": false, "label": "T18 - Q7-Aggregated", "isController": false}, {"data": [[8.0, 67342.0]], "isOverall": false, "label": "T18 - Q6", "isController": false}, {"data": [[8.0, 67342.0]], "isOverall": false, "label": "T18 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 65554.0]], "isOverall": false, "label": "T20 - Q19", "isController": false}, {"data": [[10.0, 65554.0]], "isOverall": false, "label": "T20 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 20146.0]], "isOverall": false, "label": "T18 - Q5", "isController": false}, {"data": [[10.0, 20146.0]], "isOverall": false, "label": "T18 - Q5-Aggregated", "isController": false}, {"data": [[4.0, 696604.0]], "isOverall": false, "label": "T21 - Q9", "isController": false}, {"data": [[4.0, 696604.0]], "isOverall": false, "label": "T21 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 77548.0]], "isOverall": false, "label": "T20 - Q18", "isController": false}, {"data": [[10.0, 77548.0]], "isOverall": false, "label": "T20 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 5355.0]], "isOverall": false, "label": "T21 - Q8", "isController": false}, {"data": [[10.0, 5355.0]], "isOverall": false, "label": "T21 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 32383.0]], "isOverall": false, "label": "T21 - Q7", "isController": false}, {"data": [[10.0, 32383.0]], "isOverall": false, "label": "T21 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 5183.0]], "isOverall": false, "label": "T20 - Q16", "isController": false}, {"data": [[10.0, 5183.0]], "isOverall": false, "label": "T20 - Q16-Aggregated", "isController": false}, {"data": [[3.0, 21171.0]], "isOverall": false, "label": "T21 - Q6", "isController": false}, {"data": [[3.0, 21171.0]], "isOverall": false, "label": "T21 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 6451.0]], "isOverall": false, "label": "T21 - Q5", "isController": false}, {"data": [[10.0, 6451.0]], "isOverall": false, "label": "T21 - Q5-Aggregated", "isController": false}, {"data": [[6.0, 444616.0]], "isOverall": false, "label": "T20 - Q15", "isController": false}, {"data": [[6.0, 444616.0]], "isOverall": false, "label": "T20 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 3592.0]], "isOverall": false, "label": "T21 - Q4", "isController": false}, {"data": [[10.0, 3592.0]], "isOverall": false, "label": "T21 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 80499.0]], "isOverall": false, "label": "T20 - Q14", "isController": false}, {"data": [[10.0, 80499.0]], "isOverall": false, "label": "T20 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 8539.0]], "isOverall": false, "label": "T21 - Q3", "isController": false}, {"data": [[10.0, 8539.0]], "isOverall": false, "label": "T21 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 13762.0]], "isOverall": false, "label": "T20 - Q13", "isController": false}, {"data": [[10.0, 13762.0]], "isOverall": false, "label": "T20 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 94662.0]], "isOverall": false, "label": "T20 - Q12", "isController": false}, {"data": [[10.0, 94662.0]], "isOverall": false, "label": "T20 - Q12-Aggregated", "isController": false}, {"data": [[3.0, 9913.0]], "isOverall": false, "label": "T21 - Q2", "isController": false}, {"data": [[3.0, 9913.0]], "isOverall": false, "label": "T21 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 74411.0]], "isOverall": false, "label": "T21 - Q1", "isController": false}, {"data": [[10.0, 74411.0]], "isOverall": false, "label": "T21 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 7607.0]], "isOverall": false, "label": "T20 - Q11", "isController": false}, {"data": [[10.0, 7607.0]], "isOverall": false, "label": "T20 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 15152.0]], "isOverall": false, "label": "T20 - Q10", "isController": false}, {"data": [[10.0, 15152.0]], "isOverall": false, "label": "T20 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 6355.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[10.0, 6355.0]], "isOverall": false, "label": "T1 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 17520.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[10.0, 17520.0]], "isOverall": false, "label": "T1 - Q10-Aggregated", "isController": false}, {"data": [[4.0, 18962.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[4.0, 18962.0]], "isOverall": false, "label": "T1 - Q13-Aggregated", "isController": false}, {"data": [[1.0, 14372.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.0, 14372.0]], "isOverall": false, "label": "T1 - Q12-Aggregated", "isController": false}, {"data": [[4.0, 530979.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[4.0, 530979.0]], "isOverall": false, "label": "T1 - Q15-Aggregated", "isController": false}, {"data": [[4.0, 14637.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[4.0, 14637.0]], "isOverall": false, "label": "T1 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 92838.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[10.0, 92838.0]], "isOverall": false, "label": "T25 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 14588.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[10.0, 14588.0]], "isOverall": false, "label": "T25 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 4956.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[10.0, 4956.0]], "isOverall": false, "label": "T23 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 32786.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[10.0, 32786.0]], "isOverall": false, "label": "T23 - Q3-Aggregated", "isController": false}, {"data": [[9.0, 47432.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[9.0, 47432.0]], "isOverall": false, "label": "T23 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 5319.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[10.0, 5319.0]], "isOverall": false, "label": "T23 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 76803.0]], "isOverall": false, "label": "T18 - Q9", "isController": false}, {"data": [[10.0, 76803.0]], "isOverall": false, "label": "T18 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 16428.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[10.0, 16428.0]], "isOverall": false, "label": "T23 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 63192.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[10.0, 63192.0]], "isOverall": false, "label": "T23 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 104407.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[10.0, 104407.0]], "isOverall": false, "label": "T23 - Q9-Aggregated", "isController": false}, {"data": [[1.0, 2476.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.0, 2476.0]], "isOverall": false, "label": "T1 - Q22-Aggregated", "isController": false}, {"data": [[1.0, 13682.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.0, 13682.0]], "isOverall": false, "label": "T1 - Q21-Aggregated", "isController": false}, {"data": [[3.0, 125510.0]], "isOverall": false, "label": "T21 - Q15", "isController": false}, {"data": [[3.0, 125510.0]], "isOverall": false, "label": "T21 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 87446.0]], "isOverall": false, "label": "T21 - Q14", "isController": false}, {"data": [[10.0, 87446.0]], "isOverall": false, "label": "T21 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 4369.0]], "isOverall": false, "label": "T21 - Q16", "isController": false}, {"data": [[10.0, 4369.0]], "isOverall": false, "label": "T21 - Q16-Aggregated", "isController": false}, {"data": [[3.0, 2772.0]], "isOverall": false, "label": "T21 - Q11", "isController": false}, {"data": [[3.0, 2772.0]], "isOverall": false, "label": "T21 - Q11-Aggregated", "isController": false}, {"data": [[3.0, 10350.0]], "isOverall": false, "label": "T21 - Q10", "isController": false}, {"data": [[3.0, 10350.0]], "isOverall": false, "label": "T21 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 24141.0]], "isOverall": false, "label": "T21 - Q13", "isController": false}, {"data": [[10.0, 24141.0]], "isOverall": false, "label": "T21 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 84698.0]], "isOverall": false, "label": "T21 - Q12", "isController": false}, {"data": [[10.0, 84698.0]], "isOverall": false, "label": "T21 - Q12-Aggregated", "isController": false}, {"data": [[4.0, 3746.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[4.0, 3746.0]], "isOverall": false, "label": "T1 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 95664.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[10.0, 95664.0]], "isOverall": false, "label": "T1 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 115692.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[10.0, 115692.0]], "isOverall": false, "label": "T1 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 57358.0]], "isOverall": false, "label": "T21 - Q19", "isController": false}, {"data": [[10.0, 57358.0]], "isOverall": false, "label": "T21 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 114383.0]], "isOverall": false, "label": "T21 - Q18", "isController": false}, {"data": [[10.0, 114383.0]], "isOverall": false, "label": "T21 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 13059.0]], "isOverall": false, "label": "T20 - Q22", "isController": false}, {"data": [[10.0, 13059.0]], "isOverall": false, "label": "T20 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 32300.0]], "isOverall": false, "label": "T20 - Q21", "isController": false}, {"data": [[10.0, 32300.0]], "isOverall": false, "label": "T20 - Q21-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "T1 - RF2-Aggregated", "isController": false}, {"data": [[4.0, 7.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[4.0, 7.0]], "isOverall": false, "label": "T1 - RF1-Aggregated", "isController": false}, {"data": [[1.0, 15839.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.0, 15839.0]], "isOverall": false, "label": "T1 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 12497.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[10.0, 12497.0]], "isOverall": false, "label": "T1 - Q2-Aggregated", "isController": false}, {"data": [[1.0, 3439.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.0, 3439.0]], "isOverall": false, "label": "T1 - Q3-Aggregated", "isController": false}, {"data": [[1.0, 2025.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.0, 2025.0]], "isOverall": false, "label": "T1 - Q4-Aggregated", "isController": false}, {"data": [[1.0, 6048.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.0, 6048.0]], "isOverall": false, "label": "T1 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 91160.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[10.0, 91160.0]], "isOverall": false, "label": "T1 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 46536.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[10.0, 46536.0]], "isOverall": false, "label": "T1 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 7201.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[10.0, 7201.0]], "isOverall": false, "label": "T1 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 545406.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[10.0, 545406.0]], "isOverall": false, "label": "T1 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 19897.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[10.0, 19897.0]], "isOverall": false, "label": "T23 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 45999.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[10.0, 45999.0]], "isOverall": false, "label": "T23 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 138427.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[10.0, 138427.0]], "isOverall": false, "label": "T22 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 79396.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[10.0, 79396.0]], "isOverall": false, "label": "T22 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 45944.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[10.0, 45944.0]], "isOverall": false, "label": "T22 - Q7-Aggregated", "isController": false}, {"data": [[8.0, 40649.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[8.0, 40649.0]], "isOverall": false, "label": "T22 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 115970.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[10.0, 115970.0]], "isOverall": false, "label": "T22 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 50912.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[10.0, 50912.0]], "isOverall": false, "label": "T22 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 17695.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[10.0, 17695.0]], "isOverall": false, "label": "T22 - Q3-Aggregated", "isController": false}, {"data": [[6.0, 3366.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[6.0, 3366.0]], "isOverall": false, "label": "T22 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 114438.0]], "isOverall": false, "label": "T19 - Q1", "isController": false}, {"data": [[10.0, 114438.0]], "isOverall": false, "label": "T19 - Q1-Aggregated", "isController": false}, {"data": [[7.0, 6932.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[7.0, 6932.0]], "isOverall": false, "label": "T22 - Q5-Aggregated", "isController": false}, {"data": [[2.0, 2028.0]], "isOverall": false, "label": "T19 - Q2", "isController": false}, {"data": [[2.0, 2028.0]], "isOverall": false, "label": "T19 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 9868.0]], "isOverall": false, "label": "T19 - Q3", "isController": false}, {"data": [[10.0, 9868.0]], "isOverall": false, "label": "T19 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 7163.0]], "isOverall": false, "label": "T19 - Q4", "isController": false}, {"data": [[10.0, 7163.0]], "isOverall": false, "label": "T19 - Q4-Aggregated", "isController": false}, {"data": [[6.0, 24151.0]], "isOverall": false, "label": "T19 - Q5", "isController": false}, {"data": [[6.0, 24151.0]], "isOverall": false, "label": "T19 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 69367.0]], "isOverall": false, "label": "T19 - Q6", "isController": false}, {"data": [[10.0, 69367.0]], "isOverall": false, "label": "T19 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 32754.0]], "isOverall": false, "label": "T19 - Q7", "isController": false}, {"data": [[10.0, 32754.0]], "isOverall": false, "label": "T19 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 16031.0]], "isOverall": false, "label": "T19 - Q8", "isController": false}, {"data": [[10.0, 16031.0]], "isOverall": false, "label": "T19 - Q8-Aggregated", "isController": false}, {"data": [[2.0, 531155.0]], "isOverall": false, "label": "T19 - Q9", "isController": false}, {"data": [[2.0, 531155.0]], "isOverall": false, "label": "T19 - Q9-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.69217772E12, "maxY": 31956.35, "series": [{"data": [[1.69217922E12, 8080.516666666666], [1.69217862E12, 17561.466666666667], [1.69217892E12, 20316.383333333335], [1.69217802E12, 23072.616666666665], [1.69217832E12, 199.73333333333332], [1.69217934E12, 3.2666666666666666], [1.69217772E12, 11.116666666666667], [1.69217874E12, 31956.35], [1.69217904E12, 19.716666666666665], [1.69217814E12, 8435.266666666666], [1.69217844E12, 11376.0], [1.69217976E12, 10563.866666666667], [1.69217886E12, 101.41666666666667], [1.69217916E12, 61.28333333333333], [1.69217826E12, 8893.333333333334], [1.69217958E12, 458.46666666666664], [1.69217856E12, 92.81666666666666], [1.69217796E12, 342.3666666666667], [1.69217898E12, 212.53333333333333], [1.69217928E12, 11901.333333333334], [1.69217838E12, 234.95], [1.69217868E12, 11497.55], [1.69217778E12, 64.68333333333334], [1.6921794E12, 10314.166666666666], [1.69217808E12, 61.95], [1.6921791E12, 11578.516666666666], [1.6921785E12, 12129.283333333333], [1.69217982E12, 11493.95], [1.6921788E12, 181.01666666666668], [1.6921779E12, 68.28333333333333], [1.6921782E12, 30.366666666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69217922E12, 0.0], [1.69217862E12, 0.0], [1.69217892E12, 0.0], [1.69217802E12, 0.0], [1.69217832E12, 0.0], [1.69217934E12, 0.0], [1.69217772E12, 0.0], [1.69217874E12, 0.0], [1.69217904E12, 0.0], [1.69217814E12, 0.0], [1.69217844E12, 0.0], [1.69217976E12, 0.0], [1.69217886E12, 0.0], [1.69217916E12, 0.0], [1.69217826E12, 0.0], [1.69217958E12, 0.0], [1.69217856E12, 0.0], [1.69217796E12, 0.0], [1.69217898E12, 0.0], [1.69217928E12, 0.0], [1.69217838E12, 0.0], [1.69217868E12, 0.0], [1.69217778E12, 0.0], [1.6921794E12, 0.0], [1.69217808E12, 0.0], [1.6921791E12, 0.0], [1.6921785E12, 0.0], [1.69217982E12, 0.0], [1.6921788E12, 0.0], [1.6921779E12, 0.0], [1.6921782E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69217982E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 7.0, "minX": 1.69217772E12, "maxY": 696604.0, "series": [{"data": [[1.69217862E12, 28683.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[1.69217898E12, 10719.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[1.69217856E12, 45572.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[1.6921791E12, 57430.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[1.6921785E12, 319108.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[1.69217904E12, 39751.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[1.69217802E12, 20402.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[1.69217898E12, 75757.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[1.69217874E12, 119861.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[1.69217904E12, 61120.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[1.69217856E12, 36695.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[1.69217826E12, 7939.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[1.6921779E12, 5435.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1.69217796E12, 28839.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[1.69217868E12, 34668.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1.69217844E12, 73815.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[1.69217838E12, 5526.0]], "isOverall": false, "label": "T20 - Q8", "isController": false}, {"data": [[1.69217802E12, 69766.0]], "isOverall": false, "label": "T20 - Q9", "isController": false}, {"data": [[1.69217814E12, 24129.0]], "isOverall": false, "label": "T20 - Q2", "isController": false}, {"data": [[1.69217838E12, 9904.0]], "isOverall": false, "label": "T20 - Q3", "isController": false}, {"data": [[1.69217814E12, 88960.0]], "isOverall": false, "label": "T20 - Q1", "isController": false}, {"data": [[1.69217868E12, 121730.0]], "isOverall": false, "label": "T20 - Q6", "isController": false}, {"data": [[1.6921785E12, 42592.0]], "isOverall": false, "label": "T20 - Q7", "isController": false}, {"data": [[1.69217838E12, 4210.0]], "isOverall": false, "label": "T20 - Q4", "isController": false}, {"data": [[1.69217826E12, 23706.0]], "isOverall": false, "label": "T20 - Q5", "isController": false}, {"data": [[1.69217868E12, 14623.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[1.6921788E12, 67305.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[1.69217892E12, 78451.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[1.69217904E12, 38074.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[1.69217892E12, 5601.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[1.69217838E12, 37812.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[1.6921785E12, 8507.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[1.6921785E12, 101501.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[1.69217862E12, 6035.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[1.69217838E12, 12436.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[1.69217886E12, 50962.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[1.69217916E12, 67368.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[1.69217874E12, 80817.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[1.69217814E12, 11632.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[1.69217826E12, 4435.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1.6921785E12, 22498.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[1.69217928E12, 5317.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[1.69217832E12, 65486.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1.69217928E12, 3809.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[1.6921782E12, 102203.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[1.69217868E12, 114048.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[1.69217826E12, 28639.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[1.69217886E12, 65875.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[1.6921782E12, 54926.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[1.6921785E12, 128406.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[1.69217826E12, 23771.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[1.6921785E12, 4946.0]], "isOverall": false, "label": "T21 - Q22", "isController": false}, {"data": [[1.6921791E12, 28468.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[1.69217802E12, 74385.0]], "isOverall": false, "label": "T21 - Q21", "isController": false}, {"data": [[1.69217898E12, 292453.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[1.69217814E12, 201302.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[1.69217814E12, 169331.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[1.69217922E12, 17207.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[1.69217886E12, 17975.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[1.69217892E12, 8415.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[1.6921791E12, 195020.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[1.6921779E12, 4047.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1.69217868E12, 101379.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[1.69217922E12, 18109.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[1.69217844E12, 118770.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[1.69217832E12, 69882.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[1.69217982E12, 2144.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[1.69217874E12, 79922.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[1.69217928E12, 545016.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[1.69217862E12, 113318.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[1.69217868E12, 23982.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[1.69217928E12, 3119.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[1.69217976E12, 2625.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[1.69217874E12, 17550.0]], "isOverall": false, "label": "T19 - Q22", "isController": false}, {"data": [[1.69217802E12, 74340.0]], "isOverall": false, "label": "T19 - Q21", "isController": false}, {"data": [[1.69217844E12, 36646.0]], "isOverall": false, "label": "T18 - Q16", "isController": false}, {"data": [[1.69217886E12, 357184.0]], "isOverall": false, "label": "T18 - Q15", "isController": false}, {"data": [[1.6921782E12, 81093.0]], "isOverall": false, "label": "T18 - Q14", "isController": false}, {"data": [[1.69217802E12, 26925.0]], "isOverall": false, "label": "T18 - Q13", "isController": false}, {"data": [[1.69217886E12, 39039.0]], "isOverall": false, "label": "T19 - Q19", "isController": false}, {"data": [[1.69217808E12, 87742.0]], "isOverall": false, "label": "T18 - Q12", "isController": false}, {"data": [[1.69217892E12, 37739.0]], "isOverall": false, "label": "T18 - Q11", "isController": false}, {"data": [[1.6921785E12, 23115.0]], "isOverall": false, "label": "T18 - Q10", "isController": false}, {"data": [[1.69217898E12, 96160.0]], "isOverall": false, "label": "T19 - Q18", "isController": false}, {"data": [[1.69217916E12, 3859.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[1.69217916E12, 18668.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[1.69217826E12, 41642.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[1.69217832E12, 196240.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[1.6921785E12, 52739.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[1.69217868E12, 2717.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[1.69217802E12, 17796.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[1.69217982E12, 52686.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[1.69217862E12, 142735.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[1.6921788E12, 66306.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[1.69217976E12, 3391.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[1.69217808E12, 105653.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[1.69217976E12, 466452.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[1.69217874E12, 444173.0]], "isOverall": false, "label": "T19 - Q15", "isController": false}, {"data": [[1.69217874E12, 2950.0]], "isOverall": false, "label": "T19 - Q16", "isController": false}, {"data": [[1.69217808E12, 34377.0]], "isOverall": false, "label": "T19 - Q13", "isController": false}, {"data": [[1.69217826E12, 73423.0]], "isOverall": false, "label": "T19 - Q14", "isController": false}, {"data": [[1.69217874E12, 7373.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[1.69217814E12, 28676.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[1.69217874E12, 3168.0]], "isOverall": false, "label": "T19 - Q11", "isController": false}, {"data": [[1.69217904E12, 65366.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[1.69217904E12, 52180.0]], "isOverall": false, "label": "T19 - Q12", "isController": false}, {"data": [[1.69217802E12, 65755.0]], "isOverall": false, "label": "T18 - Q19", "isController": false}, {"data": [[1.69217904E12, 17446.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[1.6921785E12, 99792.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[1.69217874E12, 3912.0]], "isOverall": false, "label": "T19 - Q10", "isController": false}, {"data": [[1.6921791E12, 84074.0]], "isOverall": false, "label": "T18 - Q18", "isController": false}, {"data": [[1.69217844E12, 10668.0]], "isOverall": false, "label": "T18 - Q22", "isController": false}, {"data": [[1.69217838E12, 94229.0]], "isOverall": false, "label": "T18 - Q21", "isController": false}, {"data": [[1.69217916E12, 13339.0]], "isOverall": false, "label": "T18 - Q4", "isController": false}, {"data": [[1.69217838E12, 20809.0]], "isOverall": false, "label": "T18 - Q3", "isController": false}, {"data": [[1.6921785E12, 18605.0]], "isOverall": false, "label": "T18 - Q2", "isController": false}, {"data": [[1.69217826E12, 60460.0]], "isOverall": false, "label": "T18 - Q1", "isController": false}, {"data": [[1.6921782E12, 15585.0]], "isOverall": false, "label": "T18 - Q8", "isController": false}, {"data": [[1.69217832E12, 29612.0]], "isOverall": false, "label": "T18 - Q7", "isController": false}, {"data": [[1.69217916E12, 67342.0]], "isOverall": false, "label": "T18 - Q6", "isController": false}, {"data": [[1.6921782E12, 65554.0]], "isOverall": false, "label": "T20 - Q19", "isController": false}, {"data": [[1.69217892E12, 20146.0]], "isOverall": false, "label": "T18 - Q5", "isController": false}, {"data": [[1.69217922E12, 696604.0]], "isOverall": false, "label": "T21 - Q9", "isController": false}, {"data": [[1.69217838E12, 77548.0]], "isOverall": false, "label": "T20 - Q18", "isController": false}, {"data": [[1.6921785E12, 5355.0]], "isOverall": false, "label": "T21 - Q8", "isController": false}, {"data": [[1.69217856E12, 32383.0]], "isOverall": false, "label": "T21 - Q7", "isController": false}, {"data": [[1.69217802E12, 5183.0]], "isOverall": false, "label": "T20 - Q16", "isController": false}, {"data": [[1.6921794E12, 21171.0]], "isOverall": false, "label": "T21 - Q6", "isController": false}, {"data": [[1.69217802E12, 6451.0]], "isOverall": false, "label": "T21 - Q5", "isController": false}, {"data": [[1.69217922E12, 444616.0]], "isOverall": false, "label": "T20 - Q15", "isController": false}, {"data": [[1.6921785E12, 3592.0]], "isOverall": false, "label": "T21 - Q4", "isController": false}, {"data": [[1.69217874E12, 80499.0]], "isOverall": false, "label": "T20 - Q14", "isController": false}, {"data": [[1.6921785E12, 8539.0]], "isOverall": false, "label": "T21 - Q3", "isController": false}, {"data": [[1.69217856E12, 13762.0]], "isOverall": false, "label": "T20 - Q13", "isController": false}, {"data": [[1.69217844E12, 94662.0]], "isOverall": false, "label": "T20 - Q12", "isController": false}, {"data": [[1.6921794E12, 9913.0]], "isOverall": false, "label": "T21 - Q2", "isController": false}, {"data": [[1.69217838E12, 74411.0]], "isOverall": false, "label": "T21 - Q1", "isController": false}, {"data": [[1.69217874E12, 7607.0]], "isOverall": false, "label": "T20 - Q11", "isController": false}, {"data": [[1.6921785E12, 15152.0]], "isOverall": false, "label": "T20 - Q10", "isController": false}, {"data": [[1.69217862E12, 6355.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69217856E12, 17520.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69217928E12, 18962.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69217778E12, 14372.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69217922E12, 530979.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69217928E12, 14637.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69217808E12, 92838.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[1.6921785E12, 14588.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[1.69217892E12, 4956.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[1.69217886E12, 32786.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[1.6921791E12, 47432.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[1.69217892E12, 5319.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[1.69217898E12, 76803.0]], "isOverall": false, "label": "T18 - Q9", "isController": false}, {"data": [[1.69217856E12, 16428.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[1.6921782E12, 63192.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[1.69217814E12, 104407.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[1.69217778E12, 2476.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69217778E12, 13682.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69217934E12, 125510.0]], "isOverall": false, "label": "T21 - Q15", "isController": false}, {"data": [[1.6921785E12, 87446.0]], "isOverall": false, "label": "T21 - Q14", "isController": false}, {"data": [[1.6921785E12, 4369.0]], "isOverall": false, "label": "T21 - Q16", "isController": false}, {"data": [[1.6921794E12, 2772.0]], "isOverall": false, "label": "T21 - Q11", "isController": false}, {"data": [[1.6921794E12, 10350.0]], "isOverall": false, "label": "T21 - Q10", "isController": false}, {"data": [[1.69217808E12, 24141.0]], "isOverall": false, "label": "T21 - Q13", "isController": false}, {"data": [[1.69217814E12, 84698.0]], "isOverall": false, "label": "T21 - Q12", "isController": false}, {"data": [[1.69217928E12, 3746.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69217844E12, 95664.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69217874E12, 115692.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.6921782E12, 57358.0]], "isOverall": false, "label": "T21 - Q19", "isController": false}, {"data": [[1.69217832E12, 114383.0]], "isOverall": false, "label": "T21 - Q18", "isController": false}, {"data": [[1.69217826E12, 13059.0]], "isOverall": false, "label": "T20 - Q22", "isController": false}, {"data": [[1.69217826E12, 32300.0]], "isOverall": false, "label": "T20 - Q21", "isController": false}, {"data": [[1.69217772E12, 8.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69217928E12, 7.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69217772E12, 15839.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69217862E12, 12497.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69217778E12, 3439.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69217778E12, 2025.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69217778E12, 6048.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69217856E12, 91160.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69217838E12, 46536.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69217856E12, 7201.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69217832E12, 545406.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69217874E12, 19897.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[1.69217886E12, 45999.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[1.69217826E12, 138427.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[1.6921788E12, 79396.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[1.69217892E12, 45944.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[1.69217916E12, 40649.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[1.69217838E12, 115970.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[1.69217862E12, 50912.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[1.69217856E12, 17695.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[1.69217916E12, 3366.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[1.6921782E12, 114438.0]], "isOverall": false, "label": "T19 - Q1", "isController": false}, {"data": [[1.69217916E12, 6932.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[1.69217958E12, 2028.0]], "isOverall": false, "label": "T19 - Q2", "isController": false}, {"data": [[1.69217874E12, 9868.0]], "isOverall": false, "label": "T19 - Q3", "isController": false}, {"data": [[1.69217886E12, 7163.0]], "isOverall": false, "label": "T19 - Q4", "isController": false}, {"data": [[1.69217796E12, 24151.0]], "isOverall": false, "label": "T19 - Q5", "isController": false}, {"data": [[1.6921788E12, 69367.0]], "isOverall": false, "label": "T19 - Q6", "isController": false}, {"data": [[1.69217904E12, 32754.0]], "isOverall": false, "label": "T19 - Q7", "isController": false}, {"data": [[1.69217808E12, 16031.0]], "isOverall": false, "label": "T19 - Q8", "isController": false}, {"data": [[1.69217958E12, 531155.0]], "isOverall": false, "label": "T19 - Q9", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69217982E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 7.0, "minX": 1.69217772E12, "maxY": 696604.0, "series": [{"data": [[1.69217862E12, 28670.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[1.69217898E12, 10718.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[1.69217856E12, 45572.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[1.6921791E12, 57430.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[1.6921785E12, 319107.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[1.69217904E12, 39750.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[1.69217802E12, 20353.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[1.69217898E12, 75757.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[1.69217874E12, 119861.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[1.69217904E12, 61120.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[1.69217856E12, 36695.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[1.69217826E12, 7939.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[1.6921779E12, 5435.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1.69217796E12, 28836.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[1.69217868E12, 34668.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1.69217844E12, 73815.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[1.69217838E12, 5526.0]], "isOverall": false, "label": "T20 - Q8", "isController": false}, {"data": [[1.69217802E12, 69764.0]], "isOverall": false, "label": "T20 - Q9", "isController": false}, {"data": [[1.69217814E12, 24129.0]], "isOverall": false, "label": "T20 - Q2", "isController": false}, {"data": [[1.69217838E12, 9904.0]], "isOverall": false, "label": "T20 - Q3", "isController": false}, {"data": [[1.69217814E12, 88959.0]], "isOverall": false, "label": "T20 - Q1", "isController": false}, {"data": [[1.69217868E12, 121730.0]], "isOverall": false, "label": "T20 - Q6", "isController": false}, {"data": [[1.6921785E12, 42592.0]], "isOverall": false, "label": "T20 - Q7", "isController": false}, {"data": [[1.69217838E12, 4210.0]], "isOverall": false, "label": "T20 - Q4", "isController": false}, {"data": [[1.69217826E12, 23706.0]], "isOverall": false, "label": "T20 - Q5", "isController": false}, {"data": [[1.69217868E12, 14623.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[1.6921788E12, 67304.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[1.69217892E12, 78451.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[1.69217904E12, 38074.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[1.69217892E12, 5601.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[1.69217838E12, 37812.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[1.6921785E12, 8507.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[1.6921785E12, 101501.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[1.69217862E12, 6035.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[1.69217838E12, 12436.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[1.69217886E12, 50961.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[1.69217916E12, 67367.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[1.69217874E12, 80816.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[1.69217814E12, 11632.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[1.69217826E12, 4435.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1.6921785E12, 22498.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[1.69217928E12, 5316.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[1.69217832E12, 65486.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1.69217928E12, 3809.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[1.6921782E12, 102203.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[1.69217868E12, 114048.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[1.69217826E12, 28622.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[1.69217886E12, 65875.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[1.6921782E12, 54926.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[1.6921785E12, 128406.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[1.69217826E12, 23770.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[1.6921785E12, 4946.0]], "isOverall": false, "label": "T21 - Q22", "isController": false}, {"data": [[1.6921791E12, 28462.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[1.69217802E12, 74385.0]], "isOverall": false, "label": "T21 - Q21", "isController": false}, {"data": [[1.69217898E12, 292452.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[1.69217814E12, 201301.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[1.69217814E12, 169331.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[1.69217922E12, 17195.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[1.69217886E12, 17975.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[1.69217892E12, 8410.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[1.6921791E12, 195020.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[1.6921779E12, 4046.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1.69217868E12, 101379.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[1.69217922E12, 18109.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[1.69217844E12, 118770.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[1.69217832E12, 69882.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[1.69217982E12, 2139.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[1.69217874E12, 79922.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[1.69217928E12, 545016.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[1.69217862E12, 113318.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[1.69217868E12, 23982.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[1.69217928E12, 3119.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[1.69217976E12, 2613.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[1.69217874E12, 17550.0]], "isOverall": false, "label": "T19 - Q22", "isController": false}, {"data": [[1.69217802E12, 74340.0]], "isOverall": false, "label": "T19 - Q21", "isController": false}, {"data": [[1.69217844E12, 36636.0]], "isOverall": false, "label": "T18 - Q16", "isController": false}, {"data": [[1.69217886E12, 357184.0]], "isOverall": false, "label": "T18 - Q15", "isController": false}, {"data": [[1.6921782E12, 81093.0]], "isOverall": false, "label": "T18 - Q14", "isController": false}, {"data": [[1.69217802E12, 26924.0]], "isOverall": false, "label": "T18 - Q13", "isController": false}, {"data": [[1.69217886E12, 39039.0]], "isOverall": false, "label": "T19 - Q19", "isController": false}, {"data": [[1.69217808E12, 87742.0]], "isOverall": false, "label": "T18 - Q12", "isController": false}, {"data": [[1.69217892E12, 37734.0]], "isOverall": false, "label": "T18 - Q11", "isController": false}, {"data": [[1.6921785E12, 23115.0]], "isOverall": false, "label": "T18 - Q10", "isController": false}, {"data": [[1.69217898E12, 96160.0]], "isOverall": false, "label": "T19 - Q18", "isController": false}, {"data": [[1.69217916E12, 3858.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[1.69217916E12, 18668.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[1.69217826E12, 41641.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[1.69217832E12, 196239.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[1.6921785E12, 52739.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[1.69217868E12, 2711.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[1.69217802E12, 17795.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[1.69217982E12, 52686.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[1.69217862E12, 142735.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[1.6921788E12, 66306.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[1.69217976E12, 3391.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[1.69217808E12, 105653.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[1.69217976E12, 466452.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[1.69217874E12, 444173.0]], "isOverall": false, "label": "T19 - Q15", "isController": false}, {"data": [[1.69217874E12, 2944.0]], "isOverall": false, "label": "T19 - Q16", "isController": false}, {"data": [[1.69217808E12, 34377.0]], "isOverall": false, "label": "T19 - Q13", "isController": false}, {"data": [[1.69217826E12, 73423.0]], "isOverall": false, "label": "T19 - Q14", "isController": false}, {"data": [[1.69217874E12, 7373.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[1.69217814E12, 28660.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[1.69217874E12, 3162.0]], "isOverall": false, "label": "T19 - Q11", "isController": false}, {"data": [[1.69217904E12, 65366.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[1.69217904E12, 52180.0]], "isOverall": false, "label": "T19 - Q12", "isController": false}, {"data": [[1.69217802E12, 65755.0]], "isOverall": false, "label": "T18 - Q19", "isController": false}, {"data": [[1.69217904E12, 17446.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[1.6921785E12, 99792.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[1.69217874E12, 3912.0]], "isOverall": false, "label": "T19 - Q10", "isController": false}, {"data": [[1.6921791E12, 84073.0]], "isOverall": false, "label": "T18 - Q18", "isController": false}, {"data": [[1.69217844E12, 10668.0]], "isOverall": false, "label": "T18 - Q22", "isController": false}, {"data": [[1.69217838E12, 94229.0]], "isOverall": false, "label": "T18 - Q21", "isController": false}, {"data": [[1.69217916E12, 13339.0]], "isOverall": false, "label": "T18 - Q4", "isController": false}, {"data": [[1.69217838E12, 20808.0]], "isOverall": false, "label": "T18 - Q3", "isController": false}, {"data": [[1.6921785E12, 18605.0]], "isOverall": false, "label": "T18 - Q2", "isController": false}, {"data": [[1.69217826E12, 60460.0]], "isOverall": false, "label": "T18 - Q1", "isController": false}, {"data": [[1.6921782E12, 15585.0]], "isOverall": false, "label": "T18 - Q8", "isController": false}, {"data": [[1.69217832E12, 29612.0]], "isOverall": false, "label": "T18 - Q7", "isController": false}, {"data": [[1.69217916E12, 67342.0]], "isOverall": false, "label": "T18 - Q6", "isController": false}, {"data": [[1.6921782E12, 65554.0]], "isOverall": false, "label": "T20 - Q19", "isController": false}, {"data": [[1.69217892E12, 20146.0]], "isOverall": false, "label": "T18 - Q5", "isController": false}, {"data": [[1.69217922E12, 696604.0]], "isOverall": false, "label": "T21 - Q9", "isController": false}, {"data": [[1.69217838E12, 77548.0]], "isOverall": false, "label": "T20 - Q18", "isController": false}, {"data": [[1.6921785E12, 5355.0]], "isOverall": false, "label": "T21 - Q8", "isController": false}, {"data": [[1.69217856E12, 32383.0]], "isOverall": false, "label": "T21 - Q7", "isController": false}, {"data": [[1.69217802E12, 5164.0]], "isOverall": false, "label": "T20 - Q16", "isController": false}, {"data": [[1.6921794E12, 21171.0]], "isOverall": false, "label": "T21 - Q6", "isController": false}, {"data": [[1.69217802E12, 6451.0]], "isOverall": false, "label": "T21 - Q5", "isController": false}, {"data": [[1.69217922E12, 444616.0]], "isOverall": false, "label": "T20 - Q15", "isController": false}, {"data": [[1.6921785E12, 3592.0]], "isOverall": false, "label": "T21 - Q4", "isController": false}, {"data": [[1.69217874E12, 80499.0]], "isOverall": false, "label": "T20 - Q14", "isController": false}, {"data": [[1.6921785E12, 8538.0]], "isOverall": false, "label": "T21 - Q3", "isController": false}, {"data": [[1.69217856E12, 13762.0]], "isOverall": false, "label": "T20 - Q13", "isController": false}, {"data": [[1.69217844E12, 94662.0]], "isOverall": false, "label": "T20 - Q12", "isController": false}, {"data": [[1.6921794E12, 9913.0]], "isOverall": false, "label": "T21 - Q2", "isController": false}, {"data": [[1.69217838E12, 74410.0]], "isOverall": false, "label": "T21 - Q1", "isController": false}, {"data": [[1.69217874E12, 7601.0]], "isOverall": false, "label": "T20 - Q11", "isController": false}, {"data": [[1.6921785E12, 15152.0]], "isOverall": false, "label": "T20 - Q10", "isController": false}, {"data": [[1.69217862E12, 6344.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69217856E12, 17520.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69217928E12, 18962.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69217778E12, 14371.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69217922E12, 530979.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69217928E12, 14637.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69217808E12, 92838.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[1.6921785E12, 14587.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[1.69217892E12, 4956.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[1.69217886E12, 32786.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[1.6921791E12, 47432.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[1.69217892E12, 5319.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[1.69217898E12, 76803.0]], "isOverall": false, "label": "T18 - Q9", "isController": false}, {"data": [[1.69217856E12, 16428.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[1.6921782E12, 63192.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[1.69217814E12, 104407.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[1.69217778E12, 2476.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69217778E12, 13681.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69217934E12, 125509.0]], "isOverall": false, "label": "T21 - Q15", "isController": false}, {"data": [[1.6921785E12, 87446.0]], "isOverall": false, "label": "T21 - Q14", "isController": false}, {"data": [[1.6921785E12, 4355.0]], "isOverall": false, "label": "T21 - Q16", "isController": false}, {"data": [[1.6921794E12, 2755.0]], "isOverall": false, "label": "T21 - Q11", "isController": false}, {"data": [[1.6921794E12, 10350.0]], "isOverall": false, "label": "T21 - Q10", "isController": false}, {"data": [[1.69217808E12, 24140.0]], "isOverall": false, "label": "T21 - Q13", "isController": false}, {"data": [[1.69217814E12, 84698.0]], "isOverall": false, "label": "T21 - Q12", "isController": false}, {"data": [[1.69217928E12, 3734.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69217844E12, 95664.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69217874E12, 115691.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.6921782E12, 57358.0]], "isOverall": false, "label": "T21 - Q19", "isController": false}, {"data": [[1.69217832E12, 114382.0]], "isOverall": false, "label": "T21 - Q18", "isController": false}, {"data": [[1.69217826E12, 13059.0]], "isOverall": false, "label": "T20 - Q22", "isController": false}, {"data": [[1.69217826E12, 32299.0]], "isOverall": false, "label": "T20 - Q21", "isController": false}, {"data": [[1.69217772E12, 8.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69217928E12, 7.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69217772E12, 15837.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69217862E12, 12496.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69217778E12, 3437.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69217778E12, 2025.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69217778E12, 6048.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69217856E12, 91159.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69217838E12, 46536.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69217856E12, 7201.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69217832E12, 545405.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69217874E12, 19897.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[1.69217886E12, 45999.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[1.69217826E12, 138427.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[1.6921788E12, 79396.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[1.69217892E12, 45944.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[1.69217916E12, 40649.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[1.69217838E12, 115970.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[1.69217862E12, 50912.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[1.69217856E12, 17694.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[1.69217916E12, 3366.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[1.6921782E12, 114438.0]], "isOverall": false, "label": "T19 - Q1", "isController": false}, {"data": [[1.69217916E12, 6932.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[1.69217958E12, 2028.0]], "isOverall": false, "label": "T19 - Q2", "isController": false}, {"data": [[1.69217874E12, 9867.0]], "isOverall": false, "label": "T19 - Q3", "isController": false}, {"data": [[1.69217886E12, 7163.0]], "isOverall": false, "label": "T19 - Q4", "isController": false}, {"data": [[1.69217796E12, 24151.0]], "isOverall": false, "label": "T19 - Q5", "isController": false}, {"data": [[1.6921788E12, 69367.0]], "isOverall": false, "label": "T19 - Q6", "isController": false}, {"data": [[1.69217904E12, 32754.0]], "isOverall": false, "label": "T19 - Q7", "isController": false}, {"data": [[1.69217808E12, 16030.0]], "isOverall": false, "label": "T19 - Q8", "isController": false}, {"data": [[1.69217958E12, 531155.0]], "isOverall": false, "label": "T19 - Q9", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69217982E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69217772E12, "maxY": 688.0, "series": [{"data": [[1.69217862E12, 0.0]], "isOverall": false, "label": "T23 - Q11", "isController": false}, {"data": [[1.69217898E12, 0.0]], "isOverall": false, "label": "T23 - Q10", "isController": false}, {"data": [[1.69217856E12, 0.0]], "isOverall": false, "label": "T23 - Q13", "isController": false}, {"data": [[1.6921791E12, 0.0]], "isOverall": false, "label": "T23 - Q12", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T23 - Q15", "isController": false}, {"data": [[1.69217904E12, 1.0]], "isOverall": false, "label": "T23 - Q14", "isController": false}, {"data": [[1.69217802E12, 0.0]], "isOverall": false, "label": "T23 - Q16", "isController": false}, {"data": [[1.69217898E12, 0.0]], "isOverall": false, "label": "T23 - Q19", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T23 - Q18", "isController": false}, {"data": [[1.69217904E12, 0.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[1.69217856E12, 0.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[1.6921779E12, 120.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1.69217796E12, 0.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[1.69217868E12, 0.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1.69217844E12, 0.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T20 - Q8", "isController": false}, {"data": [[1.69217802E12, 85.0]], "isOverall": false, "label": "T20 - Q9", "isController": false}, {"data": [[1.69217814E12, 0.0]], "isOverall": false, "label": "T20 - Q2", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T20 - Q3", "isController": false}, {"data": [[1.69217814E12, 0.0]], "isOverall": false, "label": "T20 - Q1", "isController": false}, {"data": [[1.69217868E12, 0.0]], "isOverall": false, "label": "T20 - Q6", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T20 - Q7", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T20 - Q4", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T20 - Q5", "isController": false}, {"data": [[1.69217868E12, 0.0]], "isOverall": false, "label": "T24 - Q8", "isController": false}, {"data": [[1.6921788E12, 0.0]], "isOverall": false, "label": "T24 - Q9", "isController": false}, {"data": [[1.69217892E12, 0.0]], "isOverall": false, "label": "T24 - Q6", "isController": false}, {"data": [[1.69217904E12, 0.0]], "isOverall": false, "label": "T24 - Q7", "isController": false}, {"data": [[1.69217892E12, 0.0]], "isOverall": false, "label": "T24 - Q4", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T24 - Q5", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[1.69217862E12, 0.0]], "isOverall": false, "label": "T24 - Q2", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T24 - Q3", "isController": false}, {"data": [[1.69217886E12, 0.0]], "isOverall": false, "label": "T24 - Q1", "isController": false}, {"data": [[1.69217916E12, 0.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T24 - Q21", "isController": false}, {"data": [[1.69217814E12, 0.0]], "isOverall": false, "label": "T24 - Q22", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T25 - Q4", "isController": false}, {"data": [[1.69217928E12, 0.0]], "isOverall": false, "label": "T25 - Q3", "isController": false}, {"data": [[1.69217832E12, 0.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1.69217928E12, 1.0]], "isOverall": false, "label": "T25 - Q2", "isController": false}, {"data": [[1.6921782E12, 0.0]], "isOverall": false, "label": "T25 - Q1", "isController": false}, {"data": [[1.69217868E12, 0.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[1.69217886E12, 0.0]], "isOverall": false, "label": "T22 - Q19", "isController": false}, {"data": [[1.6921782E12, 0.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T22 - Q18", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T21 - Q22", "isController": false}, {"data": [[1.6921791E12, 0.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[1.69217802E12, 90.0]], "isOverall": false, "label": "T21 - Q21", "isController": false}, {"data": [[1.69217898E12, 0.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[1.69217814E12, 0.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[1.69217814E12, 95.0]], "isOverall": false, "label": "T22 - Q12", "isController": false}, {"data": [[1.69217922E12, 0.0]], "isOverall": false, "label": "T22 - Q11", "isController": false}, {"data": [[1.69217886E12, 0.0]], "isOverall": false, "label": "T22 - Q10", "isController": false}, {"data": [[1.69217892E12, 0.0]], "isOverall": false, "label": "T22 - Q16", "isController": false}, {"data": [[1.6921791E12, 0.0]], "isOverall": false, "label": "T22 - Q15", "isController": false}, {"data": [[1.6921779E12, 0.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1.69217868E12, 0.0]], "isOverall": false, "label": "T22 - Q14", "isController": false}, {"data": [[1.69217922E12, 0.0]], "isOverall": false, "label": "T22 - Q13", "isController": false}, {"data": [[1.69217844E12, 0.0]], "isOverall": false, "label": "T25 - Q18", "isController": false}, {"data": [[1.69217832E12, 0.0]], "isOverall": false, "label": "T25 - Q19", "isController": false}, {"data": [[1.69217982E12, 0.0]], "isOverall": false, "label": "T25 - Q16", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T25 - Q14", "isController": false}, {"data": [[1.69217928E12, 0.0]], "isOverall": false, "label": "T25 - Q15", "isController": false}, {"data": [[1.69217862E12, 1.0]], "isOverall": false, "label": "T25 - Q12", "isController": false}, {"data": [[1.69217868E12, 0.0]], "isOverall": false, "label": "T25 - Q13", "isController": false}, {"data": [[1.69217928E12, 0.0]], "isOverall": false, "label": "T25 - Q10", "isController": false}, {"data": [[1.69217976E12, 0.0]], "isOverall": false, "label": "T25 - Q11", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T19 - Q22", "isController": false}, {"data": [[1.69217802E12, 0.0]], "isOverall": false, "label": "T19 - Q21", "isController": false}, {"data": [[1.69217844E12, 0.0]], "isOverall": false, "label": "T18 - Q16", "isController": false}, {"data": [[1.69217886E12, 0.0]], "isOverall": false, "label": "T18 - Q15", "isController": false}, {"data": [[1.6921782E12, 0.0]], "isOverall": false, "label": "T18 - Q14", "isController": false}, {"data": [[1.69217802E12, 0.0]], "isOverall": false, "label": "T18 - Q13", "isController": false}, {"data": [[1.69217886E12, 0.0]], "isOverall": false, "label": "T19 - Q19", "isController": false}, {"data": [[1.69217808E12, 0.0]], "isOverall": false, "label": "T18 - Q12", "isController": false}, {"data": [[1.69217892E12, 0.0]], "isOverall": false, "label": "T18 - Q11", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T18 - Q10", "isController": false}, {"data": [[1.69217898E12, 0.0]], "isOverall": false, "label": "T19 - Q18", "isController": false}, {"data": [[1.69217916E12, 0.0]], "isOverall": false, "label": "T22 - Q22", "isController": false}, {"data": [[1.69217916E12, 0.0]], "isOverall": false, "label": "T22 - Q21", "isController": false}, {"data": [[1.69217826E12, 1.0]], "isOverall": false, "label": "T25 - Q8", "isController": false}, {"data": [[1.69217832E12, 0.0]], "isOverall": false, "label": "T24 - Q15", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T25 - Q7", "isController": false}, {"data": [[1.69217868E12, 0.0]], "isOverall": false, "label": "T24 - Q16", "isController": false}, {"data": [[1.69217802E12, 93.0]], "isOverall": false, "label": "T23 - Q22", "isController": false}, {"data": [[1.69217982E12, 0.0]], "isOverall": false, "label": "T25 - Q6", "isController": false}, {"data": [[1.69217862E12, 0.0]], "isOverall": false, "label": "T24 - Q18", "isController": false}, {"data": [[1.6921788E12, 0.0]], "isOverall": false, "label": "T23 - Q21", "isController": false}, {"data": [[1.69217976E12, 0.0]], "isOverall": false, "label": "T25 - Q5", "isController": false}, {"data": [[1.69217808E12, 152.0]], "isOverall": false, "label": "T24 - Q19", "isController": false}, {"data": [[1.69217976E12, 1.0]], "isOverall": false, "label": "T25 - Q9", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T19 - Q15", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T19 - Q16", "isController": false}, {"data": [[1.69217808E12, 0.0]], "isOverall": false, "label": "T19 - Q13", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T19 - Q14", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T24 - Q10", "isController": false}, {"data": [[1.69217814E12, 0.0]], "isOverall": false, "label": "T24 - Q11", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T19 - Q11", "isController": false}, {"data": [[1.69217904E12, 0.0]], "isOverall": false, "label": "T24 - Q12", "isController": false}, {"data": [[1.69217904E12, 0.0]], "isOverall": false, "label": "T19 - Q12", "isController": false}, {"data": [[1.69217802E12, 100.0]], "isOverall": false, "label": "T18 - Q19", "isController": false}, {"data": [[1.69217904E12, 1.0]], "isOverall": false, "label": "T24 - Q13", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T24 - Q14", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T19 - Q10", "isController": false}, {"data": [[1.6921791E12, 0.0]], "isOverall": false, "label": "T18 - Q18", "isController": false}, {"data": [[1.69217844E12, 0.0]], "isOverall": false, "label": "T18 - Q22", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T18 - Q21", "isController": false}, {"data": [[1.69217916E12, 0.0]], "isOverall": false, "label": "T18 - Q4", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T18 - Q3", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T18 - Q2", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T18 - Q1", "isController": false}, {"data": [[1.6921782E12, 0.0]], "isOverall": false, "label": "T18 - Q8", "isController": false}, {"data": [[1.69217832E12, 1.0]], "isOverall": false, "label": "T18 - Q7", "isController": false}, {"data": [[1.69217916E12, 0.0]], "isOverall": false, "label": "T18 - Q6", "isController": false}, {"data": [[1.6921782E12, 0.0]], "isOverall": false, "label": "T20 - Q19", "isController": false}, {"data": [[1.69217892E12, 0.0]], "isOverall": false, "label": "T18 - Q5", "isController": false}, {"data": [[1.69217922E12, 0.0]], "isOverall": false, "label": "T21 - Q9", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T20 - Q18", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T21 - Q8", "isController": false}, {"data": [[1.69217856E12, 0.0]], "isOverall": false, "label": "T21 - Q7", "isController": false}, {"data": [[1.69217802E12, 0.0]], "isOverall": false, "label": "T20 - Q16", "isController": false}, {"data": [[1.6921794E12, 0.0]], "isOverall": false, "label": "T21 - Q6", "isController": false}, {"data": [[1.69217802E12, 0.0]], "isOverall": false, "label": "T21 - Q5", "isController": false}, {"data": [[1.69217922E12, 0.0]], "isOverall": false, "label": "T20 - Q15", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T21 - Q4", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T20 - Q14", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T21 - Q3", "isController": false}, {"data": [[1.69217856E12, 0.0]], "isOverall": false, "label": "T20 - Q13", "isController": false}, {"data": [[1.69217844E12, 0.0]], "isOverall": false, "label": "T20 - Q12", "isController": false}, {"data": [[1.6921794E12, 0.0]], "isOverall": false, "label": "T21 - Q2", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T21 - Q1", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T20 - Q11", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T20 - Q10", "isController": false}, {"data": [[1.69217862E12, 0.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69217856E12, 0.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69217928E12, 0.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69217778E12, 0.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69217922E12, 0.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69217928E12, 0.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69217808E12, 133.0]], "isOverall": false, "label": "T25 - Q21", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T25 - Q22", "isController": false}, {"data": [[1.69217892E12, 0.0]], "isOverall": false, "label": "T23 - Q4", "isController": false}, {"data": [[1.69217886E12, 0.0]], "isOverall": false, "label": "T23 - Q3", "isController": false}, {"data": [[1.6921791E12, 0.0]], "isOverall": false, "label": "T23 - Q6", "isController": false}, {"data": [[1.69217892E12, 0.0]], "isOverall": false, "label": "T23 - Q5", "isController": false}, {"data": [[1.69217898E12, 1.0]], "isOverall": false, "label": "T18 - Q9", "isController": false}, {"data": [[1.69217856E12, 0.0]], "isOverall": false, "label": "T23 - Q8", "isController": false}, {"data": [[1.6921782E12, 0.0]], "isOverall": false, "label": "T23 - Q7", "isController": false}, {"data": [[1.69217814E12, 0.0]], "isOverall": false, "label": "T23 - Q9", "isController": false}, {"data": [[1.69217778E12, 0.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69217778E12, 0.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69217934E12, 0.0]], "isOverall": false, "label": "T21 - Q15", "isController": false}, {"data": [[1.6921785E12, 0.0]], "isOverall": false, "label": "T21 - Q14", "isController": false}, {"data": [[1.6921785E12, 1.0]], "isOverall": false, "label": "T21 - Q16", "isController": false}, {"data": [[1.6921794E12, 0.0]], "isOverall": false, "label": "T21 - Q11", "isController": false}, {"data": [[1.6921794E12, 0.0]], "isOverall": false, "label": "T21 - Q10", "isController": false}, {"data": [[1.69217808E12, 0.0]], "isOverall": false, "label": "T21 - Q13", "isController": false}, {"data": [[1.69217814E12, 0.0]], "isOverall": false, "label": "T21 - Q12", "isController": false}, {"data": [[1.69217928E12, 0.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69217844E12, 0.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.6921782E12, 0.0]], "isOverall": false, "label": "T21 - Q19", "isController": false}, {"data": [[1.69217832E12, 0.0]], "isOverall": false, "label": "T21 - Q18", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T20 - Q22", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T20 - Q21", "isController": false}, {"data": [[1.69217772E12, 0.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69217928E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69217772E12, 688.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69217862E12, 0.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69217778E12, 0.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69217778E12, 0.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69217778E12, 0.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69217856E12, 0.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69217856E12, 0.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69217832E12, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T23 - Q2", "isController": false}, {"data": [[1.69217886E12, 0.0]], "isOverall": false, "label": "T23 - Q1", "isController": false}, {"data": [[1.69217826E12, 0.0]], "isOverall": false, "label": "T22 - Q1", "isController": false}, {"data": [[1.6921788E12, 0.0]], "isOverall": false, "label": "T22 - Q6", "isController": false}, {"data": [[1.69217892E12, 0.0]], "isOverall": false, "label": "T22 - Q7", "isController": false}, {"data": [[1.69217916E12, 0.0]], "isOverall": false, "label": "T22 - Q8", "isController": false}, {"data": [[1.69217838E12, 0.0]], "isOverall": false, "label": "T22 - Q9", "isController": false}, {"data": [[1.69217862E12, 0.0]], "isOverall": false, "label": "T22 - Q2", "isController": false}, {"data": [[1.69217856E12, 0.0]], "isOverall": false, "label": "T22 - Q3", "isController": false}, {"data": [[1.69217916E12, 1.0]], "isOverall": false, "label": "T22 - Q4", "isController": false}, {"data": [[1.6921782E12, 0.0]], "isOverall": false, "label": "T19 - Q1", "isController": false}, {"data": [[1.69217916E12, 0.0]], "isOverall": false, "label": "T22 - Q5", "isController": false}, {"data": [[1.69217958E12, 0.0]], "isOverall": false, "label": "T19 - Q2", "isController": false}, {"data": [[1.69217874E12, 0.0]], "isOverall": false, "label": "T19 - Q3", "isController": false}, {"data": [[1.69217886E12, 0.0]], "isOverall": false, "label": "T19 - Q4", "isController": false}, {"data": [[1.69217796E12, 134.0]], "isOverall": false, "label": "T19 - Q5", "isController": false}, {"data": [[1.6921788E12, 0.0]], "isOverall": false, "label": "T19 - Q6", "isController": false}, {"data": [[1.69217904E12, 0.0]], "isOverall": false, "label": "T19 - Q7", "isController": false}, {"data": [[1.69217808E12, 0.0]], "isOverall": false, "label": "T19 - Q8", "isController": false}, {"data": [[1.69217958E12, 0.0]], "isOverall": false, "label": "T19 - Q9", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69217982E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 7.0, "minX": 1.69217772E12, "maxY": 696604.0, "series": [{"data": [[1.69217922E12, 696604.0], [1.69217862E12, 142735.0], [1.69217892E12, 78451.0], [1.69217802E12, 74385.0], [1.69217832E12, 545406.0], [1.69217934E12, 125510.0], [1.69217772E12, 15839.0], [1.69217874E12, 444173.0], [1.69217904E12, 65366.0], [1.69217814E12, 201302.0], [1.69217844E12, 118770.0], [1.69217976E12, 466452.0], [1.69217886E12, 357184.0], [1.69217916E12, 67368.0], [1.69217826E12, 138427.0], [1.69217958E12, 531155.0], [1.69217856E12, 91160.0], [1.69217796E12, 28839.0], [1.69217898E12, 292453.0], [1.69217928E12, 545016.0], [1.69217838E12, 115970.0], [1.69217868E12, 121730.0], [1.69217778E12, 14372.0], [1.6921794E12, 21171.0], [1.69217808E12, 105653.0], [1.6921791E12, 195020.0], [1.6921785E12, 319108.0], [1.69217982E12, 52686.0], [1.6921788E12, 79396.0], [1.6921779E12, 5435.0], [1.6921782E12, 114438.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69217922E12, 696604.0], [1.69217862E12, 142735.0], [1.69217892E12, 78451.0], [1.69217802E12, 74385.0], [1.69217832E12, 545406.0], [1.69217934E12, 125510.0], [1.69217772E12, 15839.0], [1.69217874E12, 282017.0], [1.69217904E12, 65366.0], [1.69217814E12, 201302.0], [1.69217844E12, 118770.0], [1.69217976E12, 466452.0], [1.69217886E12, 357184.0], [1.69217916E12, 67368.0], [1.69217826E12, 125426.20000000004], [1.69217958E12, 531155.0], [1.69217856E12, 91160.0], [1.69217796E12, 28839.0], [1.69217898E12, 292453.0], [1.69217928E12, 545016.0], [1.69217838E12, 111621.80000000002], [1.69217868E12, 121730.0], [1.69217778E12, 14372.0], [1.6921794E12, 21171.0], [1.69217808E12, 105653.0], [1.6921791E12, 195020.0], [1.6921785E12, 147476.20000000027], [1.69217982E12, 52686.0], [1.6921788E12, 79396.0], [1.6921779E12, 5435.0], [1.6921782E12, 114438.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69217922E12, 696604.0], [1.69217862E12, 142735.0], [1.69217892E12, 78451.0], [1.69217802E12, 74385.0], [1.69217832E12, 545406.0], [1.69217934E12, 125510.0], [1.69217772E12, 15839.0], [1.69217874E12, 444173.0], [1.69217904E12, 65366.0], [1.69217814E12, 201302.0], [1.69217844E12, 118770.0], [1.69217976E12, 466452.0], [1.69217886E12, 357184.0], [1.69217916E12, 67368.0], [1.69217826E12, 138427.0], [1.69217958E12, 531155.0], [1.69217856E12, 91160.0], [1.69217796E12, 28839.0], [1.69217898E12, 292453.0], [1.69217928E12, 545016.0], [1.69217838E12, 115970.0], [1.69217868E12, 121730.0], [1.69217778E12, 14372.0], [1.6921794E12, 21171.0], [1.69217808E12, 105653.0], [1.6921791E12, 195020.0], [1.6921785E12, 319108.0], [1.69217982E12, 52686.0], [1.6921788E12, 79396.0], [1.6921779E12, 5435.0], [1.6921782E12, 114438.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69217922E12, 696604.0], [1.69217862E12, 142735.0], [1.69217892E12, 78451.0], [1.69217802E12, 74385.0], [1.69217832E12, 545406.0], [1.69217934E12, 125510.0], [1.69217772E12, 15839.0], [1.69217874E12, 444173.0], [1.69217904E12, 65366.0], [1.69217814E12, 201302.0], [1.69217844E12, 118770.0], [1.69217976E12, 466452.0], [1.69217886E12, 357184.0], [1.69217916E12, 67368.0], [1.69217826E12, 138427.0], [1.69217958E12, 531155.0], [1.69217856E12, 91160.0], [1.69217796E12, 28839.0], [1.69217898E12, 292453.0], [1.69217928E12, 545016.0], [1.69217838E12, 115970.0], [1.69217868E12, 121730.0], [1.69217778E12, 14372.0], [1.6921794E12, 21171.0], [1.69217808E12, 105653.0], [1.6921791E12, 195020.0], [1.6921785E12, 319108.0], [1.69217982E12, 52686.0], [1.6921788E12, 79396.0], [1.6921779E12, 5435.0], [1.6921782E12, 114438.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69217922E12, 17207.0], [1.69217862E12, 6035.0], [1.69217892E12, 4956.0], [1.69217802E12, 5183.0], [1.69217832E12, 29612.0], [1.69217934E12, 125510.0], [1.69217772E12, 8.0], [1.69217874E12, 2950.0], [1.69217904E12, 17446.0], [1.69217814E12, 11632.0], [1.69217844E12, 10668.0], [1.69217976E12, 2625.0], [1.69217886E12, 7163.0], [1.69217916E12, 3366.0], [1.69217826E12, 4435.0], [1.69217958E12, 2028.0], [1.69217856E12, 7201.0], [1.69217796E12, 24151.0], [1.69217898E12, 10719.0], [1.69217928E12, 7.0], [1.69217838E12, 4210.0], [1.69217868E12, 2717.0], [1.69217778E12, 2025.0], [1.6921794E12, 2772.0], [1.69217808E12, 16031.0], [1.6921791E12, 28468.0], [1.6921785E12, 3592.0], [1.69217982E12, 2144.0], [1.6921788E12, 66306.0], [1.6921779E12, 4047.0], [1.6921782E12, 15585.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69217922E12, 444616.0], [1.69217862E12, 28683.0], [1.69217892E12, 14280.5], [1.69217802E12, 26925.0], [1.69217832E12, 92132.5], [1.69217934E12, 125510.0], [1.69217772E12, 7923.5], [1.69217874E12, 18723.5], [1.69217904E12, 39751.0], [1.69217814E12, 86829.0], [1.69217844E12, 84238.5], [1.69217976E12, 3391.0], [1.69217886E12, 42519.0], [1.69217916E12, 16003.5], [1.69217826E12, 28639.0], [1.69217958E12, 266591.5], [1.69217856E12, 17695.0], [1.69217796E12, 26495.0], [1.69217898E12, 76803.0], [1.69217928E12, 4563.0], [1.69217838E12, 37812.0], [1.69217868E12, 34668.0], [1.69217778E12, 4743.5], [1.6921794E12, 10131.5], [1.69217808E12, 61059.5], [1.6921791E12, 57430.0], [1.6921785E12, 20551.5], [1.69217982E12, 27415.0], [1.6921788E12, 68336.0], [1.6921779E12, 4741.0], [1.6921782E12, 64373.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69217982E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 32568.5, "minX": 1.0, "maxY": 35634.0, "series": [{"data": [[2.0, 35634.0], [1.0, 32568.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 32568.5, "minX": 1.0, "maxY": 35626.0, "series": [{"data": [[2.0, 35626.0], [1.0, 32568.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69217772E12, "maxY": 0.3, "series": [{"data": [[1.69217922E12, 0.05], [1.69217862E12, 0.11666666666666667], [1.69217892E12, 0.13333333333333333], [1.69217802E12, 0.18333333333333332], [1.69217832E12, 0.1], [1.69217934E12, 0.016666666666666666], [1.69217772E12, 0.05], [1.69217874E12, 0.23333333333333334], [1.69217904E12, 0.1], [1.69217814E12, 0.13333333333333333], [1.69217844E12, 0.1], [1.69217976E12, 0.05], [1.69217886E12, 0.13333333333333333], [1.69217916E12, 0.1], [1.69217826E12, 0.18333333333333332], [1.69217958E12, 0.016666666666666666], [1.69217856E12, 0.15], [1.69217796E12, 0.11666666666666667], [1.69217898E12, 0.08333333333333333], [1.69217928E12, 0.11666666666666667], [1.69217838E12, 0.18333333333333332], [1.69217868E12, 0.11666666666666667], [1.69217778E12, 0.1], [1.6921794E12, 0.05], [1.69217808E12, 0.1], [1.6921791E12, 0.06666666666666667], [1.6921785E12, 0.3], [1.69217982E12, 0.016666666666666666], [1.6921788E12, 0.06666666666666667], [1.6921779E12, 0.06666666666666667], [1.6921782E12, 0.13333333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69217982E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69217772E12, "maxY": 0.3, "series": [{"data": [[1.69217922E12, 0.08333333333333333], [1.69217862E12, 0.11666666666666667], [1.69217892E12, 0.13333333333333333], [1.69217802E12, 0.15], [1.69217832E12, 0.1], [1.69217934E12, 0.016666666666666666], [1.69217772E12, 0.03333333333333333], [1.69217874E12, 0.23333333333333334], [1.69217904E12, 0.11666666666666667], [1.69217814E12, 0.13333333333333333], [1.69217844E12, 0.1], [1.69217976E12, 0.05], [1.69217886E12, 0.13333333333333333], [1.69217916E12, 0.13333333333333333], [1.69217826E12, 0.18333333333333332], [1.69217958E12, 0.03333333333333333], [1.69217856E12, 0.15], [1.69217796E12, 0.03333333333333333], [1.69217898E12, 0.08333333333333333], [1.69217928E12, 0.13333333333333333], [1.69217838E12, 0.18333333333333332], [1.69217868E12, 0.11666666666666667], [1.69217778E12, 0.1], [1.6921794E12, 0.06666666666666667], [1.69217808E12, 0.1], [1.6921791E12, 0.08333333333333333], [1.6921785E12, 0.3], [1.69217982E12, 0.03333333333333333], [1.6921788E12, 0.06666666666666667], [1.6921779E12, 0.03333333333333333], [1.6921782E12, 0.13333333333333333]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69217982E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69217772E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.69217862E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q2-success", "isController": false}, {"data": [[1.69217922E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q13-success", "isController": false}, {"data": [[1.69217928E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q3-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q15-success", "isController": false}, {"data": [[1.6921782E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q19-success", "isController": false}, {"data": [[1.69217796E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q5-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q14-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q14-success", "isController": false}, {"data": [[1.69217928E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q14-success", "isController": false}, {"data": [[1.69217856E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q7-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q18-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q10-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q7-success", "isController": false}, {"data": [[1.69217856E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q8-success", "isController": false}, {"data": [[1.69217868E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q8-success", "isController": false}, {"data": [[1.6921791E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q16-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q4-success", "isController": false}, {"data": [[1.6921788E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q21-success", "isController": false}, {"data": [[1.6921794E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q2-success", "isController": false}, {"data": [[1.69217982E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q6-success", "isController": false}, {"data": [[1.69217904E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q12-success", "isController": false}, {"data": [[1.69217976E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q11-success", "isController": false}, {"data": [[1.69217892E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q16-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q2-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q3-success", "isController": false}, {"data": [[1.69217832E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q15-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q10-success", "isController": false}, {"data": [[1.6921791E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q12-success", "isController": false}, {"data": [[1.69217832E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q7-success", "isController": false}, {"data": [[1.6921791E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q18-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q11-success", "isController": false}, {"data": [[1.69217916E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q19-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q7-success", "isController": false}, {"data": [[1.69217862E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q2-success", "isController": false}, {"data": [[1.69217796E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q2-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q15-success", "isController": false}, {"data": [[1.69217976E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q9-success", "isController": false}, {"data": [[1.69217772E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF2-success", "isController": false}, {"data": [[1.69217886E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q15-success", "isController": false}, {"data": [[1.69217892E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q7-success", "isController": false}, {"data": [[1.69217916E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q4-success", "isController": false}, {"data": [[1.69217892E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q5-success", "isController": false}, {"data": [[1.69217898E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q18-success", "isController": false}, {"data": [[1.69217802E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q5-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q16-success", "isController": false}, {"data": [[1.69217958E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q2-success", "isController": false}, {"data": [[1.69217844E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q12-success", "isController": false}, {"data": [[1.69217928E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q16-success", "isController": false}, {"data": [[1.6921782E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q1-success", "isController": false}, {"data": [[1.6921782E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q8-success", "isController": false}, {"data": [[1.6921791E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q15-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q1-success", "isController": false}, {"data": [[1.69217802E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q22-success", "isController": false}, {"data": [[1.69217862E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q2-success", "isController": false}, {"data": [[1.6921782E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q14-success", "isController": false}, {"data": [[1.6921779E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q5-success", "isController": false}, {"data": [[1.69217856E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q13-success", "isController": false}, {"data": [[1.69217904E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q7-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q21-success", "isController": false}, {"data": [[1.69217862E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q18-success", "isController": false}, {"data": [[1.6921794E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q10-success", "isController": false}, {"data": [[1.69217808E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q12-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q10-success", "isController": false}, {"data": [[1.69217778E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q5-success", "isController": false}, {"data": [[1.69217802E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q16-success", "isController": false}, {"data": [[1.69217808E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q13-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q4-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q22-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q4-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q22-success", "isController": false}, {"data": [[1.6921791E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q6-success", "isController": false}, {"data": [[1.69217814E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q2-success", "isController": false}, {"data": [[1.69217832E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q19-success", "isController": false}, {"data": [[1.69217844E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q19-success", "isController": false}, {"data": [[1.69217916E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q4-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q8-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q22-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q1-success", "isController": false}, {"data": [[1.69217856E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q8-success", "isController": false}, {"data": [[1.69217862E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q11-success", "isController": false}, {"data": [[1.69217892E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q5-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q18-success", "isController": false}, {"data": [[1.69217898E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q10-success", "isController": false}, {"data": [[1.69217868E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q13-success", "isController": false}, {"data": [[1.69217904E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q12-success", "isController": false}, {"data": [[1.69217922E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q15-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q9-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q5-success", "isController": false}, {"data": [[1.69217856E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q7-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q18-success", "isController": false}, {"data": [[1.69217886E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q4-success", "isController": false}, {"data": [[1.69217916E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q22-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q5-success", "isController": false}, {"data": [[1.69217982E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q16-success", "isController": false}, {"data": [[1.69217886E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q10-success", "isController": false}, {"data": [[1.69217832E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q18-success", "isController": false}, {"data": [[1.69217904E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q13-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q7-success", "isController": false}, {"data": [[1.69217886E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q3-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q2-success", "isController": false}, {"data": [[1.69217802E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q21-success", "isController": false}, {"data": [[1.69217802E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q21-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q18-success", "isController": false}, {"data": [[1.69217958E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q9-success", "isController": false}, {"data": [[1.69217868E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q16-success", "isController": false}, {"data": [[1.69217886E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q1-success", "isController": false}, {"data": [[1.69217928E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q10-success", "isController": false}, {"data": [[1.69217814E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q22-success", "isController": false}, {"data": [[1.69217916E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q6-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q11-success", "isController": false}, {"data": [[1.69217868E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q12-success", "isController": false}, {"data": [[1.69217862E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q11-success", "isController": false}, {"data": [[1.69217778E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q3-success", "isController": false}, {"data": [[1.6921782E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q1-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q8-success", "isController": false}, {"data": [[1.69217934E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q15-success", "isController": false}, {"data": [[1.6921794E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q6-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q3-success", "isController": false}, {"data": [[1.6921788E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q6-success", "isController": false}, {"data": [[1.6921782E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q14-success", "isController": false}, {"data": [[1.69217856E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q10-success", "isController": false}, {"data": [[1.69217868E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q3-success", "isController": false}, {"data": [[1.69217904E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q14-success", "isController": false}, {"data": [[1.69217892E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q4-success", "isController": false}, {"data": [[1.69217886E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q19-success", "isController": false}, {"data": [[1.69217892E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q4-success", "isController": false}, {"data": [[1.69217928E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF1-success", "isController": false}, {"data": [[1.69217832E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q21-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q10-success", "isController": false}, {"data": [[1.69217808E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q19-success", "isController": false}, {"data": [[1.69217856E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q13-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q14-success", "isController": false}, {"data": [[1.69217928E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q2-success", "isController": false}, {"data": [[1.69217928E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q15-success", "isController": false}, {"data": [[1.6921788E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q6-success", "isController": false}, {"data": [[1.69217928E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q13-success", "isController": false}, {"data": [[1.69217904E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q6-success", "isController": false}, {"data": [[1.69217922E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q9-success", "isController": false}, {"data": [[1.69217892E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q11-success", "isController": false}, {"data": [[1.69217814E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q9-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q21-success", "isController": false}, {"data": [[1.69217898E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q19-success", "isController": false}, {"data": [[1.69217904E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q7-success", "isController": false}, {"data": [[1.69217814E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q12-success", "isController": false}, {"data": [[1.69217856E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q6-success", "isController": false}, {"data": [[1.69217898E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q15-success", "isController": false}, {"data": [[1.69217976E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q5-success", "isController": false}, {"data": [[1.69217814E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q12-success", "isController": false}, {"data": [[1.69217856E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q3-success", "isController": false}, {"data": [[1.69217844E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q18-success", "isController": false}, {"data": [[1.69217778E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q21-success", "isController": false}, {"data": [[1.69217814E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q11-success", "isController": false}, {"data": [[1.69217838E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q3-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q9-success", "isController": false}, {"data": [[1.6921779E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q10-success", "isController": false}, {"data": [[1.69217808E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q13-success", "isController": false}, {"data": [[1.69217886E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q19-success", "isController": false}, {"data": [[1.69217802E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q16-success", "isController": false}, {"data": [[1.69217832E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q9-success", "isController": false}, {"data": [[1.69217778E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q12-success", "isController": false}, {"data": [[1.69217802E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q19-success", "isController": false}, {"data": [[1.69217862E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q12-success", "isController": false}, {"data": [[1.69217802E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q9-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q22-success", "isController": false}, {"data": [[1.69217916E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q8-success", "isController": false}, {"data": [[1.69217916E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q21-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q8-success", "isController": false}, {"data": [[1.6921782E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q19-success", "isController": false}, {"data": [[1.69217868E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q6-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q8-success", "isController": false}, {"data": [[1.69217772E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q1-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q14-success", "isController": false}, {"data": [[1.69217922E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q11-success", "isController": false}, {"data": [[1.69217892E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q6-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q3-success", "isController": false}, {"data": [[1.69217814E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q18-success", "isController": false}, {"data": [[1.69217844E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q1-success", "isController": false}, {"data": [[1.69217778E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q22-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q1-success", "isController": false}, {"data": [[1.69217898E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q9-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q11-success", "isController": false}, {"data": [[1.69217886E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q1-success", "isController": false}, {"data": [[1.69217922E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q15-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q16-success", "isController": false}, {"data": [[1.69217814E12, 0.016666666666666666]], "isOverall": false, "label": "T20 - Q1-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q13-success", "isController": false}, {"data": [[1.69217868E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q14-success", "isController": false}, {"data": [[1.69217874E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q21-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q4-success", "isController": false}, {"data": [[1.69217844E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q22-success", "isController": false}, {"data": [[1.69217844E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q16-success", "isController": false}, {"data": [[1.6921794E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q11-success", "isController": false}, {"data": [[1.69217808E12, 0.016666666666666666]], "isOverall": false, "label": "T19 - Q8-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q14-success", "isController": false}, {"data": [[1.6921788E12, 0.016666666666666666]], "isOverall": false, "label": "T24 - Q9-success", "isController": false}, {"data": [[1.69217802E12, 0.016666666666666666]], "isOverall": false, "label": "T18 - Q13-success", "isController": false}, {"data": [[1.6921782E12, 0.016666666666666666]], "isOverall": false, "label": "T23 - Q7-success", "isController": false}, {"data": [[1.69217826E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q22-success", "isController": false}, {"data": [[1.69217916E12, 0.016666666666666666]], "isOverall": false, "label": "T22 - Q5-success", "isController": false}, {"data": [[1.6921785E12, 0.016666666666666666]], "isOverall": false, "label": "T21 - Q3-success", "isController": false}, {"data": [[1.69217778E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q4-success", "isController": false}, {"data": [[1.69217808E12, 0.016666666666666666]], "isOverall": false, "label": "T25 - Q21-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69217982E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69217772E12, "maxY": 0.3, "series": [{"data": [[1.69217922E12, 0.08333333333333333], [1.69217862E12, 0.11666666666666667], [1.69217892E12, 0.13333333333333333], [1.69217802E12, 0.15], [1.69217832E12, 0.1], [1.69217934E12, 0.016666666666666666], [1.69217772E12, 0.03333333333333333], [1.69217874E12, 0.23333333333333334], [1.69217904E12, 0.11666666666666667], [1.69217814E12, 0.13333333333333333], [1.69217844E12, 0.1], [1.69217976E12, 0.05], [1.69217886E12, 0.13333333333333333], [1.69217916E12, 0.13333333333333333], [1.69217826E12, 0.18333333333333332], [1.69217958E12, 0.03333333333333333], [1.69217856E12, 0.15], [1.69217796E12, 0.03333333333333333], [1.69217898E12, 0.08333333333333333], [1.69217928E12, 0.13333333333333333], [1.69217838E12, 0.18333333333333332], [1.69217868E12, 0.11666666666666667], [1.69217778E12, 0.1], [1.6921794E12, 0.06666666666666667], [1.69217808E12, 0.1], [1.6921791E12, 0.08333333333333333], [1.6921785E12, 0.3], [1.69217982E12, 0.03333333333333333], [1.6921788E12, 0.06666666666666667], [1.6921779E12, 0.03333333333333333], [1.6921782E12, 0.13333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69217982E12, "title": "Total Transactions Per Second"}},
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
