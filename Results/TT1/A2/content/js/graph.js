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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[155000.0, 1.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[38200.0, 1.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[8500.0, 1.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[89500.0, 1.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[231900.0, 1.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[3600.0, 1.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[5000.0, 1.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[133300.0, 1.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[50200.0, 1.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[303900.0, 1.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[91800.0, 1.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[124000.0, 1.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[240600.0, 1.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[37900.0, 1.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[142800.0, 1.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[14100.0, 1.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[8200.0, 1.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[13100.0, 1.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[21600.0, 1.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[112600.0, 1.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[411300.0, 1.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[17500.0, 1.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[9300.0, 1.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[31400.0, 1.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[8800.0, 1.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[82400.0, 1.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[20600.0, 1.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[121000.0, 1.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[12900.0, 1.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[153000.0, 1.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[9700.0, 1.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[34000.0, 1.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[317200.0, 1.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[8600.0, 1.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[57300.0, 1.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[4800.0, 1.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[104200.0, 1.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[27900.0, 1.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[25000.0, 1.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[93900.0, 1.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[7700.0, 1.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[73100.0, 1.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[21700.0, 1.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[29100.0, 1.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[33200.0, 1.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[34700.0, 1.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[48900.0, 1.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[58800.0, 1.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[170300.0, 1.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[7700.0, 1.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[112200.0, 1.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[7100.0, 1.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[46100.0, 1.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[106300.0, 1.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[85600.0, 1.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[34200.0, 1.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[122100.0, 1.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[15400.0, 1.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[282800.0, 1.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[51600.0, 1.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[13000.0, 1.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[32400.0, 1.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[7300.0, 1.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[51900.0, 1.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[490100.0, 1.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[69100.0, 1.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[130100.0, 1.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[12400.0, 1.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[17400.0, 1.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[11200.0, 1.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[9000.0, 1.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[114300.0, 1.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[73800.0, 1.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[37900.0, 1.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[37600.0, 1.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[61700.0, 1.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[7600.0, 1.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[3400.0, 1.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[230000.0, 1.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[24700.0, 1.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[14600.0, 1.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[40600.0, 1.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[110900.0, 1.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[18500.0, 1.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[6400.0, 1.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[250200.0, 1.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[111800.0, 1.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[6700.0, 1.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[81800.0, 1.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[69200.0, 1.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[384500.0, 1.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[6400.0, 1.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[19000.0, 1.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[73500.0, 1.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[13700.0, 1.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[27600.0, 1.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[28000.0, 1.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[68000.0, 1.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[65600.0, 1.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[49900.0, 1.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[485700.0, 1.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[21800.0, 1.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[88400.0, 1.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[17200.0, 1.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[116100.0, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[31800.0, 1.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[14300.0, 1.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[326500.0, 1.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[42800.0, 1.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[93800.0, 1.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[24300.0, 1.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[54500.0, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[484600.0, 1.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[32600.0, 1.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[134100.0, 1.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[5900.0, 1.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[25600.0, 1.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[27000.0, 1.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[19500.0, 1.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[36700.0, 1.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[4400.0, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[75800.0, 1.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[128000.0, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[93000.0, 1.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[36900.0, 1.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[4600.0, 1.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[8300.0, 1.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[112700.0, 1.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[641100.0, 1.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[132000.0, 1.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[54800.0, 1.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[13800.0, 1.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[13800.0, 1.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[96000.0, 1.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[13900.0, 1.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[77200.0, 1.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[4600.0, 1.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[7900.0, 1.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[8500.0, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[4600.0, 1.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[61700.0, 1.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[229500.0, 1.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[185300.0, 1.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[32200.0, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[34200.0, 1.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[12800.0, 1.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[48300.0, 1.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[12500.0, 1.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[653900.0, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[20300.0, 1.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[8600.0, 1.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[485800.0, 1.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[9900.0, 1.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[13600.0, 1.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[81400.0, 1.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[83300.0, 1.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[33100.0, 1.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[83400.0, 1.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[107200.0, 1.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[26100.0, 1.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[25000.0, 1.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[5700.0, 1.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[28100.0, 1.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[29300.0, 1.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[300200.0, 1.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[84900.0, 1.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[64500.0, 1.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[48100.0, 1.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[98600.0, 1.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[37300.0, 1.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[19700.0, 1.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[4500.0, 1.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[60900.0, 1.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[22300.0, 1.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[231600.0, 1.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[50300.0, 1.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[35500.0, 1.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[84900.0, 1.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[320100.0, 1.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[82200.0, 1.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[11500.0, 1.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[52300.0, 1.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[152700.0, 1.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[61200.0, 1.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 653900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 200.0, "series": [{"data": [[0.0, 1.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 200.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69217532E12, "maxY": 1.0, "series": [{"data": [[1.69217568E12, 1.0], [1.6921773E12, 1.0], [1.69217664E12, 1.0], [1.69217604E12, 1.0], [1.69217544E12, 1.0], [1.6921761E12, 1.0], [1.6921758E12, 1.0], [1.69217676E12, 1.0], [1.69217616E12, 1.0], [1.69217586E12, 1.0], [1.69217562E12, 1.0], [1.69217724E12, 1.0], [1.69217598E12, 1.0]], "isOverall": false, "label": "T4", "isController": false}, {"data": [[1.69217568E12, 1.0], [1.69217664E12, 1.0], [1.69217586E12, 1.0], [1.69217604E12, 1.0], [1.69217574E12, 1.0], [1.6921767E12, 1.0], [1.6921764E12, 1.0], [1.69217562E12, 1.0], [1.6921761E12, 1.0], [1.69217658E12, 1.0], [1.6921758E12, 1.0], [1.69217646E12, 1.0]], "isOverall": false, "label": "T5", "isController": false}, {"data": [[1.69217568E12, 1.0], [1.69217664E12, 1.0], [1.69217538E12, 1.0], [1.69217604E12, 1.0], [1.6921767E12, 1.0], [1.69217544E12, 1.0], [1.6921758E12, 1.0], [1.69217676E12, 1.0], [1.6921755E12, 1.0], [1.69217586E12, 1.0], [1.69217556E12, 1.0], [1.69217652E12, 1.0], [1.69217562E12, 1.0], [1.69217598E12, 1.0]], "isOverall": false, "label": "T6", "isController": false}, {"data": [[1.69217568E12, 1.0], [1.69217664E12, 1.0], [1.69217604E12, 1.0], [1.6921767E12, 1.0], [1.6921761E12, 1.0], [1.6921755E12, 1.0], [1.69217646E12, 1.0], [1.69217616E12, 1.0], [1.69217556E12, 1.0], [1.69217652E12, 1.0], [1.69217622E12, 1.0], [1.69217562E12, 1.0], [1.69217658E12, 1.0], [1.69217598E12, 1.0]], "isOverall": false, "label": "T10", "isController": false}, {"data": [[1.69217616E12, 1.0], [1.69217664E12, 1.0], [1.69217634E12, 1.0], [1.69217604E12, 1.0], [1.69217652E12, 1.0], [1.6921767E12, 1.0], [1.69217544E12, 1.0], [1.69217592E12, 1.0], [1.69217658E12, 1.0], [1.69217676E12, 1.0], [1.69217646E12, 1.0]], "isOverall": false, "label": "T7", "isController": false}, {"data": [[1.69217568E12, 1.0], [1.69217664E12, 1.0], [1.69217604E12, 1.0], [1.6921767E12, 1.0], [1.69217592E12, 1.0], [1.69217562E12, 1.0], [1.6921761E12, 1.0], [1.69217658E12, 1.0], [1.6921758E12, 1.0], [1.69217628E12, 1.0], [1.69217676E12, 1.0]], "isOverall": false, "label": "T8", "isController": false}, {"data": [[1.69217664E12, 1.0], [1.69217682E12, 1.0], [1.69217604E12, 1.0], [1.69217652E12, 1.0], [1.69217544E12, 1.0], [1.69217562E12, 1.0], [1.69217658E12, 1.0], [1.6921758E12, 1.0], [1.69217676E12, 1.0], [1.6921755E12, 1.0], [1.69217646E12, 1.0]], "isOverall": false, "label": "T9", "isController": false}, {"data": [[1.69217616E12, 1.0], [1.69217712E12, 1.0], [1.69217634E12, 1.0], [1.69217622E12, 1.0], [1.6921764E12, 1.0], [1.69217562E12, 1.0], [1.69217532E12, 1.0], [1.6921758E12, 1.0], [1.69217628E12, 1.0], [1.6921755E12, 1.0], [1.69217646E12, 1.0]], "isOverall": false, "label": "T1", "isController": false}, {"data": [[1.69217616E12, 1.0], [1.69217664E12, 1.0], [1.69217586E12, 1.0], [1.69217556E12, 1.0], [1.69217604E12, 1.0], [1.69217652E12, 1.0], [1.69217574E12, 1.0], [1.6921761E12, 1.0], [1.6921758E12, 1.0], [1.6921755E12, 1.0], [1.69217598E12, 1.0], [1.69217646E12, 1.0]], "isOverall": false, "label": "T2", "isController": false}, {"data": [[1.69217616E12, 1.0], [1.69217538E12, 1.0], [1.69217586E12, 1.0], [1.69217604E12, 1.0], [1.692177E12, 1.0], [1.6921761E12, 1.0], [1.69217706E12, 1.0], [1.6921758E12, 1.0], [1.69217628E12, 1.0], [1.69217598E12, 1.0], [1.69217694E12, 1.0]], "isOverall": false, "label": "T3", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6921773E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 31.0, "minX": 1.0, "maxY": 653973.0, "series": [{"data": [[10.0, 155030.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[10.0, 155030.0]], "isOverall": false, "label": "T9 - Q18-Aggregated", "isController": false}, {"data": [[4.0, 38286.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[4.0, 38286.0]], "isOverall": false, "label": "T9 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 8570.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[10.0, 8570.0]], "isOverall": false, "label": "T9 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 89546.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[10.0, 89546.0]], "isOverall": false, "label": "T10 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 231935.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[10.0, 231935.0]], "isOverall": false, "label": "T10 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 3640.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[10.0, 3640.0]], "isOverall": false, "label": "T9 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 5075.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[10.0, 5075.0]], "isOverall": false, "label": "T10 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 133367.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[10.0, 133367.0]], "isOverall": false, "label": "T9 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 50288.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[10.0, 50288.0]], "isOverall": false, "label": "T10 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 303913.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[10.0, 303913.0]], "isOverall": false, "label": "T10 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 91893.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[10.0, 91893.0]], "isOverall": false, "label": "T10 - Q12-Aggregated", "isController": false}, {"data": [[5.0, 124070.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[5.0, 124070.0]], "isOverall": false, "label": "T9 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 240637.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[10.0, 240637.0]], "isOverall": false, "label": "T9 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 37961.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[10.0, 37961.0]], "isOverall": false, "label": "T10 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 142811.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[10.0, 142811.0]], "isOverall": false, "label": "T9 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 14130.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[10.0, 14130.0]], "isOverall": false, "label": "T10 - Q10-Aggregated", "isController": false}, {"data": [[9.0, 8248.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[9.0, 8248.0]], "isOverall": false, "label": "T10 - Q11-Aggregated", "isController": false}, {"data": [[4.0, 13104.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[4.0, 13104.0]], "isOverall": false, "label": "T9 - Q13-Aggregated", "isController": false}, {"data": [[3.0, 21604.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[3.0, 21604.0]], "isOverall": false, "label": "T3 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 112697.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[10.0, 112697.0]], "isOverall": false, "label": "T3 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 411363.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[10.0, 411363.0]], "isOverall": false, "label": "T3 - Q15-Aggregated", "isController": false}, {"data": [[3.0, 17571.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[3.0, 17571.0]], "isOverall": false, "label": "T3 - Q14-Aggregated", "isController": false}, {"data": [[3.0, 9358.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[3.0, 9358.0]], "isOverall": false, "label": "T3 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 31443.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[10.0, 31443.0]], "isOverall": false, "label": "T9 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 8841.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[10.0, 8841.0]], "isOverall": false, "label": "T9 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 82410.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[10.0, 82410.0]], "isOverall": false, "label": "T10 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 20657.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[10.0, 20657.0]], "isOverall": false, "label": "T10 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 121051.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[10.0, 121051.0]], "isOverall": false, "label": "T4 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 12909.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[10.0, 12909.0]], "isOverall": false, "label": "T4 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 153087.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[10.0, 153087.0]], "isOverall": false, "label": "T4 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 9740.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[10.0, 9740.0]], "isOverall": false, "label": "T3 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 34044.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[10.0, 34044.0]], "isOverall": false, "label": "T3 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 317269.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[10.0, 317269.0]], "isOverall": false, "label": "T8 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 8673.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[10.0, 8673.0]], "isOverall": false, "label": "T8 - Q22-Aggregated", "isController": false}, {"data": [[9.0, 57354.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[9.0, 57354.0]], "isOverall": false, "label": "T6 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 4858.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[10.0, 4858.0]], "isOverall": false, "label": "T6 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 104289.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[10.0, 104289.0]], "isOverall": false, "label": "T6 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 27961.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[10.0, 27961.0]], "isOverall": false, "label": "T3 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 25076.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[10.0, 25076.0]], "isOverall": false, "label": "T3 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 93976.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[10.0, 93976.0]], "isOverall": false, "label": "T3 - Q13-Aggregated", "isController": false}, {"data": [[6.0, 6330.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[6.0, 6330.0]], "isOverall": false, "label": "T6 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 7716.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[10.0, 7716.0]], "isOverall": false, "label": "T6 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 73161.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[10.0, 73161.0]], "isOverall": false, "label": "T3 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 21774.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[10.0, 21774.0]], "isOverall": false, "label": "T6 - Q5-Aggregated", "isController": false}, {"data": [[8.0, 29149.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[8.0, 29149.0]], "isOverall": false, "label": "T6 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 33246.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[10.0, 33246.0]], "isOverall": false, "label": "T6 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 34721.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[10.0, 34721.0]], "isOverall": false, "label": "T6 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 48957.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[10.0, 48957.0]], "isOverall": false, "label": "T8 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 58869.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[10.0, 58869.0]], "isOverall": false, "label": "T8 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 170307.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[10.0, 170307.0]], "isOverall": false, "label": "T8 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 5260.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[10.0, 5260.0]], "isOverall": false, "label": "T2 - Q22-Aggregated", "isController": false}, {"data": [[8.0, 7758.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[8.0, 7758.0]], "isOverall": false, "label": "T8 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 112205.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[10.0, 112205.0]], "isOverall": false, "label": "T2 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 7152.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[10.0, 7152.0]], "isOverall": false, "label": "T8 - Q10-Aggregated", "isController": false}, {"data": [[7.0, 4588.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[7.0, 4588.0]], "isOverall": false, "label": "T8 - Q11-Aggregated", "isController": false}, {"data": [[7.0, 46125.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[7.0, 46125.0]], "isOverall": false, "label": "T8 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 106335.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[10.0, 106335.0]], "isOverall": false, "label": "T8 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 85645.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[10.0, 85645.0]], "isOverall": false, "label": "T8 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 34276.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[10.0, 34276.0]], "isOverall": false, "label": "T2 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 122180.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[10.0, 122180.0]], "isOverall": false, "label": "T2 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 15458.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[10.0, 15458.0]], "isOverall": false, "label": "T2 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 282877.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[10.0, 282877.0]], "isOverall": false, "label": "T2 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 51692.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[10.0, 51692.0]], "isOverall": false, "label": "T2 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 13026.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[10.0, 13026.0]], "isOverall": false, "label": "T2 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 32495.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[10.0, 32495.0]], "isOverall": false, "label": "T2 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 7319.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[10.0, 7319.0]], "isOverall": false, "label": "T2 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 51938.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[10.0, 51938.0]], "isOverall": false, "label": "T2 - Q10-Aggregated", "isController": false}, {"data": [[1.0, 490113.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.0, 490113.0]], "isOverall": false, "label": "T4 - Q9-Aggregated", "isController": false}, {"data": [[1.0, 3915.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.0, 3915.0]], "isOverall": false, "label": "T4 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 69169.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[10.0, 69169.0]], "isOverall": false, "label": "T4 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 130130.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[10.0, 130130.0]], "isOverall": false, "label": "T4 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 12490.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[10.0, 12490.0]], "isOverall": false, "label": "T4 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 17432.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[10.0, 17432.0]], "isOverall": false, "label": "T4 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 11290.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[10.0, 11290.0]], "isOverall": false, "label": "T4 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 9033.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[10.0, 9033.0]], "isOverall": false, "label": "T4 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 114388.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[10.0, 114388.0]], "isOverall": false, "label": "T4 - Q1-Aggregated", "isController": false}, {"data": [[8.0, 3998.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[8.0, 3998.0]], "isOverall": false, "label": "T10 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 73810.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[10.0, 73810.0]], "isOverall": false, "label": "T10 - Q6-Aggregated", "isController": false}, {"data": [[9.0, 37907.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[9.0, 37907.0]], "isOverall": false, "label": "T10 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 37637.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[10.0, 37637.0]], "isOverall": false, "label": "T10 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 61727.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[10.0, 61727.0]], "isOverall": false, "label": "T10 - Q1-Aggregated", "isController": false}, {"data": [[9.0, 6346.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[9.0, 6346.0]], "isOverall": false, "label": "T10 - Q2-Aggregated", "isController": false}, {"data": [[8.0, 7627.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[8.0, 7627.0]], "isOverall": false, "label": "T10 - Q3-Aggregated", "isController": false}, {"data": [[8.0, 3409.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[8.0, 3409.0]], "isOverall": false, "label": "T10 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 230006.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[10.0, 230006.0]], "isOverall": false, "label": "T10 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 24711.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[10.0, 24711.0]], "isOverall": false, "label": "T5 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 14619.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[10.0, 14619.0]], "isOverall": false, "label": "T5 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 4004.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[10.0, 4004.0]], "isOverall": false, "label": "T5 - Q5-Aggregated", "isController": false}, {"data": [[9.0, 40686.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[9.0, 40686.0]], "isOverall": false, "label": "T5 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 110924.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[10.0, 110924.0]], "isOverall": false, "label": "T5 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 4560.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[10.0, 4560.0]], "isOverall": false, "label": "T5 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 18522.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[10.0, 18522.0]], "isOverall": false, "label": "T5 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 6418.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[10.0, 6418.0]], "isOverall": false, "label": "T5 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 250214.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[10.0, 250214.0]], "isOverall": false, "label": "T5 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 111886.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[10.0, 111886.0]], "isOverall": false, "label": "T6 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 6718.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[10.0, 6718.0]], "isOverall": false, "label": "T9 - Q2-Aggregated", "isController": false}, {"data": [[9.0, 81868.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[9.0, 81868.0]], "isOverall": false, "label": "T9 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 69209.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[10.0, 69209.0]], "isOverall": false, "label": "T6 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 384571.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[10.0, 384571.0]], "isOverall": false, "label": "T9 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 6463.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[10.0, 6463.0]], "isOverall": false, "label": "T9 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 19016.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[10.0, 19016.0]], "isOverall": false, "label": "T9 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 73554.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[10.0, 73554.0]], "isOverall": false, "label": "T9 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 13769.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[10.0, 13769.0]], "isOverall": false, "label": "T9 - Q5-Aggregated", "isController": false}, {"data": [[4.0, 3251.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[4.0, 3251.0]], "isOverall": false, "label": "T9 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 27667.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[10.0, 27667.0]], "isOverall": false, "label": "T9 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 28016.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[10.0, 28016.0]], "isOverall": false, "label": "T6 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 68028.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[10.0, 68028.0]], "isOverall": false, "label": "T6 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 65619.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[10.0, 65619.0]], "isOverall": false, "label": "T6 - Q13-Aggregated", "isController": false}, {"data": [[7.0, 49918.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[7.0, 49918.0]], "isOverall": false, "label": "T6 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 485764.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[10.0, 485764.0]], "isOverall": false, "label": "T6 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 21858.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[10.0, 21858.0]], "isOverall": false, "label": "T6 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 88428.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[10.0, 88428.0]], "isOverall": false, "label": "T6 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 17258.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[10.0, 17258.0]], "isOverall": false, "label": "T1 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 116101.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[10.0, 116101.0]], "isOverall": false, "label": "T1 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 31830.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[10.0, 31830.0]], "isOverall": false, "label": "T1 - Q13-Aggregated", "isController": false}, {"data": [[2.0, 14337.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[2.0, 14337.0]], "isOverall": false, "label": "T1 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 326529.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[10.0, 326529.0]], "isOverall": false, "label": "T1 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 42860.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[10.0, 42860.0]], "isOverall": false, "label": "T1 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 93883.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[10.0, 93883.0]], "isOverall": false, "label": "T6 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 24320.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[10.0, 24320.0]], "isOverall": false, "label": "T1 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 54573.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[10.0, 54573.0]], "isOverall": false, "label": "T1 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 484663.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[10.0, 484663.0]], "isOverall": false, "label": "T7 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 32698.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[10.0, 32698.0]], "isOverall": false, "label": "T7 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 134171.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[10.0, 134171.0]], "isOverall": false, "label": "T7 - Q5-Aggregated", "isController": false}, {"data": [[7.0, 5959.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[7.0, 5959.0]], "isOverall": false, "label": "T7 - Q8-Aggregated", "isController": false}, {"data": [[5.0, 25643.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[5.0, 25643.0]], "isOverall": false, "label": "T7 - Q7-Aggregated", "isController": false}, {"data": [[5.0, 2287.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[5.0, 2287.0]], "isOverall": false, "label": "T7 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 27031.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[10.0, 27031.0]], "isOverall": false, "label": "T7 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 19560.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[10.0, 19560.0]], "isOverall": false, "label": "T7 - Q4-Aggregated", "isController": false}, {"data": [[7.0, 36781.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[7.0, 36781.0]], "isOverall": false, "label": "T7 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 4463.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[10.0, 4463.0]], "isOverall": false, "label": "T1 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 75844.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[10.0, 75844.0]], "isOverall": false, "label": "T1 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 128062.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[10.0, 128062.0]], "isOverall": false, "label": "T1 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 93033.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[10.0, 93033.0]], "isOverall": false, "label": "T5 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 3930.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[10.0, 3930.0]], "isOverall": false, "label": "T5 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 36956.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[10.0, 36956.0]], "isOverall": false, "label": "T3 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 31.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[10.0, 31.0]], "isOverall": false, "label": "T1 - RF2-Aggregated", "isController": false}, {"data": [[3.0, 4653.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[3.0, 4653.0]], "isOverall": false, "label": "T3 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 8374.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[10.0, 8374.0]], "isOverall": false, "label": "T3 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 112778.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[10.0, 112778.0]], "isOverall": false, "label": "T3 - Q6-Aggregated", "isController": false}, {"data": [[3.0, 641168.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[3.0, 641168.0]], "isOverall": false, "label": "T3 - Q9-Aggregated", "isController": false}, {"data": [[3.0, 3937.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[3.0, 3937.0]], "isOverall": false, "label": "T3 - Q3-Aggregated", "isController": false}, {"data": [[3.0, 2714.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[3.0, 2714.0]], "isOverall": false, "label": "T3 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 1326.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[10.0, 1326.0]], "isOverall": false, "label": "T1 - RF1-Aggregated", "isController": false}, {"data": [[10.0, 132043.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[10.0, 132043.0]], "isOverall": false, "label": "T7 - Q21-Aggregated", "isController": false}, {"data": [[3.0, 54843.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[3.0, 54843.0]], "isOverall": false, "label": "T3 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 13863.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[10.0, 13863.0]], "isOverall": false, "label": "T3 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 13889.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[10.0, 13889.0]], "isOverall": false, "label": "T7 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 96065.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[10.0, 96065.0]], "isOverall": false, "label": "T7 - Q18-Aggregated", "isController": false}, {"data": [[2.0, 13996.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[2.0, 13996.0]], "isOverall": false, "label": "T1 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 77269.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[10.0, 77269.0]], "isOverall": false, "label": "T7 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 4609.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[10.0, 4609.0]], "isOverall": false, "label": "T1 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 7931.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[10.0, 7931.0]], "isOverall": false, "label": "T1 - Q3-Aggregated", "isController": false}, {"data": [[7.0, 5573.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[7.0, 5573.0]], "isOverall": false, "label": "T7 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 8574.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[10.0, 8574.0]], "isOverall": false, "label": "T1 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 4644.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[10.0, 4644.0]], "isOverall": false, "label": "T1 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 61783.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[10.0, 61783.0]], "isOverall": false, "label": "T7 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 229586.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[10.0, 229586.0]], "isOverall": false, "label": "T1 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 185332.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[10.0, 185332.0]], "isOverall": false, "label": "T7 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 32256.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[10.0, 32256.0]], "isOverall": false, "label": "T1 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 34296.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[10.0, 34296.0]], "isOverall": false, "label": "T7 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 12855.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[10.0, 12855.0]], "isOverall": false, "label": "T1 - Q8-Aggregated", "isController": false}, {"data": [[9.0, 48314.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[9.0, 48314.0]], "isOverall": false, "label": "T7 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 12598.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[10.0, 12598.0]], "isOverall": false, "label": "T7 - Q10-Aggregated", "isController": false}, {"data": [[2.0, 653973.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[2.0, 653973.0]], "isOverall": false, "label": "T1 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 20303.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[10.0, 20303.0]], "isOverall": false, "label": "T7 - Q11-Aggregated", "isController": false}, {"data": [[9.0, 8676.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[9.0, 8676.0]], "isOverall": false, "label": "T4 - Q16-Aggregated", "isController": false}, {"data": [[9.0, 485840.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[9.0, 485840.0]], "isOverall": false, "label": "T4 - Q15-Aggregated", "isController": false}, {"data": [[1.0, 9981.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.0, 9981.0]], "isOverall": false, "label": "T4 - Q14-Aggregated", "isController": false}, {"data": [[1.0, 13604.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.0, 13604.0]], "isOverall": false, "label": "T4 - Q13-Aggregated", "isController": false}, {"data": [[7.0, 81464.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[7.0, 81464.0]], "isOverall": false, "label": "T4 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 83338.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[10.0, 83338.0]], "isOverall": false, "label": "T4 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 33139.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[10.0, 33139.0]], "isOverall": false, "label": "T4 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 83421.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[10.0, 83421.0]], "isOverall": false, "label": "T4 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 3061.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[10.0, 3061.0]], "isOverall": false, "label": "T8 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 107216.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[10.0, 107216.0]], "isOverall": false, "label": "T2 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 3912.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[10.0, 3912.0]], "isOverall": false, "label": "T8 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 26131.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[10.0, 26131.0]], "isOverall": false, "label": "T2 - Q3-Aggregated", "isController": false}, {"data": [[9.0, 25061.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[9.0, 25061.0]], "isOverall": false, "label": "T8 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 5788.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[10.0, 5788.0]], "isOverall": false, "label": "T2 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 28109.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[10.0, 28109.0]], "isOverall": false, "label": "T8 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 29380.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[10.0, 29380.0]], "isOverall": false, "label": "T8 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 300295.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[10.0, 300295.0]], "isOverall": false, "label": "T8 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 84969.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[10.0, 84969.0]], "isOverall": false, "label": "T8 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 64578.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[10.0, 64578.0]], "isOverall": false, "label": "T6 - Q10-Aggregated", "isController": false}, {"data": [[9.0, 48151.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[9.0, 48151.0]], "isOverall": false, "label": "T8 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 98694.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[10.0, 98694.0]], "isOverall": false, "label": "T2 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 37348.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[10.0, 37348.0]], "isOverall": false, "label": "T2 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 19726.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[10.0, 19726.0]], "isOverall": false, "label": "T2 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 4563.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[10.0, 4563.0]], "isOverall": false, "label": "T2 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 60946.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[10.0, 60946.0]], "isOverall": false, "label": "T2 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 22324.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[10.0, 22324.0]], "isOverall": false, "label": "T5 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 231689.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[10.0, 231689.0]], "isOverall": false, "label": "T2 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 50376.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[10.0, 50376.0]], "isOverall": false, "label": "T5 - Q21-Aggregated", "isController": false}, {"data": [[9.0, 35584.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[9.0, 35584.0]], "isOverall": false, "label": "T5 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 84944.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[10.0, 84944.0]], "isOverall": false, "label": "T5 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 320109.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[10.0, 320109.0]], "isOverall": false, "label": "T5 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 82289.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[10.0, 82289.0]], "isOverall": false, "label": "T5 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 11502.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[10.0, 11502.0]], "isOverall": false, "label": "T5 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 52344.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[10.0, 52344.0]], "isOverall": false, "label": "T5 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 152738.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[10.0, 152738.0]], "isOverall": false, "label": "T5 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 61245.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}, {"data": [[10.0, 61245.0]], "isOverall": false, "label": "T8 - Q1-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.69217532E12, "maxY": 20154.716666666667, "series": [{"data": [[1.69217568E12, 5164.633333333333], [1.6921773E12, 5.116666666666666], [1.69217538E12, 11.366666666666667], [1.692177E12, 10.966666666666667], [1.6921767E12, 13701.766666666666], [1.6921764E12, 460.18333333333334], [1.6921761E12, 7704.1], [1.6921758E12, 582.3666666666667], [1.6921755E12, 337.78333333333336], [1.69217712E12, 144.03333333333333], [1.69217682E12, 7.533333333333333], [1.69217652E12, 13631.65], [1.69217622E12, 0.7333333333333333], [1.69217592E12, 136.96666666666667], [1.69217562E12, 182.85], [1.69217532E12, 0.15], [1.69217724E12, 133.45], [1.69217694E12, 11439.416666666666], [1.69217664E12, 11976.116666666667], [1.69217634E12, 126.33333333333333], [1.69217604E12, 18667.083333333332], [1.69217574E12, 72.3], [1.69217544E12, 17395.233333333334], [1.69217706E12, 1.5666666666666667], [1.69217676E12, 14465.716666666667], [1.69217646E12, 282.3333333333333], [1.69217616E12, 15528.383333333333], [1.69217586E12, 11554.7], [1.69217556E12, 11.8], [1.69217658E12, 8934.733333333334], [1.69217628E12, 20154.716666666667], [1.69217598E12, 67.88333333333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69217568E12, 0.0], [1.6921773E12, 0.0], [1.69217538E12, 0.0], [1.692177E12, 0.0], [1.6921767E12, 0.0], [1.6921764E12, 0.0], [1.6921761E12, 0.0], [1.6921758E12, 0.0], [1.6921755E12, 0.0], [1.69217712E12, 0.0], [1.69217682E12, 0.0], [1.69217652E12, 0.0], [1.69217622E12, 0.0], [1.69217592E12, 0.0], [1.69217562E12, 0.0], [1.69217532E12, 0.0], [1.69217724E12, 0.0], [1.69217694E12, 0.0], [1.69217664E12, 0.0], [1.69217634E12, 0.0], [1.69217604E12, 0.0], [1.69217574E12, 0.0], [1.69217544E12, 0.0], [1.69217706E12, 0.0], [1.69217676E12, 0.0], [1.69217646E12, 0.0], [1.69217616E12, 0.0], [1.69217586E12, 0.0], [1.69217556E12, 0.0], [1.69217658E12, 0.0], [1.69217628E12, 0.0], [1.69217598E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6921773E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 31.0, "minX": 1.69217532E12, "maxY": 653973.0, "series": [{"data": [[1.6921758E12, 155030.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.69217682E12, 38286.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.69217658E12, 8570.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.69217652E12, 89546.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.6921755E12, 231935.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69217544E12, 3640.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69217616E12, 5075.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69217544E12, 133367.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69217562E12, 50288.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69217598E12, 303913.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.69217664E12, 91893.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69217676E12, 124070.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.69217604E12, 240637.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.6921761E12, 37961.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69217562E12, 142811.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.6921761E12, 14130.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.6921767E12, 8248.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69217682E12, 13104.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.69217706E12, 21604.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.69217628E12, 112697.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.6921758E12, 411363.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.69217694E12, 17571.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69217694E12, 9358.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.6921758E12, 31443.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.69217544E12, 8841.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69217604E12, 82410.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.69217658E12, 20657.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.69217598E12, 121051.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69217604E12, 12909.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.69217544E12, 153087.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69217586E12, 9740.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69217604E12, 34044.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69217562E12, 317269.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[1.69217568E12, 8673.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[1.6921767E12, 57354.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1.69217544E12, 4858.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[1.6921758E12, 104289.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[1.69217604E12, 27961.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.6921761E12, 25076.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69217538E12, 93976.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69217676E12, 6330.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1.6921755E12, 7716.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[1.69217616E12, 73161.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69217538E12, 21774.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1.6921767E12, 29149.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[1.6921755E12, 33246.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1.69217604E12, 34721.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[1.69217592E12, 48957.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[1.6921761E12, 58869.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1.69217628E12, 170307.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[1.69217616E12, 5260.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.6921767E12, 7758.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[1.69217664E12, 112205.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.69217664E12, 7152.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[1.69217676E12, 4588.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1.69217676E12, 46125.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1.6921758E12, 106335.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[1.69217592E12, 85645.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[1.69217616E12, 34276.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69217574E12, 122180.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69217586E12, 15458.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69217646E12, 282877.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.6921761E12, 51692.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69217586E12, 13026.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.69217604E12, 32495.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.69217616E12, 7319.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69217652E12, 51938.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69217724E12, 490113.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69217724E12, 3915.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69217568E12, 69169.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.69217562E12, 130130.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.6921761E12, 12490.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.6921758E12, 17432.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.69217544E12, 11290.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69217604E12, 9033.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.6921758E12, 114388.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.6921767E12, 3998.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69217622E12, 73810.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.6921767E12, 37907.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69217556E12, 37637.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69217568E12, 61727.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.6921767E12, 6346.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.6921767E12, 7627.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.6921767E12, 3409.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69217646E12, 230006.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.69217664E12, 24711.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69217604E12, 14619.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.6921761E12, 4004.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.6921767E12, 40686.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.69217658E12, 110924.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69217658E12, 4560.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.6921764E12, 18522.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69217574E12, 6418.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.6921764E12, 250214.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69217598E12, 111886.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[1.69217544E12, 6718.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.69217664E12, 81868.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69217568E12, 69209.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1.69217646E12, 384571.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69217544E12, 6463.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.6921755E12, 19016.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69217652E12, 73554.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69217658E12, 13769.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69217682E12, 3251.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69217652E12, 27667.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.69217652E12, 28016.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1.69217586E12, 68028.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[1.69217556E12, 65619.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1.69217676E12, 49918.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[1.69217652E12, 485764.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1.69217544E12, 21858.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[1.69217664E12, 88428.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[1.69217628E12, 17258.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69217562E12, 116101.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69217628E12, 31830.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69217712E12, 14337.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69217616E12, 326529.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6921764E12, 42860.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69217538E12, 93883.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[1.6921758E12, 24320.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69217634E12, 54573.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69217592E12, 484663.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[1.69217664E12, 32698.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[1.69217544E12, 134171.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1.69217676E12, 5959.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[1.69217676E12, 25643.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1.69217676E12, 2287.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1.69217652E12, 27031.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[1.69217604E12, 19560.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1.69217676E12, 36781.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1.69217628E12, 4463.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69217622E12, 75844.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.6921758E12, 128062.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69217568E12, 93033.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69217574E12, 3930.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69217586E12, 36956.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69217562E12, 31.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69217706E12, 4653.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.69217598E12, 8374.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69217598E12, 112778.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.69217694E12, 641168.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69217694E12, 3937.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.69217694E12, 2714.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69217532E12, 1326.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69217604E12, 132043.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[1.692177E12, 54843.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.6921758E12, 13863.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.69217664E12, 13889.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[1.69217646E12, 96065.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[1.69217712E12, 13996.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69217616E12, 77269.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1.6921764E12, 4609.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69217634E12, 7931.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69217676E12, 5573.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[1.6921758E12, 8574.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69217634E12, 4644.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69217658E12, 61783.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[1.6921755E12, 229586.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69217634E12, 185332.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[1.69217646E12, 32256.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69217646E12, 34296.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[1.6921758E12, 12855.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.6921767E12, 48314.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[1.69217634E12, 12598.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[1.69217712E12, 653973.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69217652E12, 20303.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[1.69217664E12, 8676.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.69217664E12, 485840.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.69217724E12, 9981.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.6921773E12, 13604.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69217676E12, 81464.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69217616E12, 83338.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69217604E12, 33139.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69217586E12, 83421.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69217568E12, 3061.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[1.69217598E12, 107216.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69217568E12, 3912.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[1.69217586E12, 26131.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69217664E12, 25061.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[1.69217616E12, 5788.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69217628E12, 28109.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1.69217664E12, 29380.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[1.69217658E12, 300295.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1.69217604E12, 84969.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[1.69217562E12, 64578.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[1.6921767E12, 48151.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1.6921758E12, 98694.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69217652E12, 37348.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69217604E12, 19726.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69217586E12, 4563.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69217556E12, 60946.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.6921758E12, 22324.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.6921755E12, 231689.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.6921761E12, 50376.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.6921767E12, 35584.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69217646E12, 84944.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69217562E12, 320109.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69217586E12, 82289.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.6921761E12, 11502.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.6921758E12, 52344.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69217604E12, 152738.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69217568E12, 61245.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6921773E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 31.0, "minX": 1.69217532E12, "maxY": 653972.0, "series": [{"data": [[1.6921758E12, 155030.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.69217682E12, 38286.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.69217658E12, 8562.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.69217652E12, 89545.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.6921755E12, 231934.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69217544E12, 3640.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69217616E12, 5071.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69217544E12, 133314.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69217562E12, 50288.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69217598E12, 303913.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.69217664E12, 91893.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69217676E12, 124069.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.69217604E12, 240637.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.6921761E12, 37961.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69217562E12, 142811.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.6921761E12, 14129.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.6921767E12, 8244.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69217682E12, 13104.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.69217706E12, 21604.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.69217628E12, 112696.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.6921758E12, 411362.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.69217694E12, 17570.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69217694E12, 9348.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.6921758E12, 31443.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.69217544E12, 8841.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69217604E12, 82409.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.69217658E12, 20656.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.69217598E12, 121051.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69217604E12, 12898.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.69217544E12, 153086.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69217586E12, 9739.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69217604E12, 34044.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69217562E12, 317269.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[1.69217568E12, 8673.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[1.6921767E12, 57354.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1.69217544E12, 4857.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[1.6921758E12, 104288.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[1.69217604E12, 27881.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.6921761E12, 25076.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69217538E12, 93975.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69217676E12, 6330.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1.6921755E12, 7715.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[1.69217616E12, 73161.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69217538E12, 21774.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1.6921767E12, 29149.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[1.6921755E12, 33246.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1.69217604E12, 34721.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[1.69217592E12, 48957.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[1.6921761E12, 58868.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1.69217628E12, 170306.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[1.69217616E12, 5260.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.6921767E12, 7752.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[1.69217664E12, 112205.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.69217664E12, 7152.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[1.69217676E12, 4584.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1.69217676E12, 46125.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1.6921758E12, 106335.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[1.69217592E12, 85645.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[1.69217616E12, 34275.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69217574E12, 122179.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69217586E12, 15441.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69217646E12, 282877.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.6921761E12, 51691.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69217586E12, 13026.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.69217604E12, 32495.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.69217616E12, 7314.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69217652E12, 51938.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69217724E12, 490113.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69217724E12, 3915.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69217568E12, 69169.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.69217562E12, 130129.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.6921761E12, 12489.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.6921758E12, 17432.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.69217544E12, 11288.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69217604E12, 9033.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.6921758E12, 114388.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.6921767E12, 3998.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69217622E12, 73810.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.6921767E12, 37907.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69217556E12, 37637.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69217568E12, 61726.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.6921767E12, 6346.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.6921767E12, 7627.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.6921767E12, 3409.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69217646E12, 230006.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.69217664E12, 24711.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69217604E12, 14619.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.6921761E12, 4004.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.6921767E12, 40686.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.69217658E12, 110924.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69217658E12, 4560.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.6921764E12, 18522.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69217574E12, 6418.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.6921764E12, 250214.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69217598E12, 111886.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[1.69217544E12, 6717.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.69217664E12, 81868.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69217568E12, 69209.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1.69217646E12, 384571.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69217544E12, 6462.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.6921755E12, 19016.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69217652E12, 73554.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69217658E12, 13769.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69217682E12, 3251.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69217652E12, 27666.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.69217652E12, 28008.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1.69217586E12, 68028.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[1.69217556E12, 65619.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1.69217676E12, 49918.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[1.69217652E12, 485764.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1.69217544E12, 21814.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[1.69217664E12, 88428.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[1.69217628E12, 17244.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69217562E12, 116101.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69217628E12, 31830.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69217712E12, 14337.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69217616E12, 326529.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6921764E12, 42860.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69217538E12, 93878.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[1.6921758E12, 24320.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69217634E12, 54573.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69217592E12, 484663.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[1.69217664E12, 32698.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[1.69217544E12, 134171.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1.69217676E12, 5959.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[1.69217676E12, 25643.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1.69217676E12, 2287.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1.69217652E12, 27031.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[1.69217604E12, 19560.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1.69217676E12, 36781.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1.69217628E12, 4452.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69217622E12, 75844.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.6921758E12, 128062.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69217568E12, 93017.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69217574E12, 3930.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69217586E12, 36956.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69217562E12, 31.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69217706E12, 4653.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.69217598E12, 8374.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69217598E12, 112778.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.69217694E12, 641168.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69217694E12, 3936.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.69217694E12, 2714.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69217532E12, 1325.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69217604E12, 132042.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[1.692177E12, 54842.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.6921758E12, 13863.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.69217664E12, 13888.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[1.69217646E12, 96064.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[1.69217712E12, 13995.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69217616E12, 77268.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1.6921764E12, 4609.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69217634E12, 7930.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69217676E12, 5564.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[1.6921758E12, 8574.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69217634E12, 4644.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69217658E12, 61783.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[1.6921755E12, 229586.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69217634E12, 185332.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[1.69217646E12, 32256.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69217646E12, 34296.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[1.6921758E12, 12855.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.6921767E12, 48314.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[1.69217634E12, 12598.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[1.69217712E12, 653972.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69217652E12, 20298.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[1.69217664E12, 8670.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.69217664E12, 485840.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.69217724E12, 9981.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.6921773E12, 13604.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69217676E12, 81464.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69217616E12, 83337.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69217604E12, 33139.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69217586E12, 83420.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69217568E12, 3060.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[1.69217598E12, 107215.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69217568E12, 3912.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[1.69217586E12, 26130.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69217664E12, 25060.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[1.69217616E12, 5788.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69217628E12, 28108.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1.69217664E12, 29380.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[1.69217658E12, 300295.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1.69217604E12, 84969.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[1.69217562E12, 64578.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[1.6921767E12, 48151.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1.6921758E12, 98693.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69217652E12, 37348.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69217604E12, 19726.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69217586E12, 4563.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69217556E12, 60946.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.6921758E12, 22324.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.6921755E12, 231689.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.6921761E12, 50376.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.6921767E12, 35584.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69217646E12, 84944.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69217562E12, 320109.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69217586E12, 82289.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.6921761E12, 11497.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.6921758E12, 52344.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69217604E12, 152738.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69217568E12, 61245.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6921773E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69217532E12, "maxY": 1324.0, "series": [{"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.69217682E12, 0.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.69217658E12, 0.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.69217652E12, 0.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.6921755E12, 1321.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69217544E12, 0.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69217616E12, 0.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69217544E12, 1305.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69217562E12, 0.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69217598E12, 0.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.6921761E12, 0.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69217562E12, 0.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.6921761E12, 0.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69217682E12, 0.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.69217706E12, 0.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.69217628E12, 0.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.6921758E12, 1.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.69217694E12, 1.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69217694E12, 0.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.69217544E12, 0.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.69217658E12, 0.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.69217598E12, 0.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.69217544E12, 1314.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69217586E12, 0.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69217562E12, 1321.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[1.69217568E12, 0.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1.69217544E12, 0.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.6921761E12, 0.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69217538E12, 1324.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1.6921755E12, 0.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[1.69217616E12, 0.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69217538E12, 0.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[1.6921755E12, 0.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[1.69217592E12, 1.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[1.6921761E12, 0.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1.69217628E12, 0.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[1.69217616E12, 0.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.6921767E12, 1.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[1.69217592E12, 0.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[1.69217616E12, 0.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69217574E12, 0.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69217586E12, 0.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69217646E12, 0.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.6921761E12, 0.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.69217586E12, 0.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.69217616E12, 0.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.69217652E12, 0.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69217724E12, 0.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69217724E12, 0.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69217568E12, 0.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.69217562E12, 1.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.6921761E12, 0.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.69217544E12, 0.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.6921758E12, 1.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69217622E12, 0.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.6921767E12, 1.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69217556E12, 3.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69217568E12, 0.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69217646E12, 0.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.6921761E12, 1.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.69217658E12, 0.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69217658E12, 1.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.6921764E12, 0.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69217574E12, 0.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.6921764E12, 0.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69217598E12, 0.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[1.69217544E12, 0.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69217568E12, 0.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1.69217646E12, 0.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69217544E12, 0.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.6921755E12, 0.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69217652E12, 0.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69217658E12, 0.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69217682E12, 0.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69217652E12, 0.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.69217652E12, 0.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1.69217586E12, 0.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[1.69217556E12, 0.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[1.69217652E12, 0.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1.69217544E12, 0.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[1.69217628E12, 0.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69217562E12, 0.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69217628E12, 0.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69217712E12, 0.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69217616E12, 0.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6921764E12, 0.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69217538E12, 1313.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69217634E12, 0.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.69217592E12, 1.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[1.69217544E12, 1311.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1.69217652E12, 1.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1.69217628E12, 0.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69217622E12, 0.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69217568E12, 0.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69217574E12, 1.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.69217586E12, 0.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69217562E12, 0.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69217706E12, 0.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.69217598E12, 0.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69217598E12, 0.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.69217694E12, 0.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69217694E12, 0.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.69217694E12, 0.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69217532E12, 1313.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[1.692177E12, 0.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[1.69217646E12, 0.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[1.69217712E12, 0.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69217616E12, 0.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1.6921764E12, 0.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69217634E12, 0.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69217634E12, 0.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69217658E12, 0.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[1.6921755E12, 0.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69217634E12, 0.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[1.69217646E12, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69217646E12, 0.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[1.69217634E12, 0.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[1.69217712E12, 0.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69217652E12, 0.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.69217664E12, 1.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.69217724E12, 0.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.6921773E12, 0.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69217676E12, 0.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69217616E12, 0.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69217586E12, 0.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69217568E12, 0.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[1.69217598E12, 0.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69217568E12, 0.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[1.69217586E12, 0.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[1.69217616E12, 0.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.69217628E12, 0.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1.69217664E12, 0.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[1.69217658E12, 0.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[1.69217562E12, 0.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69217652E12, 0.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69217586E12, 0.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.69217556E12, 0.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.6921755E12, 1321.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.6921761E12, 1.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.6921767E12, 0.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69217646E12, 0.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69217562E12, 1313.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.69217586E12, 0.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.6921761E12, 0.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.6921758E12, 0.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69217604E12, 0.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69217568E12, 0.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6921773E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 31.0, "minX": 1.69217532E12, "maxY": 653973.0, "series": [{"data": [[1.69217568E12, 93033.0], [1.6921773E12, 13604.0], [1.69217538E12, 93976.0], [1.692177E12, 54843.0], [1.6921767E12, 57354.0], [1.6921764E12, 250214.0], [1.6921761E12, 58869.0], [1.6921758E12, 411363.0], [1.6921755E12, 231935.0], [1.69217712E12, 653973.0], [1.69217682E12, 38286.0], [1.69217652E12, 485764.0], [1.69217622E12, 75844.0], [1.69217592E12, 484663.0], [1.69217562E12, 320109.0], [1.69217532E12, 1326.0], [1.69217724E12, 490113.0], [1.69217694E12, 641168.0], [1.69217664E12, 485840.0], [1.69217634E12, 185332.0], [1.69217604E12, 240637.0], [1.69217574E12, 122180.0], [1.69217544E12, 153087.0], [1.69217706E12, 21604.0], [1.69217676E12, 124070.0], [1.69217646E12, 384571.0], [1.69217616E12, 326529.0], [1.69217586E12, 83421.0], [1.69217556E12, 65619.0], [1.69217658E12, 300295.0], [1.69217628E12, 170307.0], [1.69217598E12, 303913.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69217568E12, 93033.0], [1.6921773E12, 13604.0], [1.69217538E12, 93976.0], [1.692177E12, 54843.0], [1.6921767E12, 53738.0], [1.6921764E12, 250214.0], [1.6921761E12, 58869.0], [1.6921758E12, 257563.20000000007], [1.6921755E12, 231935.0], [1.69217712E12, 653973.0], [1.69217682E12, 38286.0], [1.69217652E12, 485764.0], [1.69217622E12, 75844.0], [1.69217592E12, 484663.0], [1.69217562E12, 320109.0], [1.69217532E12, 1326.0], [1.69217724E12, 490113.0], [1.69217694E12, 641168.0], [1.69217664E12, 373749.5000000004], [1.69217634E12, 185332.0], [1.69217604E12, 187897.60000000003], [1.69217574E12, 122180.0], [1.69217544E12, 151195.4], [1.69217706E12, 21604.0], [1.69217676E12, 115548.80000000003], [1.69217646E12, 384571.0], [1.69217616E12, 326529.0], [1.69217586E12, 83421.0], [1.69217556E12, 65619.0], [1.69217658E12, 300295.0], [1.69217628E12, 170307.0], [1.69217598E12, 303913.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69217568E12, 93033.0], [1.6921773E12, 13604.0], [1.69217538E12, 93976.0], [1.692177E12, 54843.0], [1.6921767E12, 57354.0], [1.6921764E12, 250214.0], [1.6921761E12, 58869.0], [1.6921758E12, 411363.0], [1.6921755E12, 231935.0], [1.69217712E12, 653973.0], [1.69217682E12, 38286.0], [1.69217652E12, 485764.0], [1.69217622E12, 75844.0], [1.69217592E12, 484663.0], [1.69217562E12, 320109.0], [1.69217532E12, 1326.0], [1.69217724E12, 490113.0], [1.69217694E12, 641168.0], [1.69217664E12, 485840.0], [1.69217634E12, 185332.0], [1.69217604E12, 240637.0], [1.69217574E12, 122180.0], [1.69217544E12, 153087.0], [1.69217706E12, 21604.0], [1.69217676E12, 124070.0], [1.69217646E12, 384571.0], [1.69217616E12, 326529.0], [1.69217586E12, 83421.0], [1.69217556E12, 65619.0], [1.69217658E12, 300295.0], [1.69217628E12, 170307.0], [1.69217598E12, 303913.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69217568E12, 93033.0], [1.6921773E12, 13604.0], [1.69217538E12, 93976.0], [1.692177E12, 54843.0], [1.6921767E12, 57354.0], [1.6921764E12, 250214.0], [1.6921761E12, 58869.0], [1.6921758E12, 411363.0], [1.6921755E12, 231935.0], [1.69217712E12, 653973.0], [1.69217682E12, 38286.0], [1.69217652E12, 485764.0], [1.69217622E12, 75844.0], [1.69217592E12, 484663.0], [1.69217562E12, 320109.0], [1.69217532E12, 1326.0], [1.69217724E12, 490113.0], [1.69217694E12, 641168.0], [1.69217664E12, 485840.0], [1.69217634E12, 185332.0], [1.69217604E12, 240637.0], [1.69217574E12, 122180.0], [1.69217544E12, 153087.0], [1.69217706E12, 21604.0], [1.69217676E12, 124070.0], [1.69217646E12, 384571.0], [1.69217616E12, 326529.0], [1.69217586E12, 83421.0], [1.69217556E12, 65619.0], [1.69217658E12, 300295.0], [1.69217628E12, 170307.0], [1.69217598E12, 303913.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69217568E12, 3061.0], [1.6921773E12, 13604.0], [1.69217538E12, 21774.0], [1.692177E12, 54843.0], [1.6921767E12, 3409.0], [1.6921764E12, 4609.0], [1.6921761E12, 4004.0], [1.6921758E12, 8574.0], [1.6921755E12, 7716.0], [1.69217712E12, 13996.0], [1.69217682E12, 3251.0], [1.69217652E12, 20303.0], [1.69217622E12, 73810.0], [1.69217592E12, 48957.0], [1.69217562E12, 31.0], [1.69217532E12, 1326.0], [1.69217724E12, 3915.0], [1.69217694E12, 2714.0], [1.69217664E12, 7152.0], [1.69217634E12, 4644.0], [1.69217604E12, 9033.0], [1.69217574E12, 3930.0], [1.69217544E12, 3640.0], [1.69217706E12, 4653.0], [1.69217676E12, 2287.0], [1.69217646E12, 32256.0], [1.69217616E12, 5075.0], [1.69217586E12, 4563.0], [1.69217556E12, 37637.0], [1.69217658E12, 4560.0], [1.69217628E12, 4463.0], [1.69217598E12, 8374.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69217568E12, 61486.0], [1.6921773E12, 13604.0], [1.69217538E12, 93883.0], [1.692177E12, 54843.0], [1.6921767E12, 29149.0], [1.6921764E12, 30691.0], [1.6921761E12, 25076.0], [1.6921758E12, 52344.0], [1.6921755E12, 131416.0], [1.69217712E12, 14337.0], [1.69217682E12, 13104.0], [1.69217652E12, 37348.0], [1.69217622E12, 74827.0], [1.69217592E12, 85645.0], [1.69217562E12, 123115.5], [1.69217532E12, 1326.0], [1.69217724E12, 9981.0], [1.69217694E12, 9358.0], [1.69217664E12, 31039.0], [1.69217634E12, 12598.0], [1.69217604E12, 33139.0], [1.69217574E12, 6418.0], [1.69217544E12, 10065.5], [1.69217706E12, 13128.5], [1.69217676E12, 25643.0], [1.69217646E12, 96065.0], [1.69217616E12, 34276.0], [1.69217586E12, 26131.0], [1.69217556E12, 60946.0], [1.69217658E12, 20657.0], [1.69217628E12, 29969.5], [1.69217598E12, 112332.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6921773E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 33371.0, "minX": 1.0, "maxY": 34508.5, "series": [{"data": [[1.0, 34508.5], [2.0, 33371.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 33371.0, "minX": 1.0, "maxY": 34508.5, "series": [{"data": [[1.0, 34508.5], [2.0, 33371.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69217532E12, "maxY": 0.25, "series": [{"data": [[1.69217568E12, 0.13333333333333333], [1.69217538E12, 0.03333333333333333], [1.692177E12, 0.016666666666666666], [1.6921767E12, 0.18333333333333332], [1.6921764E12, 0.06666666666666667], [1.6921761E12, 0.18333333333333332], [1.6921758E12, 0.25], [1.6921755E12, 0.1], [1.69217712E12, 0.03333333333333333], [1.69217682E12, 0.03333333333333333], [1.69217652E12, 0.13333333333333333], [1.69217622E12, 0.03333333333333333], [1.69217592E12, 0.05], [1.69217562E12, 0.13333333333333333], [1.69217532E12, 0.18333333333333332], [1.69217724E12, 0.05], [1.69217694E12, 0.08333333333333333], [1.69217664E12, 0.18333333333333332], [1.69217634E12, 0.08333333333333333], [1.69217604E12, 0.21666666666666667], [1.69217574E12, 0.05], [1.69217544E12, 0.18333333333333332], [1.69217706E12, 0.016666666666666666], [1.69217676E12, 0.13333333333333333], [1.69217646E12, 0.11666666666666667], [1.69217616E12, 0.15], [1.69217586E12, 0.15], [1.69217556E12, 0.05], [1.69217658E12, 0.13333333333333333], [1.69217628E12, 0.1], [1.69217598E12, 0.1]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69217724E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69217532E12, "maxY": 0.25, "series": [{"data": [[1.69217568E12, 0.13333333333333333], [1.6921773E12, 0.016666666666666666], [1.69217538E12, 0.05], [1.692177E12, 0.016666666666666666], [1.6921767E12, 0.21666666666666667], [1.6921764E12, 0.06666666666666667], [1.6921761E12, 0.15], [1.6921758E12, 0.25], [1.6921755E12, 0.1], [1.69217712E12, 0.05], [1.69217682E12, 0.05], [1.69217652E12, 0.15], [1.69217622E12, 0.03333333333333333], [1.69217592E12, 0.05], [1.69217562E12, 0.13333333333333333], [1.69217532E12, 0.016666666666666666], [1.69217724E12, 0.05], [1.69217694E12, 0.08333333333333333], [1.69217664E12, 0.2], [1.69217634E12, 0.08333333333333333], [1.69217604E12, 0.25], [1.69217574E12, 0.05], [1.69217544E12, 0.16666666666666666], [1.69217706E12, 0.03333333333333333], [1.69217676E12, 0.18333333333333332], [1.69217646E12, 0.11666666666666667], [1.69217616E12, 0.15], [1.69217586E12, 0.15], [1.69217556E12, 0.05], [1.69217658E12, 0.11666666666666667], [1.69217628E12, 0.1], [1.69217598E12, 0.1]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6921773E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69217532E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q14-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q2-success", "isController": false}, {"data": [[1.69217568E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q1-success", "isController": false}, {"data": [[1.69217592E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q13-success", "isController": false}, {"data": [[1.69217538E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q13-success", "isController": false}, {"data": [[1.69217616E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q19-success", "isController": false}, {"data": [[1.69217682E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q4-success", "isController": false}, {"data": [[1.6921764E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q14-success", "isController": false}, {"data": [[1.6921761E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q5-success", "isController": false}, {"data": [[1.69217646E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q12-success", "isController": false}, {"data": [[1.69217616E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q19-success", "isController": false}, {"data": [[1.6921755E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q7-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q3-success", "isController": false}, {"data": [[1.69217616E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q18-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q3-success", "isController": false}, {"data": [[1.69217646E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q7-success", "isController": false}, {"data": [[1.69217556E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q7-success", "isController": false}, {"data": [[1.69217586E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q21-success", "isController": false}, {"data": [[1.69217652E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q11-success", "isController": false}, {"data": [[1.69217592E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q9-success", "isController": false}, {"data": [[1.69217658E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q9-success", "isController": false}, {"data": [[1.69217598E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q5-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q18-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q7-success", "isController": false}, {"data": [[1.69217598E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q12-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q22-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q10-success", "isController": false}, {"data": [[1.69217562E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q14-success", "isController": false}, {"data": [[1.69217694E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q16-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q3-success", "isController": false}, {"data": [[1.69217562E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q15-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q21-success", "isController": false}, {"data": [[1.69217652E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q11-success", "isController": false}, {"data": [[1.69217586E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q4-success", "isController": false}, {"data": [[1.69217586E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q16-success", "isController": false}, {"data": [[1.6921764E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q2-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q6-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q2-success", "isController": false}, {"data": [[1.69217658E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q14-success", "isController": false}, {"data": [[1.69217568E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q4-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q10-success", "isController": false}, {"data": [[1.69217724E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q8-success", "isController": false}, {"data": [[1.69217562E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF2-success", "isController": false}, {"data": [[1.69217568E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q22-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q8-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q15-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q6-success", "isController": false}, {"data": [[1.69217682E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q13-success", "isController": false}, {"data": [[1.69217628E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q16-success", "isController": false}, {"data": [[1.69217706E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q19-success", "isController": false}, {"data": [[1.69217628E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q15-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q22-success", "isController": false}, {"data": [[1.69217652E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q8-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q2-success", "isController": false}, {"data": [[1.69217658E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q2-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q11-success", "isController": false}, {"data": [[1.69217586E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q12-success", "isController": false}, {"data": [[1.69217628E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q3-success", "isController": false}, {"data": [[1.6921761E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q5-success", "isController": false}, {"data": [[1.69217538E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q5-success", "isController": false}, {"data": [[1.69217586E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q14-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q11-success", "isController": false}, {"data": [[1.69217634E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q5-success", "isController": false}, {"data": [[1.69217586E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q7-success", "isController": false}, {"data": [[1.69217658E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q5-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q3-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q21-success", "isController": false}, {"data": [[1.69217562E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q12-success", "isController": false}, {"data": [[1.6921755E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q19-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q5-success", "isController": false}, {"data": [[1.69217562E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q21-success", "isController": false}, {"data": [[1.69217622E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q19-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q7-success", "isController": false}, {"data": [[1.69217556E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q8-success", "isController": false}, {"data": [[1.6921761E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q21-success", "isController": false}, {"data": [[1.69217616E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q11-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q5-success", "isController": false}, {"data": [[1.69217652E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q1-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q8-success", "isController": false}, {"data": [[1.69217628E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q11-success", "isController": false}, {"data": [[1.69217724E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q9-success", "isController": false}, {"data": [[1.69217694E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q14-success", "isController": false}, {"data": [[1.6921755E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q2-success", "isController": false}, {"data": [[1.692177E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q1-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q18-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q12-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q6-success", "isController": false}, {"data": [[1.69217694E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q4-success", "isController": false}, {"data": [[1.69217598E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q21-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q4-success", "isController": false}, {"data": [[1.69217616E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q2-success", "isController": false}, {"data": [[1.69217616E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q16-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q15-success", "isController": false}, {"data": [[1.69217646E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q12-success", "isController": false}, {"data": [[1.69217574E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q8-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q8-success", "isController": false}, {"data": [[1.6921761E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q14-success", "isController": false}, {"data": [[1.69217562E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q6-success", "isController": false}, {"data": [[1.69217622E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q6-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q11-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q11-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q18-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q22-success", "isController": false}, {"data": [[1.69217562E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q10-success", "isController": false}, {"data": [[1.6921761E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q13-success", "isController": false}, {"data": [[1.69217694E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q9-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q1-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q21-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q21-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q2-success", "isController": false}, {"data": [[1.6921761E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q16-success", "isController": false}, {"data": [[1.69217682E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q19-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q5-success", "isController": false}, {"data": [[1.69217634E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q3-success", "isController": false}, {"data": [[1.69217586E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q3-success", "isController": false}, {"data": [[1.69217562E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q10-success", "isController": false}, {"data": [[1.69217634E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q15-success", "isController": false}, {"data": [[1.69217568E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q5-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q14-success", "isController": false}, {"data": [[1.69217532E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF1-success", "isController": false}, {"data": [[1.69217724E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q14-success", "isController": false}, {"data": [[1.69217658E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q22-success", "isController": false}, {"data": [[1.6921764E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q7-success", "isController": false}, {"data": [[1.69217646E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q15-success", "isController": false}, {"data": [[1.6921755E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q7-success", "isController": false}, {"data": [[1.69217652E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q15-success", "isController": false}, {"data": [[1.6921761E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q10-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q19-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q3-success", "isController": false}, {"data": [[1.6921761E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q14-success", "isController": false}, {"data": [[1.69217628E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q13-success", "isController": false}, {"data": [[1.69217646E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q18-success", "isController": false}, {"data": [[1.69217652E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q3-success", "isController": false}, {"data": [[1.69217652E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q6-success", "isController": false}, {"data": [[1.69217652E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q18-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q4-success", "isController": false}, {"data": [[1.69217616E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q12-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q19-success", "isController": false}, {"data": [[1.6921755E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q6-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q4-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q12-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q18-success", "isController": false}, {"data": [[1.69217634E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q10-success", "isController": false}, {"data": [[1.69217598E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q6-success", "isController": false}, {"data": [[1.69217634E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q21-success", "isController": false}, {"data": [[1.69217568E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q11-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q8-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q16-success", "isController": false}, {"data": [[1.69217592E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q19-success", "isController": false}, {"data": [[1.69217652E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q10-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q4-success", "isController": false}, {"data": [[1.6921773E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q13-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q18-success", "isController": false}, {"data": [[1.69217712E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q9-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q22-success", "isController": false}, {"data": [[1.69217712E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q12-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q11-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q15-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q1-success", "isController": false}, {"data": [[1.69217538E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q22-success", "isController": false}, {"data": [[1.69217694E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q3-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q7-success", "isController": false}, {"data": [[1.69217598E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q15-success", "isController": false}, {"data": [[1.69217598E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q1-success", "isController": false}, {"data": [[1.69217658E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q16-success", "isController": false}, {"data": [[1.6921764E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q9-success", "isController": false}, {"data": [[1.69217712E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q1-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q16-success", "isController": false}, {"data": [[1.69217586E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q13-success", "isController": false}, {"data": [[1.69217568E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q19-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q9-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q13-success", "isController": false}, {"data": [[1.69217568E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q7-success", "isController": false}, {"data": [[1.69217646E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q9-success", "isController": false}, {"data": [[1.69217574E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q10-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q22-success", "isController": false}, {"data": [[1.69217616E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q15-success", "isController": false}, {"data": [[1.69217556E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q13-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q16-success", "isController": false}, {"data": [[1.69217628E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q18-success", "isController": false}, {"data": [[1.69217658E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q1-success", "isController": false}, {"data": [[1.69217568E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q1-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q9-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q1-success", "isController": false}, {"data": [[1.69217616E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q22-success", "isController": false}, {"data": [[1.69217544E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q10-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q12-success", "isController": false}, {"data": [[1.69217664E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q2-success", "isController": false}, {"data": [[1.6921767E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q13-success", "isController": false}, {"data": [[1.6921761E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q10-success", "isController": false}, {"data": [[1.69217574E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q18-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q6-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q4-success", "isController": false}, {"data": [[1.6921755E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q6-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q16-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q2-success", "isController": false}, {"data": [[1.69217706E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q8-success", "isController": false}, {"data": [[1.69217586E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q22-success", "isController": false}, {"data": [[1.69217646E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q9-success", "isController": false}, {"data": [[1.69217676E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q8-success", "isController": false}, {"data": [[1.69217604E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q21-success", "isController": false}, {"data": [[1.6921758E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6921773E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69217532E12, "maxY": 0.25, "series": [{"data": [[1.69217568E12, 0.13333333333333333], [1.6921773E12, 0.016666666666666666], [1.69217538E12, 0.05], [1.692177E12, 0.016666666666666666], [1.6921767E12, 0.21666666666666667], [1.6921764E12, 0.06666666666666667], [1.6921761E12, 0.15], [1.6921758E12, 0.25], [1.6921755E12, 0.1], [1.69217712E12, 0.05], [1.69217682E12, 0.05], [1.69217652E12, 0.15], [1.69217622E12, 0.03333333333333333], [1.69217592E12, 0.05], [1.69217562E12, 0.13333333333333333], [1.69217532E12, 0.016666666666666666], [1.69217724E12, 0.05], [1.69217694E12, 0.08333333333333333], [1.69217664E12, 0.2], [1.69217634E12, 0.08333333333333333], [1.69217604E12, 0.25], [1.69217574E12, 0.05], [1.69217544E12, 0.16666666666666666], [1.69217706E12, 0.03333333333333333], [1.69217676E12, 0.18333333333333332], [1.69217646E12, 0.11666666666666667], [1.69217616E12, 0.15], [1.69217586E12, 0.15], [1.69217556E12, 0.05], [1.69217658E12, 0.11666666666666667], [1.69217628E12, 0.1], [1.69217598E12, 0.1]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6921773E12, "title": "Total Transactions Per Second"}},
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
