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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[5100.0, 1.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[7600.0, 1.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[7400.0, 1.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[10900.0, 1.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[18800.0, 1.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[10300.0, 1.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[6400.0, 1.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[9800.0, 1.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[4100.0, 1.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[8400.0, 1.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[2300.0, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[3500.0, 1.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[3800.0, 1.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[4400.0, 1.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[15200.0, 1.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[7200.0, 1.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[13800.0, 1.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[3700.0, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[7300.0, 1.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[15600.0, 1.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[6000.0, 1.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[11700.0, 1.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 18800.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 29.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 88.0, "series": [{"data": [[0.0, 29.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 88.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 85.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69220304E12, "maxY": 1.0, "series": [{"data": [[1.69220304E12, 1.0], [1.6922031E12, 1.0]], "isOverall": false, "label": "T4", "isController": false}, {"data": [[1.69220304E12, 1.0], [1.6922031E12, 1.0]], "isOverall": false, "label": "T5", "isController": false}, {"data": [[1.69220304E12, 1.0], [1.6922031E12, 1.0]], "isOverall": false, "label": "T10", "isController": false}, {"data": [[1.69220304E12, 1.0], [1.6922031E12, 1.0]], "isOverall": false, "label": "T6", "isController": false}, {"data": [[1.69220304E12, 1.0], [1.6922031E12, 1.0]], "isOverall": false, "label": "T7", "isController": false}, {"data": [[1.69220304E12, 1.0], [1.6922031E12, 1.0]], "isOverall": false, "label": "T8", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T9", "isController": false}, {"data": [[1.69220304E12, 1.0], [1.6922031E12, 1.0]], "isOverall": false, "label": "T1", "isController": false}, {"data": [[1.69220304E12, 1.0], [1.6922031E12, 1.0]], "isOverall": false, "label": "T2", "isController": false}, {"data": [[1.69220304E12, 1.0], [1.6922031E12, 1.0]], "isOverall": false, "label": "T3", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6922031E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 6.0, "minX": 1.0, "maxY": 18832.0, "series": [{"data": [[10.0, 5195.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[10.0, 5195.0]], "isOverall": false, "label": "T9 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 767.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[10.0, 767.0]], "isOverall": false, "label": "T9 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 867.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[10.0, 867.0]], "isOverall": false, "label": "T9 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 4091.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[10.0, 4091.0]], "isOverall": false, "label": "T10 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 597.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[10.0, 597.0]], "isOverall": false, "label": "T10 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 454.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[10.0, 454.0]], "isOverall": false, "label": "T10 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 1529.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[10.0, 1529.0]], "isOverall": false, "label": "T9 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 383.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[10.0, 383.0]], "isOverall": false, "label": "T9 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 516.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[10.0, 516.0]], "isOverall": false, "label": "T10 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 1846.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[10.0, 1846.0]], "isOverall": false, "label": "T10 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 1323.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[10.0, 1323.0]], "isOverall": false, "label": "T9 - Q14-Aggregated", "isController": false}, {"data": [[9.0, 2191.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[9.0, 2191.0]], "isOverall": false, "label": "T10 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 1071.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[10.0, 1071.0]], "isOverall": false, "label": "T9 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 1499.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[10.0, 1499.0]], "isOverall": false, "label": "T10 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 1345.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[10.0, 1345.0]], "isOverall": false, "label": "T9 - Q12-Aggregated", "isController": false}, {"data": [[9.0, 3397.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[9.0, 3397.0]], "isOverall": false, "label": "T10 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 506.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[10.0, 506.0]], "isOverall": false, "label": "T10 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 1597.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[10.0, 1597.0]], "isOverall": false, "label": "T9 - Q13-Aggregated", "isController": false}, {"data": [[2.0, 658.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[2.0, 658.0]], "isOverall": false, "label": "T3 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 7682.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[10.0, 7682.0]], "isOverall": false, "label": "T3 - Q18-Aggregated", "isController": false}, {"data": [[9.0, 3971.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[9.0, 3971.0]], "isOverall": false, "label": "T3 - Q15-Aggregated", "isController": false}, {"data": [[9.0, 848.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[9.0, 848.0]], "isOverall": false, "label": "T3 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 2174.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[10.0, 2174.0]], "isOverall": false, "label": "T3 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 2914.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[10.0, 2914.0]], "isOverall": false, "label": "T9 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 366.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[10.0, 366.0]], "isOverall": false, "label": "T9 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 808.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[10.0, 808.0]], "isOverall": false, "label": "T10 - Q21-Aggregated", "isController": false}, {"data": [[9.0, 703.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[9.0, 703.0]], "isOverall": false, "label": "T10 - Q22-Aggregated", "isController": false}, {"data": [[5.0, 1182.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[5.0, 1182.0]], "isOverall": false, "label": "T4 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 3026.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[10.0, 3026.0]], "isOverall": false, "label": "T4 - Q11-Aggregated", "isController": false}, {"data": [[6.0, 1405.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[6.0, 1405.0]], "isOverall": false, "label": "T4 - Q10-Aggregated", "isController": false}, {"data": [[3.0, 422.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[3.0, 422.0]], "isOverall": false, "label": "T3 - Q22-Aggregated", "isController": false}, {"data": [[3.0, 928.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[3.0, 928.0]], "isOverall": false, "label": "T3 - Q21-Aggregated", "isController": false}, {"data": [[8.0, 1036.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[8.0, 1036.0]], "isOverall": false, "label": "T8 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 954.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[10.0, 954.0]], "isOverall": false, "label": "T8 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 3352.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[10.0, 3352.0]], "isOverall": false, "label": "T6 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 1158.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[10.0, 1158.0]], "isOverall": false, "label": "T6 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 3844.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[10.0, 3844.0]], "isOverall": false, "label": "T3 - Q11-Aggregated", "isController": false}, {"data": [[4.0, 4339.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[4.0, 4339.0]], "isOverall": false, "label": "T6 - Q1-Aggregated", "isController": false}, {"data": [[3.0, 714.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[3.0, 714.0]], "isOverall": false, "label": "T3 - Q10-Aggregated", "isController": false}, {"data": [[9.0, 1497.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[9.0, 1497.0]], "isOverall": false, "label": "T6 - Q3-Aggregated", "isController": false}, {"data": [[4.0, 1215.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[4.0, 1215.0]], "isOverall": false, "label": "T3 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 1477.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[10.0, 1477.0]], "isOverall": false, "label": "T6 - Q2-Aggregated", "isController": false}, {"data": [[3.0, 934.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[3.0, 934.0]], "isOverall": false, "label": "T3 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 1762.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[10.0, 1762.0]], "isOverall": false, "label": "T6 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 1105.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[10.0, 1105.0]], "isOverall": false, "label": "T6 - Q4-Aggregated", "isController": false}, {"data": [[5.0, 807.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[5.0, 807.0]], "isOverall": false, "label": "T6 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 906.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[10.0, 906.0]], "isOverall": false, "label": "T6 - Q6-Aggregated", "isController": false}, {"data": [[9.0, 2096.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[9.0, 2096.0]], "isOverall": false, "label": "T8 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 3268.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[9.0, 3268.0]], "isOverall": false, "label": "T8 - Q14-Aggregated", "isController": false}, {"data": [[7.0, 1573.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[7.0, 1573.0]], "isOverall": false, "label": "T8 - Q15-Aggregated", "isController": false}, {"data": [[9.0, 788.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[9.0, 788.0]], "isOverall": false, "label": "T8 - Q16-Aggregated", "isController": false}, {"data": [[3.0, 462.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[3.0, 462.0]], "isOverall": false, "label": "T2 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 2404.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[10.0, 2404.0]], "isOverall": false, "label": "T2 - Q21-Aggregated", "isController": false}, {"data": [[8.0, 1400.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[8.0, 1400.0]], "isOverall": false, "label": "T8 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 612.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[10.0, 612.0]], "isOverall": false, "label": "T8 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 3317.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[10.0, 3317.0]], "isOverall": false, "label": "T8 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 3906.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[10.0, 3906.0]], "isOverall": false, "label": "T8 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 2174.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[10.0, 2174.0]], "isOverall": false, "label": "T8 - Q19-Aggregated", "isController": false}, {"data": [[3.0, 680.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[3.0, 680.0]], "isOverall": false, "label": "T2 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 7441.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[10.0, 7441.0]], "isOverall": false, "label": "T2 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 1433.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[10.0, 1433.0]], "isOverall": false, "label": "T2 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 2837.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[10.0, 2837.0]], "isOverall": false, "label": "T2 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 1245.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[10.0, 1245.0]], "isOverall": false, "label": "T2 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 3777.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[10.0, 3777.0]], "isOverall": false, "label": "T2 - Q13-Aggregated", "isController": false}, {"data": [[4.0, 1156.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[4.0, 1156.0]], "isOverall": false, "label": "T2 - Q12-Aggregated", "isController": false}, {"data": [[3.0, 208.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[3.0, 208.0]], "isOverall": false, "label": "T2 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 10984.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[10.0, 10984.0]], "isOverall": false, "label": "T4 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 2416.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[10.0, 2416.0]], "isOverall": false, "label": "T2 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 2545.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[10.0, 2545.0]], "isOverall": false, "label": "T4 - Q8-Aggregated", "isController": false}, {"data": [[4.0, 653.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[4.0, 653.0]], "isOverall": false, "label": "T4 - Q7-Aggregated", "isController": false}, {"data": [[3.0, 489.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[3.0, 489.0]], "isOverall": false, "label": "T4 - Q6-Aggregated", "isController": false}, {"data": [[7.0, 634.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[7.0, 634.0]], "isOverall": false, "label": "T4 - Q5-Aggregated", "isController": false}, {"data": [[5.0, 302.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[5.0, 302.0]], "isOverall": false, "label": "T4 - Q4-Aggregated", "isController": false}, {"data": [[3.0, 466.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[3.0, 466.0]], "isOverall": false, "label": "T4 - Q3-Aggregated", "isController": false}, {"data": [[3.0, 482.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[3.0, 482.0]], "isOverall": false, "label": "T4 - Q2-Aggregated", "isController": false}, {"data": [[7.0, 18832.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[7.0, 18832.0]], "isOverall": false, "label": "T4 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 522.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[10.0, 522.0]], "isOverall": false, "label": "T10 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 1861.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[10.0, 1861.0]], "isOverall": false, "label": "T10 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 1421.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[10.0, 1421.0]], "isOverall": false, "label": "T10 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 719.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[10.0, 719.0]], "isOverall": false, "label": "T10 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 10385.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[10.0, 10385.0]], "isOverall": false, "label": "T10 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 718.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[10.0, 718.0]], "isOverall": false, "label": "T10 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 660.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[10.0, 660.0]], "isOverall": false, "label": "T10 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 1265.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[10.0, 1265.0]], "isOverall": false, "label": "T10 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 2098.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[10.0, 2098.0]], "isOverall": false, "label": "T10 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 1934.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[10.0, 1934.0]], "isOverall": false, "label": "T5 - Q3-Aggregated", "isController": false}, {"data": [[9.0, 1188.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[9.0, 1188.0]], "isOverall": false, "label": "T5 - Q4-Aggregated", "isController": false}, {"data": [[9.0, 332.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[9.0, 332.0]], "isOverall": false, "label": "T5 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 6426.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[10.0, 6426.0]], "isOverall": false, "label": "T5 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 9865.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[10.0, 9865.0]], "isOverall": false, "label": "T5 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 514.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[10.0, 514.0]], "isOverall": false, "label": "T5 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 1605.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[10.0, 1605.0]], "isOverall": false, "label": "T5 - Q7-Aggregated", "isController": false}, {"data": [[9.0, 1299.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[9.0, 1299.0]], "isOverall": false, "label": "T5 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 1462.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[10.0, 1462.0]], "isOverall": false, "label": "T5 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 2823.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[10.0, 2823.0]], "isOverall": false, "label": "T6 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 953.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[10.0, 953.0]], "isOverall": false, "label": "T9 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 4122.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[10.0, 4122.0]], "isOverall": false, "label": "T9 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 1442.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[10.0, 1442.0]], "isOverall": false, "label": "T6 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 4806.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[10.0, 4806.0]], "isOverall": false, "label": "T9 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 631.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[10.0, 631.0]], "isOverall": false, "label": "T9 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 707.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[10.0, 707.0]], "isOverall": false, "label": "T9 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 754.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[10.0, 754.0]], "isOverall": false, "label": "T9 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 264.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[10.0, 264.0]], "isOverall": false, "label": "T9 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 849.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[10.0, 849.0]], "isOverall": false, "label": "T9 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 861.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[10.0, 861.0]], "isOverall": false, "label": "T9 - Q3-Aggregated", "isController": false}, {"data": [[6.0, 280.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[6.0, 280.0]], "isOverall": false, "label": "T6 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 1601.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[10.0, 1601.0]], "isOverall": false, "label": "T6 - Q12-Aggregated", "isController": false}, {"data": [[7.0, 2567.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[7.0, 2567.0]], "isOverall": false, "label": "T6 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 1587.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[10.0, 1587.0]], "isOverall": false, "label": "T6 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 6116.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[10.0, 6116.0]], "isOverall": false, "label": "T6 - Q15-Aggregated", "isController": false}, {"data": [[8.0, 1132.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[8.0, 1132.0]], "isOverall": false, "label": "T6 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 8484.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[10.0, 8484.0]], "isOverall": false, "label": "T6 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 918.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[10.0, 918.0]], "isOverall": false, "label": "T1 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 2375.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[10.0, 2375.0]], "isOverall": false, "label": "T1 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 2993.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[10.0, 2993.0]], "isOverall": false, "label": "T1 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 1756.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[9.0, 1756.0]], "isOverall": false, "label": "T1 - Q12-Aggregated", "isController": false}, {"data": [[7.0, 3516.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[7.0, 3516.0]], "isOverall": false, "label": "T1 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 3704.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[10.0, 3704.0]], "isOverall": false, "label": "T1 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 1504.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[10.0, 1504.0]], "isOverall": false, "label": "T6 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 416.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[10.0, 416.0]], "isOverall": false, "label": "T1 - Q22-Aggregated", "isController": false}, {"data": [[6.0, 1229.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[6.0, 1229.0]], "isOverall": false, "label": "T1 - Q21-Aggregated", "isController": false}, {"data": [[9.0, 1763.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[9.0, 1763.0]], "isOverall": false, "label": "T7 - Q9-Aggregated", "isController": false}, {"data": [[9.0, 548.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[9.0, 548.0]], "isOverall": false, "label": "T7 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 359.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[10.0, 359.0]], "isOverall": false, "label": "T7 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 1790.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[10.0, 1790.0]], "isOverall": false, "label": "T7 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 2255.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[10.0, 2255.0]], "isOverall": false, "label": "T7 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 1045.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[10.0, 1045.0]], "isOverall": false, "label": "T7 - Q2-Aggregated", "isController": false}, {"data": [[9.0, 3889.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[9.0, 3889.0]], "isOverall": false, "label": "T7 - Q1-Aggregated", "isController": false}, {"data": [[5.0, 115.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[5.0, 115.0]], "isOverall": false, "label": "T7 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 1817.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[10.0, 1817.0]], "isOverall": false, "label": "T7 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 1789.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[10.0, 1789.0]], "isOverall": false, "label": "T1 - Q16-Aggregated", "isController": false}, {"data": [[6.0, 1113.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[6.0, 1113.0]], "isOverall": false, "label": "T1 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 4512.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[10.0, 4512.0]], "isOverall": false, "label": "T1 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 562.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[10.0, 562.0]], "isOverall": false, "label": "T5 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 1317.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[10.0, 1317.0]], "isOverall": false, "label": "T5 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 4458.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[10.0, 4458.0]], "isOverall": false, "label": "T3 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 6.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[10.0, 6.0]], "isOverall": false, "label": "T1 - RF2-Aggregated", "isController": false}, {"data": [[10.0, 1136.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[10.0, 1136.0]], "isOverall": false, "label": "T3 - Q8-Aggregated", "isController": false}, {"data": [[4.0, 433.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[4.0, 433.0]], "isOverall": false, "label": "T3 - Q5-Aggregated", "isController": false}, {"data": [[4.0, 662.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[4.0, 662.0]], "isOverall": false, "label": "T3 - Q6-Aggregated", "isController": false}, {"data": [[5.0, 5522.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[5.0, 5522.0]], "isOverall": false, "label": "T3 - Q9-Aggregated", "isController": false}, {"data": [[4.0, 604.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[4.0, 604.0]], "isOverall": false, "label": "T3 - Q3-Aggregated", "isController": false}, {"data": [[9.0, 566.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[9.0, 566.0]], "isOverall": false, "label": "T3 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 15289.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[10.0, 15289.0]], "isOverall": false, "label": "T3 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 2154.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[10.0, 2154.0]], "isOverall": false, "label": "T7 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 9.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[10.0, 9.0]], "isOverall": false, "label": "T1 - RF1-Aggregated", "isController": false}, {"data": [[10.0, 1355.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[10.0, 1355.0]], "isOverall": false, "label": "T7 - Q22-Aggregated", "isController": false}, {"data": [[8.0, 746.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[8.0, 746.0]], "isOverall": false, "label": "T3 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 7204.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[10.0, 7204.0]], "isOverall": false, "label": "T1 - Q1-Aggregated", "isController": false}, {"data": [[7.0, 3655.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[7.0, 3655.0]], "isOverall": false, "label": "T7 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 800.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[10.0, 800.0]], "isOverall": false, "label": "T1 - Q2-Aggregated", "isController": false}, {"data": [[6.0, 767.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[6.0, 767.0]], "isOverall": false, "label": "T7 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 1661.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[10.0, 1661.0]], "isOverall": false, "label": "T1 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 1269.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[10.0, 1269.0]], "isOverall": false, "label": "T7 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 851.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[10.0, 851.0]], "isOverall": false, "label": "T1 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 3109.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[10.0, 3109.0]], "isOverall": false, "label": "T7 - Q14-Aggregated", "isController": false}, {"data": [[9.0, 416.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[9.0, 416.0]], "isOverall": false, "label": "T1 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 1181.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[10.0, 1181.0]], "isOverall": false, "label": "T1 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 1967.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[10.0, 1967.0]], "isOverall": false, "label": "T7 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 13890.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[10.0, 13890.0]], "isOverall": false, "label": "T7 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 2068.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[10.0, 2068.0]], "isOverall": false, "label": "T1 - Q7-Aggregated", "isController": false}, {"data": [[9.0, 871.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[9.0, 871.0]], "isOverall": false, "label": "T1 - Q8-Aggregated", "isController": false}, {"data": [[6.0, 1542.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[6.0, 1542.0]], "isOverall": false, "label": "T7 - Q13-Aggregated", "isController": false}, {"data": [[9.0, 3759.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[9.0, 3759.0]], "isOverall": false, "label": "T1 - Q9-Aggregated", "isController": false}, {"data": [[5.0, 1230.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[5.0, 1230.0]], "isOverall": false, "label": "T7 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 455.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[10.0, 455.0]], "isOverall": false, "label": "T7 - Q11-Aggregated", "isController": false}, {"data": [[4.0, 825.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[4.0, 825.0]], "isOverall": false, "label": "T4 - Q16-Aggregated", "isController": false}, {"data": [[3.0, 1179.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[3.0, 1179.0]], "isOverall": false, "label": "T4 - Q15-Aggregated", "isController": false}, {"data": [[3.0, 474.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[3.0, 474.0]], "isOverall": false, "label": "T4 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 1552.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[10.0, 1552.0]], "isOverall": false, "label": "T4 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 7391.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[10.0, 7391.0]], "isOverall": false, "label": "T4 - Q19-Aggregated", "isController": false}, {"data": [[1.0, 2588.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.0, 2588.0]], "isOverall": false, "label": "T4 - Q18-Aggregated", "isController": false}, {"data": [[4.0, 424.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[4.0, 424.0]], "isOverall": false, "label": "T4 - Q22-Aggregated", "isController": false}, {"data": [[3.0, 837.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[3.0, 837.0]], "isOverall": false, "label": "T4 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 297.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[10.0, 297.0]], "isOverall": false, "label": "T8 - Q4-Aggregated", "isController": false}, {"data": [[4.0, 15693.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[4.0, 15693.0]], "isOverall": false, "label": "T2 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 842.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[10.0, 842.0]], "isOverall": false, "label": "T8 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 330.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[10.0, 330.0]], "isOverall": false, "label": "T8 - Q2-Aggregated", "isController": false}, {"data": [[3.0, 473.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[3.0, 473.0]], "isOverall": false, "label": "T2 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 3352.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[10.0, 3352.0]], "isOverall": false, "label": "T8 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 1518.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[10.0, 1518.0]], "isOverall": false, "label": "T2 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 658.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[10.0, 658.0]], "isOverall": false, "label": "T8 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 2068.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[10.0, 2068.0]], "isOverall": false, "label": "T8 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 1261.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[10.0, 1261.0]], "isOverall": false, "label": "T8 - Q6-Aggregated", "isController": false}, {"data": [[9.0, 3962.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[9.0, 3962.0]], "isOverall": false, "label": "T6 - Q10-Aggregated", "isController": false}, {"data": [[7.0, 352.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[7.0, 352.0]], "isOverall": false, "label": "T8 - Q7-Aggregated", "isController": false}, {"data": [[3.0, 1548.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[3.0, 1548.0]], "isOverall": false, "label": "T2 - Q9-Aggregated", "isController": false}, {"data": [[3.0, 417.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[3.0, 417.0]], "isOverall": false, "label": "T2 - Q8-Aggregated", "isController": false}, {"data": [[3.0, 264.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[3.0, 264.0]], "isOverall": false, "label": "T2 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 3204.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[10.0, 3204.0]], "isOverall": false, "label": "T2 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 623.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[10.0, 623.0]], "isOverall": false, "label": "T5 - Q22-Aggregated", "isController": false}, {"data": [[4.0, 603.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[4.0, 603.0]], "isOverall": false, "label": "T2 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 6004.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[10.0, 6004.0]], "isOverall": false, "label": "T2 - Q6-Aggregated", "isController": false}, {"data": [[8.0, 1313.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[8.0, 1313.0]], "isOverall": false, "label": "T5 - Q21-Aggregated", "isController": false}, {"data": [[9.0, 1495.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[9.0, 1495.0]], "isOverall": false, "label": "T5 - Q13-Aggregated", "isController": false}, {"data": [[8.0, 832.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[8.0, 832.0]], "isOverall": false, "label": "T5 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 2436.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[10.0, 2436.0]], "isOverall": false, "label": "T5 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 612.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[10.0, 612.0]], "isOverall": false, "label": "T5 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 1158.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[10.0, 1158.0]], "isOverall": false, "label": "T5 - Q16-Aggregated", "isController": false}, {"data": [[8.0, 785.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[8.0, 785.0]], "isOverall": false, "label": "T5 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 3398.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[10.0, 3398.0]], "isOverall": false, "label": "T5 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 11765.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}, {"data": [[10.0, 11765.0]], "isOverall": false, "label": "T8 - Q1-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.69220304E12, "maxY": 122155.41666666667, "series": [{"data": [[1.69220304E12, 122155.41666666667], [1.6922031E12, 37781.13333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69220304E12, 0.0], [1.6922031E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6922031E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 6.0, "minX": 1.69220304E12, "maxY": 18832.0, "series": [{"data": [[1.69220304E12, 5195.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.69220304E12, 767.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.69220304E12, 867.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.69220304E12, 4091.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.69220304E12, 597.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69220304E12, 454.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69220304E12, 1529.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69220304E12, 383.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69220304E12, 516.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69220304E12, 1846.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.69220304E12, 1323.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.6922031E12, 2191.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69220304E12, 1071.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.69220304E12, 1499.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69220304E12, 1345.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.69220304E12, 3397.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.69220304E12, 506.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69220304E12, 1597.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.6922031E12, 658.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.69220304E12, 7682.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.69220304E12, 3971.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.6922031E12, 848.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69220304E12, 2174.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.69220304E12, 2914.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.69220304E12, 366.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69220304E12, 808.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.6922031E12, 703.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.6922031E12, 1182.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69220304E12, 3026.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.6922031E12, 1405.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.6922031E12, 422.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.6922031E12, 928.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.6922031E12, 1036.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[1.69220304E12, 954.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[1.69220304E12, 3352.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1.69220304E12, 1158.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[1.69220304E12, 3844.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.6922031E12, 4339.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[1.6922031E12, 714.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69220304E12, 1497.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1.6922031E12, 1215.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69220304E12, 1477.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[1.6922031E12, 934.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69220304E12, 1762.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1.69220304E12, 1105.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[1.6922031E12, 807.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1.69220304E12, 906.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[1.6922031E12, 2096.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[1.69220304E12, 3268.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1.6922031E12, 1573.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[1.69220304E12, 788.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[1.6922031E12, 462.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69220304E12, 2404.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.6922031E12, 1400.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[1.69220304E12, 612.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1.69220304E12, 3317.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1.69220304E12, 3906.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[1.69220304E12, 2174.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[1.6922031E12, 680.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69220304E12, 7441.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69220304E12, 1433.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69220304E12, 2837.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.69220304E12, 1245.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69220304E12, 3777.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.6922031E12, 1156.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.6922031E12, 208.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69220304E12, 10984.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69220304E12, 2416.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69220304E12, 2545.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.6922031E12, 653.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.6922031E12, 489.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.6922031E12, 634.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.6922031E12, 302.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.6922031E12, 466.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.6922031E12, 482.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.6922031E12, 18832.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69220304E12, 522.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69220304E12, 1861.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.69220304E12, 1421.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69220304E12, 719.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69220304E12, 10385.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.69220304E12, 718.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.69220304E12, 660.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.69220304E12, 1265.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69220304E12, 2098.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.69220304E12, 1934.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69220304E12, 1188.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69220304E12, 332.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69220304E12, 6426.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.69220304E12, 9865.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69220304E12, 514.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69220304E12, 1605.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69220304E12, 1299.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69220304E12, 1462.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69220304E12, 2823.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[1.69220304E12, 953.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.69220304E12, 4122.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69220304E12, 1442.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1.69220304E12, 4806.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69220304E12, 631.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.69220304E12, 707.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69220304E12, 754.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69220304E12, 264.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69220304E12, 849.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69220304E12, 861.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.6922031E12, 280.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1.69220304E12, 1601.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[1.6922031E12, 2567.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1.69220304E12, 1587.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[1.69220304E12, 6116.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1.6922031E12, 1132.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[1.69220304E12, 8484.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[1.69220304E12, 918.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69220304E12, 2375.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69220304E12, 2993.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69220304E12, 1756.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.6922031E12, 3516.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69220304E12, 3704.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69220304E12, 1504.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[1.69220304E12, 416.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.6922031E12, 1229.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69220304E12, 1763.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[1.6922031E12, 548.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[1.69220304E12, 359.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1.69220304E12, 1790.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[1.69220304E12, 2255.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1.69220304E12, 1045.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1.69220304E12, 3889.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[1.6922031E12, 115.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1.69220304E12, 1817.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1.69220304E12, 1789.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.6922031E12, 1113.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69220304E12, 4512.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69220304E12, 562.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69220304E12, 1317.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69220304E12, 4458.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69220304E12, 6.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69220304E12, 1136.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.6922031E12, 433.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.6922031E12, 662.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.6922031E12, 5522.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.6922031E12, 604.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.69220304E12, 566.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69220304E12, 15289.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.69220304E12, 2154.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[1.69220304E12, 9.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69220304E12, 1355.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[1.6922031E12, 746.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.69220304E12, 7204.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.6922031E12, 3655.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[1.69220304E12, 800.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.6922031E12, 767.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1.69220304E12, 1661.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69220304E12, 1269.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[1.69220304E12, 851.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69220304E12, 3109.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[1.6922031E12, 416.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69220304E12, 1181.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69220304E12, 1967.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[1.69220304E12, 13890.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[1.69220304E12, 2068.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69220304E12, 871.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.6922031E12, 1542.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[1.69220304E12, 3759.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.6922031E12, 1230.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[1.69220304E12, 455.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[1.6922031E12, 825.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.6922031E12, 1179.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.6922031E12, 474.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.69220304E12, 1552.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69220304E12, 7391.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.6922031E12, 2588.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.6922031E12, 424.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.6922031E12, 837.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69220304E12, 297.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[1.6922031E12, 15693.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69220304E12, 842.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[1.69220304E12, 330.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[1.6922031E12, 473.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69220304E12, 3352.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1.69220304E12, 1518.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69220304E12, 658.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[1.69220304E12, 2068.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1.69220304E12, 1261.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[1.6922031E12, 3962.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[1.6922031E12, 352.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1.6922031E12, 1548.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.6922031E12, 417.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.6922031E12, 264.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69220304E12, 3204.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69220304E12, 623.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.6922031E12, 603.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.69220304E12, 6004.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.6922031E12, 1313.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.6922031E12, 1495.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.6922031E12, 832.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69220304E12, 2436.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69220304E12, 612.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.69220304E12, 1158.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.6922031E12, 785.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69220304E12, 3398.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69220304E12, 11765.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6922031E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 6.0, "minX": 1.69220304E12, "maxY": 18832.0, "series": [{"data": [[1.69220304E12, 5195.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.69220304E12, 767.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.69220304E12, 841.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.69220304E12, 4091.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.69220304E12, 597.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69220304E12, 427.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69220304E12, 1529.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69220304E12, 378.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69220304E12, 516.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69220304E12, 1846.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.69220304E12, 1323.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.6922031E12, 2191.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69220304E12, 1071.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.69220304E12, 1499.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69220304E12, 1345.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.69220304E12, 3397.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.69220304E12, 402.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69220304E12, 1597.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.6922031E12, 658.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.69220304E12, 7682.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.69220304E12, 3971.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.6922031E12, 848.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69220304E12, 2114.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.69220304E12, 2914.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.69220304E12, 366.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69220304E12, 808.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.6922031E12, 703.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.6922031E12, 1182.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69220304E12, 2939.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.6922031E12, 1405.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.6922031E12, 422.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.6922031E12, 928.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.6922031E12, 1036.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[1.69220304E12, 954.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[1.69220304E12, 3351.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1.69220304E12, 1158.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[1.69220304E12, 3828.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.6922031E12, 4339.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[1.6922031E12, 713.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69220304E12, 1497.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1.6922031E12, 1215.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69220304E12, 1477.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[1.6922031E12, 934.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69220304E12, 1762.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1.69220304E12, 1105.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[1.6922031E12, 807.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1.69220304E12, 906.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[1.6922031E12, 2096.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[1.69220304E12, 3268.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1.6922031E12, 1573.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[1.69220304E12, 783.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[1.6922031E12, 462.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69220304E12, 2404.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.6922031E12, 1400.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[1.69220304E12, 588.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1.69220304E12, 3317.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1.69220304E12, 3906.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[1.69220304E12, 2174.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[1.6922031E12, 680.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69220304E12, 7440.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69220304E12, 1420.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69220304E12, 2837.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.69220304E12, 1245.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69220304E12, 3777.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.6922031E12, 1156.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.6922031E12, 188.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69220304E12, 10984.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69220304E12, 2416.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69220304E12, 2545.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.6922031E12, 653.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.6922031E12, 489.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.6922031E12, 634.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.6922031E12, 302.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.6922031E12, 466.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.6922031E12, 482.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.6922031E12, 18832.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69220304E12, 522.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69220304E12, 1861.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.69220304E12, 1421.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69220304E12, 719.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69220304E12, 10384.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.69220304E12, 718.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.69220304E12, 659.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.69220304E12, 1264.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69220304E12, 2098.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.69220304E12, 1934.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69220304E12, 1188.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69220304E12, 332.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69220304E12, 6426.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.69220304E12, 9865.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69220304E12, 514.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69220304E12, 1605.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69220304E12, 1299.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69220304E12, 1462.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69220304E12, 2823.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[1.69220304E12, 953.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.69220304E12, 4122.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69220304E12, 1442.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1.69220304E12, 4806.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69220304E12, 631.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.69220304E12, 707.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69220304E12, 754.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69220304E12, 264.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69220304E12, 849.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69220304E12, 860.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.6922031E12, 274.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1.69220304E12, 1601.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[1.6922031E12, 2566.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1.69220304E12, 1586.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[1.69220304E12, 6116.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1.6922031E12, 1125.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[1.69220304E12, 8483.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[1.69220304E12, 895.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69220304E12, 2375.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69220304E12, 2993.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69220304E12, 1756.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.6922031E12, 3516.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69220304E12, 3704.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69220304E12, 1504.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[1.69220304E12, 415.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.6922031E12, 1229.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69220304E12, 1762.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[1.6922031E12, 548.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[1.69220304E12, 359.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1.69220304E12, 1789.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[1.69220304E12, 2255.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1.69220304E12, 1045.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1.69220304E12, 3889.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[1.6922031E12, 115.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1.69220304E12, 1817.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1.69220304E12, 1782.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.6922031E12, 1112.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69220304E12, 4505.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69220304E12, 551.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69220304E12, 1317.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69220304E12, 4458.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69220304E12, 6.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69220304E12, 1136.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.6922031E12, 433.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.6922031E12, 662.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.6922031E12, 5522.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.6922031E12, 603.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.69220304E12, 565.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69220304E12, 15288.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.69220304E12, 2154.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[1.69220304E12, 9.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69220304E12, 1355.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[1.6922031E12, 745.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.69220304E12, 7203.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.6922031E12, 3654.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[1.69220304E12, 799.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.6922031E12, 767.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1.69220304E12, 1661.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69220304E12, 1263.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[1.69220304E12, 850.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69220304E12, 3109.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[1.6922031E12, 416.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69220304E12, 1181.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69220304E12, 1967.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[1.69220304E12, 13890.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[1.69220304E12, 2068.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69220304E12, 871.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.6922031E12, 1542.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[1.69220304E12, 3759.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.6922031E12, 1230.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[1.69220304E12, 447.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[1.6922031E12, 807.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.6922031E12, 1179.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.6922031E12, 474.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.69220304E12, 1552.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69220304E12, 7391.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.6922031E12, 2588.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.6922031E12, 424.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.6922031E12, 836.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69220304E12, 297.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[1.6922031E12, 15693.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69220304E12, 842.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[1.69220304E12, 330.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[1.6922031E12, 473.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69220304E12, 3351.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1.69220304E12, 1517.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69220304E12, 658.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[1.69220304E12, 2068.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1.69220304E12, 1261.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[1.6922031E12, 3962.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[1.6922031E12, 352.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1.6922031E12, 1548.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.6922031E12, 417.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.6922031E12, 264.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69220304E12, 3204.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69220304E12, 623.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.6922031E12, 603.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.69220304E12, 6004.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.6922031E12, 1313.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.6922031E12, 1494.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.6922031E12, 832.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69220304E12, 2436.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69220304E12, 611.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.69220304E12, 1152.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.6922031E12, 785.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69220304E12, 3398.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69220304E12, 11765.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6922031E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69220304E12, "maxY": 1096.0, "series": [{"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.6922031E12, 1.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69220304E12, 613.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.69220304E12, 881.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.6922031E12, 1.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[1.69220304E12, 1024.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69220304E12, 720.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.6922031E12, 1.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.69220304E12, 680.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69220304E12, 1096.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[1.69220304E12, 891.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69220304E12, 920.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[1.69220304E12, 962.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69220304E12, 760.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1.6922031E12, 1.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.6922031E12, 0.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.69220304E12, 1.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.6922031E12, 1.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69220304E12, 0.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6922031E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 6.0, "minX": 1.69220304E12, "maxY": 18832.0, "series": [{"data": [[1.69220304E12, 15289.0], [1.6922031E12, 18832.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69220304E12, 6015.200000000001], [1.6922031E12, 3585.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69220304E12, 14743.38999999998], [1.6922031E12, 18832.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69220304E12, 8553.049999999976], [1.6922031E12, 5226.25]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69220304E12, 6.0], [1.6922031E12, 115.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69220304E12, 1523.5], [1.6922031E12, 828.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6922031E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 688.5, "minX": 1.0, "maxY": 1597.0, "series": [{"data": [[1.0, 688.5], [2.0, 1196.5], [4.0, 1523.5], [5.0, 1315.0], [3.0, 1597.0], [6.0, 1157.0], [7.0, 1071.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 7.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 688.5, "minX": 1.0, "maxY": 1597.0, "series": [{"data": [[1.0, 688.5], [2.0, 1193.0], [4.0, 1523.0], [5.0, 1315.0], [3.0, 1597.0], [6.0, 1154.0], [7.0, 1071.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 7.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.9333333333333333, "minX": 1.69220304E12, "maxY": 2.433333333333333, "series": [{"data": [[1.69220304E12, 2.433333333333333], [1.6922031E12, 0.9333333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6922031E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 1.0666666666666667, "minX": 1.69220304E12, "maxY": 2.3, "series": [{"data": [[1.69220304E12, 2.3], [1.6922031E12, 1.0666666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6922031E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69220304E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q14-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q2-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q1-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q13-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q13-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q19-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q4-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q14-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q5-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q12-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q19-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q7-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q3-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q3-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q18-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q7-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q7-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q21-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q11-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q9-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q9-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q5-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q18-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q7-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q12-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q22-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q10-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q14-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q16-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q3-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q15-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q21-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q11-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q4-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q2-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q16-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q6-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q14-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q2-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q4-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q10-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q8-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF2-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q22-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q8-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q6-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q15-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q13-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q16-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q19-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q15-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q22-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q8-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q2-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q2-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q11-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q12-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q3-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q5-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q5-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q14-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q11-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q5-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q7-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q5-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q3-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q21-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q12-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q19-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q5-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q7-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q21-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q19-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q8-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q21-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q11-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q5-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q1-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q11-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q9-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q8-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q14-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q1-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q2-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q18-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q12-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q6-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q4-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q21-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q2-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q4-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q16-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q15-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q12-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q8-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q8-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q14-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q6-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q6-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q11-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q11-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q18-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q22-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q13-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q10-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q9-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q21-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q1-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q21-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q2-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q19-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q16-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q3-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q5-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q3-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q10-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q15-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q5-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q14-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF1-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q14-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q22-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q7-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q15-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q7-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q15-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q10-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q19-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q3-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q14-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q13-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q18-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q3-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q6-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q18-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q4-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q12-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q19-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q6-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q4-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q12-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q18-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q10-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q21-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q6-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q11-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q8-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q19-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q16-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q10-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q4-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q13-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q18-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q9-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q22-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q12-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q11-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q15-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q1-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q22-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q3-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q7-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q15-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q1-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q16-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q9-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q1-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q16-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q13-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q19-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q9-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q13-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q7-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q9-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q10-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q22-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q15-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q13-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q16-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q18-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q1-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q1-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q1-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q9-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q22-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q12-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q10-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q2-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q13-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q10-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q18-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q6-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q4-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q6-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q16-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q2-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q8-success", "isController": false}, {"data": [[1.6922031E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q22-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q9-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q8-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q21-success", "isController": false}, {"data": [[1.69220304E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6922031E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.0666666666666667, "minX": 1.69220304E12, "maxY": 2.3, "series": [{"data": [[1.69220304E12, 2.3], [1.6922031E12, 1.0666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6922031E12, "title": "Total Transactions Per Second"}},
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
