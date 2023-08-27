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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[16600.0, 1.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[12900.0, 1.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[52700.0, 1.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[21000.0, 1.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[29300.0, 1.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[284500.0, 1.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[4100.0, 1.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[38400.0, 1.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[57700.0, 1.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[89600.0, 1.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[19100.0, 1.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[70700.0, 1.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[50000.0, 1.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[15600.0, 1.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[61700.0, 1.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[4900.0, 1.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[37400.0, 1.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[20700.0, 1.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[30200.0, 1.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[15200.0, 1.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[16200.0, 1.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[92500.0, 1.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[63800.0, 1.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[5700.0, 1.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[8800.0, 1.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[37800.0, 1.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[6700.0, 1.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[11800.0, 1.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[31100.0, 1.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[34600.0, 1.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[17200.0, 1.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[26100.0, 1.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[74600.0, 1.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[85100.0, 1.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[44400.0, 1.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[5100.0, 1.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[517400.0, 1.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[13200.0, 1.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[29600.0, 1.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[135900.0, 1.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[17900.0, 1.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[25600.0, 1.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[7100.0, 1.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[25600.0, 1.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[6700.0, 1.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[58900.0, 1.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[42000.0, 1.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[13700.0, 1.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[4100.0, 1.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[635700.0, 1.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[4600.0, 1.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[17300.0, 1.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[50700.0, 1.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[23300.0, 1.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[27400.0, 1.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[21500.0, 1.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[37200.0, 1.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[5800.0, 1.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[45900.0, 1.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[23800.0, 1.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[31700.0, 1.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[34600.0, 1.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[163900.0, 1.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[4200.0, 1.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[58700.0, 1.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[6800.0, 1.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[30900.0, 1.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[14000.0, 1.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[23000.0, 1.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[6900.0, 1.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[21400.0, 1.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[84300.0, 1.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[9600.0, 1.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[10100.0, 1.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[91000.0, 1.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[35200.0, 1.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[90600.0, 1.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[3500.0, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[14100.0, 1.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[40100.0, 1.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[73500.0, 1.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[17300.0, 1.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[99000.0, 1.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[22000.0, 1.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[37400.0, 1.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[18400.0, 1.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[80300.0, 1.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[11000.0, 1.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[47900.0, 1.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[8100.0, 1.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[25000.0, 1.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[8400.0, 1.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[121400.0, 1.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[20300.0, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[80600.0, 1.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[20600.0, 1.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[31800.0, 1.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[359100.0, 1.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[36500.0, 1.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[27800.0, 1.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[4400.0, 1.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[26700.0, 1.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[4900.0, 1.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[6800.0, 1.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[6000.0, 1.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[6000.0, 1.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[29500.0, 1.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[27700.0, 1.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[8600.0, 1.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[40800.0, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[2300.0, 1.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[31100.0, 1.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[6900.0, 1.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[38200.0, 1.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[12700.0, 1.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[11200.0, 1.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[72900.0, 1.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[15100.0, 1.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[66700.0, 1.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[39500.0, 1.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[37100.0, 1.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[16500.0, 1.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[18300.0, 1.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[3400.0, 1.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[10800.0, 1.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[17100.0, 1.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[517400.0, 1.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[40800.0, 1.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[4100.0, 1.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[58600.0, 1.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[54100.0, 1.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[75600.0, 1.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[8500.0, 1.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[4400.0, 1.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[25400.0, 1.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[5400.0, 1.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[4600.0, 1.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[4700.0, 1.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[41600.0, 1.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[27800.0, 1.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[7000.0, 1.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[5300.0, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[8100.0, 1.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[48700.0, 1.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[27800.0, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[12600.0, 1.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[656400.0, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[7200.0, 1.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[51700.0, 1.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[24400.0, 1.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[19500.0, 1.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[32200.0, 1.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[52500.0, 1.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[86400.0, 1.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[66300.0, 1.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[8900.0, 1.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[10800.0, 1.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[175600.0, 1.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[12200.0, 1.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[16700.0, 1.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[82800.0, 1.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[11800.0, 1.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[66200.0, 1.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[41100.0, 1.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[13500.0, 1.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[37200.0, 1.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[398200.0, 1.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[21300.0, 1.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[68600.0, 1.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[73200.0, 1.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 656400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 196.0, "series": [{"data": [[0.0, 1.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 4.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 196.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 1.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69221804E12, "maxY": 1.0, "series": [{"data": [[1.69221912E12, 1.0], [1.69221882E12, 1.0], [1.69221804E12, 1.0], [1.692219E12, 1.0], [1.6922187E12, 1.0], [1.69221888E12, 1.0], [1.69221906E12, 1.0], [1.69221876E12, 1.0], [1.69221894E12, 1.0]], "isOverall": false, "label": "T4", "isController": false}, {"data": [[1.69221864E12, 1.0], [1.69221882E12, 1.0], [1.692219E12, 1.0], [1.6922187E12, 1.0], [1.69221888E12, 1.0], [1.6922181E12, 1.0], [1.69221876E12, 1.0], [1.69221894E12, 1.0]], "isOverall": false, "label": "G7", "isController": false}, {"data": [[1.69221864E12, 1.0], [1.69221882E12, 1.0], [1.69221804E12, 1.0], [1.69221852E12, 1.0], [1.6922187E12, 1.0], [1.6922181E12, 1.0], [1.69221876E12, 1.0], [1.69221846E12, 1.0], [1.69221894E12, 1.0]], "isOverall": false, "label": "G8", "isController": false}, {"data": [[1.69221816E12, 1.0], [1.69221834E12, 1.0], [1.69221882E12, 1.0], [1.69221804E12, 1.0], [1.692219E12, 1.0], [1.69221822E12, 1.0], [1.69221888E12, 1.0], [1.69221828E12, 1.0], [1.69221876E12, 1.0], [1.69221894E12, 1.0]], "isOverall": false, "label": "T5", "isController": false}, {"data": [[1.69221816E12, 1.0], [1.69221834E12, 1.0], [1.69221804E12, 1.0], [1.69221852E12, 1.0], [1.69221822E12, 1.0], [1.6922187E12, 1.0], [1.6922184E12, 1.0], [1.6922181E12, 1.0], [1.69221858E12, 1.0], [1.69221828E12, 1.0], [1.69221846E12, 1.0]], "isOverall": false, "label": "G9", "isController": false}, {"data": [[1.69221834E12, 1.0], [1.69221852E12, 1.0], [1.69221822E12, 1.0], [1.6922184E12, 1.0], [1.6922181E12, 1.0], [1.69221858E12, 1.0], [1.69221828E12, 1.0], [1.69221846E12, 1.0]], "isOverall": false, "label": "G10", "isController": false}, {"data": [[1.69221816E12, 1.0], [1.69221912E12, 1.0], [1.69221882E12, 1.0], [1.692219E12, 1.0], [1.69221888E12, 1.0], [1.6922181E12, 1.0], [1.69221906E12, 1.0], [1.69221894E12, 1.0]], "isOverall": false, "label": "T1", "isController": false}, {"data": [[1.69221816E12, 1.0], [1.69221834E12, 1.0], [1.69221882E12, 1.0], [1.69221804E12, 1.0], [1.69221822E12, 1.0], [1.6922184E12, 1.0], [1.6922181E12, 1.0], [1.69221858E12, 1.0], [1.69221828E12, 1.0], [1.69221876E12, 1.0], [1.69221894E12, 1.0]], "isOverall": false, "label": "T2", "isController": false}, {"data": [[1.69221864E12, 1.0], [1.69221834E12, 1.0], [1.69221804E12, 1.0], [1.69221852E12, 1.0], [1.6922187E12, 1.0], [1.6922181E12, 1.0], [1.69221858E12, 1.0], [1.69221876E12, 1.0], [1.69221846E12, 1.0]], "isOverall": false, "label": "G6", "isController": false}, {"data": [[1.69221816E12, 1.0], [1.69221912E12, 1.0], [1.69221834E12, 1.0], [1.692219E12, 1.0], [1.69221822E12, 1.0], [1.6922184E12, 1.0], [1.6922181E12, 1.0], [1.69221906E12, 1.0], [1.69221828E12, 1.0], [1.69221846E12, 1.0]], "isOverall": false, "label": "T3", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221912E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 9.0, "minX": 1.0, "maxY": 656473.0, "series": [{"data": [[10.0, 16689.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[10.0, 16689.0]], "isOverall": false, "label": "G6 - Q10-Aggregated", "isController": false}, {"data": [[9.0, 12965.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[9.0, 12965.0]], "isOverall": false, "label": "G6 - Q11-Aggregated", "isController": false}, {"data": [[8.0, 52744.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[8.0, 52744.0]], "isOverall": false, "label": "G6 - Q12-Aggregated", "isController": false}, {"data": [[9.0, 21070.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[9.0, 21070.0]], "isOverall": false, "label": "G6 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 29347.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[10.0, 29347.0]], "isOverall": false, "label": "G6 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 284507.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[10.0, 284507.0]], "isOverall": false, "label": "G6 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 4173.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[10.0, 4173.0]], "isOverall": false, "label": "G6 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 38431.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[10.0, 38431.0]], "isOverall": false, "label": "G6 - Q18-Aggregated", "isController": false}, {"data": [[8.0, 57726.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[8.0, 57726.0]], "isOverall": false, "label": "G6 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 89661.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[10.0, 89661.0]], "isOverall": false, "label": "T3 - Q19-Aggregated", "isController": false}, {"data": [[3.0, 19150.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[3.0, 19150.0]], "isOverall": false, "label": "T3 - Q18-Aggregated", "isController": false}, {"data": [[3.0, 70782.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[3.0, 70782.0]], "isOverall": false, "label": "T3 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 50015.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[10.0, 50015.0]], "isOverall": false, "label": "T3 - Q14-Aggregated", "isController": false}, {"data": [[1.0, 5619.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.0, 5619.0]], "isOverall": false, "label": "T3 - Q16-Aggregated", "isController": false}, {"data": [[3.0, 15660.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[3.0, 15660.0]], "isOverall": false, "label": "T4 - Q12-Aggregated", "isController": false}, {"data": [[3.0, 3040.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[3.0, 3040.0]], "isOverall": false, "label": "T4 - Q11-Aggregated", "isController": false}, {"data": [[3.0, 3630.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[3.0, 3630.0]], "isOverall": false, "label": "T4 - Q10-Aggregated", "isController": false}, {"data": [[1.0, 4885.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.0, 4885.0]], "isOverall": false, "label": "T3 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 61730.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[10.0, 61730.0]], "isOverall": false, "label": "T3 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 4981.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[10.0, 4981.0]], "isOverall": false, "label": "G6 - Q5-Aggregated", "isController": false}, {"data": [[9.0, 37406.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[9.0, 37406.0]], "isOverall": false, "label": "G6 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 6152.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[10.0, 6152.0]], "isOverall": false, "label": "G6 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 20764.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[10.0, 20764.0]], "isOverall": false, "label": "G6 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 30249.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[10.0, 30249.0]], "isOverall": false, "label": "G6 - Q9-Aggregated", "isController": false}, {"data": [[2.0, 3123.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[2.0, 3123.0]], "isOverall": false, "label": "T3 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 15257.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[10.0, 15257.0]], "isOverall": false, "label": "T3 - Q10-Aggregated", "isController": false}, {"data": [[3.0, 16206.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[3.0, 16206.0]], "isOverall": false, "label": "T3 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 92507.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[10.0, 92507.0]], "isOverall": false, "label": "T3 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 63831.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[10.0, 63831.0]], "isOverall": false, "label": "G6 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 2938.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[10.0, 2938.0]], "isOverall": false, "label": "G6 - Q2-Aggregated", "isController": false}, {"data": [[9.0, 5791.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[9.0, 5791.0]], "isOverall": false, "label": "G6 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 8849.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[10.0, 8849.0]], "isOverall": false, "label": "G6 - Q4-Aggregated", "isController": false}, {"data": [[6.0, 37804.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[6.0, 37804.0]], "isOverall": false, "label": "G7 - Q12-Aggregated", "isController": false}, {"data": [[7.0, 6756.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[7.0, 6756.0]], "isOverall": false, "label": "G7 - Q11-Aggregated", "isController": false}, {"data": [[7.0, 4322.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[7.0, 4322.0]], "isOverall": false, "label": "G7 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 11859.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[10.0, 11859.0]], "isOverall": false, "label": "T2 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 31120.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[10.0, 31120.0]], "isOverall": false, "label": "T2 - Q21-Aggregated", "isController": false}, {"data": [[9.0, 34620.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[9.0, 34620.0]], "isOverall": false, "label": "G6 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 17285.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[10.0, 17285.0]], "isOverall": false, "label": "G6 - Q22-Aggregated", "isController": false}, {"data": [[5.0, 26179.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[5.0, 26179.0]], "isOverall": false, "label": "G7 - Q19-Aggregated", "isController": false}, {"data": [[7.0, 74693.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[7.0, 74693.0]], "isOverall": false, "label": "G7 - Q18-Aggregated", "isController": false}, {"data": [[7.0, 85167.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[7.0, 85167.0]], "isOverall": false, "label": "T2 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 44460.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[10.0, 44460.0]], "isOverall": false, "label": "T2 - Q18-Aggregated", "isController": false}, {"data": [[5.0, 5174.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[5.0, 5174.0]], "isOverall": false, "label": "G7 - Q16-Aggregated", "isController": false}, {"data": [[9.0, 517407.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[9.0, 517407.0]], "isOverall": false, "label": "G7 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 13274.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[10.0, 13274.0]], "isOverall": false, "label": "T2 - Q16-Aggregated", "isController": false}, {"data": [[8.0, 29669.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[8.0, 29669.0]], "isOverall": false, "label": "G7 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 135910.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[10.0, 135910.0]], "isOverall": false, "label": "T2 - Q15-Aggregated", "isController": false}, {"data": [[7.0, 17930.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[7.0, 17930.0]], "isOverall": false, "label": "G7 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 25668.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[10.0, 25668.0]], "isOverall": false, "label": "T2 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 7172.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[10.0, 7172.0]], "isOverall": false, "label": "G10 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 25694.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[10.0, 25694.0]], "isOverall": false, "label": "T2 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 6794.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[10.0, 6794.0]], "isOverall": false, "label": "G7 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 58926.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[10.0, 58926.0]], "isOverall": false, "label": "T2 - Q12-Aggregated", "isController": false}, {"data": [[9.0, 42056.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[9.0, 42056.0]], "isOverall": false, "label": "G7 - Q21-Aggregated", "isController": false}, {"data": [[7.0, 13794.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[7.0, 13794.0]], "isOverall": false, "label": "T2 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 4139.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[10.0, 4139.0]], "isOverall": false, "label": "T2 - Q10-Aggregated", "isController": false}, {"data": [[9.0, 635709.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[9.0, 635709.0]], "isOverall": false, "label": "T4 - Q9-Aggregated", "isController": false}, {"data": [[3.0, 4674.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[3.0, 4674.0]], "isOverall": false, "label": "T4 - Q8-Aggregated", "isController": false}, {"data": [[3.0, 17307.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[3.0, 17307.0]], "isOverall": false, "label": "T4 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 50769.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[10.0, 50769.0]], "isOverall": false, "label": "G10 - Q21-Aggregated", "isController": false}, {"data": [[3.0, 23345.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[3.0, 23345.0]], "isOverall": false, "label": "T4 - Q6-Aggregated", "isController": false}, {"data": [[3.0, 3105.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[3.0, 3105.0]], "isOverall": false, "label": "T4 - Q5-Aggregated", "isController": false}, {"data": [[3.0, 5255.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[3.0, 5255.0]], "isOverall": false, "label": "T4 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 27423.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[10.0, 27423.0]], "isOverall": false, "label": "T4 - Q3-Aggregated", "isController": false}, {"data": [[7.0, 21510.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[7.0, 21510.0]], "isOverall": false, "label": "T4 - Q2-Aggregated", "isController": false}, {"data": [[7.0, 37235.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[7.0, 37235.0]], "isOverall": false, "label": "T4 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 5856.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[10.0, 5856.0]], "isOverall": false, "label": "G10 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 45977.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[10.0, 45977.0]], "isOverall": false, "label": "G10 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 23810.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[10.0, 23810.0]], "isOverall": false, "label": "G10 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 31709.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[10.0, 31709.0]], "isOverall": false, "label": "G10 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 4548.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[10.0, 4548.0]], "isOverall": false, "label": "G10 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 34636.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[10.0, 34636.0]], "isOverall": false, "label": "G10 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 163950.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[10.0, 163950.0]], "isOverall": false, "label": "G10 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 4271.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[10.0, 4271.0]], "isOverall": false, "label": "G10 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 58767.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[10.0, 58767.0]], "isOverall": false, "label": "G10 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 6897.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[10.0, 6897.0]], "isOverall": false, "label": "G9 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 30975.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[10.0, 30975.0]], "isOverall": false, "label": "G9 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 14002.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[10.0, 14002.0]], "isOverall": false, "label": "T5 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 23098.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[10.0, 23098.0]], "isOverall": false, "label": "T5 - Q4-Aggregated", "isController": false}, {"data": [[5.0, 6970.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[5.0, 6970.0]], "isOverall": false, "label": "T5 - Q5-Aggregated", "isController": false}, {"data": [[5.0, 21478.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[5.0, 21478.0]], "isOverall": false, "label": "T5 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 84352.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[10.0, 84352.0]], "isOverall": false, "label": "T5 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 1393.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[10.0, 1393.0]], "isOverall": false, "label": "T5 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 9658.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[10.0, 9658.0]], "isOverall": false, "label": "T5 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 10132.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[10.0, 10132.0]], "isOverall": false, "label": "T5 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 91076.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[10.0, 91076.0]], "isOverall": false, "label": "T5 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 35213.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[10.0, 35213.0]], "isOverall": false, "label": "T1 - Q11-Aggregated", "isController": false}, {"data": [[9.0, 90682.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[9.0, 90682.0]], "isOverall": false, "label": "G9 - Q19-Aggregated", "isController": false}, {"data": [[3.0, 3530.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[3.0, 3530.0]], "isOverall": false, "label": "T1 - Q10-Aggregated", "isController": false}, {"data": [[7.0, 14146.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[7.0, 14146.0]], "isOverall": false, "label": "T1 - Q13-Aggregated", "isController": false}, {"data": [[3.0, 40182.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[3.0, 40182.0]], "isOverall": false, "label": "T1 - Q12-Aggregated", "isController": false}, {"data": [[3.0, 73534.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[3.0, 73534.0]], "isOverall": false, "label": "T1 - Q15-Aggregated", "isController": false}, {"data": [[2.0, 17312.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[2.0, 17312.0]], "isOverall": false, "label": "T1 - Q14-Aggregated", "isController": false}, {"data": [[9.0, 99081.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[9.0, 99081.0]], "isOverall": false, "label": "G9 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 22082.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[10.0, 22082.0]], "isOverall": false, "label": "G9 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 37422.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[10.0, 37422.0]], "isOverall": false, "label": "G9 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 18480.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[10.0, 18480.0]], "isOverall": false, "label": "G9 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 80392.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[10.0, 80392.0]], "isOverall": false, "label": "G9 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 11092.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[10.0, 11092.0]], "isOverall": false, "label": "G9 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 47965.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[10.0, 47965.0]], "isOverall": false, "label": "G9 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 8173.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[10.0, 8173.0]], "isOverall": false, "label": "G9 - Q10-Aggregated", "isController": false}, {"data": [[8.0, 6113.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[8.0, 6113.0]], "isOverall": false, "label": "G8 - Q22-Aggregated", "isController": false}, {"data": [[7.0, 25043.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[7.0, 25043.0]], "isOverall": false, "label": "G8 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 8494.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[10.0, 8494.0]], "isOverall": false, "label": "G8 - Q16-Aggregated", "isController": false}, {"data": [[9.0, 121460.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[9.0, 121460.0]], "isOverall": false, "label": "G8 - Q19-Aggregated", "isController": false}, {"data": [[3.0, 4039.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[3.0, 4039.0]], "isOverall": false, "label": "T1 - Q22-Aggregated", "isController": false}, {"data": [[7.0, 20389.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[7.0, 20389.0]], "isOverall": false, "label": "T1 - Q21-Aggregated", "isController": false}, {"data": [[7.0, 80662.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[7.0, 80662.0]], "isOverall": false, "label": "G8 - Q18-Aggregated", "isController": false}, {"data": [[8.0, 20687.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[8.0, 20687.0]], "isOverall": false, "label": "G8 - Q13-Aggregated", "isController": false}, {"data": [[7.0, 31879.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[7.0, 31879.0]], "isOverall": false, "label": "G8 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 359136.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[10.0, 359136.0]], "isOverall": false, "label": "G8 - Q15-Aggregated", "isController": false}, {"data": [[9.0, 36515.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[9.0, 36515.0]], "isOverall": false, "label": "G8 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 27873.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[10.0, 27873.0]], "isOverall": false, "label": "G10 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 4491.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[10.0, 4491.0]], "isOverall": false, "label": "G10 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 974.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[10.0, 974.0]], "isOverall": false, "label": "G10 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 26753.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[10.0, 26753.0]], "isOverall": false, "label": "G10 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 4996.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[10.0, 4996.0]], "isOverall": false, "label": "G10 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 6804.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[10.0, 6804.0]], "isOverall": false, "label": "G10 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 6093.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[10.0, 6093.0]], "isOverall": false, "label": "G10 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 6014.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[10.0, 6014.0]], "isOverall": false, "label": "G10 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 29583.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[10.0, 29583.0]], "isOverall": false, "label": "G10 - Q6-Aggregated", "isController": false}, {"data": [[3.0, 2447.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[3.0, 2447.0]], "isOverall": false, "label": "T1 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 27783.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[10.0, 27783.0]], "isOverall": false, "label": "T1 - Q19-Aggregated", "isController": false}, {"data": [[8.0, 6301.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[8.0, 6301.0]], "isOverall": false, "label": "G8 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 8620.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[10.0, 8620.0]], "isOverall": false, "label": "G8 - Q10-Aggregated", "isController": false}, {"data": [[3.0, 40809.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[3.0, 40809.0]], "isOverall": false, "label": "T1 - Q18-Aggregated", "isController": false}, {"data": [[8.0, 2316.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[8.0, 2316.0]], "isOverall": false, "label": "G8 - Q2-Aggregated", "isController": false}, {"data": [[8.0, 31132.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[8.0, 31132.0]], "isOverall": false, "label": "G8 - Q1-Aggregated", "isController": false}, {"data": [[8.0, 5313.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[8.0, 5313.0]], "isOverall": false, "label": "G8 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 6975.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[10.0, 6975.0]], "isOverall": false, "label": "G8 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 38263.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[10.0, 38263.0]], "isOverall": false, "label": "G8 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 12710.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[10.0, 12710.0]], "isOverall": false, "label": "G8 - Q5-Aggregated", "isController": false}, {"data": [[7.0, 5563.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[7.0, 5563.0]], "isOverall": false, "label": "G8 - Q8-Aggregated", "isController": false}, {"data": [[7.0, 11208.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[7.0, 11208.0]], "isOverall": false, "label": "G8 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 72924.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[10.0, 72924.0]], "isOverall": false, "label": "G8 - Q9-Aggregated", "isController": false}, {"data": [[4.0, 3042.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[4.0, 3042.0]], "isOverall": false, "label": "T5 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 15184.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[10.0, 15184.0]], "isOverall": false, "label": "T5 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 66778.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[10.0, 66778.0]], "isOverall": false, "label": "G9 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 39518.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[10.0, 39518.0]], "isOverall": false, "label": "T3 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 37146.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[10.0, 37146.0]], "isOverall": false, "label": "T3 - Q8-Aggregated", "isController": false}, {"data": [[9.0, 16572.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[9.0, 16572.0]], "isOverall": false, "label": "G9 - Q7-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "T1 - RF2-Aggregated", "isController": false}, {"data": [[10.0, 18382.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[10.0, 18382.0]], "isOverall": false, "label": "G9 - Q4-Aggregated", "isController": false}, {"data": [[1.0, 3414.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.0, 3414.0]], "isOverall": false, "label": "T3 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 6113.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[10.0, 6113.0]], "isOverall": false, "label": "G9 - Q5-Aggregated", "isController": false}, {"data": [[1.0, 10841.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.0, 10841.0]], "isOverall": false, "label": "T3 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 1135.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[10.0, 1135.0]], "isOverall": false, "label": "G9 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 17161.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[10.0, 17161.0]], "isOverall": false, "label": "G9 - Q3-Aggregated", "isController": false}, {"data": [[3.0, 517480.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[3.0, 517480.0]], "isOverall": false, "label": "T3 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 40873.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[10.0, 40873.0]], "isOverall": false, "label": "G9 - Q1-Aggregated", "isController": false}, {"data": [[1.0, 2585.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.0, 2585.0]], "isOverall": false, "label": "T3 - Q3-Aggregated", "isController": false}, {"data": [[3.0, 3608.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[3.0, 3608.0]], "isOverall": false, "label": "T3 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 4196.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[10.0, 4196.0]], "isOverall": false, "label": "G9 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 17.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[10.0, 17.0]], "isOverall": false, "label": "T1 - RF1-Aggregated", "isController": false}, {"data": [[10.0, 58664.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[10.0, 58664.0]], "isOverall": false, "label": "T3 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 54123.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[10.0, 54123.0]], "isOverall": false, "label": "G9 - Q9-Aggregated", "isController": false}, {"data": [[3.0, 3235.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[3.0, 3235.0]], "isOverall": false, "label": "T3 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 75643.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[10.0, 75643.0]], "isOverall": false, "label": "G7 - Q6-Aggregated", "isController": false}, {"data": [[8.0, 8574.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[8.0, 8574.0]], "isOverall": false, "label": "G7 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 4467.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[10.0, 4467.0]], "isOverall": false, "label": "G7 - Q8-Aggregated", "isController": false}, {"data": [[7.0, 25484.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[7.0, 25484.0]], "isOverall": false, "label": "G7 - Q9-Aggregated", "isController": false}, {"data": [[5.0, 809.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[5.0, 809.0]], "isOverall": false, "label": "G7 - Q2-Aggregated", "isController": false}, {"data": [[5.0, 5458.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[5.0, 5458.0]], "isOverall": false, "label": "G7 - Q3-Aggregated", "isController": false}, {"data": [[5.0, 4601.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[5.0, 4601.0]], "isOverall": false, "label": "G7 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 4743.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[10.0, 4743.0]], "isOverall": false, "label": "G7 - Q5-Aggregated", "isController": false}, {"data": [[8.0, 41638.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[8.0, 41638.0]], "isOverall": false, "label": "G7 - Q1-Aggregated", "isController": false}, {"data": [[7.0, 27874.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[7.0, 27874.0]], "isOverall": false, "label": "T1 - Q1-Aggregated", "isController": false}, {"data": [[3.0, 3649.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[3.0, 3649.0]], "isOverall": false, "label": "T1 - Q2-Aggregated", "isController": false}, {"data": [[7.0, 7070.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[7.0, 7070.0]], "isOverall": false, "label": "T1 - Q3-Aggregated", "isController": false}, {"data": [[3.0, 5354.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[3.0, 5354.0]], "isOverall": false, "label": "T1 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 8196.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[10.0, 8196.0]], "isOverall": false, "label": "T1 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 48767.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[10.0, 48767.0]], "isOverall": false, "label": "T1 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 27863.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[10.0, 27863.0]], "isOverall": false, "label": "T1 - Q7-Aggregated", "isController": false}, {"data": [[7.0, 12639.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[7.0, 12639.0]], "isOverall": false, "label": "T1 - Q8-Aggregated", "isController": false}, {"data": [[7.0, 656473.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[7.0, 656473.0]], "isOverall": false, "label": "T1 - Q9-Aggregated", "isController": false}, {"data": [[7.0, 7253.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[7.0, 7253.0]], "isOverall": false, "label": "T4 - Q16-Aggregated", "isController": false}, {"data": [[3.0, 51790.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[3.0, 51790.0]], "isOverall": false, "label": "T4 - Q15-Aggregated", "isController": false}, {"data": [[4.0, 24438.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[4.0, 24438.0]], "isOverall": false, "label": "T4 - Q14-Aggregated", "isController": false}, {"data": [[7.0, 19586.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[7.0, 19586.0]], "isOverall": false, "label": "T4 - Q13-Aggregated", "isController": false}, {"data": [[5.0, 32271.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[5.0, 32271.0]], "isOverall": false, "label": "T4 - Q19-Aggregated", "isController": false}, {"data": [[7.0, 52599.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[7.0, 52599.0]], "isOverall": false, "label": "T4 - Q18-Aggregated", "isController": false}, {"data": [[3.0, 3056.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[3.0, 3056.0]], "isOverall": false, "label": "T4 - Q22-Aggregated", "isController": false}, {"data": [[8.0, 86411.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[8.0, 86411.0]], "isOverall": false, "label": "T4 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 66339.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[10.0, 66339.0]], "isOverall": false, "label": "T2 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 8929.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[10.0, 8929.0]], "isOverall": false, "label": "T2 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 10824.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[10.0, 10824.0]], "isOverall": false, "label": "T2 - Q2-Aggregated", "isController": false}, {"data": [[8.0, 175684.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[8.0, 175684.0]], "isOverall": false, "label": "T2 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 12203.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[10.0, 12203.0]], "isOverall": false, "label": "T2 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 16784.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[10.0, 16784.0]], "isOverall": false, "label": "T2 - Q5-Aggregated", "isController": false}, {"data": [[6.0, 82836.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[6.0, 82836.0]], "isOverall": false, "label": "T2 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 11847.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[10.0, 11847.0]], "isOverall": false, "label": "T2 - Q7-Aggregated", "isController": false}, {"data": [[5.0, 5285.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[5.0, 5285.0]], "isOverall": false, "label": "T5 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 66257.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[10.0, 66257.0]], "isOverall": false, "label": "T2 - Q6-Aggregated", "isController": false}, {"data": [[7.0, 41113.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[7.0, 41113.0]], "isOverall": false, "label": "T5 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 13516.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[10.0, 13516.0]], "isOverall": false, "label": "T5 - Q13-Aggregated", "isController": false}, {"data": [[6.0, 37297.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[6.0, 37297.0]], "isOverall": false, "label": "T5 - Q12-Aggregated", "isController": false}, {"data": [[8.0, 398298.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[8.0, 398298.0]], "isOverall": false, "label": "T5 - Q15-Aggregated", "isController": false}, {"data": [[7.0, 21306.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[7.0, 21306.0]], "isOverall": false, "label": "T5 - Q14-Aggregated", "isController": false}, {"data": [[4.0, 3923.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[4.0, 3923.0]], "isOverall": false, "label": "T5 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 68660.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[10.0, 68660.0]], "isOverall": false, "label": "T5 - Q19-Aggregated", "isController": false}, {"data": [[7.0, 73242.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[7.0, 73242.0]], "isOverall": false, "label": "T5 - Q18-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.69221804E12, "maxY": 21198.733333333334, "series": [{"data": [[1.69221816E12, 8813.3], [1.69221912E12, 18847.616666666665], [1.69221882E12, 4271.9], [1.69221852E12, 1503.2333333333333], [1.69221822E12, 148.21666666666667], [1.6922184E12, 8871.466666666667], [1.6922181E12, 31.866666666666667], [1.69221906E12, 21198.733333333334], [1.69221876E12, 385.7], [1.69221846E12, 2273.233333333333], [1.69221864E12, 80.68333333333334], [1.69221834E12, 246.86666666666667], [1.69221804E12, 486.3333333333333], [1.692219E12, 10125.05], [1.6922187E12, 157.75], [1.69221888E12, 11618.616666666667], [1.69221858E12, 2788.0833333333335], [1.69221828E12, 94.31666666666666], [1.69221894E12, 1318.15]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69221816E12, 0.0], [1.69221912E12, 0.0], [1.69221882E12, 0.0], [1.69221852E12, 0.0], [1.69221822E12, 0.0], [1.6922184E12, 0.0], [1.6922181E12, 0.0], [1.69221906E12, 0.0], [1.69221876E12, 0.0], [1.69221846E12, 0.0], [1.69221864E12, 0.0], [1.69221834E12, 0.0], [1.69221804E12, 0.0], [1.692219E12, 0.0], [1.6922187E12, 0.0], [1.69221888E12, 0.0], [1.69221858E12, 0.0], [1.69221828E12, 0.0], [1.69221894E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221912E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 9.0, "minX": 1.69221804E12, "maxY": 656473.0, "series": [{"data": [[1.69221804E12, 16689.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[1.69221864E12, 12965.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[1.69221876E12, 52744.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[1.69221858E12, 21070.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[1.69221846E12, 29347.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[1.69221834E12, 284507.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[1.69221852E12, 4173.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[1.69221858E12, 38431.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[1.6922187E12, 57726.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[1.6922181E12, 89661.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.692219E12, 19150.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.69221912E12, 70782.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.69221822E12, 50015.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69221912E12, 5619.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.692219E12, 15660.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69221906E12, 3040.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.69221906E12, 3630.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69221912E12, 4885.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69221846E12, 61730.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69221852E12, 4981.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[1.69221864E12, 37406.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[1.69221846E12, 6152.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[1.69221804E12, 20764.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[1.69221852E12, 30249.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[1.69221912E12, 3123.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.69221834E12, 15257.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69221906E12, 16206.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.6922184E12, 92507.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69221846E12, 63831.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[1.69221834E12, 2938.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[1.69221864E12, 5791.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[1.69221846E12, 8849.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[1.69221894E12, 37804.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[1.69221882E12, 6756.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[1.69221876E12, 4322.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[1.69221816E12, 11859.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69221834E12, 31120.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.69221864E12, 34620.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[1.6922181E12, 17285.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[1.69221894E12, 26179.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[1.69221888E12, 74693.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[1.69221882E12, 85167.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.6922184E12, 44460.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69221894E12, 5174.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[1.69221864E12, 517407.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[1.6922184E12, 13274.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69221876E12, 29669.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[1.69221858E12, 135910.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.69221882E12, 17930.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[1.69221834E12, 25668.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69221852E12, 7172.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[1.69221804E12, 25694.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.6922181E12, 6794.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[1.69221828E12, 58926.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.6922187E12, 42056.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[1.69221882E12, 13794.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69221822E12, 4139.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.6922187E12, 635709.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69221906E12, 4674.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69221906E12, 17307.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.6922181E12, 50769.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[1.69221912E12, 23345.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.69221906E12, 3105.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.69221906E12, 5255.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.69221804E12, 27423.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69221882E12, 21510.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.69221888E12, 37235.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69221858E12, 5856.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[1.69221828E12, 45977.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[1.69221846E12, 23810.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[1.69221852E12, 31709.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[1.69221858E12, 4548.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[1.6922184E12, 34636.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[1.69221822E12, 163950.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[1.69221858E12, 4271.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[1.69221846E12, 58767.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[1.69221804E12, 6897.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[1.69221846E12, 30975.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[1.69221816E12, 14002.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69221804E12, 23098.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69221894E12, 6970.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69221894E12, 21478.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.69221834E12, 84352.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69221816E12, 1393.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69221816E12, 9658.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69221834E12, 10132.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69221816E12, 91076.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69221816E12, 35213.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221858E12, 90682.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[1.692219E12, 3530.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69221882E12, 14146.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69221912E12, 40182.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.692219E12, 73534.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69221912E12, 17312.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.6922187E12, 99081.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[1.69221816E12, 22082.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[1.69221846E12, 37422.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[1.69221852E12, 18480.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[1.6922184E12, 80392.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[1.69221846E12, 11092.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[1.6922181E12, 47965.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[1.69221822E12, 8173.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[1.69221876E12, 6113.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[1.69221882E12, 25043.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[1.69221846E12, 8494.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[1.69221864E12, 121460.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[1.692219E12, 4039.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221888E12, 20389.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69221894E12, 80662.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[1.6922187E12, 20687.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[1.69221882E12, 31879.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[1.69221846E12, 359136.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[1.6922187E12, 36515.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[1.69221852E12, 27873.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[1.69221858E12, 4491.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[1.69221852E12, 974.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[1.69221834E12, 26753.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[1.69221852E12, 4996.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[1.69221858E12, 6804.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[1.6922181E12, 6093.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[1.69221852E12, 6014.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[1.69221834E12, 29583.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[1.69221906E12, 2447.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.6922181E12, 27783.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221876E12, 6301.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[1.69221804E12, 8620.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[1.69221906E12, 40809.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69221876E12, 2316.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[1.69221876E12, 31132.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[1.69221876E12, 5313.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[1.69221804E12, 6975.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[1.6922181E12, 38263.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[1.6922181E12, 12710.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[1.69221882E12, 5563.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[1.69221882E12, 11208.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[1.69221852E12, 72924.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[1.692219E12, 3042.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69221828E12, 15184.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69221822E12, 66778.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[1.69221828E12, 39518.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69221828E12, 37146.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.69221858E12, 16572.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[1.69221906E12, 9.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69221804E12, 18382.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[1.69221912E12, 3414.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69221816E12, 6113.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[1.69221912E12, 10841.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.6922181E12, 1135.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[1.69221804E12, 17161.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[1.692219E12, 517480.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69221834E12, 40873.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[1.69221912E12, 2585.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.692219E12, 3608.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.6922181E12, 4196.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[1.6922181E12, 17.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69221816E12, 58664.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.69221828E12, 54123.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[1.692219E12, 3235.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.6922181E12, 75643.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[1.6922187E12, 8574.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[1.6922181E12, 4467.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[1.69221876E12, 25484.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[1.692219E12, 809.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[1.69221894E12, 5458.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[1.69221894E12, 4601.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[1.6922181E12, 4743.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[1.6922187E12, 41638.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[1.69221888E12, 27874.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69221906E12, 3649.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69221894E12, 7070.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221906E12, 5354.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.6922181E12, 8196.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.6922181E12, 48767.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69221816E12, 27863.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69221888E12, 12639.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69221882E12, 656473.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69221888E12, 7253.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.69221906E12, 51790.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.692219E12, 24438.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.69221894E12, 19586.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69221894E12, 32271.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69221882E12, 52599.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69221906E12, 3056.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69221876E12, 86411.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69221822E12, 66339.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69221822E12, 8929.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69221804E12, 10824.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69221876E12, 175684.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69221828E12, 12203.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69221858E12, 16784.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69221894E12, 82836.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69221816E12, 11847.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.69221894E12, 5285.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.6922181E12, 66257.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.69221888E12, 41113.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.69221816E12, 13516.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69221894E12, 37297.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69221876E12, 398298.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69221888E12, 21306.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.692219E12, 3923.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.69221822E12, 68660.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69221882E12, 73242.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221912E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69221804E12, "maxY": 656472.0, "series": [{"data": [[1.69221804E12, 16688.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[1.69221864E12, 12965.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[1.69221876E12, 52744.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[1.69221858E12, 21069.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[1.69221846E12, 29347.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[1.69221834E12, 284507.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[1.69221852E12, 4172.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[1.69221858E12, 38431.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[1.6922187E12, 57725.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[1.6922181E12, 89661.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.692219E12, 19150.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.69221912E12, 70782.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.69221822E12, 50015.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69221912E12, 5601.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.692219E12, 15660.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69221906E12, 3032.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.69221906E12, 3630.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69221912E12, 4885.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69221846E12, 61730.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69221852E12, 4981.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[1.69221864E12, 37406.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[1.69221846E12, 6152.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[1.69221804E12, 20763.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[1.69221852E12, 30249.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[1.69221912E12, 3113.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.69221834E12, 15257.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69221906E12, 16205.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.6922184E12, 92507.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69221846E12, 63830.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[1.69221834E12, 2938.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[1.69221864E12, 5790.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[1.69221846E12, 8849.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[1.69221894E12, 37803.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[1.69221882E12, 6755.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[1.69221876E12, 4321.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[1.69221816E12, 11859.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69221834E12, 31120.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.69221864E12, 34620.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[1.6922181E12, 17285.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[1.69221894E12, 26179.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[1.69221888E12, 74693.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[1.69221882E12, 85167.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.6922184E12, 44460.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69221894E12, 5173.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[1.69221864E12, 517407.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[1.6922184E12, 13254.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69221876E12, 29669.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[1.69221858E12, 135910.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.69221882E12, 17930.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[1.69221834E12, 25668.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69221852E12, 7172.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[1.69221804E12, 25694.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.6922181E12, 6794.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[1.69221828E12, 58925.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.6922187E12, 42056.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[1.69221882E12, 13785.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69221822E12, 4139.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.6922187E12, 635709.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69221906E12, 4674.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69221906E12, 17307.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.6922181E12, 50768.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[1.69221912E12, 23344.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.69221906E12, 3105.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.69221906E12, 5255.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.69221804E12, 27421.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69221882E12, 21509.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.69221888E12, 37235.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69221858E12, 5856.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[1.69221828E12, 45977.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[1.69221846E12, 23810.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[1.69221852E12, 31709.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[1.69221858E12, 4548.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[1.6922184E12, 34636.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[1.69221822E12, 163950.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[1.69221858E12, 4269.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[1.69221846E12, 58767.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[1.69221804E12, 6897.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[1.69221846E12, 30975.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[1.69221816E12, 14001.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69221804E12, 23098.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69221894E12, 6970.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69221894E12, 21478.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.69221834E12, 84351.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69221816E12, 1393.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69221816E12, 9658.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69221834E12, 10132.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69221816E12, 91074.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69221816E12, 35165.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221858E12, 90682.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[1.692219E12, 3530.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69221882E12, 14146.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69221912E12, 40182.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.692219E12, 73534.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69221912E12, 17312.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.6922187E12, 99080.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[1.69221816E12, 22082.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[1.69221846E12, 37422.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[1.69221852E12, 18480.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[1.6922184E12, 80392.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[1.69221846E12, 11091.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[1.6922181E12, 47965.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[1.69221822E12, 8172.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[1.69221876E12, 6113.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[1.69221882E12, 25043.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[1.69221846E12, 8493.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[1.69221864E12, 121460.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[1.692219E12, 4039.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221888E12, 20389.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69221894E12, 80662.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[1.6922187E12, 20687.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[1.69221882E12, 31878.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[1.69221846E12, 359135.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[1.6922187E12, 36515.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[1.69221852E12, 27873.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[1.69221858E12, 4490.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[1.69221852E12, 974.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[1.69221834E12, 26752.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[1.69221852E12, 4996.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[1.69221858E12, 6803.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[1.6922181E12, 6093.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[1.69221852E12, 6014.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[1.69221834E12, 29583.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[1.69221906E12, 2436.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.6922181E12, 27783.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221876E12, 6301.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[1.69221804E12, 8617.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[1.69221906E12, 40808.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69221876E12, 2316.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[1.69221876E12, 31131.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[1.69221876E12, 5313.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[1.69221804E12, 6973.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[1.6922181E12, 38262.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[1.6922181E12, 12710.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[1.69221882E12, 5562.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[1.69221882E12, 11208.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[1.69221852E12, 72923.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[1.692219E12, 3037.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69221828E12, 15184.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69221822E12, 66778.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[1.69221828E12, 39518.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69221828E12, 37146.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.69221858E12, 16572.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[1.69221906E12, 9.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69221804E12, 18382.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[1.69221912E12, 3414.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69221816E12, 6113.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[1.69221912E12, 10840.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.6922181E12, 1135.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[1.69221804E12, 17160.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[1.692219E12, 517480.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69221834E12, 40872.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[1.69221912E12, 2584.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.692219E12, 3607.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.6922181E12, 4196.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69221816E12, 58663.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.69221828E12, 54122.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[1.692219E12, 3234.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.6922181E12, 75643.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[1.6922187E12, 8573.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[1.6922181E12, 4467.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[1.69221876E12, 25484.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[1.692219E12, 808.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[1.69221894E12, 5457.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[1.69221894E12, 4601.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[1.6922181E12, 4743.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[1.6922187E12, 41638.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[1.69221888E12, 27874.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69221906E12, 3648.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69221894E12, 7069.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221906E12, 5354.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.6922181E12, 8196.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.6922181E12, 48767.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69221816E12, 27863.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69221888E12, 12639.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69221882E12, 656472.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69221888E12, 7241.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.69221906E12, 51790.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.692219E12, 24437.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.69221894E12, 19586.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69221894E12, 32271.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69221882E12, 52598.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69221906E12, 3056.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69221876E12, 86410.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69221822E12, 66339.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69221822E12, 8928.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69221804E12, 10820.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69221876E12, 175683.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69221828E12, 12203.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69221858E12, 16784.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69221894E12, 82836.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69221816E12, 11847.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.69221894E12, 5285.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.6922181E12, 66257.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.69221888E12, 41113.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.69221816E12, 13515.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69221894E12, 37297.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69221876E12, 398298.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69221888E12, 21306.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.692219E12, 3916.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.69221822E12, 68660.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69221882E12, 73241.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221912E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69221804E12, "maxY": 1123.0, "series": [{"data": [[1.69221804E12, 0.0]], "isOverall": false, "label": "G6 - Q10", "isController": false}, {"data": [[1.69221864E12, 0.0]], "isOverall": false, "label": "G6 - Q11", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "G6 - Q12", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "G6 - Q13", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G6 - Q14", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "G6 - Q15", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G6 - Q16", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "G6 - Q18", "isController": false}, {"data": [[1.6922187E12, 0.0]], "isOverall": false, "label": "G6 - Q19", "isController": false}, {"data": [[1.6922181E12, 854.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.69221822E12, 0.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.69221906E12, 1.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G6 - Q5", "isController": false}, {"data": [[1.69221864E12, 0.0]], "isOverall": false, "label": "G6 - Q6", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G6 - Q7", "isController": false}, {"data": [[1.69221804E12, 1086.0]], "isOverall": false, "label": "G6 - Q8", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G6 - Q9", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.6922184E12, 0.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G6 - Q1", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "G6 - Q2", "isController": false}, {"data": [[1.69221864E12, 0.0]], "isOverall": false, "label": "G6 - Q3", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G6 - Q4", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "G7 - Q12", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "G7 - Q11", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "G7 - Q10", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.69221864E12, 0.0]], "isOverall": false, "label": "G6 - Q21", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "G6 - Q22", "isController": false}, {"data": [[1.69221894E12, 1.0]], "isOverall": false, "label": "G7 - Q19", "isController": false}, {"data": [[1.69221888E12, 0.0]], "isOverall": false, "label": "G7 - Q18", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.6922184E12, 0.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "G7 - Q16", "isController": false}, {"data": [[1.69221864E12, 0.0]], "isOverall": false, "label": "G7 - Q15", "isController": false}, {"data": [[1.6922184E12, 0.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "G7 - Q14", "isController": false}, {"data": [[1.69221858E12, 1.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "G7 - Q13", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G10 - Q22", "isController": false}, {"data": [[1.69221804E12, 1002.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.6922181E12, 1.0]], "isOverall": false, "label": "G7 - Q22", "isController": false}, {"data": [[1.69221828E12, 0.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.6922187E12, 0.0]], "isOverall": false, "label": "G7 - Q21", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69221822E12, 0.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.6922187E12, 0.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.6922181E12, 1123.0]], "isOverall": false, "label": "G10 - Q21", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.69221804E12, 749.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.69221888E12, 0.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "G10 - Q11", "isController": false}, {"data": [[1.69221828E12, 0.0]], "isOverall": false, "label": "G10 - Q12", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G10 - Q13", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G10 - Q14", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "G10 - Q10", "isController": false}, {"data": [[1.6922184E12, 0.0]], "isOverall": false, "label": "G10 - Q19", "isController": false}, {"data": [[1.69221822E12, 0.0]], "isOverall": false, "label": "G10 - Q15", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "G10 - Q16", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G10 - Q18", "isController": false}, {"data": [[1.69221804E12, 0.0]], "isOverall": false, "label": "G9 - Q22", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G9 - Q21", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69221804E12, 932.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69221816E12, 1.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69221816E12, 1.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "G9 - Q19", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.6922187E12, 0.0]], "isOverall": false, "label": "G9 - Q14", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "G9 - Q13", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G9 - Q12", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G9 - Q11", "isController": false}, {"data": [[1.6922184E12, 0.0]], "isOverall": false, "label": "G9 - Q18", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G9 - Q16", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "G9 - Q15", "isController": false}, {"data": [[1.69221822E12, 0.0]], "isOverall": false, "label": "G9 - Q10", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "G8 - Q22", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "G8 - Q21", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G8 - Q16", "isController": false}, {"data": [[1.69221864E12, 0.0]], "isOverall": false, "label": "G8 - Q19", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221888E12, 0.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "G8 - Q18", "isController": false}, {"data": [[1.6922187E12, 0.0]], "isOverall": false, "label": "G8 - Q13", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "G8 - Q12", "isController": false}, {"data": [[1.69221846E12, 0.0]], "isOverall": false, "label": "G8 - Q15", "isController": false}, {"data": [[1.6922187E12, 0.0]], "isOverall": false, "label": "G8 - Q14", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G10 - Q1", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "G10 - Q3", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G10 - Q2", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "G10 - Q9", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G10 - Q8", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "G10 - Q5", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "G10 - Q4", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G10 - Q7", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "G10 - Q6", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "G8 - Q11", "isController": false}, {"data": [[1.69221804E12, 1024.0]], "isOverall": false, "label": "G8 - Q10", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69221876E12, 1.0]], "isOverall": false, "label": "G8 - Q2", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "G8 - Q1", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "G8 - Q4", "isController": false}, {"data": [[1.69221804E12, 0.0]], "isOverall": false, "label": "G8 - Q3", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "G8 - Q6", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "G8 - Q5", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "G8 - Q8", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "G8 - Q7", "isController": false}, {"data": [[1.69221852E12, 0.0]], "isOverall": false, "label": "G8 - Q9", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69221828E12, 0.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69221822E12, 0.0]], "isOverall": false, "label": "G9 - Q6", "isController": false}, {"data": [[1.69221828E12, 0.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69221828E12, 1.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "G9 - Q7", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69221804E12, 1036.0]], "isOverall": false, "label": "G9 - Q4", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "G9 - Q5", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "G9 - Q2", "isController": false}, {"data": [[1.69221804E12, 0.0]], "isOverall": false, "label": "G9 - Q3", "isController": false}, {"data": [[1.692219E12, 1.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69221834E12, 0.0]], "isOverall": false, "label": "G9 - Q1", "isController": false}, {"data": [[1.69221912E12, 0.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "G9 - Q8", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.69221828E12, 0.0]], "isOverall": false, "label": "G9 - Q9", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.6922181E12, 969.0]], "isOverall": false, "label": "G7 - Q6", "isController": false}, {"data": [[1.6922187E12, 0.0]], "isOverall": false, "label": "G7 - Q7", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "G7 - Q8", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "G7 - Q9", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "G7 - Q2", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "G7 - Q3", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "G7 - Q4", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "G7 - Q5", "isController": false}, {"data": [[1.6922187E12, 0.0]], "isOverall": false, "label": "G7 - Q1", "isController": false}, {"data": [[1.69221888E12, 0.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.6922181E12, 979.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69221888E12, 0.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69221888E12, 0.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.69221906E12, 0.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69221906E12, 1.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69221822E12, 0.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69221822E12, 0.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69221804E12, 0.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69221828E12, 0.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69221858E12, 0.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.6922181E12, 0.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.69221888E12, 0.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.69221816E12, 0.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69221888E12, 0.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.69221822E12, 0.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221912E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 9.0, "minX": 1.69221804E12, "maxY": 656473.0, "series": [{"data": [[1.69221816E12, 91076.0], [1.69221912E12, 70782.0], [1.69221882E12, 656473.0], [1.69221852E12, 72924.0], [1.69221822E12, 163950.0], [1.6922184E12, 92507.0], [1.6922181E12, 89661.0], [1.69221906E12, 51790.0], [1.69221876E12, 398298.0], [1.69221846E12, 359136.0], [1.69221864E12, 517407.0], [1.69221834E12, 284507.0], [1.69221804E12, 27423.0], [1.692219E12, 517480.0], [1.6922187E12, 635709.0], [1.69221888E12, 74693.0], [1.69221858E12, 135910.0], [1.69221828E12, 58926.0], [1.69221894E12, 82836.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69221816E12, 81352.40000000004], [1.69221912E12, 67722.00000000001], [1.69221882E12, 427950.5999999998], [1.69221852E12, 64681.00000000003], [1.69221822E12, 163950.0], [1.6922184E12, 92507.0], [1.6922181E12, 78446.59999999999], [1.69221906E12, 46299.5], [1.69221876E12, 331513.8000000003], [1.69221846E12, 270544.50000000035], [1.69221864E12, 517407.0], [1.69221834E12, 264491.50000000006], [1.69221804E12, 27077.2], [1.692219E12, 384296.2000000005], [1.6922187E12, 635709.0], [1.69221888E12, 74693.0], [1.69221858E12, 126864.40000000002], [1.69221828E12, 58926.0], [1.69221894E12, 81749.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69221816E12, 91076.0], [1.69221912E12, 70782.0], [1.69221882E12, 656473.0], [1.69221852E12, 72924.0], [1.69221822E12, 163950.0], [1.6922184E12, 92507.0], [1.6922181E12, 89661.0], [1.69221906E12, 51790.0], [1.69221876E12, 398298.0], [1.69221846E12, 359136.0], [1.69221864E12, 517407.0], [1.69221834E12, 284507.0], [1.69221804E12, 27423.0], [1.692219E12, 517480.0], [1.6922187E12, 635709.0], [1.69221888E12, 74693.0], [1.69221858E12, 135910.0], [1.69221828E12, 58926.0], [1.69221894E12, 82836.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69221816E12, 91076.0], [1.69221912E12, 70782.0], [1.69221882E12, 656473.0], [1.69221852E12, 72924.0], [1.69221822E12, 163950.0], [1.6922184E12, 92507.0], [1.6922181E12, 89661.0], [1.69221906E12, 51790.0], [1.69221876E12, 398298.0], [1.69221846E12, 359136.0], [1.69221864E12, 517407.0], [1.69221834E12, 284507.0], [1.69221804E12, 27423.0], [1.692219E12, 517480.0], [1.6922187E12, 635709.0], [1.69221888E12, 74693.0], [1.69221858E12, 135910.0], [1.69221828E12, 58926.0], [1.69221894E12, 82836.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69221816E12, 1393.0], [1.69221912E12, 2585.0], [1.69221882E12, 5563.0], [1.69221852E12, 974.0], [1.69221822E12, 4139.0], [1.6922184E12, 13274.0], [1.6922181E12, 1135.0], [1.69221906E12, 9.0], [1.69221876E12, 2316.0], [1.69221846E12, 6152.0], [1.69221864E12, 5791.0], [1.69221834E12, 2938.0], [1.69221804E12, 6897.0], [1.692219E12, 809.0], [1.6922187E12, 8574.0], [1.69221888E12, 7253.0], [1.69221858E12, 4271.0], [1.69221828E12, 12203.0], [1.69221894E12, 4601.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69221816E12, 13759.0], [1.69221912E12, 8230.0], [1.69221882E12, 21510.0], [1.69221852E12, 7172.0], [1.69221822E12, 58177.0], [1.6922184E12, 44460.0], [1.6922181E12, 17285.0], [1.69221906E12, 4161.5], [1.69221876E12, 27576.5], [1.69221846E12, 30161.0], [1.69221864E12, 36013.0], [1.69221834E12, 28168.0], [1.69221804E12, 17161.0], [1.692219E12, 3981.0], [1.6922187E12, 41847.0], [1.69221888E12, 24590.0], [1.69221858E12, 16572.0], [1.69221828E12, 39518.0], [1.69221894E12, 20532.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221912E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 17.0, "minX": 1.0, "maxY": 29347.0, "series": [{"data": [[1.0, 18156.0], [2.0, 29347.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 17.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 29347.0, "series": [{"data": [[1.0, 18156.0], [2.0, 29347.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.69221804E12, "maxY": 0.35, "series": [{"data": [[1.69221816E12, 0.2], [1.69221912E12, 0.11666666666666667], [1.69221882E12, 0.21666666666666667], [1.69221852E12, 0.18333333333333332], [1.69221822E12, 0.13333333333333333], [1.6922184E12, 0.08333333333333333], [1.6922181E12, 0.3], [1.69221906E12, 0.23333333333333334], [1.69221876E12, 0.18333333333333332], [1.69221846E12, 0.2], [1.69221864E12, 0.1], [1.69221834E12, 0.16666666666666666], [1.69221804E12, 0.35], [1.692219E12, 0.16666666666666666], [1.6922187E12, 0.11666666666666667], [1.69221888E12, 0.13333333333333333], [1.69221858E12, 0.16666666666666666], [1.69221828E12, 0.11666666666666667], [1.69221894E12, 0.2]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221912E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69221804E12, "maxY": 0.2833333333333333, "series": [{"data": [[1.69221816E12, 0.2], [1.69221912E12, 0.16666666666666666], [1.69221882E12, 0.21666666666666667], [1.69221852E12, 0.18333333333333332], [1.69221822E12, 0.13333333333333333], [1.6922184E12, 0.08333333333333333], [1.6922181E12, 0.2833333333333333], [1.69221906E12, 0.23333333333333334], [1.69221876E12, 0.2], [1.69221846E12, 0.2], [1.69221864E12, 0.1], [1.69221834E12, 0.16666666666666666], [1.69221804E12, 0.18333333333333332], [1.692219E12, 0.2], [1.6922187E12, 0.13333333333333333], [1.69221888E12, 0.13333333333333333], [1.69221858E12, 0.18333333333333332], [1.69221828E12, 0.11666666666666667], [1.69221894E12, 0.23333333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "23505 0", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69221912E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69221804E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q2-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q11-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q3-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q15-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q13-success", "isController": false}, {"data": [[1.6922184E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q19-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q10-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q21-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q16-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q14-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q5-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q12-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q19-success", "isController": false}, {"data": [[1.6922187E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q13-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q14-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q3-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q18-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q7-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q19-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q7-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q22-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q21-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q5-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q7-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q5-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q5-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q14-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q3-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q12-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q13-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q8-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q16-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF1-failure", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q15-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q2-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q4-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q16-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q22-success", "isController": false}, {"data": [[1.6922184E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q16-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q2-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q2-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q8-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF2-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q8-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q6-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q6-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q15-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q12-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q19-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q16-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q21-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q14-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q8-success", "isController": false}, {"data": [[1.69221828E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q8-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q2-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q1-success", "isController": false}, {"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q1-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q5-success", "isController": false}, {"data": [[1.69221888E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q14-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q11-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q5-success", "isController": false}, {"data": [[1.69221828E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q7-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q3-success", "isController": false}, {"data": [[1.69221828E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q9-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q21-success", "isController": false}, {"data": [[1.6922187E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q7-success", "isController": false}, {"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q9-success", "isController": false}, {"data": [[1.69221864E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q19-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q5-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q19-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q16-success", "isController": false}, {"data": [[1.69221888E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q21-success", "isController": false}, {"data": [[1.6922187E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q14-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q2-success", "isController": false}, {"data": [[1.69221828E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q12-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q18-success", "isController": false}, {"data": [[1.6922187E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q19-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q11-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q11-success", "isController": false}, {"data": [[1.6922187E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q9-success", "isController": false}, {"data": [[1.69221888E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q8-success", "isController": false}, {"data": [[1.69221822E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q14-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q1-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q1-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q11-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q4-success", "isController": false}, {"data": [[1.69221864E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q11-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q2-success", "isController": false}, {"data": [[1.6922187E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q14-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q4-success", "isController": false}, {"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q8-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q11-success", "isController": false}, {"data": [[1.69221822E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q15-success", "isController": false}, {"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q14-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q6-success", "isController": false}, {"data": [[1.69221822E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q6-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q12-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q4-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q11-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q18-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q22-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q18-success", "isController": false}, {"data": [[1.6922187E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q1-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q9-success", "isController": false}, {"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q21-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q9-success", "isController": false}, {"data": [[1.69221888E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q1-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q19-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q16-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q3-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q21-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q3-success", "isController": false}, {"data": [[1.69221822E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q3-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q10-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q7-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q11-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q7-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q14-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q7-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q15-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q4-success", "isController": false}, {"data": [[1.69221864E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q3-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q16-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q4-success", "isController": false}, {"data": [[1.69221864E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q21-success", "isController": false}, {"data": [[1.69221822E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q19-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q9-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q9-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q10-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q13-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q10-success", "isController": false}, {"data": [[1.6922187E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q21-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q4-success", "isController": false}, {"data": [[1.6922184E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q12-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q19-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q6-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q13-success", "isController": false}, {"data": [[1.69221828E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q12-success", "isController": false}, {"data": [[1.69221864E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q6-success", "isController": false}, {"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q6-success", "isController": false}, {"data": [[1.69221888E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q21-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q6-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q11-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q3-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q5-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q13-success", "isController": false}, {"data": [[1.69221822E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q10-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q22-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q2-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q13-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q18-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q9-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q22-success", "isController": false}, {"data": [[1.69221888E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q18-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q12-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q12-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q15-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q12-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q15-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q3-success", "isController": false}, {"data": [[1.69221822E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q1-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q5-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q9-success", "isController": false}, {"data": [[1.69221888E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q1-success", "isController": false}, {"data": [[1.69221888E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q16-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q13-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q13-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q7-success", "isController": false}, {"data": [[1.69221858E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q16-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q10-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q5-success", "isController": false}, {"data": [[1.69221828E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q10-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q22-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q22-success", "isController": false}, {"data": [[1.69221864E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q15-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q15-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q2-success", "isController": false}, {"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q18-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q1-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q7-success", "isController": false}, {"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q1-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q9-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q22-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q10-success", "isController": false}, {"data": [[1.6922184E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q18-success", "isController": false}, {"data": [[1.69221816E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q13-success", "isController": false}, {"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q10-success", "isController": false}, {"data": [[1.6922184E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q18-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q4-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q22-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q6-success", "isController": false}, {"data": [[1.69221822E12, 0.016666666666666666]], "isOverall": false, "label": "G9 - Q10-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q2-success", "isController": false}, {"data": [[1.69221828E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q8-success", "isController": false}, {"data": [[1.69221852E12, 0.016666666666666666]], "isOverall": false, "label": "G10 - Q8-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q8-success", "isController": false}, {"data": [[1.69221834E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q15-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "G7 - Q6-success", "isController": false}, {"data": [[1.69221912E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q22-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "G8 - Q18-success", "isController": false}, {"data": [[1.69221846E12, 0.016666666666666666]], "isOverall": false, "label": "G6 - Q4-success", "isController": false}, {"data": [[1.69221906E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221912E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69221804E12, "maxY": 0.2833333333333333, "series": [{"data": [[1.69221816E12, 0.2], [1.69221912E12, 0.16666666666666666], [1.69221882E12, 0.21666666666666667], [1.69221852E12, 0.18333333333333332], [1.69221822E12, 0.13333333333333333], [1.6922184E12, 0.08333333333333333], [1.6922181E12, 0.2833333333333333], [1.69221906E12, 0.23333333333333334], [1.69221876E12, 0.2], [1.69221846E12, 0.2], [1.69221864E12, 0.1], [1.69221834E12, 0.16666666666666666], [1.69221804E12, 0.18333333333333332], [1.692219E12, 0.2], [1.6922187E12, 0.13333333333333333], [1.69221888E12, 0.13333333333333333], [1.69221858E12, 0.18333333333333332], [1.69221828E12, 0.11666666666666667], [1.69221894E12, 0.23333333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.6922181E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69221912E12, "title": "Total Transactions Per Second"}},
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
