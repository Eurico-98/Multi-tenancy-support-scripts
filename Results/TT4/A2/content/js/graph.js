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
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 1.0, "series": [{"data": [[2653600.0, 1.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[2077900.0, 1.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[7900.0, 1.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1957000.0, 1.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[19600.0, 1.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[498700.0, 1.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[478100.0, 1.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[94700.0, 1.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[2192400.0, 1.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.66612E7, 1.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[2482900.0, 1.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[2338900.0, 1.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[48400.0, 1.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.75368E7, 1.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[494400.0, 1.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[200900.0, 1.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[146000.0, 1.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[24000.0, 1.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[2605900.0, 1.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[8514600.0, 1.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[2090900.0, 1.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[3055200.0, 1.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[456000.0, 1.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[2406400.0, 1.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[7500.0, 1.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[2613300.0, 1.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[453400.0, 1.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[170700.0, 1.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[6900.0, 1.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[2481100.0, 1.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[2543700.0, 1.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[6400.0, 1.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[2398700.0, 1.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[56900.0, 1.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[2501000.0, 1.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[206400.0, 1.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[499800.0, 1.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[81000.0, 1.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[2487300.0, 1.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[3100.0, 1.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[77000.0, 1.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[135900.0, 1.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[223200.0, 1.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1906600.0, 1.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[264000.0, 1.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[2526500.0, 1.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[6826100.0, 1.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[6200.0, 1.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[2404000.0, 1.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[58000.0, 1.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[605200.0, 1.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1779700.0, 1.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1734000.0, 1.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[2542100.0, 1.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[2586600.0, 1.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[2226100.0, 1.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[16100.0, 1.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.2538E7, 1.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[597600.0, 1.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[364900.0, 1.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[2010300.0, 1.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[955100.0, 1.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[2404400.0, 1.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[121700.0, 1.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[189500.0, 1.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[40200.0, 1.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[2165700.0, 1.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[92900.0, 1.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[451100.0, 1.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[11100.0, 1.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[281500.0, 1.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1791000.0, 1.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[21100.0, 1.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1819300.0, 1.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[26200.0, 1.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[11300.0, 1.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[2452100.0, 1.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[43500.0, 1.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[7400.0, 1.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[2730700.0, 1.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1691600.0, 1.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[2353700.0, 1.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[13700.0, 1.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[11600.0, 1.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[166000.0, 1.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[2735900.0, 1.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1968800.0, 1.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[218700.0, 1.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[2177200.0, 1.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[2633900.0, 1.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1750900.0, 1.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[8100.0, 1.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[248800.0, 1.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[10700.0, 1.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[69600.0, 1.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[161800.0, 1.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[5800.0, 1.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[8000.0, 1.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1718500.0, 1.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[80000.0, 1.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[2501300.0, 1.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[7231800.0, 1.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[110500.0, 1.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[2507800.0, 1.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[17900.0, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[77700.0, 1.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[2150200.0, 1.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[3652600.0, 1.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[2286300.0, 1.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[20900.0, 1.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[9000.0, 1.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[2491900.0, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[367800.0, 1.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[2615600.0, 1.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[51200.0, 1.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[10700.0, 1.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[14400.0, 1.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[517200.0, 1.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1421700.0, 1.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[7100.0, 1.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[395600.0, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1989500.0, 1.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[2415100.0, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[13900.0, 1.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[679800.0, 1.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[15100.0, 1.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[242000.0, 1.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1160900.0, 1.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[2594100.0, 1.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[104800.0, 1.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[2548900.0, 1.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[3079100.0, 1.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[409800.0, 1.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[511700.0, 1.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1516900.0, 1.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[2574400.0, 1.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[2084100.0, 1.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[5500.0, 1.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[251500.0, 1.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[202300.0, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[141000.0, 1.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[17200.0, 1.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[2352500.0, 1.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.93067E7, 1.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[325800.0, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[101000.0, 1.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[138700.0, 1.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[60300.0, 1.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[224100.0, 1.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[2969400.0, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1956200.0, 1.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[5900.0, 1.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[5423700.0, 1.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[2545700.0, 1.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[366200.0, 1.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[2610900.0, 1.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[2010700.0, 1.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[8400.0, 1.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[2437700.0, 1.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[10700.0, 1.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[2346000.0, 1.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1260300.0, 1.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[219900.0, 1.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[21600.0, 1.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[96800.0, 1.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[182300.0, 1.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[14200.0, 1.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[2670500.0, 1.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1955400.0, 1.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[16500.0, 1.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[53900.0, 1.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[2520400.0, 1.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[18400.0, 1.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[154200.0, 1.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[305800.0, 1.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[85700.0, 1.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[6100.0, 1.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[2616600.0, 1.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1278300.0, 1.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[834800.0, 1.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[58700.0, 1.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.70239E7, 1.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[2585200.0, 1.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[82400.0, 1.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[2194400.0, 1.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[2759900.0, 1.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[2621600.0, 1.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1.93067E7, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69219998E12, "maxY": 1.0, "series": [{"data": [[1.69222608E12, 1.0], [1.6922112E12, 1.0], [1.69221318E12, 1.0], [1.69222428E12, 1.0], [1.69221882E12, 1.0], [1.69220268E12, 1.0], [1.6922217E12, 1.0], [1.69220808E12, 1.0], [1.69220034E12, 1.0], [1.69221102E12, 1.0], [1.6922025E12, 1.0], [1.69221366E12, 1.0], [1.69220004E12, 1.0], [1.69220856E12, 1.0], [1.6922085E12, 1.0], [1.69221924E12, 1.0], [1.69221624E12, 1.0]], "isOverall": false, "label": "T4", "isController": false}, {"data": [[1.6922319E12, 1.0], [1.69220232E12, 1.0], [1.69223382E12, 1.0], [1.6922049E12, 1.0], [1.69223376E12, 1.0], [1.69219998E12, 1.0], [1.6922268E12, 1.0], [1.69223358E12, 1.0], [1.69222554E12, 1.0], [1.69222194E12, 1.0], [1.69220004E12, 1.0], [1.6922022E12, 1.0], [1.69222278E12, 1.0], [1.69222956E12, 1.0]], "isOverall": false, "label": "T5", "isController": false}, {"data": [[1.69220928E12, 1.0], [1.69221186E12, 1.0], [1.69220682E12, 1.0], [1.69220484E12, 1.0], [1.69220676E12, 1.0], [1.69221384E12, 1.0], [1.6922262E12, 1.0], [1.69220478E12, 1.0], [1.69220004E12, 1.0], [1.692219E12, 1.0], [1.69220664E12, 1.0], [1.6922019E12, 1.0], [1.69221648E12, 1.0], [1.69220922E12, 1.0], [1.69220466E12, 1.0], [1.6922118E12, 1.0], [1.69220214E12, 1.0], [1.69220658E12, 1.0]], "isOverall": false, "label": "T6", "isController": false}, {"data": [[1.69220232E12, 1.0], [1.69222614E12, 1.0], [1.69223358E12, 1.0], [1.69220226E12, 1.0], [1.69220706E12, 1.0], [1.6922262E12, 1.0], [1.6922316E12, 1.0], [1.69222908E12, 1.0], [1.69220508E12, 1.0], [1.692207E12, 1.0], [1.69220004E12, 1.0], [1.69220952E12, 1.0], [1.6922001E12, 1.0], [1.69222668E12, 1.0], [1.69223178E12, 1.0]], "isOverall": false, "label": "T10", "isController": false}, {"data": [[1.69222704E12, 1.0], [1.6922322E12, 1.0], [1.69220682E12, 1.0], [1.69220172E12, 1.0], [1.69222614E12, 1.0], [1.69223376E12, 1.0], [1.69220676E12, 1.0], [1.6922265E12, 1.0], [1.69222914E12, 1.0], [1.69220478E12, 1.0], [1.69223364E12, 1.0], [1.69220178E12, 1.0], [1.69220148E12, 1.0], [1.6922337E12, 1.0], [1.69220436E12, 1.0]], "isOverall": false, "label": "T7", "isController": false}, {"data": [[1.6922046E12, 1.0], [1.69220898E12, 1.0], [1.69220172E12, 1.0], [1.69221162E12, 1.0], [1.69221936E12, 1.0], [1.69221942E12, 1.0], [1.6922064E12, 1.0], [1.69221876E12, 1.0], [1.69220184E12, 1.0], [1.69222752E12, 1.0], [1.69222626E12, 1.0], [1.6922136E12, 1.0], [1.69222758E12, 1.0], [1.69220208E12, 1.0], [1.69221624E12, 1.0]], "isOverall": false, "label": "T8", "isController": false}, {"data": [[1.69222608E12, 1.0], [1.692234E12, 1.0], [1.69222704E12, 1.0], [1.69222962E12, 1.0], [1.69221756E12, 1.0], [1.69222296E12, 1.0], [1.69223376E12, 1.0], [1.69219998E12, 1.0], [1.6922268E12, 1.0], [1.69222968E12, 1.0], [1.69221768E12, 1.0], [1.6922256E12, 1.0], [1.69222914E12, 1.0], [1.69223202E12, 1.0], [1.69222632E12, 1.0], [1.69222698E12, 1.0], [1.6922199E12, 1.0], [1.69222638E12, 1.0]], "isOverall": false, "label": "T9", "isController": false}, {"data": [[1.69221318E12, 1.0], [1.6922106E12, 1.0], [1.69220364E12, 1.0], [1.69222164E12, 1.0], [1.69222422E12, 1.0], [1.69221936E12, 1.0], [1.69221612E12, 1.0], [1.69221072E12, 1.0], [1.69222446E12, 1.0], [1.6922196E12, 1.0], [1.69220376E12, 1.0], [1.69221966E12, 1.0], [1.69220826E12, 1.0], [1.69221648E12, 1.0], [1.69221954E12, 1.0], [1.69220592E12, 1.0], [1.69221894E12, 1.0]], "isOverall": false, "label": "T1", "isController": false}, {"data": [[1.69222608E12, 1.0], [1.69222704E12, 1.0], [1.69222008E12, 1.0], [1.69219998E12, 1.0], [1.69222518E12, 1.0], [1.69222548E12, 1.0], [1.69221546E12, 1.0], [1.69223226E12, 1.0], [1.692213E12, 1.0], [1.69221264E12, 1.0], [1.69222254E12, 1.0], [1.69221522E12, 1.0], [1.69221804E12, 1.0], [1.69222536E12, 1.0], [1.6922001E12, 1.0], [1.69222986E12, 1.0], [1.69222242E12, 1.0], [1.69222956E12, 1.0]], "isOverall": false, "label": "T2", "isController": false}, {"data": [[1.69222608E12, 1.0], [1.69220652E12, 1.0], [1.69220622E12, 1.0], [1.69221756E12, 1.0], [1.69221222E12, 1.0], [1.69221504E12, 1.0], [1.69220364E12, 1.0], [1.69221162E12, 1.0], [1.6922268E12, 1.0], [1.69220646E12, 1.0], [1.6922091E12, 1.0], [1.69221168E12, 1.0], [1.69220574E12, 1.0], [1.6922124E12, 1.0], [1.69220118E12, 1.0]], "isOverall": false, "label": "T3", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.692234E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 119.0, "minX": 1.0, "maxY": 1.9306715E7, "series": [{"data": [[9.0, 2653603.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[9.0, 2653603.0]], "isOverall": false, "label": "T9 - Q18-Aggregated", "isController": false}, {"data": [[5.0, 2077917.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[5.0, 2077917.0]], "isOverall": false, "label": "T9 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 7950.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[10.0, 7950.0]], "isOverall": false, "label": "T9 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 1957033.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[10.0, 1957033.0]], "isOverall": false, "label": "T10 - Q18-Aggregated", "isController": false}, {"data": [[8.0, 19645.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[8.0, 19645.0]], "isOverall": false, "label": "T10 - Q19-Aggregated", "isController": false}, {"data": [[7.0, 498723.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[7.0, 498723.0]], "isOverall": false, "label": "T10 - Q16-Aggregated", "isController": false}, {"data": [[5.0, 478161.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[5.0, 478161.0]], "isOverall": false, "label": "T9 - Q10-Aggregated", "isController": false}, {"data": [[6.0, 94757.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[6.0, 94757.0]], "isOverall": false, "label": "T9 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 2192424.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[10.0, 2192424.0]], "isOverall": false, "label": "T10 - Q14-Aggregated", "isController": false}, {"data": [[8.0, 1.6661212E7]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[8.0, 1.6661212E7]], "isOverall": false, "label": "T10 - Q15-Aggregated", "isController": false}, {"data": [[5.0, 2482991.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[5.0, 2482991.0]], "isOverall": false, "label": "T10 - Q12-Aggregated", "isController": false}, {"data": [[5.0, 2338959.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[5.0, 2338959.0]], "isOverall": false, "label": "T9 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 48466.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[10.0, 48466.0]], "isOverall": false, "label": "T10 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 1.7536889E7]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[10.0, 1.7536889E7]], "isOverall": false, "label": "T9 - Q15-Aggregated", "isController": false}, {"data": [[8.0, 494442.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[8.0, 494442.0]], "isOverall": false, "label": "T9 - Q12-Aggregated", "isController": false}, {"data": [[5.0, 200962.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[5.0, 200962.0]], "isOverall": false, "label": "T10 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 6397.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[10.0, 6397.0]], "isOverall": false, "label": "T10 - Q11-Aggregated", "isController": false}, {"data": [[6.0, 146040.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[6.0, 146040.0]], "isOverall": false, "label": "T9 - Q13-Aggregated", "isController": false}, {"data": [[8.0, 24095.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[8.0, 24095.0]], "isOverall": false, "label": "T3 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 2605923.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[10.0, 2605923.0]], "isOverall": false, "label": "T3 - Q18-Aggregated", "isController": false}, {"data": [[8.0, 8514659.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[8.0, 8514659.0]], "isOverall": false, "label": "T3 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 2090950.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[10.0, 2090950.0]], "isOverall": false, "label": "T3 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 3105.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[10.0, 3105.0]], "isOverall": false, "label": "T3 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 3055278.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[10.0, 3055278.0]], "isOverall": false, "label": "T9 - Q21-Aggregated", "isController": false}, {"data": [[6.0, 456099.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[6.0, 456099.0]], "isOverall": false, "label": "T9 - Q22-Aggregated", "isController": false}, {"data": [[5.0, 2406414.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[5.0, 2406414.0]], "isOverall": false, "label": "T10 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 7533.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[10.0, 7533.0]], "isOverall": false, "label": "T10 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 2613321.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[10.0, 2613321.0]], "isOverall": false, "label": "T4 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 453435.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[10.0, 453435.0]], "isOverall": false, "label": "T4 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 170761.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[10.0, 170761.0]], "isOverall": false, "label": "T4 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 6980.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[10.0, 6980.0]], "isOverall": false, "label": "T3 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 2481144.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[10.0, 2481144.0]], "isOverall": false, "label": "T3 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 2543730.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[10.0, 2543730.0]], "isOverall": false, "label": "T8 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 6436.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[10.0, 6436.0]], "isOverall": false, "label": "T8 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 2398733.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[10.0, 2398733.0]], "isOverall": false, "label": "T6 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 56902.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[10.0, 56902.0]], "isOverall": false, "label": "T6 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 2501003.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[10.0, 2501003.0]], "isOverall": false, "label": "T6 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 206407.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[10.0, 206407.0]], "isOverall": false, "label": "T3 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 3146.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[10.0, 3146.0]], "isOverall": false, "label": "T3 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 499869.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[10.0, 499869.0]], "isOverall": false, "label": "T3 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 81090.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[10.0, 81090.0]], "isOverall": false, "label": "T6 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 2487378.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[10.0, 2487378.0]], "isOverall": false, "label": "T3 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 3175.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[10.0, 3175.0]], "isOverall": false, "label": "T6 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 77054.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[10.0, 77054.0]], "isOverall": false, "label": "T6 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 135914.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[10.0, 135914.0]], "isOverall": false, "label": "T6 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 223281.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[10.0, 223281.0]], "isOverall": false, "label": "T6 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 1906640.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[10.0, 1906640.0]], "isOverall": false, "label": "T6 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 264019.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[10.0, 264019.0]], "isOverall": false, "label": "T8 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 2526598.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[10.0, 2526598.0]], "isOverall": false, "label": "T8 - Q14-Aggregated", "isController": false}, {"data": [[7.0, 6826158.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[7.0, 6826158.0]], "isOverall": false, "label": "T8 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 2296.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[10.0, 2296.0]], "isOverall": false, "label": "T8 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 6265.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[10.0, 6265.0]], "isOverall": false, "label": "T2 - Q22-Aggregated", "isController": false}, {"data": [[5.0, 2404022.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[5.0, 2404022.0]], "isOverall": false, "label": "T2 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 58015.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[10.0, 58015.0]], "isOverall": false, "label": "T8 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 605249.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[10.0, 605249.0]], "isOverall": false, "label": "T8 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 1779778.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[10.0, 1779778.0]], "isOverall": false, "label": "T8 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 1734002.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[10.0, 1734002.0]], "isOverall": false, "label": "T8 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 2542181.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[10.0, 2542181.0]], "isOverall": false, "label": "T8 - Q19-Aggregated", "isController": false}, {"data": [[9.0, 2586629.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[9.0, 2586629.0]], "isOverall": false, "label": "T2 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 2226103.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[10.0, 2226103.0]], "isOverall": false, "label": "T2 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 16198.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[10.0, 16198.0]], "isOverall": false, "label": "T2 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 1.2538078E7]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[10.0, 1.2538078E7]], "isOverall": false, "label": "T2 - Q15-Aggregated", "isController": false}, {"data": [[8.0, 597695.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[8.0, 597695.0]], "isOverall": false, "label": "T2 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 364934.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[10.0, 364934.0]], "isOverall": false, "label": "T2 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 2010367.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[10.0, 2010367.0]], "isOverall": false, "label": "T2 - Q12-Aggregated", "isController": false}, {"data": [[6.0, 955140.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[6.0, 955140.0]], "isOverall": false, "label": "T2 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 2404408.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[10.0, 2404408.0]], "isOverall": false, "label": "T4 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 121718.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[10.0, 121718.0]], "isOverall": false, "label": "T2 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 189536.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[10.0, 189536.0]], "isOverall": false, "label": "T4 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 40282.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[10.0, 40282.0]], "isOverall": false, "label": "T4 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 2165771.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[10.0, 2165771.0]], "isOverall": false, "label": "T4 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 92989.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[10.0, 92989.0]], "isOverall": false, "label": "T4 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 451198.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[10.0, 451198.0]], "isOverall": false, "label": "T4 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 11187.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[10.0, 11187.0]], "isOverall": false, "label": "T4 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 281548.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[10.0, 281548.0]], "isOverall": false, "label": "T4 - Q2-Aggregated", "isController": false}, {"data": [[9.0, 1791072.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[9.0, 1791072.0]], "isOverall": false, "label": "T4 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 21155.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[10.0, 21155.0]], "isOverall": false, "label": "T10 - Q5-Aggregated", "isController": false}, {"data": [[4.0, 1819359.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[4.0, 1819359.0]], "isOverall": false, "label": "T10 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 26235.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[10.0, 26235.0]], "isOverall": false, "label": "T10 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 11386.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[10.0, 11386.0]], "isOverall": false, "label": "T10 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 2452101.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[10.0, 2452101.0]], "isOverall": false, "label": "T10 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 43563.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[10.0, 43563.0]], "isOverall": false, "label": "T10 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 7434.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[10.0, 7434.0]], "isOverall": false, "label": "T10 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 2112.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[10.0, 2112.0]], "isOverall": false, "label": "T10 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 2730750.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[10.0, 2730750.0]], "isOverall": false, "label": "T10 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 2907.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[10.0, 2907.0]], "isOverall": false, "label": "T5 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 2271.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[10.0, 2271.0]], "isOverall": false, "label": "T5 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 3371.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[10.0, 3371.0]], "isOverall": false, "label": "T5 - Q5-Aggregated", "isController": false}, {"data": [[3.0, 1691629.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[3.0, 1691629.0]], "isOverall": false, "label": "T5 - Q6-Aggregated", "isController": false}, {"data": [[5.0, 2353727.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[5.0, 2353727.0]], "isOverall": false, "label": "T5 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 13774.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[10.0, 13774.0]], "isOverall": false, "label": "T5 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 11683.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[10.0, 11683.0]], "isOverall": false, "label": "T5 - Q7-Aggregated", "isController": false}, {"data": [[3.0, 166006.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[3.0, 166006.0]], "isOverall": false, "label": "T5 - Q8-Aggregated", "isController": false}, {"data": [[9.0, 2735979.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[9.0, 2735979.0]], "isOverall": false, "label": "T5 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 1968880.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[10.0, 1968880.0]], "isOverall": false, "label": "T6 - Q21-Aggregated", "isController": false}, {"data": [[1.0, 218766.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.0, 218766.0]], "isOverall": false, "label": "T9 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 2177299.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[10.0, 2177299.0]], "isOverall": false, "label": "T9 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 2633903.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[10.0, 2633903.0]], "isOverall": false, "label": "T6 - Q19-Aggregated", "isController": false}, {"data": [[2.0, 1750945.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[2.0, 1750945.0]], "isOverall": false, "label": "T9 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 8150.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[10.0, 8150.0]], "isOverall": false, "label": "T9 - Q8-Aggregated", "isController": false}, {"data": [[7.0, 248884.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[7.0, 248884.0]], "isOverall": false, "label": "T9 - Q7-Aggregated", "isController": false}, {"data": [[7.0, 10781.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[7.0, 10781.0]], "isOverall": false, "label": "T9 - Q6-Aggregated", "isController": false}, {"data": [[5.0, 69645.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[5.0, 69645.0]], "isOverall": false, "label": "T9 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 161835.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[10.0, 161835.0]], "isOverall": false, "label": "T9 - Q4-Aggregated", "isController": false}, {"data": [[5.0, 5846.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[5.0, 5846.0]], "isOverall": false, "label": "T9 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 8020.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[10.0, 8020.0]], "isOverall": false, "label": "T6 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 1718584.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[10.0, 1718584.0]], "isOverall": false, "label": "T6 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 80055.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[10.0, 80055.0]], "isOverall": false, "label": "T6 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 2501344.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[10.0, 2501344.0]], "isOverall": false, "label": "T6 - Q14-Aggregated", "isController": false}, {"data": [[8.0, 7231860.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[8.0, 7231860.0]], "isOverall": false, "label": "T6 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 110536.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[10.0, 110536.0]], "isOverall": false, "label": "T6 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 2507897.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[10.0, 2507897.0]], "isOverall": false, "label": "T6 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 4336.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[10.0, 4336.0]], "isOverall": false, "label": "T1 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 17945.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[10.0, 17945.0]], "isOverall": false, "label": "T1 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 77738.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[10.0, 77738.0]], "isOverall": false, "label": "T1 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 2150240.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[10.0, 2150240.0]], "isOverall": false, "label": "T1 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 3652667.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[10.0, 3652667.0]], "isOverall": false, "label": "T1 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 2286325.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[10.0, 2286325.0]], "isOverall": false, "label": "T1 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 20943.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[10.0, 20943.0]], "isOverall": false, "label": "T6 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 9057.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[10.0, 9057.0]], "isOverall": false, "label": "T1 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 2491945.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[10.0, 2491945.0]], "isOverall": false, "label": "T1 - Q21-Aggregated", "isController": false}, {"data": [[7.0, 367862.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[7.0, 367862.0]], "isOverall": false, "label": "T7 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 2615660.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[10.0, 2615660.0]], "isOverall": false, "label": "T7 - Q6-Aggregated", "isController": false}, {"data": [[3.0, 51218.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[3.0, 51218.0]], "isOverall": false, "label": "T7 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 10713.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[10.0, 10713.0]], "isOverall": false, "label": "T7 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 14480.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[10.0, 14480.0]], "isOverall": false, "label": "T7 - Q7-Aggregated", "isController": false}, {"data": [[6.0, 517201.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[6.0, 517201.0]], "isOverall": false, "label": "T7 - Q2-Aggregated", "isController": false}, {"data": [[3.0, 1421713.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[3.0, 1421713.0]], "isOverall": false, "label": "T7 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 2124.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[10.0, 2124.0]], "isOverall": false, "label": "T7 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 7161.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[10.0, 7161.0]], "isOverall": false, "label": "T7 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 395620.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[10.0, 395620.0]], "isOverall": false, "label": "T1 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 1989574.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[10.0, 1989574.0]], "isOverall": false, "label": "T1 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 2415158.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[10.0, 2415158.0]], "isOverall": false, "label": "T1 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 13936.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[10.0, 13936.0]], "isOverall": false, "label": "T5 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 6335.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[10.0, 6335.0]], "isOverall": false, "label": "T5 - Q10-Aggregated", "isController": false}, {"data": [[7.0, 679852.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[7.0, 679852.0]], "isOverall": false, "label": "T3 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 15148.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[10.0, 15148.0]], "isOverall": false, "label": "T3 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 119.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[10.0, 119.0]], "isOverall": false, "label": "T1 - RF2-Aggregated", "isController": false}, {"data": [[10.0, 242065.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[10.0, 242065.0]], "isOverall": false, "label": "T3 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 1160953.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[10.0, 1160953.0]], "isOverall": false, "label": "T3 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 2594163.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[10.0, 2594163.0]], "isOverall": false, "label": "T3 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 4382.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[10.0, 4382.0]], "isOverall": false, "label": "T3 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 104803.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[10.0, 104803.0]], "isOverall": false, "label": "T3 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 2548968.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[10.0, 2548968.0]], "isOverall": false, "label": "T3 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 166.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[10.0, 166.0]], "isOverall": false, "label": "T1 - RF1-Aggregated", "isController": false}, {"data": [[5.0, 3079110.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[5.0, 3079110.0]], "isOverall": false, "label": "T7 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 409854.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[10.0, 409854.0]], "isOverall": false, "label": "T7 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 511715.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[10.0, 511715.0]], "isOverall": false, "label": "T3 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 1516984.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[10.0, 1516984.0]], "isOverall": false, "label": "T7 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 2574417.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[10.0, 2574417.0]], "isOverall": false, "label": "T1 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 4025.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[10.0, 4025.0]], "isOverall": false, "label": "T1 - Q2-Aggregated", "isController": false}, {"data": [[5.0, 2084100.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[5.0, 2084100.0]], "isOverall": false, "label": "T7 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 5565.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[10.0, 5565.0]], "isOverall": false, "label": "T7 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 251589.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[10.0, 251589.0]], "isOverall": false, "label": "T1 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 202321.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[10.0, 202321.0]], "isOverall": false, "label": "T1 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 141032.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[10.0, 141032.0]], "isOverall": false, "label": "T1 - Q5-Aggregated", "isController": false}, {"data": [[8.0, 17246.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[8.0, 17246.0]], "isOverall": false, "label": "T7 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 2352576.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[10.0, 2352576.0]], "isOverall": false, "label": "T1 - Q6-Aggregated", "isController": false}, {"data": [[8.0, 1.9306715E7]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[8.0, 1.9306715E7]], "isOverall": false, "label": "T7 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 325853.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[10.0, 325853.0]], "isOverall": false, "label": "T1 - Q7-Aggregated", "isController": false}, {"data": [[3.0, 101026.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[3.0, 101026.0]], "isOverall": false, "label": "T7 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 138758.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[10.0, 138758.0]], "isOverall": false, "label": "T1 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 60346.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[10.0, 60346.0]], "isOverall": false, "label": "T7 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 224140.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[10.0, 224140.0]], "isOverall": false, "label": "T7 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 2969434.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[10.0, 2969434.0]], "isOverall": false, "label": "T1 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 1956204.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[10.0, 1956204.0]], "isOverall": false, "label": "T7 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 5971.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[10.0, 5971.0]], "isOverall": false, "label": "T4 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 5423756.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[10.0, 5423756.0]], "isOverall": false, "label": "T4 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 2545721.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[10.0, 2545721.0]], "isOverall": false, "label": "T4 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 366292.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[10.0, 366292.0]], "isOverall": false, "label": "T4 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 2610986.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[10.0, 2610986.0]], "isOverall": false, "label": "T4 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 2010742.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[10.0, 2010742.0]], "isOverall": false, "label": "T4 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 8444.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[10.0, 8444.0]], "isOverall": false, "label": "T4 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 2437732.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[10.0, 2437732.0]], "isOverall": false, "label": "T4 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 10719.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[10.0, 10719.0]], "isOverall": false, "label": "T8 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 2346049.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[10.0, 2346049.0]], "isOverall": false, "label": "T2 - Q1-Aggregated", "isController": false}, {"data": [[6.0, 1260388.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[6.0, 1260388.0]], "isOverall": false, "label": "T8 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 219952.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[10.0, 219952.0]], "isOverall": false, "label": "T2 - Q3-Aggregated", "isController": false}, {"data": [[6.0, 21639.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[6.0, 21639.0]], "isOverall": false, "label": "T8 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 96832.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[10.0, 96832.0]], "isOverall": false, "label": "T8 - Q3-Aggregated", "isController": false}, {"data": [[9.0, 182320.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[9.0, 182320.0]], "isOverall": false, "label": "T2 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 14260.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[10.0, 14260.0]], "isOverall": false, "label": "T8 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 2670543.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[10.0, 2670543.0]], "isOverall": false, "label": "T8 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 1955430.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[10.0, 1955430.0]], "isOverall": false, "label": "T8 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 16504.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[10.0, 16504.0]], "isOverall": false, "label": "T8 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 53979.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[10.0, 53979.0]], "isOverall": false, "label": "T6 - Q10-Aggregated", "isController": false}, {"data": [[5.0, 2520441.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[5.0, 2520441.0]], "isOverall": false, "label": "T2 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 18409.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[10.0, 18409.0]], "isOverall": false, "label": "T2 - Q8-Aggregated", "isController": false}, {"data": [[9.0, 154258.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[9.0, 154258.0]], "isOverall": false, "label": "T2 - Q5-Aggregated", "isController": false}, {"data": [[5.0, 305829.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[5.0, 305829.0]], "isOverall": false, "label": "T2 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 85702.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[10.0, 85702.0]], "isOverall": false, "label": "T2 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 6199.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[10.0, 6199.0]], "isOverall": false, "label": "T5 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 2616624.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[10.0, 2616624.0]], "isOverall": false, "label": "T2 - Q6-Aggregated", "isController": false}, {"data": [[6.0, 1278381.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[6.0, 1278381.0]], "isOverall": false, "label": "T5 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 834844.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[10.0, 834844.0]], "isOverall": false, "label": "T5 - Q13-Aggregated", "isController": false}, {"data": [[2.0, 58743.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[2.0, 58743.0]], "isOverall": false, "label": "T5 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 1.7023967E7]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[10.0, 1.7023967E7]], "isOverall": false, "label": "T5 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 2585216.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[10.0, 2585216.0]], "isOverall": false, "label": "T5 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 82496.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[10.0, 82496.0]], "isOverall": false, "label": "T5 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 2194447.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[10.0, 2194447.0]], "isOverall": false, "label": "T5 - Q19-Aggregated", "isController": false}, {"data": [[5.0, 2759967.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[5.0, 2759967.0]], "isOverall": false, "label": "T5 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 2621653.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}, {"data": [[10.0, 2621653.0]], "isOverall": false, "label": "T8 - Q1-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.69219998E12, "maxY": 25396.783333333333, "series": [{"data": [[1.692234E12, 335.68333333333334], [1.69223382E12, 1.4], [1.69220172E12, 73.33333333333333], [1.6922106E12, 0.5666666666666667], [1.69221504E12, 131.66666666666666], [1.6922217E12, 131.66666666666666], [1.69222614E12, 6.716666666666667], [1.69221162E12, 180.25], [1.69221384E12, 48.583333333333336], [1.6922316E12, 1.4], [1.69222752E12, 3.5833333333333335], [1.69220478E12, 4.883333333333334], [1.692207E12, 6.366666666666666], [1.69221366E12, 20785.783333333333], [1.69220376E12, 1.2166666666666666], [1.69221264E12, 3.3666666666666667], [1.69221966E12, 322.56666666666666], [1.69222632E12, 5.383333333333334], [1.69220922E12, 131.66666666666666], [1.69222956E12, 138.03333333333333], [1.69223178E12, 64.98333333333333], [1.6922046E12, 0.5666666666666667], [1.69222428E12, 0.35], [1.69221882E12, 0.5666666666666667], [1.69220682E12, 8975.166666666666], [1.69219998E12, 25396.783333333333], [1.69220034E12, 335.2], [1.6922265E12, 131.66666666666666], [1.69222548E12, 3.5833333333333335], [1.69222446E12, 6.233333333333333], [1.6922022E12, 5.15], [1.692219E12, 0.5666666666666667], [1.69220664E12, 66.16666666666667], [1.69222668E12, 8007.166666666667], [1.69220118E12, 0.38333333333333336], [1.69222242E12, 10.966666666666667], [1.69222704E12, 12952.683333333332], [1.69221936E12, 25085.85], [1.69220646E12, 12.6], [1.69222908E12, 48.583333333333336], [1.69220508E12, 133.88333333333333], [1.69220184E12, 6.433333333333334], [1.69221072E12, 68.41666666666667], [1.69220952E12, 10.833333333333334], [1.69221954E12, 8636.866666666667], [1.69222278E12, 4.933333333333334], [1.6922085E12, 5.116666666666666], [1.6922337E12, 1.4], [1.69222962E12, 66.21666666666667], [1.69222296E12, 48.583333333333336], [1.69220268E12, 1.2166666666666666], [1.6922049E12, 0.5666666666666667], [1.69222518E12, 0.35], [1.6922262E12, 3.75], [1.69222194E12, 3.35], [1.6922025E12, 0.38333333333333336], [1.69221768E12, 2.216666666666667], [1.69220574E12, 0.5666666666666667], [1.6922136E12, 1.6], [1.69223202E12, 7.0], [1.69222536E12, 324.23333333333335], [1.69222758E12, 332.5], [1.6922124E12, 8882.466666666667], [1.6922199E12, 10.833333333333334], [1.69220148E12, 7.45], [1.69220592E12, 1.4], [1.69222638E12, 0.38333333333333336], [1.69220232E12, 12668.033333333333], [1.69220898E12, 50.8], [1.6922112E12, 64.85], [1.69222008E12, 5.2], [1.6922322E12, 48.583333333333336], [1.69221222E12, 341.4166666666667], [1.69220676E12, 17461.866666666665], [1.69222554E12, 131.66666666666666], [1.69221102E12, 48.583333333333336], [1.69221546E12, 6.316666666666666], [1.69222914E12, 0.7], [1.69221804E12, 0.38333333333333336], [1.69221648E12, 7889.283333333334], [1.6922001E12, 10.416666666666666], [1.69221924E12, 2.3], [1.69220214E12, 5.383333333333334], [1.69220436E12, 0.36666666666666664], [1.69220658E12, 1.4], [1.69221186E12, 6.433333333333334], [1.69222608E12, 16.7], [1.69220622E12, 5.2], [1.69223376E12, 136.46666666666667], [1.69222164E12, 0.5], [1.69223358E12, 0.75], [1.69221612E12, 131.66666666666666], [1.69221942E12, 60.15], [1.6922064E12, 6.783333333333333], [1.69221168E12, 2.3], [1.6922196E12, 5.2], [1.69222626E12, 3.316666666666667], [1.69220826E12, 0.38333333333333336], [1.69220178E12, 6.6], [1.69220928E12, 1.2166666666666666], [1.6922319E12, 10.833333333333334], [1.69221756E12, 11312.5], [1.69220364E12, 4.65], [1.69220808E12, 3.45], [1.69220484E12, 5.2], [1.69222422E12, 10.966666666666667], [1.69222968E12, 3.5833333333333335], [1.69220706E12, 3.5833333333333335], [1.69221876E12, 0.35], [1.6922091E12, 11.783333333333333], [1.6922256E12, 7.45], [1.69220466E12, 10.966666666666667], [1.69222986E12, 2.3], [1.69221894E12, 48.583333333333336], [1.69220652E12, 64.36666666666666], [1.69221318E12, 20.9], [1.6922268E12, 56.55], [1.69220226E12, 1.7833333333333334], [1.69223226E12, 48.583333333333336], [1.692213E12, 5.2], [1.69220004E12, 30.333333333333332], [1.69222254E12, 65.83333333333333], [1.69223364E12, 10.866666666666667], [1.69221522E12, 10.45], [1.6922019E12, 0.38333333333333336], [1.69220856E12, 3.5833333333333335], [1.69220208E12, 4.95], [1.69222698E12, 4.966666666666667], [1.6922118E12, 10.7], [1.69221624E12, 14.816666666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.692234E12, 0.0], [1.69223382E12, 0.0], [1.69220172E12, 0.0], [1.6922106E12, 0.0], [1.69221504E12, 0.0], [1.6922217E12, 0.0], [1.69222614E12, 0.0], [1.69221162E12, 0.0], [1.69221384E12, 0.0], [1.6922316E12, 0.0], [1.69222752E12, 0.0], [1.69220478E12, 0.0], [1.692207E12, 0.0], [1.69221366E12, 0.0], [1.69220376E12, 0.0], [1.69221264E12, 0.0], [1.69221966E12, 0.0], [1.69222632E12, 0.0], [1.69220922E12, 0.0], [1.69222956E12, 0.0], [1.69223178E12, 0.0], [1.6922046E12, 0.0], [1.69222428E12, 0.0], [1.69221882E12, 0.0], [1.69220682E12, 0.0], [1.69219998E12, 0.0], [1.69220034E12, 0.0], [1.6922265E12, 0.0], [1.69222548E12, 0.0], [1.69222446E12, 0.0], [1.6922022E12, 0.0], [1.692219E12, 0.0], [1.69220664E12, 0.0], [1.69222668E12, 0.0], [1.69220118E12, 0.0], [1.69222242E12, 0.0], [1.69222704E12, 0.0], [1.69221936E12, 0.0], [1.69220646E12, 0.0], [1.69222908E12, 0.0], [1.69220508E12, 0.0], [1.69220184E12, 0.0], [1.69221072E12, 0.0], [1.69220952E12, 0.0], [1.69221954E12, 0.0], [1.69222278E12, 0.0], [1.6922085E12, 0.0], [1.6922337E12, 0.0], [1.69222962E12, 0.0], [1.69222296E12, 0.0], [1.69220268E12, 0.0], [1.6922049E12, 0.0], [1.69222518E12, 0.0], [1.6922262E12, 0.0], [1.69222194E12, 0.0], [1.6922025E12, 0.0], [1.69221768E12, 0.0], [1.69220574E12, 0.0], [1.6922136E12, 0.0], [1.69223202E12, 0.0], [1.69222536E12, 0.0], [1.69222758E12, 0.0], [1.6922124E12, 0.0], [1.6922199E12, 0.0], [1.69220148E12, 0.0], [1.69220592E12, 0.0], [1.69222638E12, 0.0], [1.69220232E12, 0.0], [1.69220898E12, 0.0], [1.6922112E12, 0.0], [1.69222008E12, 0.0], [1.6922322E12, 0.0], [1.69221222E12, 0.0], [1.69220676E12, 0.0], [1.69222554E12, 0.0], [1.69221102E12, 0.0], [1.69221546E12, 0.0], [1.69222914E12, 0.0], [1.69221804E12, 0.0], [1.69221648E12, 0.0], [1.6922001E12, 0.0], [1.69221924E12, 0.0], [1.69220214E12, 0.0], [1.69220436E12, 0.0], [1.69220658E12, 0.0], [1.69221186E12, 0.0], [1.69222608E12, 0.0], [1.69220622E12, 0.0], [1.69223376E12, 0.0], [1.69222164E12, 0.0], [1.69223358E12, 0.0], [1.69221612E12, 0.0], [1.69221942E12, 0.0], [1.6922064E12, 0.0], [1.69221168E12, 0.0], [1.6922196E12, 0.0], [1.69222626E12, 0.0], [1.69220826E12, 0.0], [1.69220178E12, 0.0], [1.69220928E12, 0.0], [1.6922319E12, 0.0], [1.69221756E12, 0.0], [1.69220364E12, 0.0], [1.69220808E12, 0.0], [1.69220484E12, 0.0], [1.69222422E12, 0.0], [1.69222968E12, 0.0], [1.69220706E12, 0.0], [1.69221876E12, 0.0], [1.6922091E12, 0.0], [1.6922256E12, 0.0], [1.69220466E12, 0.0], [1.69222986E12, 0.0], [1.69221894E12, 0.0], [1.69220652E12, 0.0], [1.69221318E12, 0.0], [1.6922268E12, 0.0], [1.69220226E12, 0.0], [1.69223226E12, 0.0], [1.692213E12, 0.0], [1.69220004E12, 0.0], [1.69222254E12, 0.0], [1.69223364E12, 0.0], [1.69221522E12, 0.0], [1.6922019E12, 0.0], [1.69220856E12, 0.0], [1.69220208E12, 0.0], [1.69222698E12, 0.0], [1.6922118E12, 0.0], [1.69221624E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.692234E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 119.0, "minX": 1.69219998E12, "maxY": 1.9306715E7, "series": [{"data": [[1.6922256E12, 2653603.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.69222914E12, 2077917.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.69219998E12, 7950.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.692207E12, 1957033.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.6922262E12, 19645.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69222668E12, 498723.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69222962E12, 478161.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69222704E12, 94757.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69220226E12, 2192424.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69222614E12, 1.6661212E7]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.6922316E12, 2482991.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69223202E12, 2338959.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.6922001E12, 48466.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69221756E12, 1.7536889E7]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.69222608E12, 494442.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.69223178E12, 200962.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.69220232E12, 6397.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69222698E12, 146040.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.69222608E12, 24095.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.6922091E12, 2605923.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.69222608E12, 8514659.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.69220574E12, 2090950.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69221756E12, 3105.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.69222296E12, 3055278.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.6922268E12, 456099.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69222908E12, 2406414.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.69220004E12, 7533.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.69221624E12, 2613321.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69221366E12, 453435.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.6922112E12, 170761.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69220646E12, 6980.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69221162E12, 2481144.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69220898E12, 2543730.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[1.69221624E12, 6436.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[1.69220922E12, 2398733.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1.69220928E12, 56902.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[1.69220466E12, 2501003.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[1.6922124E12, 206407.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.69220652E12, 3146.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69220622E12, 499869.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69221186E12, 81090.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1.69220364E12, 2487378.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69221648E12, 3175.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[1.69220682E12, 77054.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1.69220478E12, 135914.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[1.69220214E12, 223281.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1.6922019E12, 1906640.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[1.69220208E12, 264019.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[1.6922046E12, 2526598.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1.69222626E12, 6826158.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[1.69221936E12, 2296.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[1.69222008E12, 6265.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69223226E12, 2404022.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.69221942E12, 58015.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[1.69221936E12, 605249.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1.6922064E12, 1779778.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1.69220172E12, 1734002.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[1.69221876E12, 2542181.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[1.69222518E12, 2586629.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69221522E12, 2226103.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69219998E12, 16198.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69221264E12, 1.2538078E7]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.69222608E12, 597695.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.692213E12, 364934.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.69222008E12, 2010367.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.69222704E12, 955140.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.6922217E12, 2404408.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69222254E12, 121718.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69220268E12, 189536.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69220004E12, 40282.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.6922025E12, 2165771.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.69220856E12, 92989.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.69221924E12, 451198.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.69221366E12, 11187.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69220034E12, 281548.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.69222608E12, 1791072.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69220706E12, 21155.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69223358E12, 1819359.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.69220004E12, 26235.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69220226E12, 11386.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69220952E12, 2452101.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.69220232E12, 43563.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.69220232E12, 7434.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.69220508E12, 2112.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69220508E12, 2730750.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.69220004E12, 2907.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.6922022E12, 2271.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69220232E12, 3371.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69223358E12, 1691629.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.6922319E12, 2353727.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69220232E12, 13774.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69220004E12, 11683.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69223376E12, 166006.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69222554E12, 2735979.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69221384E12, 1968880.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[1.692234E12, 218766.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.6922199E12, 2177299.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69221648E12, 2633903.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1.69223376E12, 1750945.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69219998E12, 8150.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.69222632E12, 248884.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69222638E12, 10781.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69222968E12, 69645.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69221768E12, 161835.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69223202E12, 5846.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.69221648E12, 8020.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1.69220658E12, 1718584.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[1.69220484E12, 80055.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1.692219E12, 2501344.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[1.6922262E12, 7231860.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1.69220676E12, 110536.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[1.6922118E12, 2507897.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[1.69221954E12, 4336.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221072E12, 17945.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.6922196E12, 77738.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69220592E12, 2150240.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69220364E12, 3652667.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6922106E12, 2286325.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69220004E12, 20943.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[1.69221072E12, 9057.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221894E12, 2491945.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.6922265E12, 367862.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[1.69220436E12, 2615660.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[1.69223376E12, 51218.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1.69220178E12, 10713.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[1.69220178E12, 14480.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1.69222704E12, 517201.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1.69223364E12, 1421713.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[1.69220172E12, 2124.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1.69220682E12, 7161.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1.69221936E12, 395620.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69222164E12, 1989574.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221318E12, 2415158.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69219998E12, 13936.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69220232E12, 6335.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.6922268E12, 679852.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69220652E12, 15148.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.69221954E12, 119.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69220646E12, 242065.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69220118E12, 1160953.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.69221504E12, 2594163.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69220646E12, 4382.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.69221168E12, 104803.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69221756E12, 2548968.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.69222164E12, 166.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.6922322E12, 3079110.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[1.69220478E12, 409854.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[1.69221222E12, 511715.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.69220148E12, 1516984.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[1.69222422E12, 2574417.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69221966E12, 4025.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69222914E12, 2084100.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1.69220682E12, 5565.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[1.69222446E12, 251589.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221954E12, 202321.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69221072E12, 141032.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69222614E12, 17246.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[1.69220826E12, 2352576.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69222614E12, 1.9306715E7]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[1.69221648E12, 325853.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.6922337E12, 101026.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[1.69220376E12, 138758.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69220682E12, 60346.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[1.69220172E12, 224140.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[1.69221612E12, 2969434.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69220676E12, 1956204.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[1.69221366E12, 5971.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.69220808E12, 5423756.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.69221882E12, 2545721.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.6922085E12, 366292.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69222428E12, 2610986.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69221318E12, 2010742.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69220004E12, 8444.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69221102E12, 2437732.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69220898E12, 10719.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[1.69222242E12, 2346049.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69222752E12, 1260388.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[1.69221546E12, 219952.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69222758E12, 21639.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[1.69220184E12, 96832.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1.69222536E12, 182320.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.6922136E12, 14260.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[1.69221162E12, 2670543.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1.6922136E12, 1955430.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[1.6922064E12, 16504.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1.69220664E12, 53979.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[1.69222956E12, 2520441.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69222008E12, 18409.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69222548E12, 154258.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69222986E12, 305829.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.6922001E12, 85702.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.6922022E12, 6199.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.69221804E12, 2616624.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.6922268E12, 1278381.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.69222278E12, 834844.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69223382E12, 58743.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69222194E12, 1.7023967E7]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.6922049E12, 2585216.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.69220232E12, 82496.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.6922022E12, 2194447.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69222956E12, 2759967.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69221624E12, 2621653.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.692234E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 119.0, "minX": 1.69219998E12, "maxY": 1.9306715E7, "series": [{"data": [[1.6922256E12, 2653602.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.69222914E12, 2077917.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.69219998E12, 7879.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.692207E12, 1957033.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.6922262E12, 19645.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69222668E12, 498715.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69222962E12, 478161.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69222704E12, 94752.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69220226E12, 2192424.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69222614E12, 1.6661212E7]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.6922316E12, 2482991.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69223202E12, 2338959.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.6922001E12, 48466.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69221756E12, 1.7536889E7]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.69222608E12, 494442.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.69223178E12, 200962.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.69220232E12, 6380.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69222698E12, 146040.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.69222608E12, 24095.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.6922091E12, 2605922.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.69222608E12, 8514659.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.69220574E12, 2090950.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69221756E12, 3093.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.69222296E12, 3055277.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.6922268E12, 456099.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69222908E12, 2406414.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.69220004E12, 7533.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.69221624E12, 2613321.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69221366E12, 453425.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.6922112E12, 170761.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69220646E12, 6980.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69221162E12, 2481143.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69220898E12, 2543730.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[1.69221624E12, 6436.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[1.69220922E12, 2398732.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1.69220928E12, 56901.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[1.69220466E12, 2501003.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[1.6922124E12, 206385.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.69220652E12, 3146.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69220622E12, 499869.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69221186E12, 81089.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1.69220364E12, 2487378.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69221648E12, 3175.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[1.69220682E12, 77054.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1.69220478E12, 135914.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[1.69220214E12, 223281.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1.6922019E12, 1906640.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[1.69220208E12, 264018.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[1.6922046E12, 2526598.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1.69222626E12, 6826158.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[1.69221936E12, 2287.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[1.69222008E12, 6265.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69223226E12, 2404022.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.69221942E12, 58014.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[1.69221936E12, 605245.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1.6922064E12, 1779778.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1.69220172E12, 1734002.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[1.69221876E12, 2542181.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[1.69222518E12, 2586629.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69221522E12, 2226101.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69219998E12, 16141.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69221264E12, 1.2538077E7]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.69222608E12, 597695.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.692213E12, 364934.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.69222008E12, 2010367.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.69222704E12, 955135.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.6922217E12, 2404408.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69222254E12, 121717.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69220268E12, 189536.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69220004E12, 40282.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.6922025E12, 2165771.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.69220856E12, 92989.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.69221924E12, 451198.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.69221366E12, 11186.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69220034E12, 281548.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.69222608E12, 1791072.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69220706E12, 21155.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69223358E12, 1819359.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.69220004E12, 26235.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69220226E12, 11386.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69220952E12, 2452101.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.69220232E12, 43563.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.69220232E12, 7433.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.69220508E12, 2112.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69220508E12, 2730749.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.69220004E12, 2906.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.6922022E12, 2271.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69220232E12, 3370.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69223358E12, 1691629.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.6922319E12, 2353727.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69220232E12, 13774.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69220004E12, 11682.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69223376E12, 166006.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69222554E12, 2735979.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69221384E12, 1968880.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[1.692234E12, 218766.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.6922199E12, 2177299.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69221648E12, 2633903.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1.69223376E12, 1750945.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69219998E12, 8150.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.69222632E12, 248884.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69222638E12, 10781.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69222968E12, 69644.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69221768E12, 161835.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69223202E12, 5846.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.69221648E12, 8015.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1.69220658E12, 1718583.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[1.69220484E12, 80054.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1.692219E12, 2501344.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[1.6922262E12, 7231860.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1.69220676E12, 110527.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[1.6922118E12, 2507896.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[1.69221954E12, 4325.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221072E12, 17945.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.6922196E12, 77738.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69220592E12, 2150240.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69220364E12, 3652667.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6922106E12, 2286322.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69220004E12, 20943.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[1.69221072E12, 9056.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221894E12, 2491945.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.6922265E12, 367862.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[1.69220436E12, 2615660.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[1.69223376E12, 51218.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1.69220178E12, 10713.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[1.69220178E12, 14480.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1.69222704E12, 517201.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1.69223364E12, 1421713.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[1.69220172E12, 2124.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1.69220682E12, 7161.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1.69221936E12, 395608.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69222164E12, 1989574.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221318E12, 2415157.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69219998E12, 13897.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69220232E12, 6334.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.6922268E12, 679852.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69220652E12, 15148.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.69221954E12, 119.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69220646E12, 242065.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69220118E12, 1160953.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.69221504E12, 2594163.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69220646E12, 4381.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.69221168E12, 104803.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69221756E12, 2548968.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.69222164E12, 166.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.6922322E12, 3079110.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[1.69220478E12, 409853.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[1.69221222E12, 511715.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.69220148E12, 1516983.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[1.69222422E12, 2574417.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69221966E12, 4024.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69222914E12, 2084100.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1.69220682E12, 5557.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[1.69222446E12, 251588.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221954E12, 202321.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69221072E12, 141032.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69222614E12, 17246.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[1.69220826E12, 2352576.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69222614E12, 1.9306715E7]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[1.69221648E12, 325853.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.6922337E12, 101026.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[1.69220376E12, 138758.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69220682E12, 60346.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[1.69220172E12, 224140.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[1.69221612E12, 2969434.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69220676E12, 1956126.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[1.69221366E12, 5959.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.69220808E12, 5423756.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.69221882E12, 2545721.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.6922085E12, 366292.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69222428E12, 2610986.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69221318E12, 2010742.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69220004E12, 8443.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69221102E12, 2437732.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69220898E12, 10719.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[1.69222242E12, 2346049.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69222752E12, 1260388.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[1.69221546E12, 219952.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69222758E12, 21638.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[1.69220184E12, 96831.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1.69222536E12, 182320.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.6922136E12, 14260.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[1.69221162E12, 2670542.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1.6922136E12, 1955430.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[1.6922064E12, 16504.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1.69220664E12, 53979.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[1.69222956E12, 2520441.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69222008E12, 18409.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69222548E12, 154258.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69222986E12, 305829.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.6922001E12, 85702.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.6922022E12, 6199.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.69221804E12, 2616624.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.6922268E12, 1278380.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.69222278E12, 834844.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69223382E12, 58743.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69222194E12, 1.7023967E7]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.6922049E12, 2585215.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.69220232E12, 82484.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.6922022E12, 2194446.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69222956E12, 2759967.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69221624E12, 2621652.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.692234E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69219998E12, "maxY": 1181.0, "series": [{"data": [[1.6922256E12, 0.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.69222914E12, 0.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.69219998E12, 1132.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.692207E12, 0.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.6922262E12, 0.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69222668E12, 0.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69222962E12, 1.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69222704E12, 0.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69220226E12, 1.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69222614E12, 0.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.6922316E12, 0.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69223202E12, 0.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.6922001E12, 0.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.69222608E12, 0.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.69223178E12, 0.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.69220232E12, 0.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69222698E12, 0.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.69222608E12, 0.0]], "isOverall": false, "label": "T3 - Q19", "isController": false}, {"data": [[1.6922091E12, 1.0]], "isOverall": false, "label": "T3 - Q18", "isController": false}, {"data": [[1.69222608E12, 0.0]], "isOverall": false, "label": "T3 - Q15", "isController": false}, {"data": [[1.69220574E12, 0.0]], "isOverall": false, "label": "T3 - Q14", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "T3 - Q16", "isController": false}, {"data": [[1.69222296E12, 0.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.6922268E12, 0.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69222908E12, 0.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.69220004E12, 0.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.69221624E12, 0.0]], "isOverall": false, "label": "T4 - Q12", "isController": false}, {"data": [[1.69221366E12, 0.0]], "isOverall": false, "label": "T4 - Q11", "isController": false}, {"data": [[1.6922112E12, 0.0]], "isOverall": false, "label": "T4 - Q10", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "T3 - Q22", "isController": false}, {"data": [[1.69221162E12, 0.0]], "isOverall": false, "label": "T3 - Q21", "isController": false}, {"data": [[1.69220898E12, 0.0]], "isOverall": false, "label": "T8 - Q21", "isController": false}, {"data": [[1.69221624E12, 0.0]], "isOverall": false, "label": "T8 - Q22", "isController": false}, {"data": [[1.69220922E12, 0.0]], "isOverall": false, "label": "T6 - Q9", "isController": false}, {"data": [[1.69220928E12, 0.0]], "isOverall": false, "label": "T6 - Q8", "isController": false}, {"data": [[1.69220466E12, 0.0]], "isOverall": false, "label": "T6 - Q1", "isController": false}, {"data": [[1.6922124E12, 0.0]], "isOverall": false, "label": "T3 - Q11", "isController": false}, {"data": [[1.69220652E12, 0.0]], "isOverall": false, "label": "T3 - Q10", "isController": false}, {"data": [[1.69220622E12, 1.0]], "isOverall": false, "label": "T3 - Q13", "isController": false}, {"data": [[1.69221186E12, 0.0]], "isOverall": false, "label": "T6 - Q3", "isController": false}, {"data": [[1.69220364E12, 0.0]], "isOverall": false, "label": "T3 - Q12", "isController": false}, {"data": [[1.69221648E12, 0.0]], "isOverall": false, "label": "T6 - Q2", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "T6 - Q5", "isController": false}, {"data": [[1.69220478E12, 0.0]], "isOverall": false, "label": "T6 - Q4", "isController": false}, {"data": [[1.69220214E12, 0.0]], "isOverall": false, "label": "T6 - Q7", "isController": false}, {"data": [[1.6922019E12, 0.0]], "isOverall": false, "label": "T6 - Q6", "isController": false}, {"data": [[1.69220208E12, 0.0]], "isOverall": false, "label": "T8 - Q13", "isController": false}, {"data": [[1.6922046E12, 0.0]], "isOverall": false, "label": "T8 - Q14", "isController": false}, {"data": [[1.69222626E12, 0.0]], "isOverall": false, "label": "T8 - Q15", "isController": false}, {"data": [[1.69221936E12, 0.0]], "isOverall": false, "label": "T8 - Q16", "isController": false}, {"data": [[1.69222008E12, 0.0]], "isOverall": false, "label": "T2 - Q22", "isController": false}, {"data": [[1.69223226E12, 0.0]], "isOverall": false, "label": "T2 - Q21", "isController": false}, {"data": [[1.69221942E12, 0.0]], "isOverall": false, "label": "T8 - Q10", "isController": false}, {"data": [[1.69221936E12, 0.0]], "isOverall": false, "label": "T8 - Q11", "isController": false}, {"data": [[1.6922064E12, 0.0]], "isOverall": false, "label": "T8 - Q12", "isController": false}, {"data": [[1.69220172E12, 996.0]], "isOverall": false, "label": "T8 - Q18", "isController": false}, {"data": [[1.69221876E12, 0.0]], "isOverall": false, "label": "T8 - Q19", "isController": false}, {"data": [[1.69222518E12, 0.0]], "isOverall": false, "label": "T2 - Q19", "isController": false}, {"data": [[1.69221522E12, 0.0]], "isOverall": false, "label": "T2 - Q18", "isController": false}, {"data": [[1.69219998E12, 690.0]], "isOverall": false, "label": "T2 - Q16", "isController": false}, {"data": [[1.69221264E12, 1.0]], "isOverall": false, "label": "T2 - Q15", "isController": false}, {"data": [[1.69222608E12, 0.0]], "isOverall": false, "label": "T2 - Q14", "isController": false}, {"data": [[1.692213E12, 0.0]], "isOverall": false, "label": "T2 - Q13", "isController": false}, {"data": [[1.69222008E12, 0.0]], "isOverall": false, "label": "T2 - Q12", "isController": false}, {"data": [[1.69222704E12, 0.0]], "isOverall": false, "label": "T2 - Q11", "isController": false}, {"data": [[1.6922217E12, 0.0]], "isOverall": false, "label": "T4 - Q9", "isController": false}, {"data": [[1.69222254E12, 0.0]], "isOverall": false, "label": "T2 - Q10", "isController": false}, {"data": [[1.69220268E12, 1.0]], "isOverall": false, "label": "T4 - Q8", "isController": false}, {"data": [[1.69220004E12, 806.0]], "isOverall": false, "label": "T4 - Q7", "isController": false}, {"data": [[1.6922025E12, 0.0]], "isOverall": false, "label": "T4 - Q6", "isController": false}, {"data": [[1.69220856E12, 0.0]], "isOverall": false, "label": "T4 - Q5", "isController": false}, {"data": [[1.69221924E12, 0.0]], "isOverall": false, "label": "T4 - Q4", "isController": false}, {"data": [[1.69221366E12, 0.0]], "isOverall": false, "label": "T4 - Q3", "isController": false}, {"data": [[1.69220034E12, 0.0]], "isOverall": false, "label": "T4 - Q2", "isController": false}, {"data": [[1.69222608E12, 0.0]], "isOverall": false, "label": "T4 - Q1", "isController": false}, {"data": [[1.69220706E12, 0.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69223358E12, 0.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.69220004E12, 1093.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69220226E12, 0.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69220952E12, 0.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.69220232E12, 0.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.69220232E12, 0.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.69220508E12, 0.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69220508E12, 0.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.69220004E12, 0.0]], "isOverall": false, "label": "T5 - Q3", "isController": false}, {"data": [[1.6922022E12, 1.0]], "isOverall": false, "label": "T5 - Q4", "isController": false}, {"data": [[1.69220232E12, 0.0]], "isOverall": false, "label": "T5 - Q5", "isController": false}, {"data": [[1.69223358E12, 0.0]], "isOverall": false, "label": "T5 - Q6", "isController": false}, {"data": [[1.6922319E12, 0.0]], "isOverall": false, "label": "T5 - Q1", "isController": false}, {"data": [[1.69220232E12, 0.0]], "isOverall": false, "label": "T5 - Q2", "isController": false}, {"data": [[1.69220004E12, 0.0]], "isOverall": false, "label": "T5 - Q7", "isController": false}, {"data": [[1.69223376E12, 0.0]], "isOverall": false, "label": "T5 - Q8", "isController": false}, {"data": [[1.69222554E12, 0.0]], "isOverall": false, "label": "T5 - Q9", "isController": false}, {"data": [[1.69221384E12, 0.0]], "isOverall": false, "label": "T6 - Q21", "isController": false}, {"data": [[1.692234E12, 0.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.6922199E12, 0.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69221648E12, 0.0]], "isOverall": false, "label": "T6 - Q19", "isController": false}, {"data": [[1.69223376E12, 0.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69219998E12, 1.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.69222632E12, 0.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69222638E12, 0.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69222968E12, 1.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69221768E12, 0.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69223202E12, 0.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.69221648E12, 0.0]], "isOverall": false, "label": "T6 - Q11", "isController": false}, {"data": [[1.69220658E12, 0.0]], "isOverall": false, "label": "T6 - Q12", "isController": false}, {"data": [[1.69220484E12, 0.0]], "isOverall": false, "label": "T6 - Q13", "isController": false}, {"data": [[1.692219E12, 0.0]], "isOverall": false, "label": "T6 - Q14", "isController": false}, {"data": [[1.6922262E12, 0.0]], "isOverall": false, "label": "T6 - Q15", "isController": false}, {"data": [[1.69220676E12, 0.0]], "isOverall": false, "label": "T6 - Q16", "isController": false}, {"data": [[1.6922118E12, 0.0]], "isOverall": false, "label": "T6 - Q18", "isController": false}, {"data": [[1.69221954E12, 0.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.69221072E12, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.6922196E12, 0.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69220592E12, 0.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69220364E12, 662.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.6922106E12, 0.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69220004E12, 1048.0]], "isOverall": false, "label": "T6 - Q22", "isController": false}, {"data": [[1.69221072E12, 0.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69221894E12, 0.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.6922265E12, 1.0]], "isOverall": false, "label": "T7 - Q9", "isController": false}, {"data": [[1.69220436E12, 0.0]], "isOverall": false, "label": "T7 - Q6", "isController": false}, {"data": [[1.69223376E12, 0.0]], "isOverall": false, "label": "T7 - Q5", "isController": false}, {"data": [[1.69220178E12, 1.0]], "isOverall": false, "label": "T7 - Q8", "isController": false}, {"data": [[1.69220178E12, 0.0]], "isOverall": false, "label": "T7 - Q7", "isController": false}, {"data": [[1.69222704E12, 0.0]], "isOverall": false, "label": "T7 - Q2", "isController": false}, {"data": [[1.69223364E12, 0.0]], "isOverall": false, "label": "T7 - Q1", "isController": false}, {"data": [[1.69220172E12, 0.0]], "isOverall": false, "label": "T7 - Q4", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "T7 - Q3", "isController": false}, {"data": [[1.69221936E12, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69222164E12, 0.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69221318E12, 0.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.69219998E12, 1001.0]], "isOverall": false, "label": "T5 - Q11", "isController": false}, {"data": [[1.69220232E12, 0.0]], "isOverall": false, "label": "T5 - Q10", "isController": false}, {"data": [[1.6922268E12, 0.0]], "isOverall": false, "label": "T3 - Q7", "isController": false}, {"data": [[1.69220652E12, 0.0]], "isOverall": false, "label": "T3 - Q8", "isController": false}, {"data": [[1.69221954E12, 0.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "T3 - Q5", "isController": false}, {"data": [[1.69220118E12, 1181.0]], "isOverall": false, "label": "T3 - Q6", "isController": false}, {"data": [[1.69221504E12, 0.0]], "isOverall": false, "label": "T3 - Q9", "isController": false}, {"data": [[1.69220646E12, 0.0]], "isOverall": false, "label": "T3 - Q3", "isController": false}, {"data": [[1.69221168E12, 0.0]], "isOverall": false, "label": "T3 - Q4", "isController": false}, {"data": [[1.69221756E12, 0.0]], "isOverall": false, "label": "T3 - Q1", "isController": false}, {"data": [[1.69222164E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.6922322E12, 0.0]], "isOverall": false, "label": "T7 - Q21", "isController": false}, {"data": [[1.69220478E12, 1.0]], "isOverall": false, "label": "T7 - Q22", "isController": false}, {"data": [[1.69221222E12, 0.0]], "isOverall": false, "label": "T3 - Q2", "isController": false}, {"data": [[1.69220148E12, 895.0]], "isOverall": false, "label": "T7 - Q18", "isController": false}, {"data": [[1.69222422E12, 0.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69221966E12, 0.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69222914E12, 0.0]], "isOverall": false, "label": "T7 - Q19", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "T7 - Q16", "isController": false}, {"data": [[1.69222446E12, 0.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69221954E12, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69221072E12, 0.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69222614E12, 0.0]], "isOverall": false, "label": "T7 - Q14", "isController": false}, {"data": [[1.69220826E12, 0.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69222614E12, 0.0]], "isOverall": false, "label": "T7 - Q15", "isController": false}, {"data": [[1.69221648E12, 0.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.6922337E12, 0.0]], "isOverall": false, "label": "T7 - Q12", "isController": false}, {"data": [[1.69220376E12, 0.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69220682E12, 0.0]], "isOverall": false, "label": "T7 - Q13", "isController": false}, {"data": [[1.69220172E12, 0.0]], "isOverall": false, "label": "T7 - Q10", "isController": false}, {"data": [[1.69221612E12, 0.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.69220676E12, 0.0]], "isOverall": false, "label": "T7 - Q11", "isController": false}, {"data": [[1.69221366E12, 1.0]], "isOverall": false, "label": "T4 - Q16", "isController": false}, {"data": [[1.69220808E12, 0.0]], "isOverall": false, "label": "T4 - Q15", "isController": false}, {"data": [[1.69221882E12, 0.0]], "isOverall": false, "label": "T4 - Q14", "isController": false}, {"data": [[1.6922085E12, 0.0]], "isOverall": false, "label": "T4 - Q13", "isController": false}, {"data": [[1.69222428E12, 1.0]], "isOverall": false, "label": "T4 - Q19", "isController": false}, {"data": [[1.69221318E12, 0.0]], "isOverall": false, "label": "T4 - Q18", "isController": false}, {"data": [[1.69220004E12, 0.0]], "isOverall": false, "label": "T4 - Q22", "isController": false}, {"data": [[1.69221102E12, 1.0]], "isOverall": false, "label": "T4 - Q21", "isController": false}, {"data": [[1.69220898E12, 0.0]], "isOverall": false, "label": "T8 - Q4", "isController": false}, {"data": [[1.69222242E12, 0.0]], "isOverall": false, "label": "T2 - Q1", "isController": false}, {"data": [[1.69222752E12, 0.0]], "isOverall": false, "label": "T8 - Q5", "isController": false}, {"data": [[1.69221546E12, 0.0]], "isOverall": false, "label": "T2 - Q3", "isController": false}, {"data": [[1.69222758E12, 0.0]], "isOverall": false, "label": "T8 - Q2", "isController": false}, {"data": [[1.69220184E12, 0.0]], "isOverall": false, "label": "T8 - Q3", "isController": false}, {"data": [[1.69222536E12, 0.0]], "isOverall": false, "label": "T2 - Q2", "isController": false}, {"data": [[1.6922136E12, 0.0]], "isOverall": false, "label": "T8 - Q8", "isController": false}, {"data": [[1.69221162E12, 1.0]], "isOverall": false, "label": "T8 - Q9", "isController": false}, {"data": [[1.6922136E12, 0.0]], "isOverall": false, "label": "T8 - Q6", "isController": false}, {"data": [[1.6922064E12, 0.0]], "isOverall": false, "label": "T8 - Q7", "isController": false}, {"data": [[1.69220664E12, 0.0]], "isOverall": false, "label": "T6 - Q10", "isController": false}, {"data": [[1.69222956E12, 0.0]], "isOverall": false, "label": "T2 - Q9", "isController": false}, {"data": [[1.69222008E12, 0.0]], "isOverall": false, "label": "T2 - Q8", "isController": false}, {"data": [[1.69222548E12, 0.0]], "isOverall": false, "label": "T2 - Q5", "isController": false}, {"data": [[1.69222986E12, 0.0]], "isOverall": false, "label": "T2 - Q4", "isController": false}, {"data": [[1.6922001E12, 0.0]], "isOverall": false, "label": "T2 - Q7", "isController": false}, {"data": [[1.6922022E12, 0.0]], "isOverall": false, "label": "T5 - Q22", "isController": false}, {"data": [[1.69221804E12, 0.0]], "isOverall": false, "label": "T2 - Q6", "isController": false}, {"data": [[1.6922268E12, 0.0]], "isOverall": false, "label": "T5 - Q21", "isController": false}, {"data": [[1.69222278E12, 1.0]], "isOverall": false, "label": "T5 - Q13", "isController": false}, {"data": [[1.69223382E12, 0.0]], "isOverall": false, "label": "T5 - Q12", "isController": false}, {"data": [[1.69222194E12, 0.0]], "isOverall": false, "label": "T5 - Q15", "isController": false}, {"data": [[1.6922049E12, 0.0]], "isOverall": false, "label": "T5 - Q14", "isController": false}, {"data": [[1.69220232E12, 0.0]], "isOverall": false, "label": "T5 - Q16", "isController": false}, {"data": [[1.6922022E12, 0.0]], "isOverall": false, "label": "T5 - Q19", "isController": false}, {"data": [[1.69222956E12, 0.0]], "isOverall": false, "label": "T5 - Q18", "isController": false}, {"data": [[1.69221624E12, 0.0]], "isOverall": false, "label": "T8 - Q1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.692234E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 119.0, "minX": 1.69219998E12, "maxY": 1.9306715E7, "series": [{"data": [[1.692234E12, 218766.0], [1.69223382E12, 58743.0], [1.69220172E12, 1734002.0], [1.6922106E12, 2286325.0], [1.69221504E12, 2594163.0], [1.6922217E12, 2404408.0], [1.69222614E12, 1.9306715E7], [1.69221162E12, 2670543.0], [1.69221384E12, 1968880.0], [1.6922316E12, 2482991.0], [1.69222752E12, 1260388.0], [1.69220478E12, 409854.0], [1.692207E12, 1957033.0], [1.69221366E12, 453435.0], [1.69220376E12, 138758.0], [1.69221264E12, 1.2538078E7], [1.69221966E12, 4025.0], [1.69222632E12, 248884.0], [1.69220922E12, 2398733.0], [1.69222956E12, 2759967.0], [1.69223178E12, 200962.0], [1.6922046E12, 2526598.0], [1.69222428E12, 2610986.0], [1.69221882E12, 2545721.0], [1.69220682E12, 77054.0], [1.69219998E12, 16198.0], [1.69220034E12, 281548.0], [1.6922265E12, 367862.0], [1.69222548E12, 154258.0], [1.69222446E12, 251589.0], [1.6922022E12, 2194447.0], [1.692219E12, 2501344.0], [1.69220664E12, 53979.0], [1.69222668E12, 498723.0], [1.69220118E12, 1160953.0], [1.69222242E12, 2346049.0], [1.69222704E12, 955140.0], [1.69221936E12, 605249.0], [1.69220646E12, 242065.0], [1.69222908E12, 2406414.0], [1.69220508E12, 2730750.0], [1.69220184E12, 96832.0], [1.69221072E12, 141032.0], [1.69220952E12, 2452101.0], [1.69221954E12, 202321.0], [1.69222278E12, 834844.0], [1.6922085E12, 366292.0], [1.6922337E12, 101026.0], [1.69222962E12, 478161.0], [1.69222296E12, 3055278.0], [1.69220268E12, 189536.0], [1.6922049E12, 2585216.0], [1.69222518E12, 2586629.0], [1.6922262E12, 7231860.0], [1.69222194E12, 1.7023967E7], [1.6922025E12, 2165771.0], [1.69221768E12, 161835.0], [1.69220574E12, 2090950.0], [1.6922136E12, 1955430.0], [1.69223202E12, 2338959.0], [1.69222536E12, 182320.0], [1.69222758E12, 21639.0], [1.6922124E12, 206407.0], [1.6922199E12, 2177299.0], [1.69220148E12, 1516984.0], [1.69220592E12, 2150240.0], [1.69222638E12, 10781.0], [1.69220232E12, 82496.0], [1.69220898E12, 2543730.0], [1.6922112E12, 170761.0], [1.69222008E12, 2010367.0], [1.6922322E12, 3079110.0], [1.69221222E12, 511715.0], [1.69220676E12, 1956204.0], [1.69222554E12, 2735979.0], [1.69221102E12, 2437732.0], [1.69221546E12, 219952.0], [1.69222914E12, 2084100.0], [1.69221804E12, 2616624.0], [1.69221648E12, 2633903.0], [1.6922001E12, 85702.0], [1.69221924E12, 451198.0], [1.69220214E12, 223281.0], [1.69220436E12, 2615660.0], [1.69220658E12, 1718584.0], [1.69221186E12, 81090.0], [1.69222608E12, 8514659.0], [1.69220622E12, 499869.0], [1.69223376E12, 1750945.0], [1.69222164E12, 1989574.0], [1.69223358E12, 1819359.0], [1.69221612E12, 2969434.0], [1.69221942E12, 58015.0], [1.6922064E12, 1779778.0], [1.69221168E12, 104803.0], [1.6922196E12, 77738.0], [1.69222626E12, 6826158.0], [1.69220826E12, 2352576.0], [1.69220178E12, 14480.0], [1.69220928E12, 56902.0], [1.6922319E12, 2353727.0], [1.69221756E12, 1.7536889E7], [1.69220364E12, 3652667.0], [1.69220808E12, 5423756.0], [1.69220484E12, 80055.0], [1.69222422E12, 2574417.0], [1.69222968E12, 69645.0], [1.69220706E12, 21155.0], [1.69221876E12, 2542181.0], [1.6922091E12, 2605923.0], [1.6922256E12, 2653603.0], [1.69220466E12, 2501003.0], [1.69222986E12, 305829.0], [1.69221894E12, 2491945.0], [1.69220652E12, 15148.0], [1.69221318E12, 2415158.0], [1.6922268E12, 1278381.0], [1.69220226E12, 2192424.0], [1.69223226E12, 2404022.0], [1.692213E12, 364934.0], [1.69220004E12, 40282.0], [1.69222254E12, 121718.0], [1.69223364E12, 1421713.0], [1.69221522E12, 2226103.0], [1.6922019E12, 1906640.0], [1.69220856E12, 92989.0], [1.69220208E12, 264019.0], [1.69222698E12, 146040.0], [1.6922118E12, 2507897.0], [1.69221624E12, 2621653.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.692234E12, 218766.0], [1.69223382E12, 58743.0], [1.69220172E12, 1734002.0], [1.6922106E12, 2286325.0], [1.69221504E12, 2594163.0], [1.6922217E12, 2404408.0], [1.69222614E12, 1.9306715E7], [1.69221162E12, 2670543.0], [1.69221384E12, 1968880.0], [1.6922316E12, 2482991.0], [1.69222752E12, 1260388.0], [1.69220478E12, 409854.0], [1.692207E12, 1957033.0], [1.69221366E12, 453435.0], [1.69220376E12, 138758.0], [1.69221264E12, 1.2538078E7], [1.69221966E12, 4025.0], [1.69222632E12, 248884.0], [1.69220922E12, 2398733.0], [1.69222956E12, 2759967.0], [1.69223178E12, 200962.0], [1.6922046E12, 2526598.0], [1.69222428E12, 2610986.0], [1.69221882E12, 2545721.0], [1.69220682E12, 77054.0], [1.69219998E12, 16198.0], [1.69220034E12, 281548.0], [1.6922265E12, 367862.0], [1.69222548E12, 154258.0], [1.69222446E12, 251589.0], [1.6922022E12, 2194447.0], [1.692219E12, 2501344.0], [1.69220664E12, 53979.0], [1.69222668E12, 498723.0], [1.69220118E12, 1160953.0], [1.69222242E12, 2346049.0], [1.69222704E12, 955140.0], [1.69221936E12, 605249.0], [1.69220646E12, 242065.0], [1.69222908E12, 2406414.0], [1.69220508E12, 2730750.0], [1.69220184E12, 96832.0], [1.69221072E12, 141032.0], [1.69220952E12, 2452101.0], [1.69221954E12, 202321.0], [1.69222278E12, 834844.0], [1.6922085E12, 366292.0], [1.6922337E12, 101026.0], [1.69222962E12, 478161.0], [1.69222296E12, 3055278.0], [1.69220268E12, 189536.0], [1.6922049E12, 2585216.0], [1.69222518E12, 2586629.0], [1.6922262E12, 7231860.0], [1.69222194E12, 1.7023967E7], [1.6922025E12, 2165771.0], [1.69221768E12, 161835.0], [1.69220574E12, 2090950.0], [1.6922136E12, 1955430.0], [1.69223202E12, 2338959.0], [1.69222536E12, 182320.0], [1.69222758E12, 21639.0], [1.6922124E12, 206407.0], [1.6922199E12, 2177299.0], [1.69220148E12, 1516984.0], [1.69220592E12, 2150240.0], [1.69222638E12, 10781.0], [1.69220232E12, 82496.0], [1.69220898E12, 2543730.0], [1.6922112E12, 170761.0], [1.69222008E12, 2010367.0], [1.6922322E12, 3079110.0], [1.69221222E12, 511715.0], [1.69220676E12, 1956204.0], [1.69222554E12, 2735979.0], [1.69221102E12, 2437732.0], [1.69221546E12, 219952.0], [1.69222914E12, 2084100.0], [1.69221804E12, 2616624.0], [1.69221648E12, 2633903.0], [1.6922001E12, 85702.0], [1.69221924E12, 451198.0], [1.69220214E12, 223281.0], [1.69220436E12, 2615660.0], [1.69220658E12, 1718584.0], [1.69221186E12, 81090.0], [1.69222608E12, 8514659.0], [1.69220622E12, 499869.0], [1.69223376E12, 1750945.0], [1.69222164E12, 1989574.0], [1.69223358E12, 1819359.0], [1.69221612E12, 2969434.0], [1.69221942E12, 58015.0], [1.6922064E12, 1779778.0], [1.69221168E12, 104803.0], [1.6922196E12, 77738.0], [1.69222626E12, 6826158.0], [1.69220826E12, 2352576.0], [1.69220178E12, 14480.0], [1.69220928E12, 56902.0], [1.6922319E12, 2353727.0], [1.69221756E12, 1.7536889E7], [1.69220364E12, 3652667.0], [1.69220808E12, 5423756.0], [1.69220484E12, 80055.0], [1.69222422E12, 2574417.0], [1.69222968E12, 69645.0], [1.69220706E12, 21155.0], [1.69221876E12, 2542181.0], [1.6922091E12, 2605923.0], [1.6922256E12, 2653603.0], [1.69220466E12, 2501003.0], [1.69222986E12, 305829.0], [1.69221894E12, 2491945.0], [1.69220652E12, 15148.0], [1.69221318E12, 2415158.0], [1.6922268E12, 1278381.0], [1.69220226E12, 2192424.0], [1.69223226E12, 2404022.0], [1.692213E12, 364934.0], [1.69220004E12, 40282.0], [1.69222254E12, 121718.0], [1.69223364E12, 1421713.0], [1.69221522E12, 2226103.0], [1.6922019E12, 1906640.0], [1.69220856E12, 92989.0], [1.69220208E12, 264019.0], [1.69222698E12, 146040.0], [1.6922118E12, 2507897.0], [1.69221624E12, 2621653.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.692234E12, 218766.0], [1.69223382E12, 58743.0], [1.69220172E12, 1734002.0], [1.6922106E12, 2286325.0], [1.69221504E12, 2594163.0], [1.6922217E12, 2404408.0], [1.69222614E12, 1.9306715E7], [1.69221162E12, 2670543.0], [1.69221384E12, 1968880.0], [1.6922316E12, 2482991.0], [1.69222752E12, 1260388.0], [1.69220478E12, 409854.0], [1.692207E12, 1957033.0], [1.69221366E12, 453435.0], [1.69220376E12, 138758.0], [1.69221264E12, 1.2538078E7], [1.69221966E12, 4025.0], [1.69222632E12, 248884.0], [1.69220922E12, 2398733.0], [1.69222956E12, 2759967.0], [1.69223178E12, 200962.0], [1.6922046E12, 2526598.0], [1.69222428E12, 2610986.0], [1.69221882E12, 2545721.0], [1.69220682E12, 77054.0], [1.69219998E12, 16198.0], [1.69220034E12, 281548.0], [1.6922265E12, 367862.0], [1.69222548E12, 154258.0], [1.69222446E12, 251589.0], [1.6922022E12, 2194447.0], [1.692219E12, 2501344.0], [1.69220664E12, 53979.0], [1.69222668E12, 498723.0], [1.69220118E12, 1160953.0], [1.69222242E12, 2346049.0], [1.69222704E12, 955140.0], [1.69221936E12, 605249.0], [1.69220646E12, 242065.0], [1.69222908E12, 2406414.0], [1.69220508E12, 2730750.0], [1.69220184E12, 96832.0], [1.69221072E12, 141032.0], [1.69220952E12, 2452101.0], [1.69221954E12, 202321.0], [1.69222278E12, 834844.0], [1.6922085E12, 366292.0], [1.6922337E12, 101026.0], [1.69222962E12, 478161.0], [1.69222296E12, 3055278.0], [1.69220268E12, 189536.0], [1.6922049E12, 2585216.0], [1.69222518E12, 2586629.0], [1.6922262E12, 7231860.0], [1.69222194E12, 1.7023967E7], [1.6922025E12, 2165771.0], [1.69221768E12, 161835.0], [1.69220574E12, 2090950.0], [1.6922136E12, 1955430.0], [1.69223202E12, 2338959.0], [1.69222536E12, 182320.0], [1.69222758E12, 21639.0], [1.6922124E12, 206407.0], [1.6922199E12, 2177299.0], [1.69220148E12, 1516984.0], [1.69220592E12, 2150240.0], [1.69222638E12, 10781.0], [1.69220232E12, 82496.0], [1.69220898E12, 2543730.0], [1.6922112E12, 170761.0], [1.69222008E12, 2010367.0], [1.6922322E12, 3079110.0], [1.69221222E12, 511715.0], [1.69220676E12, 1956204.0], [1.69222554E12, 2735979.0], [1.69221102E12, 2437732.0], [1.69221546E12, 219952.0], [1.69222914E12, 2084100.0], [1.69221804E12, 2616624.0], [1.69221648E12, 2633903.0], [1.6922001E12, 85702.0], [1.69221924E12, 451198.0], [1.69220214E12, 223281.0], [1.69220436E12, 2615660.0], [1.69220658E12, 1718584.0], [1.69221186E12, 81090.0], [1.69222608E12, 8514659.0], [1.69220622E12, 499869.0], [1.69223376E12, 1750945.0], [1.69222164E12, 1989574.0], [1.69223358E12, 1819359.0], [1.69221612E12, 2969434.0], [1.69221942E12, 58015.0], [1.6922064E12, 1779778.0], [1.69221168E12, 104803.0], [1.6922196E12, 77738.0], [1.69222626E12, 6826158.0], [1.69220826E12, 2352576.0], [1.69220178E12, 14480.0], [1.69220928E12, 56902.0], [1.6922319E12, 2353727.0], [1.69221756E12, 1.7536889E7], [1.69220364E12, 3652667.0], [1.69220808E12, 5423756.0], [1.69220484E12, 80055.0], [1.69222422E12, 2574417.0], [1.69222968E12, 69645.0], [1.69220706E12, 21155.0], [1.69221876E12, 2542181.0], [1.6922091E12, 2605923.0], [1.6922256E12, 2653603.0], [1.69220466E12, 2501003.0], [1.69222986E12, 305829.0], [1.69221894E12, 2491945.0], [1.69220652E12, 15148.0], [1.69221318E12, 2415158.0], [1.6922268E12, 1278381.0], [1.69220226E12, 2192424.0], [1.69223226E12, 2404022.0], [1.692213E12, 364934.0], [1.69220004E12, 40282.0], [1.69222254E12, 121718.0], [1.69223364E12, 1421713.0], [1.69221522E12, 2226103.0], [1.6922019E12, 1906640.0], [1.69220856E12, 92989.0], [1.69220208E12, 264019.0], [1.69222698E12, 146040.0], [1.6922118E12, 2507897.0], [1.69221624E12, 2621653.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.692234E12, 218766.0], [1.69223382E12, 58743.0], [1.69220172E12, 1734002.0], [1.6922106E12, 2286325.0], [1.69221504E12, 2594163.0], [1.6922217E12, 2404408.0], [1.69222614E12, 1.9306715E7], [1.69221162E12, 2670543.0], [1.69221384E12, 1968880.0], [1.6922316E12, 2482991.0], [1.69222752E12, 1260388.0], [1.69220478E12, 409854.0], [1.692207E12, 1957033.0], [1.69221366E12, 453435.0], [1.69220376E12, 138758.0], [1.69221264E12, 1.2538078E7], [1.69221966E12, 4025.0], [1.69222632E12, 248884.0], [1.69220922E12, 2398733.0], [1.69222956E12, 2759967.0], [1.69223178E12, 200962.0], [1.6922046E12, 2526598.0], [1.69222428E12, 2610986.0], [1.69221882E12, 2545721.0], [1.69220682E12, 77054.0], [1.69219998E12, 16198.0], [1.69220034E12, 281548.0], [1.6922265E12, 367862.0], [1.69222548E12, 154258.0], [1.69222446E12, 251589.0], [1.6922022E12, 2194447.0], [1.692219E12, 2501344.0], [1.69220664E12, 53979.0], [1.69222668E12, 498723.0], [1.69220118E12, 1160953.0], [1.69222242E12, 2346049.0], [1.69222704E12, 955140.0], [1.69221936E12, 605249.0], [1.69220646E12, 242065.0], [1.69222908E12, 2406414.0], [1.69220508E12, 2730750.0], [1.69220184E12, 96832.0], [1.69221072E12, 141032.0], [1.69220952E12, 2452101.0], [1.69221954E12, 202321.0], [1.69222278E12, 834844.0], [1.6922085E12, 366292.0], [1.6922337E12, 101026.0], [1.69222962E12, 478161.0], [1.69222296E12, 3055278.0], [1.69220268E12, 189536.0], [1.6922049E12, 2585216.0], [1.69222518E12, 2586629.0], [1.6922262E12, 7231860.0], [1.69222194E12, 1.7023967E7], [1.6922025E12, 2165771.0], [1.69221768E12, 161835.0], [1.69220574E12, 2090950.0], [1.6922136E12, 1955430.0], [1.69223202E12, 2338959.0], [1.69222536E12, 182320.0], [1.69222758E12, 21639.0], [1.6922124E12, 206407.0], [1.6922199E12, 2177299.0], [1.69220148E12, 1516984.0], [1.69220592E12, 2150240.0], [1.69222638E12, 10781.0], [1.69220232E12, 82496.0], [1.69220898E12, 2543730.0], [1.6922112E12, 170761.0], [1.69222008E12, 2010367.0], [1.6922322E12, 3079110.0], [1.69221222E12, 511715.0], [1.69220676E12, 1956204.0], [1.69222554E12, 2735979.0], [1.69221102E12, 2437732.0], [1.69221546E12, 219952.0], [1.69222914E12, 2084100.0], [1.69221804E12, 2616624.0], [1.69221648E12, 2633903.0], [1.6922001E12, 85702.0], [1.69221924E12, 451198.0], [1.69220214E12, 223281.0], [1.69220436E12, 2615660.0], [1.69220658E12, 1718584.0], [1.69221186E12, 81090.0], [1.69222608E12, 8514659.0], [1.69220622E12, 499869.0], [1.69223376E12, 1750945.0], [1.69222164E12, 1989574.0], [1.69223358E12, 1819359.0], [1.69221612E12, 2969434.0], [1.69221942E12, 58015.0], [1.6922064E12, 1779778.0], [1.69221168E12, 104803.0], [1.6922196E12, 77738.0], [1.69222626E12, 6826158.0], [1.69220826E12, 2352576.0], [1.69220178E12, 14480.0], [1.69220928E12, 56902.0], [1.6922319E12, 2353727.0], [1.69221756E12, 1.7536889E7], [1.69220364E12, 3652667.0], [1.69220808E12, 5423756.0], [1.69220484E12, 80055.0], [1.69222422E12, 2574417.0], [1.69222968E12, 69645.0], [1.69220706E12, 21155.0], [1.69221876E12, 2542181.0], [1.6922091E12, 2605923.0], [1.6922256E12, 2653603.0], [1.69220466E12, 2501003.0], [1.69222986E12, 305829.0], [1.69221894E12, 2491945.0], [1.69220652E12, 15148.0], [1.69221318E12, 2415158.0], [1.6922268E12, 1278381.0], [1.69220226E12, 2192424.0], [1.69223226E12, 2404022.0], [1.692213E12, 364934.0], [1.69220004E12, 40282.0], [1.69222254E12, 121718.0], [1.69223364E12, 1421713.0], [1.69221522E12, 2226103.0], [1.6922019E12, 1906640.0], [1.69220856E12, 92989.0], [1.69220208E12, 264019.0], [1.69222698E12, 146040.0], [1.6922118E12, 2507897.0], [1.69221624E12, 2621653.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.692234E12, 218766.0], [1.69223382E12, 58743.0], [1.69220172E12, 2124.0], [1.6922106E12, 2286325.0], [1.69221504E12, 2594163.0], [1.6922217E12, 2404408.0], [1.69222614E12, 17246.0], [1.69221162E12, 2481144.0], [1.69221384E12, 1968880.0], [1.6922316E12, 2482991.0], [1.69222752E12, 1260388.0], [1.69220478E12, 135914.0], [1.692207E12, 1957033.0], [1.69221366E12, 5971.0], [1.69220376E12, 138758.0], [1.69221264E12, 1.2538078E7], [1.69221966E12, 4025.0], [1.69222632E12, 248884.0], [1.69220922E12, 2398733.0], [1.69222956E12, 2520441.0], [1.69223178E12, 200962.0], [1.6922046E12, 2526598.0], [1.69222428E12, 2610986.0], [1.69221882E12, 2545721.0], [1.69220682E12, 5565.0], [1.69219998E12, 7950.0], [1.69220034E12, 281548.0], [1.6922265E12, 367862.0], [1.69222548E12, 154258.0], [1.69222446E12, 251589.0], [1.6922022E12, 2271.0], [1.692219E12, 2501344.0], [1.69220664E12, 53979.0], [1.69222668E12, 498723.0], [1.69220118E12, 1160953.0], [1.69222242E12, 2346049.0], [1.69222704E12, 94757.0], [1.69221936E12, 2296.0], [1.69220646E12, 4382.0], [1.69222908E12, 2406414.0], [1.69220508E12, 2112.0], [1.69220184E12, 96832.0], [1.69221072E12, 9057.0], [1.69220952E12, 2452101.0], [1.69221954E12, 119.0], [1.69222278E12, 834844.0], [1.6922085E12, 366292.0], [1.6922337E12, 101026.0], [1.69222962E12, 478161.0], [1.69222296E12, 3055278.0], [1.69220268E12, 189536.0], [1.6922049E12, 2585216.0], [1.69222518E12, 2586629.0], [1.6922262E12, 19645.0], [1.69222194E12, 1.7023967E7], [1.6922025E12, 2165771.0], [1.69221768E12, 161835.0], [1.69220574E12, 2090950.0], [1.6922136E12, 14260.0], [1.69223202E12, 5846.0], [1.69222536E12, 182320.0], [1.69222758E12, 21639.0], [1.6922124E12, 206407.0], [1.6922199E12, 2177299.0], [1.69220148E12, 1516984.0], [1.69220592E12, 2150240.0], [1.69222638E12, 10781.0], [1.69220232E12, 3371.0], [1.69220898E12, 10719.0], [1.6922112E12, 170761.0], [1.69222008E12, 6265.0], [1.6922322E12, 3079110.0], [1.69221222E12, 511715.0], [1.69220676E12, 110536.0], [1.69222554E12, 2735979.0], [1.69221102E12, 2437732.0], [1.69221546E12, 219952.0], [1.69222914E12, 2077917.0], [1.69221804E12, 2616624.0], [1.69221648E12, 3175.0], [1.6922001E12, 48466.0], [1.69221924E12, 451198.0], [1.69220214E12, 223281.0], [1.69220436E12, 2615660.0], [1.69220658E12, 1718584.0], [1.69221186E12, 81090.0], [1.69222608E12, 24095.0], [1.69220622E12, 499869.0], [1.69223376E12, 51218.0], [1.69222164E12, 166.0], [1.69223358E12, 1691629.0], [1.69221612E12, 2969434.0], [1.69221942E12, 58015.0], [1.6922064E12, 16504.0], [1.69221168E12, 104803.0], [1.6922196E12, 77738.0], [1.69222626E12, 6826158.0], [1.69220826E12, 2352576.0], [1.69220178E12, 10713.0], [1.69220928E12, 56902.0], [1.6922319E12, 2353727.0], [1.69221756E12, 3105.0], [1.69220364E12, 2487378.0], [1.69220808E12, 5423756.0], [1.69220484E12, 80055.0], [1.69222422E12, 2574417.0], [1.69222968E12, 69645.0], [1.69220706E12, 21155.0], [1.69221876E12, 2542181.0], [1.6922091E12, 2605923.0], [1.6922256E12, 2653603.0], [1.69220466E12, 2501003.0], [1.69222986E12, 305829.0], [1.69221894E12, 2491945.0], [1.69220652E12, 3146.0], [1.69221318E12, 2010742.0], [1.6922268E12, 456099.0], [1.69220226E12, 11386.0], [1.69223226E12, 2404022.0], [1.692213E12, 364934.0], [1.69220004E12, 2907.0], [1.69222254E12, 121718.0], [1.69223364E12, 1421713.0], [1.69221522E12, 2226103.0], [1.6922019E12, 1906640.0], [1.69220856E12, 92989.0], [1.69220208E12, 264019.0], [1.69222698E12, 146040.0], [1.6922118E12, 2507897.0], [1.69221624E12, 6436.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.692234E12, 218766.0], [1.69223382E12, 58743.0], [1.69220172E12, 224140.0], [1.6922106E12, 2286325.0], [1.69221504E12, 2594163.0], [1.6922217E12, 2404408.0], [1.69222614E12, 1.6661212E7], [1.69221162E12, 2575843.5], [1.69221384E12, 1968880.0], [1.6922316E12, 2482991.0], [1.69222752E12, 1260388.0], [1.69220478E12, 272884.0], [1.692207E12, 1957033.0], [1.69221366E12, 11187.0], [1.69220376E12, 138758.0], [1.69221264E12, 1.2538078E7], [1.69221966E12, 4025.0], [1.69222632E12, 248884.0], [1.69220922E12, 2398733.0], [1.69222956E12, 2640204.0], [1.69223178E12, 200962.0], [1.6922046E12, 2526598.0], [1.69222428E12, 2610986.0], [1.69221882E12, 2545721.0], [1.69220682E12, 33753.5], [1.69219998E12, 11043.0], [1.69220034E12, 281548.0], [1.6922265E12, 367862.0], [1.69222548E12, 154258.0], [1.69222446E12, 251589.0], [1.6922022E12, 6199.0], [1.692219E12, 2501344.0], [1.69220664E12, 53979.0], [1.69222668E12, 498723.0], [1.69220118E12, 1160953.0], [1.69222242E12, 2346049.0], [1.69222704E12, 517201.0], [1.69221936E12, 395620.0], [1.69220646E12, 6980.0], [1.69222908E12, 2406414.0], [1.69220508E12, 1366431.0], [1.69220184E12, 96832.0], [1.69221072E12, 17945.0], [1.69220952E12, 2452101.0], [1.69221954E12, 4336.0], [1.69222278E12, 834844.0], [1.6922085E12, 366292.0], [1.6922337E12, 101026.0], [1.69222962E12, 478161.0], [1.69222296E12, 3055278.0], [1.69220268E12, 189536.0], [1.6922049E12, 2585216.0], [1.69222518E12, 2586629.0], [1.6922262E12, 3625752.5], [1.69222194E12, 1.7023967E7], [1.6922025E12, 2165771.0], [1.69221768E12, 161835.0], [1.69220574E12, 2090950.0], [1.6922136E12, 984845.0], [1.69223202E12, 1172402.5], [1.69222536E12, 182320.0], [1.69222758E12, 21639.0], [1.6922124E12, 206407.0], [1.6922199E12, 2177299.0], [1.69220148E12, 1516984.0], [1.69220592E12, 2150240.0], [1.69222638E12, 10781.0], [1.69220232E12, 7434.0], [1.69220898E12, 1277224.5], [1.6922112E12, 170761.0], [1.69222008E12, 18409.0], [1.6922322E12, 3079110.0], [1.69221222E12, 511715.0], [1.69220676E12, 1033370.0], [1.69222554E12, 2735979.0], [1.69221102E12, 2437732.0], [1.69221546E12, 219952.0], [1.69222914E12, 2081008.5], [1.69221804E12, 2616624.0], [1.69221648E12, 166936.5], [1.6922001E12, 67084.0], [1.69221924E12, 451198.0], [1.69220214E12, 223281.0], [1.69220436E12, 2615660.0], [1.69220658E12, 1718584.0], [1.69221186E12, 81090.0], [1.69222608E12, 597695.0], [1.69220622E12, 499869.0], [1.69223376E12, 166006.0], [1.69222164E12, 994870.0], [1.69223358E12, 1755494.0], [1.69221612E12, 2969434.0], [1.69221942E12, 58015.0], [1.6922064E12, 898141.0], [1.69221168E12, 104803.0], [1.6922196E12, 77738.0], [1.69222626E12, 6826158.0], [1.69220826E12, 2352576.0], [1.69220178E12, 12596.5], [1.69220928E12, 56902.0], [1.6922319E12, 2353727.0], [1.69221756E12, 2548968.0], [1.69220364E12, 3070022.5], [1.69220808E12, 5423756.0], [1.69220484E12, 80055.0], [1.69222422E12, 2574417.0], [1.69222968E12, 69645.0], [1.69220706E12, 21155.0], [1.69221876E12, 2542181.0], [1.6922091E12, 2605923.0], [1.6922256E12, 2653603.0], [1.69220466E12, 2501003.0], [1.69222986E12, 305829.0], [1.69221894E12, 2491945.0], [1.69220652E12, 9147.0], [1.69221318E12, 2212950.0], [1.6922268E12, 679852.0], [1.69220226E12, 1101905.0], [1.69223226E12, 2404022.0], [1.692213E12, 364934.0], [1.69220004E12, 11683.0], [1.69222254E12, 121718.0], [1.69223364E12, 1421713.0], [1.69221522E12, 2226103.0], [1.6922019E12, 1906640.0], [1.69220856E12, 92989.0], [1.69220208E12, 264019.0], [1.69222698E12, 146040.0], [1.6922118E12, 2507897.0], [1.69221624E12, 2613321.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.692234E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 21216.5, "minX": 1.0, "maxY": 402737.0, "series": [{"data": [[1.0, 402737.0], [2.0, 21216.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 21188.0, "minX": 1.0, "maxY": 402730.5, "series": [{"data": [[1.0, 402730.5], [2.0, 21188.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69219998E12, "maxY": 0.23333333333333334, "series": [{"data": [[1.69220172E12, 0.05], [1.6922106E12, 0.016666666666666666], [1.69221504E12, 0.016666666666666666], [1.6922217E12, 0.016666666666666666], [1.69222614E12, 0.05], [1.69221162E12, 0.03333333333333333], [1.69221384E12, 0.016666666666666666], [1.6922316E12, 0.016666666666666666], [1.69222752E12, 0.016666666666666666], [1.69220478E12, 0.03333333333333333], [1.692207E12, 0.016666666666666666], [1.69221366E12, 0.05], [1.69220376E12, 0.016666666666666666], [1.69221264E12, 0.016666666666666666], [1.69221966E12, 0.016666666666666666], [1.69222632E12, 0.016666666666666666], [1.69220922E12, 0.016666666666666666], [1.69222956E12, 0.03333333333333333], [1.69223178E12, 0.016666666666666666], [1.6922046E12, 0.016666666666666666], [1.69222428E12, 0.016666666666666666], [1.69221882E12, 0.016666666666666666], [1.69220682E12, 0.06666666666666667], [1.69219998E12, 0.23333333333333334], [1.69220034E12, 0.016666666666666666], [1.6922265E12, 0.016666666666666666], [1.69222548E12, 0.016666666666666666], [1.6922022E12, 0.05], [1.692219E12, 0.016666666666666666], [1.69220664E12, 0.016666666666666666], [1.69222668E12, 0.016666666666666666], [1.69220118E12, 0.016666666666666666], [1.69222242E12, 0.016666666666666666], [1.69222704E12, 0.05], [1.69221936E12, 0.05], [1.69220646E12, 0.05], [1.69222908E12, 0.016666666666666666], [1.69220508E12, 0.03333333333333333], [1.69220184E12, 0.016666666666666666], [1.69221072E12, 0.05], [1.69221954E12, 0.05], [1.69220952E12, 0.016666666666666666], [1.69222278E12, 0.016666666666666666], [1.6922085E12, 0.016666666666666666], [1.6922337E12, 0.016666666666666666], [1.69222962E12, 0.016666666666666666], [1.69222296E12, 0.016666666666666666], [1.69220268E12, 0.016666666666666666], [1.6922049E12, 0.016666666666666666], [1.69222518E12, 0.016666666666666666], [1.6922262E12, 0.016666666666666666], [1.69222194E12, 0.016666666666666666], [1.6922025E12, 0.016666666666666666], [1.69221768E12, 0.016666666666666666], [1.69220574E12, 0.016666666666666666], [1.6922136E12, 0.03333333333333333], [1.69223202E12, 0.03333333333333333], [1.69222536E12, 0.016666666666666666], [1.6922124E12, 0.016666666666666666], [1.6922199E12, 0.016666666666666666], [1.69220148E12, 0.016666666666666666], [1.69220592E12, 0.016666666666666666], [1.69222638E12, 0.016666666666666666], [1.69220232E12, 0.11666666666666667], [1.69220898E12, 0.03333333333333333], [1.6922112E12, 0.016666666666666666], [1.69222008E12, 0.05], [1.6922322E12, 0.016666666666666666], [1.69221222E12, 0.016666666666666666], [1.69220676E12, 0.03333333333333333], [1.69222554E12, 0.016666666666666666], [1.69221102E12, 0.016666666666666666], [1.69221546E12, 0.016666666666666666], [1.69222914E12, 0.03333333333333333], [1.69221804E12, 0.016666666666666666], [1.69221648E12, 0.06666666666666667], [1.6922163E12, 0.016666666666666666], [1.6922001E12, 0.03333333333333333], [1.69221924E12, 0.016666666666666666], [1.69220214E12, 0.016666666666666666], [1.69220436E12, 0.016666666666666666], [1.69220658E12, 0.016666666666666666], [1.69221186E12, 0.016666666666666666], [1.69222608E12, 0.06666666666666667], [1.69220622E12, 0.016666666666666666], [1.69223376E12, 0.03333333333333333], [1.69222164E12, 0.03333333333333333], [1.69223358E12, 0.016666666666666666], [1.69221612E12, 0.016666666666666666], [1.69221942E12, 0.016666666666666666], [1.6922064E12, 0.03333333333333333], [1.69221168E12, 0.016666666666666666], [1.6922196E12, 0.016666666666666666], [1.69222626E12, 0.016666666666666666], [1.69220826E12, 0.016666666666666666], [1.69220178E12, 0.03333333333333333], [1.69220928E12, 0.016666666666666666], [1.6922319E12, 0.016666666666666666], [1.69221756E12, 0.05], [1.69220364E12, 0.03333333333333333], [1.69220808E12, 0.016666666666666666], [1.69220484E12, 0.016666666666666666], [1.69222422E12, 0.016666666666666666], [1.69222968E12, 0.016666666666666666], [1.69220706E12, 0.016666666666666666], [1.69221876E12, 0.016666666666666666], [1.6922091E12, 0.016666666666666666], [1.6922256E12, 0.016666666666666666], [1.69220466E12, 0.016666666666666666], [1.69222986E12, 0.016666666666666666], [1.69221894E12, 0.016666666666666666], [1.69220652E12, 0.03333333333333333], [1.69221318E12, 0.03333333333333333], [1.6922268E12, 0.03333333333333333], [1.69220226E12, 0.03333333333333333], [1.692213E12, 0.016666666666666666], [1.69220004E12, 0.11666666666666667], [1.69222254E12, 0.016666666666666666], [1.69223364E12, 0.016666666666666666], [1.69221522E12, 0.016666666666666666], [1.6922019E12, 0.016666666666666666], [1.69220856E12, 0.016666666666666666], [1.69220208E12, 0.016666666666666666], [1.69222698E12, 0.016666666666666666], [1.6922118E12, 0.016666666666666666], [1.69221624E12, 0.03333333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69223376E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69219998E12, "maxY": 0.11666666666666667, "series": [{"data": [[1.692234E12, 0.016666666666666666], [1.69223382E12, 0.016666666666666666], [1.69220172E12, 0.05], [1.6922106E12, 0.016666666666666666], [1.69221504E12, 0.016666666666666666], [1.6922217E12, 0.016666666666666666], [1.69222614E12, 0.05], [1.69221162E12, 0.03333333333333333], [1.69221384E12, 0.016666666666666666], [1.6922316E12, 0.016666666666666666], [1.69222752E12, 0.016666666666666666], [1.69220478E12, 0.03333333333333333], [1.692207E12, 0.016666666666666666], [1.69221366E12, 0.05], [1.69220376E12, 0.016666666666666666], [1.69221264E12, 0.016666666666666666], [1.69221966E12, 0.016666666666666666], [1.69222632E12, 0.016666666666666666], [1.69220922E12, 0.016666666666666666], [1.69222956E12, 0.03333333333333333], [1.69223178E12, 0.016666666666666666], [1.6922046E12, 0.016666666666666666], [1.69222428E12, 0.016666666666666666], [1.69221882E12, 0.016666666666666666], [1.69220682E12, 0.06666666666666667], [1.69219998E12, 0.06666666666666667], [1.69220034E12, 0.016666666666666666], [1.6922265E12, 0.016666666666666666], [1.69222548E12, 0.016666666666666666], [1.69222446E12, 0.016666666666666666], [1.6922022E12, 0.05], [1.692219E12, 0.016666666666666666], [1.69220664E12, 0.016666666666666666], [1.69222668E12, 0.016666666666666666], [1.69220118E12, 0.016666666666666666], [1.69222242E12, 0.016666666666666666], [1.69222704E12, 0.05], [1.69221936E12, 0.05], [1.69220646E12, 0.05], [1.69222908E12, 0.016666666666666666], [1.69220508E12, 0.03333333333333333], [1.69220184E12, 0.016666666666666666], [1.69221072E12, 0.05], [1.69220952E12, 0.016666666666666666], [1.69221954E12, 0.05], [1.69222278E12, 0.016666666666666666], [1.6922085E12, 0.016666666666666666], [1.6922337E12, 0.016666666666666666], [1.69222962E12, 0.016666666666666666], [1.69222296E12, 0.016666666666666666], [1.69220268E12, 0.016666666666666666], [1.6922049E12, 0.016666666666666666], [1.69222518E12, 0.016666666666666666], [1.6922262E12, 0.03333333333333333], [1.69222194E12, 0.016666666666666666], [1.6922025E12, 0.016666666666666666], [1.69221768E12, 0.016666666666666666], [1.69220574E12, 0.016666666666666666], [1.6922136E12, 0.03333333333333333], [1.69223202E12, 0.03333333333333333], [1.69222536E12, 0.016666666666666666], [1.69222758E12, 0.016666666666666666], [1.6922124E12, 0.016666666666666666], [1.6922199E12, 0.016666666666666666], [1.69220148E12, 0.016666666666666666], [1.69220592E12, 0.016666666666666666], [1.69222638E12, 0.016666666666666666], [1.69220232E12, 0.11666666666666667], [1.69220898E12, 0.03333333333333333], [1.6922112E12, 0.016666666666666666], [1.69222008E12, 0.05], [1.6922322E12, 0.016666666666666666], [1.69221222E12, 0.016666666666666666], [1.69220676E12, 0.03333333333333333], [1.69222554E12, 0.016666666666666666], [1.69221102E12, 0.016666666666666666], [1.69221546E12, 0.016666666666666666], [1.69222914E12, 0.03333333333333333], [1.69221804E12, 0.016666666666666666], [1.69221648E12, 0.06666666666666667], [1.6922001E12, 0.03333333333333333], [1.69221924E12, 0.016666666666666666], [1.69220214E12, 0.016666666666666666], [1.69220436E12, 0.016666666666666666], [1.69220658E12, 0.016666666666666666], [1.69221186E12, 0.016666666666666666], [1.69222608E12, 0.08333333333333333], [1.69220622E12, 0.016666666666666666], [1.69223376E12, 0.05], [1.69222164E12, 0.03333333333333333], [1.69223358E12, 0.03333333333333333], [1.69221612E12, 0.016666666666666666], [1.69221942E12, 0.016666666666666666], [1.6922064E12, 0.03333333333333333], [1.69221168E12, 0.016666666666666666], [1.6922196E12, 0.016666666666666666], [1.69222626E12, 0.016666666666666666], [1.69220826E12, 0.016666666666666666], [1.69220178E12, 0.03333333333333333], [1.69220928E12, 0.016666666666666666], [1.6922319E12, 0.016666666666666666], [1.69221756E12, 0.05], [1.69220364E12, 0.03333333333333333], [1.69220808E12, 0.016666666666666666], [1.69220484E12, 0.016666666666666666], [1.69222422E12, 0.016666666666666666], [1.69222968E12, 0.016666666666666666], [1.69220706E12, 0.016666666666666666], [1.69221876E12, 0.016666666666666666], [1.6922091E12, 0.016666666666666666], [1.6922256E12, 0.016666666666666666], [1.69220466E12, 0.016666666666666666], [1.69222986E12, 0.016666666666666666], [1.69221894E12, 0.016666666666666666], [1.69220652E12, 0.03333333333333333], [1.69221318E12, 0.03333333333333333], [1.6922268E12, 0.05], [1.69220226E12, 0.03333333333333333], [1.69223226E12, 0.016666666666666666], [1.692213E12, 0.016666666666666666], [1.69220004E12, 0.11666666666666667], [1.69222254E12, 0.016666666666666666], [1.69223364E12, 0.016666666666666666], [1.69221522E12, 0.016666666666666666], [1.6922019E12, 0.016666666666666666], [1.69220856E12, 0.016666666666666666], [1.69220208E12, 0.016666666666666666], [1.69222698E12, 0.016666666666666666], [1.6922118E12, 0.016666666666666666], [1.69221624E12, 0.05]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.692234E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69219998E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.692219E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q14-success", "isController": false}, {"data": [[1.69220232E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q2-success", "isController": false}, {"data": [[1.69221624E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q1-success", "isController": false}, {"data": [[1.69220208E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q13-success", "isController": false}, {"data": [[1.69220622E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q13-success", "isController": false}, {"data": [[1.69222914E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q19-success", "isController": false}, {"data": [[1.69221768E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q4-success", "isController": false}, {"data": [[1.6922106E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q14-success", "isController": false}, {"data": [[1.69220856E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q5-success", "isController": false}, {"data": [[1.69223382E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q12-success", "isController": false}, {"data": [[1.69222518E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q19-success", "isController": false}, {"data": [[1.69222632E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q7-success", "isController": false}, {"data": [[1.69221186E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q3-success", "isController": false}, {"data": [[1.69220004E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q3-success", "isController": false}, {"data": [[1.69221318E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q18-success", "isController": false}, {"data": [[1.69221648E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q7-success", "isController": false}, {"data": [[1.6922001E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q7-success", "isController": false}, {"data": [[1.69221102E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q21-success", "isController": false}, {"data": [[1.69220676E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q11-success", "isController": false}, {"data": [[1.6922265E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q9-success", "isController": false}, {"data": [[1.69221162E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q9-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q5-success", "isController": false}, {"data": [[1.69220172E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q18-success", "isController": false}, {"data": [[1.69220004E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q7-success", "isController": false}, {"data": [[1.69221624E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q12-success", "isController": false}, {"data": [[1.69220478E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q22-success", "isController": false}, {"data": [[1.69222962E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q10-success", "isController": false}, {"data": [[1.69220226E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q14-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q16-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q3-success", "isController": false}, {"data": [[1.69222194E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q15-success", "isController": false}, {"data": [[1.69222296E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q21-success", "isController": false}, {"data": [[1.69221648E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q11-success", "isController": false}, {"data": [[1.69222986E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q4-success", "isController": false}, {"data": [[1.69219998E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q16-success", "isController": false}, {"data": [[1.69221966E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q2-success", "isController": false}, {"data": [[1.69220436E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q6-success", "isController": false}, {"data": [[1.69221222E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q2-success", "isController": false}, {"data": [[1.69222614E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q14-success", "isController": false}, {"data": [[1.69220898E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q4-success", "isController": false}, {"data": [[1.69221942E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q10-success", "isController": false}, {"data": [[1.69220268E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q8-success", "isController": false}, {"data": [[1.69221954E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF2-success", "isController": false}, {"data": [[1.69221624E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q22-success", "isController": false}, {"data": [[1.69220928E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q8-success", "isController": false}, {"data": [[1.69220808E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q15-success", "isController": false}, {"data": [[1.69223358E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q6-success", "isController": false}, {"data": [[1.69222698E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q13-success", "isController": false}, {"data": [[1.69221936E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q16-success", "isController": false}, {"data": [[1.69222608E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q19-success", "isController": false}, {"data": [[1.69222626E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q15-success", "isController": false}, {"data": [[1.6922268E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q22-success", "isController": false}, {"data": [[1.69222008E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q8-success", "isController": false}, {"data": [[1.692234E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q2-success", "isController": false}, {"data": [[1.69220232E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q2-success", "isController": false}, {"data": [[1.69220232E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q11-success", "isController": false}, {"data": [[1.69220658E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q12-success", "isController": false}, {"data": [[1.69220184E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q3-success", "isController": false}, {"data": [[1.69220232E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q5-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q5-success", "isController": false}, {"data": [[1.6922049E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q14-success", "isController": false}, {"data": [[1.6922124E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q11-success", "isController": false}, {"data": [[1.69221072E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q5-success", "isController": false}, {"data": [[1.6922268E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q7-success", "isController": false}, {"data": [[1.69222968E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q5-success", "isController": false}, {"data": [[1.69221366E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q3-success", "isController": false}, {"data": [[1.69221162E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q21-success", "isController": false}, {"data": [[1.69222608E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q12-success", "isController": false}, {"data": [[1.6922262E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q19-success", "isController": false}, {"data": [[1.69222548E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q5-success", "isController": false}, {"data": [[1.69220178E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q7-success", "isController": false}, {"data": [[1.69220898E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q21-success", "isController": false}, {"data": [[1.69222164E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q19-success", "isController": false}, {"data": [[1.69220226E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q8-success", "isController": false}, {"data": [[1.6922268E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q21-success", "isController": false}, {"data": [[1.69222704E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q11-success", "isController": false}, {"data": [[1.69220706E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q5-success", "isController": false}, {"data": [[1.69223364E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q1-success", "isController": false}, {"data": [[1.69220376E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q8-success", "isController": false}, {"data": [[1.69221954E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q11-success", "isController": false}, {"data": [[1.6922217E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q9-success", "isController": false}, {"data": [[1.69220574E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q14-success", "isController": false}, {"data": [[1.69221648E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q2-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q1-success", "isController": false}, {"data": [[1.6922256E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q18-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q12-success", "isController": false}, {"data": [[1.6922136E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q6-success", "isController": false}, {"data": [[1.69221168E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q4-success", "isController": false}, {"data": [[1.69221384E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q21-success", "isController": false}, {"data": [[1.69220172E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q4-success", "isController": false}, {"data": [[1.69222536E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q2-success", "isController": false}, {"data": [[1.69222668E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q16-success", "isController": false}, {"data": [[1.69221756E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q15-success", "isController": false}, {"data": [[1.6922337E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q12-success", "isController": false}, {"data": [[1.69223376E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q8-success", "isController": false}, {"data": [[1.69219998E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q8-success", "isController": false}, {"data": [[1.69222608E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q14-success", "isController": false}, {"data": [[1.6922025E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q6-success", "isController": false}, {"data": [[1.69223358E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q6-success", "isController": false}, {"data": [[1.69222704E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q11-success", "isController": false}, {"data": [[1.69221366E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q11-success", "isController": false}, {"data": [[1.69221318E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q18-success", "isController": false}, {"data": [[1.6922022E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q22-success", "isController": false}, {"data": [[1.6922001E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q13-success", "isController": false}, {"data": [[1.69220664E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q10-success", "isController": false}, {"data": [[1.69221504E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q9-success", "isController": false}, {"data": [[1.69222608E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q1-success", "isController": false}, {"data": [[1.69223226E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q21-success", "isController": false}, {"data": [[1.6922322E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q21-success", "isController": false}, {"data": [[1.69222704E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q2-success", "isController": false}, {"data": [[1.69220232E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q16-success", "isController": false}, {"data": [[1.69222914E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q19-success", "isController": false}, {"data": [[1.69222446E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q3-success", "isController": false}, {"data": [[1.69223376E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q5-success", "isController": false}, {"data": [[1.69221546E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q3-success", "isController": false}, {"data": [[1.69221072E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q10-success", "isController": false}, {"data": [[1.69222614E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q15-success", "isController": false}, {"data": [[1.69222752E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q5-success", "isController": false}, {"data": [[1.69223202E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q14-success", "isController": false}, {"data": [[1.69222164E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF1-success", "isController": false}, {"data": [[1.69221882E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q14-success", "isController": false}, {"data": [[1.69220004E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q22-success", "isController": false}, {"data": [[1.69220004E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q7-success", "isController": false}, {"data": [[1.69221264E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q15-success", "isController": false}, {"data": [[1.69220214E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q7-success", "isController": false}, {"data": [[1.6922262E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q15-success", "isController": false}, {"data": [[1.69223178E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q10-success", "isController": false}, {"data": [[1.6922022E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q19-success", "isController": false}, {"data": [[1.69220232E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q3-success", "isController": false}, {"data": [[1.6922046E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q14-success", "isController": false}, {"data": [[1.69220148E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q18-success", "isController": false}, {"data": [[1.6922196E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q13-success", "isController": false}, {"data": [[1.69223202E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q3-success", "isController": false}, {"data": [[1.692207E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q18-success", "isController": false}, {"data": [[1.69222638E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q6-success", "isController": false}, {"data": [[1.69221924E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q4-success", "isController": false}, {"data": [[1.69220364E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q12-success", "isController": false}, {"data": [[1.69222428E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q19-success", "isController": false}, {"data": [[1.69220826E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q6-success", "isController": false}, {"data": [[1.69220478E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q4-success", "isController": false}, {"data": [[1.69222008E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q12-success", "isController": false}, {"data": [[1.6922118E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q18-success", "isController": false}, {"data": [[1.69220172E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q10-success", "isController": false}, {"data": [[1.69220118E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q6-success", "isController": false}, {"data": [[1.69221894E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q21-success", "isController": false}, {"data": [[1.69219998E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q11-success", "isController": false}, {"data": [[1.6922136E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q8-success", "isController": false}, {"data": [[1.69220676E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q16-success", "isController": false}, {"data": [[1.69221876E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q19-success", "isController": false}, {"data": [[1.69222254E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q10-success", "isController": false}, {"data": [[1.69220508E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q4-success", "isController": false}, {"data": [[1.6922085E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q13-success", "isController": false}, {"data": [[1.69222956E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q18-success", "isController": false}, {"data": [[1.69221612E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q9-success", "isController": false}, {"data": [[1.69220004E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q22-success", "isController": false}, {"data": [[1.69220592E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q12-success", "isController": false}, {"data": [[1.69221936E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q11-success", "isController": false}, {"data": [[1.69222608E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q15-success", "isController": false}, {"data": [[1.69220466E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q1-success", "isController": false}, {"data": [[1.69220004E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q22-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q3-success", "isController": false}, {"data": [[1.6922064E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q7-success", "isController": false}, {"data": [[1.69222614E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q15-success", "isController": false}, {"data": [[1.69222242E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q1-success", "isController": false}, {"data": [[1.69219998E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q16-success", "isController": false}, {"data": [[1.69222554E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q9-success", "isController": false}, {"data": [[1.69222422E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q1-success", "isController": false}, {"data": [[1.69221366E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q16-success", "isController": false}, {"data": [[1.692213E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q13-success", "isController": false}, {"data": [[1.69220922E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q9-success", "isController": false}, {"data": [[1.69221648E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q19-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q13-success", "isController": false}, {"data": [[1.69220004E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q7-success", "isController": false}, {"data": [[1.69223376E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q9-success", "isController": false}, {"data": [[1.69220232E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q10-success", "isController": false}, {"data": [[1.69221072E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q22-success", "isController": false}, {"data": [[1.69220364E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q15-success", "isController": false}, {"data": [[1.69220484E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q13-success", "isController": false}, {"data": [[1.69221936E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q16-success", "isController": false}, {"data": [[1.6922091E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q18-success", "isController": false}, {"data": [[1.6922319E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q1-success", "isController": false}, {"data": [[1.69220952E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q1-success", "isController": false}, {"data": [[1.6922199E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q1-success", "isController": false}, {"data": [[1.69222956E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q9-success", "isController": false}, {"data": [[1.69222008E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q22-success", "isController": false}, {"data": [[1.6922112E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q10-success", "isController": false}, {"data": [[1.6922316E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q12-success", "isController": false}, {"data": [[1.69222758E12, 0.016666666666666666]], "isOverall": false, "label": "T8 - Q2-success", "isController": false}, {"data": [[1.69222278E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q13-success", "isController": false}, {"data": [[1.69220652E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q10-success", "isController": false}, {"data": [[1.6922019E12, 0.016666666666666666]], "isOverall": false, "label": "T6 - Q6-success", "isController": false}, {"data": [[1.69221522E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q18-success", "isController": false}, {"data": [[1.6922022E12, 0.016666666666666666]], "isOverall": false, "label": "T5 - Q4-success", "isController": false}, {"data": [[1.69220682E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q16-success", "isController": false}, {"data": [[1.69221804E12, 0.016666666666666666]], "isOverall": false, "label": "T2 - Q6-success", "isController": false}, {"data": [[1.69220034E12, 0.016666666666666666]], "isOverall": false, "label": "T4 - Q2-success", "isController": false}, {"data": [[1.69220652E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q8-success", "isController": false}, {"data": [[1.69220646E12, 0.016666666666666666]], "isOverall": false, "label": "T3 - Q22-success", "isController": false}, {"data": [[1.69220178E12, 0.016666666666666666]], "isOverall": false, "label": "T7 - Q8-success", "isController": false}, {"data": [[1.69220508E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q9-success", "isController": false}, {"data": [[1.69222908E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q21-success", "isController": false}, {"data": [[1.69221954E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.692234E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69219998E12, "maxY": 0.11666666666666667, "series": [{"data": [[1.692234E12, 0.016666666666666666], [1.69223382E12, 0.016666666666666666], [1.69220172E12, 0.05], [1.6922106E12, 0.016666666666666666], [1.69221504E12, 0.016666666666666666], [1.6922217E12, 0.016666666666666666], [1.69222614E12, 0.05], [1.69221162E12, 0.03333333333333333], [1.69221384E12, 0.016666666666666666], [1.6922316E12, 0.016666666666666666], [1.69222752E12, 0.016666666666666666], [1.69220478E12, 0.03333333333333333], [1.692207E12, 0.016666666666666666], [1.69221366E12, 0.05], [1.69220376E12, 0.016666666666666666], [1.69221264E12, 0.016666666666666666], [1.69221966E12, 0.016666666666666666], [1.69222632E12, 0.016666666666666666], [1.69220922E12, 0.016666666666666666], [1.69222956E12, 0.03333333333333333], [1.69223178E12, 0.016666666666666666], [1.6922046E12, 0.016666666666666666], [1.69222428E12, 0.016666666666666666], [1.69221882E12, 0.016666666666666666], [1.69220682E12, 0.06666666666666667], [1.69219998E12, 0.06666666666666667], [1.69220034E12, 0.016666666666666666], [1.6922265E12, 0.016666666666666666], [1.69222548E12, 0.016666666666666666], [1.69222446E12, 0.016666666666666666], [1.6922022E12, 0.05], [1.692219E12, 0.016666666666666666], [1.69220664E12, 0.016666666666666666], [1.69222668E12, 0.016666666666666666], [1.69220118E12, 0.016666666666666666], [1.69222242E12, 0.016666666666666666], [1.69222704E12, 0.05], [1.69221936E12, 0.05], [1.69220646E12, 0.05], [1.69222908E12, 0.016666666666666666], [1.69220508E12, 0.03333333333333333], [1.69220184E12, 0.016666666666666666], [1.69221072E12, 0.05], [1.69220952E12, 0.016666666666666666], [1.69221954E12, 0.05], [1.69222278E12, 0.016666666666666666], [1.6922085E12, 0.016666666666666666], [1.6922337E12, 0.016666666666666666], [1.69222962E12, 0.016666666666666666], [1.69222296E12, 0.016666666666666666], [1.69220268E12, 0.016666666666666666], [1.6922049E12, 0.016666666666666666], [1.69222518E12, 0.016666666666666666], [1.6922262E12, 0.03333333333333333], [1.69222194E12, 0.016666666666666666], [1.6922025E12, 0.016666666666666666], [1.69221768E12, 0.016666666666666666], [1.69220574E12, 0.016666666666666666], [1.6922136E12, 0.03333333333333333], [1.69223202E12, 0.03333333333333333], [1.69222536E12, 0.016666666666666666], [1.69222758E12, 0.016666666666666666], [1.6922124E12, 0.016666666666666666], [1.6922199E12, 0.016666666666666666], [1.69220148E12, 0.016666666666666666], [1.69220592E12, 0.016666666666666666], [1.69222638E12, 0.016666666666666666], [1.69220232E12, 0.11666666666666667], [1.69220898E12, 0.03333333333333333], [1.6922112E12, 0.016666666666666666], [1.69222008E12, 0.05], [1.6922322E12, 0.016666666666666666], [1.69221222E12, 0.016666666666666666], [1.69220676E12, 0.03333333333333333], [1.69222554E12, 0.016666666666666666], [1.69221102E12, 0.016666666666666666], [1.69221546E12, 0.016666666666666666], [1.69222914E12, 0.03333333333333333], [1.69221804E12, 0.016666666666666666], [1.69221648E12, 0.06666666666666667], [1.6922001E12, 0.03333333333333333], [1.69221924E12, 0.016666666666666666], [1.69220214E12, 0.016666666666666666], [1.69220436E12, 0.016666666666666666], [1.69220658E12, 0.016666666666666666], [1.69221186E12, 0.016666666666666666], [1.69222608E12, 0.08333333333333333], [1.69220622E12, 0.016666666666666666], [1.69223376E12, 0.05], [1.69222164E12, 0.03333333333333333], [1.69223358E12, 0.03333333333333333], [1.69221612E12, 0.016666666666666666], [1.69221942E12, 0.016666666666666666], [1.6922064E12, 0.03333333333333333], [1.69221168E12, 0.016666666666666666], [1.6922196E12, 0.016666666666666666], [1.69222626E12, 0.016666666666666666], [1.69220826E12, 0.016666666666666666], [1.69220178E12, 0.03333333333333333], [1.69220928E12, 0.016666666666666666], [1.6922319E12, 0.016666666666666666], [1.69221756E12, 0.05], [1.69220364E12, 0.03333333333333333], [1.69220808E12, 0.016666666666666666], [1.69220484E12, 0.016666666666666666], [1.69222422E12, 0.016666666666666666], [1.69222968E12, 0.016666666666666666], [1.69220706E12, 0.016666666666666666], [1.69221876E12, 0.016666666666666666], [1.6922091E12, 0.016666666666666666], [1.6922256E12, 0.016666666666666666], [1.69220466E12, 0.016666666666666666], [1.69222986E12, 0.016666666666666666], [1.69221894E12, 0.016666666666666666], [1.69220652E12, 0.03333333333333333], [1.69221318E12, 0.03333333333333333], [1.6922268E12, 0.05], [1.69220226E12, 0.03333333333333333], [1.69223226E12, 0.016666666666666666], [1.692213E12, 0.016666666666666666], [1.69220004E12, 0.11666666666666667], [1.69222254E12, 0.016666666666666666], [1.69223364E12, 0.016666666666666666], [1.69221522E12, 0.016666666666666666], [1.6922019E12, 0.016666666666666666], [1.69220856E12, 0.016666666666666666], [1.69220208E12, 0.016666666666666666], [1.69222698E12, 0.016666666666666666], [1.6922118E12, 0.016666666666666666], [1.69221624E12, 0.05]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.692234E12, "title": "Total Transactions Per Second"}},
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
