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
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 1.0, "series": [{"data": [[2328400.0, 1.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[2534000.0, 1.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[260300.0, 1.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[2098200.0, 1.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1930700.0, 1.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[13600.0, 1.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[201300.0, 1.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[9700.0, 1.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[2268100.0, 1.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[5157500.0, 1.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1829800.0, 1.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[46900.0, 1.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[79100.0, 1.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1326000.0, 1.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[79200.0, 1.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[48800.0, 1.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[63300.0, 1.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[9000.0, 1.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[9000.0, 1.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[80600.0, 1.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[4795400.0, 1.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[2803000.0, 1.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[45400.0, 1.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[740400.0, 1.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[194600.0, 1.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1607200.0, 1.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[13200.0, 1.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[87700.0, 1.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[2202200.0, 1.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[427100.0, 1.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1867500.0, 1.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[381000.0, 1.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[2482100.0, 1.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[13600.0, 1.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[111200.0, 1.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[33200.0, 1.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[34800.0, 1.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[1956200.0, 1.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[8200.0, 1.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[2260200.0, 1.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[484000.0, 1.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[6800.0, 1.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[996800.0, 1.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[2098600.0, 1.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[51400.0, 1.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[722100.0, 1.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[629300.0, 1.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[2018000.0, 1.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[48400.0, 1.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[50800.0, 1.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[27100.0, 1.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[9400.0, 1.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[2288800.0, 1.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[2174300.0, 1.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[429100.0, 1.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[78700.0, 1.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[459200.0, 1.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1887000.0, 1.0]], "isOverall": false, "label": "T11 - Q1", "isController": false}, {"data": [[62700.0, 1.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1533700.0, 1.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[2037500.0, 1.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[76900.0, 1.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[9549200.0, 1.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[101400.0, 1.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[74600.0, 1.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[242600.0, 1.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[16900.0, 1.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[158400.0, 1.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1943800.0, 1.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[29300.0, 1.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[365700.0, 1.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[41500.0, 1.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[73300.0, 1.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[357200.0, 1.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[524500.0, 1.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[435500.0, 1.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[37600.0, 1.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[521100.0, 1.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[140800.0, 1.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[23500.0, 1.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[2220000.0, 1.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[128200.0, 1.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[1723200.0, 1.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[11700.0, 1.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[57200.0, 1.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[2293200.0, 1.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[7800.0, 1.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[6200.0, 1.0]], "isOverall": false, "label": "T13 - Q10", "isController": false}, {"data": [[501100.0, 1.0]], "isOverall": false, "label": "T13 - Q11", "isController": false}, {"data": [[94200.0, 1.0]], "isOverall": false, "label": "T13 - Q12", "isController": false}, {"data": [[628000.0, 1.0]], "isOverall": false, "label": "T13 - Q13", "isController": false}, {"data": [[308100.0, 1.0]], "isOverall": false, "label": "T13 - Q14", "isController": false}, {"data": [[13300.0, 1.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[8523800.0, 1.0]], "isOverall": false, "label": "T13 - Q15", "isController": false}, {"data": [[9500.0, 1.0]], "isOverall": false, "label": "T13 - Q16", "isController": false}, {"data": [[2385200.0, 1.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[3545600.0, 1.0]], "isOverall": false, "label": "T13 - Q18", "isController": false}, {"data": [[2088700.0, 1.0]], "isOverall": false, "label": "T13 - Q19", "isController": false}, {"data": [[2328300.0, 1.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[16400.0, 1.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[431900.0, 1.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[481400.0, 1.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[19400.0, 1.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[213300.0, 1.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[28100.0, 1.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[196600.0, 1.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[151800.0, 1.0]], "isOverall": false, "label": "T13 - Q21", "isController": false}, {"data": [[458200.0, 1.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[450800.0, 1.0]], "isOverall": false, "label": "T13 - Q22", "isController": false}, {"data": [[252400.0, 1.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[2467800.0, 1.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[146900.0, 1.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1639700.0, 1.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[356300.0, 1.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[2198200.0, 1.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[5200.0, 1.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[363700.0, 1.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[469200.0, 1.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[7300.0, 1.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[99400.0, 1.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[2822000.0, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[15700.0, 1.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[225100.0, 1.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[9100.0, 1.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[10400.0, 1.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[13400.0, 1.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[3300.0, 1.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[339800.0, 1.0]], "isOverall": false, "label": "T11 - Q3", "isController": false}, {"data": [[8000.0, 1.0]], "isOverall": false, "label": "T11 - Q2", "isController": false}, {"data": [[317000.0, 1.0]], "isOverall": false, "label": "T11 - Q5", "isController": false}, {"data": [[29100.0, 1.0]], "isOverall": false, "label": "T11 - Q4", "isController": false}, {"data": [[367100.0, 1.0]], "isOverall": false, "label": "T11 - Q7", "isController": false}, {"data": [[2027300.0, 1.0]], "isOverall": false, "label": "T11 - Q6", "isController": false}, {"data": [[2100200.0, 1.0]], "isOverall": false, "label": "T11 - Q9", "isController": false}, {"data": [[26100.0, 1.0]], "isOverall": false, "label": "T11 - Q8", "isController": false}, {"data": [[2106500.0, 1.0]], "isOverall": false, "label": "T12 - Q1", "isController": false}, {"data": [[5100.0, 1.0]], "isOverall": false, "label": "T12 - Q2", "isController": false}, {"data": [[6600.0, 1.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[80400.0, 1.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[15200.0, 1.0]], "isOverall": false, "label": "T13 - Q7", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[325600.0, 1.0]], "isOverall": false, "label": "T13 - Q6", "isController": false}, {"data": [[11800.0, 1.0]], "isOverall": false, "label": "T13 - Q5", "isController": false}, {"data": [[16200.0, 1.0]], "isOverall": false, "label": "T13 - Q4", "isController": false}, {"data": [[2221100.0, 1.0]], "isOverall": false, "label": "T13 - Q9", "isController": false}, {"data": [[15200.0, 1.0]], "isOverall": false, "label": "T13 - Q8", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[120700.0, 1.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[1051800.0, 1.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[3000.0, 1.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[8100.0, 1.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[93800.0, 1.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[81700.0, 1.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[111300.0, 1.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[8468800.0, 1.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[1954000.0, 1.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[2273700.0, 1.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[141600.0, 1.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[2264800.0, 1.0]], "isOverall": false, "label": "T12 - Q9", "isController": false}, {"data": [[1036100.0, 1.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[28900.0, 1.0]], "isOverall": false, "label": "T12 - Q7", "isController": false}, {"data": [[441000.0, 1.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[106000.0, 1.0]], "isOverall": false, "label": "T12 - Q8", "isController": false}, {"data": [[1595800.0, 1.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[18900.0, 1.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[667000.0, 1.0]], "isOverall": false, "label": "T12 - Q5", "isController": false}, {"data": [[38900.0, 1.0]], "isOverall": false, "label": "T12 - Q6", "isController": false}, {"data": [[103400.0, 1.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[5700.0, 1.0]], "isOverall": false, "label": "T12 - Q3", "isController": false}, {"data": [[2869700.0, 1.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T12 - Q4", "isController": false}, {"data": [[944400.0, 1.0]], "isOverall": false, "label": "T11 - Q13", "isController": false}, {"data": [[89300.0, 1.0]], "isOverall": false, "label": "T11 - Q14", "isController": false}, {"data": [[5631600.0, 1.0]], "isOverall": false, "label": "T11 - Q15", "isController": false}, {"data": [[3200.0, 1.0]], "isOverall": false, "label": "T11 - Q16", "isController": false}, {"data": [[54800.0, 1.0]], "isOverall": false, "label": "T11 - Q10", "isController": false}, {"data": [[459700.0, 1.0]], "isOverall": false, "label": "T11 - Q11", "isController": false}, {"data": [[1375500.0, 1.0]], "isOverall": false, "label": "T11 - Q12", "isController": false}, {"data": [[276300.0, 1.0]], "isOverall": false, "label": "T12 - Q21", "isController": false}, {"data": [[2800.0, 1.0]], "isOverall": false, "label": "T12 - Q22", "isController": false}, {"data": [[95000.0, 1.0]], "isOverall": false, "label": "T11 - Q18", "isController": false}, {"data": [[932200.0, 1.0]], "isOverall": false, "label": "T11 - Q19", "isController": false}, {"data": [[375000.0, 1.0]], "isOverall": false, "label": "T13 - Q3", "isController": false}, {"data": [[9100.0, 1.0]], "isOverall": false, "label": "T13 - Q2", "isController": false}, {"data": [[47900.0, 1.0]], "isOverall": false, "label": "T13 - Q1", "isController": false}, {"data": [[2647600.0, 1.0]], "isOverall": false, "label": "T12 - Q18", "isController": false}, {"data": [[83700.0, 1.0]], "isOverall": false, "label": "T12 - Q19", "isController": false}, {"data": [[4200.0, 1.0]], "isOverall": false, "label": "T12 - Q16", "isController": false}, {"data": [[2651500.0, 1.0]], "isOverall": false, "label": "T11 - Q21", "isController": false}, {"data": [[6700.0, 1.0]], "isOverall": false, "label": "T11 - Q22", "isController": false}, {"data": [[157400.0, 1.0]], "isOverall": false, "label": "T12 - Q10", "isController": false}, {"data": [[6300.0, 1.0]], "isOverall": false, "label": "T12 - Q11", "isController": false}, {"data": [[12200.0, 1.0]], "isOverall": false, "label": "T12 - Q14", "isController": false}, {"data": [[3433800.0, 1.0]], "isOverall": false, "label": "T12 - Q15", "isController": false}, {"data": [[96700.0, 1.0]], "isOverall": false, "label": "T12 - Q12", "isController": false}, {"data": [[523200.0, 1.0]], "isOverall": false, "label": "T12 - Q13", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 9549200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 200.0, "series": [{"data": [[0.0, 1.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 200.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 1.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69218024E12, "maxY": 1.0, "series": [{"data": [[1.69219218E12, 1.0], [1.69218054E12, 1.0], [1.69218048E12, 1.0], [1.69218144E12, 1.0], [1.69219194E12, 1.0], [1.69218336E12, 1.0], [1.6921803E12, 1.0], [1.6921926E12, 1.0], [1.6921809E12, 1.0], [1.69218036E12, 1.0], [1.69218798E12, 1.0], [1.69219782E12, 1.0], [1.69219776E12, 1.0], [1.69219212E12, 1.0], [1.69218564E12, 1.0], [1.69218786E12, 1.0], [1.69219008E12, 1.0]], "isOverall": false, "label": "T10", "isController": false}, {"data": [[1.69218036E12, 1.0], [1.69218648E12, 1.0], [1.69218048E12, 1.0], [1.69218354E12, 1.0], [1.69218636E12, 1.0], [1.69218858E12, 1.0], [1.69219206E12, 1.0], [1.69219272E12, 1.0], [1.6921803E12, 1.0], [1.69218078E12, 1.0], [1.69218582E12, 1.0], [1.6921809E12, 1.0]], "isOverall": false, "label": "T12", "isController": false}, {"data": [[1.6921836E12, 1.0], [1.69218048E12, 1.0], [1.69218588E12, 1.0], [1.69218024E12, 1.0], [1.6921926E12, 1.0], [1.69218036E12, 1.0], [1.69218828E12, 1.0], [1.69218096E12, 1.0], [1.6921953E12, 1.0], [1.69219074E12, 1.0], [1.69219212E12, 1.0], [1.6921833E12, 1.0], [1.69219278E12, 1.0], [1.69218042E12, 1.0]], "isOverall": false, "label": "T9", "isController": false}, {"data": [[1.69219344E12, 1.0], [1.69219218E12, 1.0], [1.69218054E12, 1.0], [1.69219956E12, 1.0], [1.69218654E12, 1.0], [1.6921803E12, 1.0], [1.69219608E12, 1.0], [1.69218582E12, 1.0], [1.69219866E12, 1.0], [1.69218612E12, 1.0], [1.69218378E12, 1.0], [1.69218192E12, 1.0], [1.69219308E12, 1.0], [1.69218042E12, 1.0], [1.69219818E12, 1.0]], "isOverall": false, "label": "T11", "isController": false}, {"data": [[1.692192E12, 1.0], [1.69218054E12, 1.0], [1.69219236E12, 1.0], [1.69219284E12, 1.0], [1.69218354E12, 1.0], [1.69219272E12, 1.0], [1.6921803E12, 1.0], [1.69218156E12, 1.0], [1.6921929E12, 1.0], [1.69219212E12, 1.0], [1.69218042E12, 1.0]], "isOverall": false, "label": "T14", "isController": false}, {"data": [[1.69219926E12, 1.0], [1.69219956E12, 1.0], [1.69218048E12, 1.0], [1.69219194E12, 1.0], [1.6921806E12, 1.0], [1.69219158E12, 1.0], [1.6921803E12, 1.0], [1.69218024E12, 1.0], [1.69219866E12, 1.0], [1.69218036E12, 1.0], [1.69218102E12, 1.0], [1.69219236E12, 1.0], [1.69218954E12, 1.0], [1.69219596E12, 1.0], [1.69219818E12, 1.0]], "isOverall": false, "label": "T13", "isController": false}, {"data": [[1.69218048E12, 1.0], [1.69219194E12, 1.0], [1.6921803E12, 1.0], [1.69219932E12, 1.0], [1.69218036E12, 1.0], [1.6921902E12, 1.0], [1.69219776E12, 1.0], [1.69219524E12, 1.0], [1.69218528E12, 1.0], [1.6921995E12, 1.0], [1.69218822E12, 1.0], [1.69219242E12, 1.0], [1.69218564E12, 1.0], [1.69219752E12, 1.0], [1.69218786E12, 1.0], [1.69218042E12, 1.0]], "isOverall": false, "label": "T16", "isController": false}, {"data": [[1.69218456E12, 1.0], [1.69218396E12, 1.0], [1.69219194E12, 1.0], [1.69218684E12, 1.0], [1.6921803E12, 1.0], [1.6921845E12, 1.0], [1.69218126E12, 1.0], [1.69219092E12, 1.0], [1.69218024E12, 1.0], [1.69219452E12, 1.0], [1.69218198E12, 1.0], [1.69218102E12, 1.0], [1.69218894E12, 1.0], [1.69218444E12, 1.0], [1.69219236E12, 1.0], [1.69218042E12, 1.0]], "isOverall": false, "label": "T15", "isController": false}, {"data": [[1.69219248E12, 1.0], [1.69219602E12, 1.0], [1.69218054E12, 1.0], [1.69219956E12, 1.0], [1.69218048E12, 1.0], [1.69219194E12, 1.0], [1.6921824E12, 1.0], [1.6921932E12, 1.0], [1.6921803E12, 1.0], [1.69219806E12, 1.0], [1.69219548E12, 1.0], [1.69218036E12, 1.0], [1.692192E12, 1.0], [1.69219974E12, 1.0], [1.6921998E12, 1.0], [1.69219596E12, 1.0]], "isOverall": false, "label": "T17", "isController": false}, {"data": [[1.69219956E12, 1.0], [1.69218048E12, 1.0], [1.69219194E12, 1.0], [1.69219986E12, 1.0], [1.69219032E12, 1.0], [1.69219794E12, 1.0], [1.6921932E12, 1.0], [1.69218348E12, 1.0], [1.69218678E12, 1.0], [1.69219548E12, 1.0], [1.69218036E12, 1.0], [1.69218666E12, 1.0], [1.6921899E12, 1.0], [1.69218696E12, 1.0], [1.69219236E12, 1.0], [1.69218702E12, 1.0], [1.69218066E12, 1.0], [1.69219272E12, 1.0], [1.69218564E12, 1.0]], "isOverall": false, "label": "T1", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69219986E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 153.0, "minX": 1.0, "maxY": 9549266.0, "series": [{"data": [[10.0, 2328469.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[10.0, 2328469.0]], "isOverall": false, "label": "T9 - Q18-Aggregated", "isController": false}, {"data": [[7.0, 2534036.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[7.0, 2534036.0]], "isOverall": false, "label": "T9 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 260365.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[10.0, 260365.0]], "isOverall": false, "label": "T9 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 2098211.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[10.0, 2098211.0]], "isOverall": false, "label": "T10 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 1930766.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[10.0, 1930766.0]], "isOverall": false, "label": "T10 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 13631.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[10.0, 13631.0]], "isOverall": false, "label": "T9 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 201325.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[10.0, 201325.0]], "isOverall": false, "label": "T10 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 9775.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[10.0, 9775.0]], "isOverall": false, "label": "T9 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 2268149.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[10.0, 2268149.0]], "isOverall": false, "label": "T10 - Q14-Aggregated", "isController": false}, {"data": [[6.0, 5157589.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[6.0, 5157589.0]], "isOverall": false, "label": "T10 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 1829866.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[10.0, 1829866.0]], "isOverall": false, "label": "T10 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 46956.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[10.0, 46956.0]], "isOverall": false, "label": "T9 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 79153.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[10.0, 79153.0]], "isOverall": false, "label": "T10 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 1326090.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[10.0, 1326090.0]], "isOverall": false, "label": "T9 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 79270.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[10.0, 79270.0]], "isOverall": false, "label": "T9 - Q12-Aggregated", "isController": false}, {"data": [[6.0, 48850.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[6.0, 48850.0]], "isOverall": false, "label": "T10 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 63373.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[10.0, 63373.0]], "isOverall": false, "label": "T9 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 9074.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[10.0, 9074.0]], "isOverall": false, "label": "T10 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 9020.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[10.0, 9020.0]], "isOverall": false, "label": "T16 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 3291.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[10.0, 3291.0]], "isOverall": false, "label": "T16 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 80631.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[10.0, 80631.0]], "isOverall": false, "label": "T17 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 4795462.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[10.0, 4795462.0]], "isOverall": false, "label": "T16 - Q15-Aggregated", "isController": false}, {"data": [[7.0, 2803090.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[7.0, 2803090.0]], "isOverall": false, "label": "T16 - Q14-Aggregated", "isController": false}, {"data": [[2.0, 45403.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[2.0, 45403.0]], "isOverall": false, "label": "T17 - Q7-Aggregated", "isController": false}, {"data": [[8.0, 740402.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[8.0, 740402.0]], "isOverall": false, "label": "T17 - Q4-Aggregated", "isController": false}, {"data": [[6.0, 194640.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[6.0, 194640.0]], "isOverall": false, "label": "T16 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 4349.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[10.0, 4349.0]], "isOverall": false, "label": "T17 - Q5-Aggregated", "isController": false}, {"data": [[5.0, 1607211.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[5.0, 1607211.0]], "isOverall": false, "label": "T16 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 13291.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[10.0, 13291.0]], "isOverall": false, "label": "T17 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 87773.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[10.0, 87773.0]], "isOverall": false, "label": "T16 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 2202257.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[10.0, 2202257.0]], "isOverall": false, "label": "T16 - Q18-Aggregated", "isController": false}, {"data": [[6.0, 427115.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[6.0, 427115.0]], "isOverall": false, "label": "T17 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 1867577.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[10.0, 1867577.0]], "isOverall": false, "label": "T17 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 381013.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[10.0, 381013.0]], "isOverall": false, "label": "T16 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 2482165.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[10.0, 2482165.0]], "isOverall": false, "label": "T9 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 13627.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[10.0, 13627.0]], "isOverall": false, "label": "T9 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 111270.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[10.0, 111270.0]], "isOverall": false, "label": "T10 - Q21-Aggregated", "isController": false}, {"data": [[6.0, 33246.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[6.0, 33246.0]], "isOverall": false, "label": "T10 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 34892.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[10.0, 34892.0]], "isOverall": false, "label": "T16 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 1956259.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[10.0, 1956259.0]], "isOverall": false, "label": "T16 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 8280.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[10.0, 8280.0]], "isOverall": false, "label": "T15 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 2260252.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[10.0, 2260252.0]], "isOverall": false, "label": "T15 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 5600.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[10.0, 5600.0]], "isOverall": false, "label": "T15 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 484072.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[10.0, 484072.0]], "isOverall": false, "label": "T15 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 6852.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[10.0, 6852.0]], "isOverall": false, "label": "T15 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 996811.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[10.0, 996811.0]], "isOverall": false, "label": "T15 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 2098647.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[10.0, 2098647.0]], "isOverall": false, "label": "T15 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 51483.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[10.0, 51483.0]], "isOverall": false, "label": "T15 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 722119.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[10.0, 722119.0]], "isOverall": false, "label": "T15 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 629393.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[10.0, 629393.0]], "isOverall": false, "label": "T15 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 2018002.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[10.0, 2018002.0]], "isOverall": false, "label": "T15 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 48452.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[10.0, 48452.0]], "isOverall": false, "label": "T15 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 50842.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[10.0, 50842.0]], "isOverall": false, "label": "T15 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 27158.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[10.0, 27158.0]], "isOverall": false, "label": "T15 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 9451.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[10.0, 9451.0]], "isOverall": false, "label": "T17 - Q8-Aggregated", "isController": false}, {"data": [[6.0, 2288873.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[6.0, 2288873.0]], "isOverall": false, "label": "T17 - Q9-Aggregated", "isController": false}, {"data": [[8.0, 2174333.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[8.0, 2174333.0]], "isOverall": false, "label": "T15 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 429194.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[10.0, 429194.0]], "isOverall": false, "label": "T15 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 78774.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[10.0, 78774.0]], "isOverall": false, "label": "T17 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 459275.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[10.0, 459275.0]], "isOverall": false, "label": "T17 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 1887028.0]], "isOverall": false, "label": "T11 - Q1", "isController": false}, {"data": [[10.0, 1887028.0]], "isOverall": false, "label": "T11 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 62793.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[10.0, 62793.0]], "isOverall": false, "label": "T17 - Q21-Aggregated", "isController": false}, {"data": [[4.0, 1533737.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[4.0, 1533737.0]], "isOverall": false, "label": "T17 - Q12-Aggregated", "isController": false}, {"data": [[8.0, 5260.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[8.0, 5260.0]], "isOverall": false, "label": "T17 - Q11-Aggregated", "isController": false}, {"data": [[5.0, 2037594.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[5.0, 2037594.0]], "isOverall": false, "label": "T17 - Q14-Aggregated", "isController": false}, {"data": [[6.0, 76931.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[6.0, 76931.0]], "isOverall": false, "label": "T17 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 3247.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[10.0, 3247.0]], "isOverall": false, "label": "T17 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 9549266.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[10.0, 9549266.0]], "isOverall": false, "label": "T17 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 101418.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[10.0, 101418.0]], "isOverall": false, "label": "T17 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 74673.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[10.0, 74673.0]], "isOverall": false, "label": "T15 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 242660.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[10.0, 242660.0]], "isOverall": false, "label": "T15 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 16996.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[10.0, 16996.0]], "isOverall": false, "label": "T15 - Q8-Aggregated", "isController": false}, {"data": [[2.0, 158496.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[2.0, 158496.0]], "isOverall": false, "label": "T17 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 1943886.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[10.0, 1943886.0]], "isOverall": false, "label": "T15 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 29377.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[10.0, 29377.0]], "isOverall": false, "label": "T10 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 365734.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[10.0, 365734.0]], "isOverall": false, "label": "T16 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 41587.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[10.0, 41587.0]], "isOverall": false, "label": "T16 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 73372.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[10.0, 73372.0]], "isOverall": false, "label": "T10 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 357264.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[10.0, 357264.0]], "isOverall": false, "label": "T10 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 524509.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[10.0, 524509.0]], "isOverall": false, "label": "T16 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 435578.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[10.0, 435578.0]], "isOverall": false, "label": "T10 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 37650.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[10.0, 37650.0]], "isOverall": false, "label": "T10 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 521188.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[10.0, 521188.0]], "isOverall": false, "label": "T10 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 140822.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[10.0, 140822.0]], "isOverall": false, "label": "T10 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 23511.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[10.0, 23511.0]], "isOverall": false, "label": "T10 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 2220050.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[10.0, 2220050.0]], "isOverall": false, "label": "T10 - Q9-Aggregated", "isController": false}, {"data": [[5.0, 128272.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[5.0, 128272.0]], "isOverall": false, "label": "T16 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 1723244.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[10.0, 1723244.0]], "isOverall": false, "label": "T16 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 11729.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[10.0, 11729.0]], "isOverall": false, "label": "T16 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 57278.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[10.0, 57278.0]], "isOverall": false, "label": "T16 - Q3-Aggregated", "isController": false}, {"data": [[6.0, 2293293.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[6.0, 2293293.0]], "isOverall": false, "label": "T16 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 7818.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[10.0, 7818.0]], "isOverall": false, "label": "T16 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 6290.0]], "isOverall": false, "label": "T13 - Q10", "isController": false}, {"data": [[10.0, 6290.0]], "isOverall": false, "label": "T13 - Q10-Aggregated", "isController": false}, {"data": [[5.0, 501178.0]], "isOverall": false, "label": "T13 - Q11", "isController": false}, {"data": [[5.0, 501178.0]], "isOverall": false, "label": "T13 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 94262.0]], "isOverall": false, "label": "T13 - Q12", "isController": false}, {"data": [[10.0, 94262.0]], "isOverall": false, "label": "T13 - Q12-Aggregated", "isController": false}, {"data": [[5.0, 628035.0]], "isOverall": false, "label": "T13 - Q13", "isController": false}, {"data": [[5.0, 628035.0]], "isOverall": false, "label": "T13 - Q13-Aggregated", "isController": false}, {"data": [[4.0, 308194.0]], "isOverall": false, "label": "T13 - Q14", "isController": false}, {"data": [[4.0, 308194.0]], "isOverall": false, "label": "T13 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 13353.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[10.0, 13353.0]], "isOverall": false, "label": "T9 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 8523836.0]], "isOverall": false, "label": "T13 - Q15", "isController": false}, {"data": [[10.0, 8523836.0]], "isOverall": false, "label": "T13 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 9580.0]], "isOverall": false, "label": "T13 - Q16", "isController": false}, {"data": [[10.0, 9580.0]], "isOverall": false, "label": "T13 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 2385268.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[10.0, 2385268.0]], "isOverall": false, "label": "T9 - Q1-Aggregated", "isController": false}, {"data": [[6.0, 3545640.0]], "isOverall": false, "label": "T13 - Q18", "isController": false}, {"data": [[6.0, 3545640.0]], "isOverall": false, "label": "T13 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 2088758.0]], "isOverall": false, "label": "T13 - Q19", "isController": false}, {"data": [[10.0, 2088758.0]], "isOverall": false, "label": "T13 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 2328356.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[10.0, 2328356.0]], "isOverall": false, "label": "T9 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 16479.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[10.0, 16479.0]], "isOverall": false, "label": "T9 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 431944.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[10.0, 431944.0]], "isOverall": false, "label": "T9 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 481469.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[10.0, 481469.0]], "isOverall": false, "label": "T9 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 19476.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[10.0, 19476.0]], "isOverall": false, "label": "T9 - Q5-Aggregated", "isController": false}, {"data": [[9.0, 213356.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[9.0, 213356.0]], "isOverall": false, "label": "T9 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 28128.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[10.0, 28128.0]], "isOverall": false, "label": "T9 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 196678.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[10.0, 196678.0]], "isOverall": false, "label": "T1 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 151810.0]], "isOverall": false, "label": "T13 - Q21", "isController": false}, {"data": [[10.0, 151810.0]], "isOverall": false, "label": "T13 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 458218.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[10.0, 458218.0]], "isOverall": false, "label": "T1 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 450875.0]], "isOverall": false, "label": "T13 - Q22", "isController": false}, {"data": [[10.0, 450875.0]], "isOverall": false, "label": "T13 - Q22-Aggregated", "isController": false}, {"data": [[1.0, 252464.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.0, 252464.0]], "isOverall": false, "label": "T1 - Q13-Aggregated", "isController": false}, {"data": [[5.0, 2467865.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[5.0, 2467865.0]], "isOverall": false, "label": "T1 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 146975.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[10.0, 146975.0]], "isOverall": false, "label": "T1 - Q15-Aggregated", "isController": false}, {"data": [[4.0, 1639758.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[4.0, 1639758.0]], "isOverall": false, "label": "T1 - Q14-Aggregated", "isController": false}, {"data": [[9.0, 356309.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[9.0, 356309.0]], "isOverall": false, "label": "T1 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 2198203.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[10.0, 2198203.0]], "isOverall": false, "label": "T1 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 5241.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[10.0, 5241.0]], "isOverall": false, "label": "T14 - Q4-Aggregated", "isController": false}, {"data": [[9.0, 363760.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[9.0, 363760.0]], "isOverall": false, "label": "T14 - Q3-Aggregated", "isController": false}, {"data": [[8.0, 469206.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[8.0, 469206.0]], "isOverall": false, "label": "T1 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 7379.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[10.0, 7379.0]], "isOverall": false, "label": "T14 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 99418.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[10.0, 99418.0]], "isOverall": false, "label": "T1 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 2822030.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[10.0, 2822030.0]], "isOverall": false, "label": "T1 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 15746.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[10.0, 15746.0]], "isOverall": false, "label": "T14 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 225193.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[10.0, 225193.0]], "isOverall": false, "label": "T14 - Q9-Aggregated", "isController": false}, {"data": [[9.0, 9180.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[9.0, 9180.0]], "isOverall": false, "label": "T14 - Q8-Aggregated", "isController": false}, {"data": [[9.0, 10404.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[9.0, 10404.0]], "isOverall": false, "label": "T14 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 13487.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[10.0, 13487.0]], "isOverall": false, "label": "T14 - Q6-Aggregated", "isController": false}, {"data": [[9.0, 3313.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[9.0, 3313.0]], "isOverall": false, "label": "T14 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 339806.0]], "isOverall": false, "label": "T11 - Q3", "isController": false}, {"data": [[10.0, 339806.0]], "isOverall": false, "label": "T11 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 8026.0]], "isOverall": false, "label": "T11 - Q2", "isController": false}, {"data": [[10.0, 8026.0]], "isOverall": false, "label": "T11 - Q2-Aggregated", "isController": false}, {"data": [[8.0, 317016.0]], "isOverall": false, "label": "T11 - Q5", "isController": false}, {"data": [[8.0, 317016.0]], "isOverall": false, "label": "T11 - Q5-Aggregated", "isController": false}, {"data": [[6.0, 29193.0]], "isOverall": false, "label": "T11 - Q4", "isController": false}, {"data": [[6.0, 29193.0]], "isOverall": false, "label": "T11 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 367122.0]], "isOverall": false, "label": "T11 - Q7", "isController": false}, {"data": [[10.0, 367122.0]], "isOverall": false, "label": "T11 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 2027322.0]], "isOverall": false, "label": "T11 - Q6", "isController": false}, {"data": [[10.0, 2027322.0]], "isOverall": false, "label": "T11 - Q6-Aggregated", "isController": false}, {"data": [[5.0, 2100290.0]], "isOverall": false, "label": "T11 - Q9", "isController": false}, {"data": [[5.0, 2100290.0]], "isOverall": false, "label": "T11 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 26194.0]], "isOverall": false, "label": "T11 - Q8", "isController": false}, {"data": [[10.0, 26194.0]], "isOverall": false, "label": "T11 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 2106588.0]], "isOverall": false, "label": "T12 - Q1", "isController": false}, {"data": [[10.0, 2106588.0]], "isOverall": false, "label": "T12 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 5105.0]], "isOverall": false, "label": "T12 - Q2", "isController": false}, {"data": [[10.0, 5105.0]], "isOverall": false, "label": "T12 - Q2-Aggregated", "isController": false}, {"data": [[9.0, 6626.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[9.0, 6626.0]], "isOverall": false, "label": "T14 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 80453.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[10.0, 80453.0]], "isOverall": false, "label": "T14 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 15299.0]], "isOverall": false, "label": "T13 - Q7", "isController": false}, {"data": [[10.0, 15299.0]], "isOverall": false, "label": "T13 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 153.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[10.0, 153.0]], "isOverall": false, "label": "T1 - RF2-Aggregated", "isController": false}, {"data": [[10.0, 325680.0]], "isOverall": false, "label": "T13 - Q6", "isController": false}, {"data": [[10.0, 325680.0]], "isOverall": false, "label": "T13 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 11866.0]], "isOverall": false, "label": "T13 - Q5", "isController": false}, {"data": [[10.0, 11866.0]], "isOverall": false, "label": "T13 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 16243.0]], "isOverall": false, "label": "T13 - Q4", "isController": false}, {"data": [[10.0, 16243.0]], "isOverall": false, "label": "T13 - Q4-Aggregated", "isController": false}, {"data": [[5.0, 2221187.0]], "isOverall": false, "label": "T13 - Q9", "isController": false}, {"data": [[5.0, 2221187.0]], "isOverall": false, "label": "T13 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 15229.0]], "isOverall": false, "label": "T13 - Q8", "isController": false}, {"data": [[10.0, 15229.0]], "isOverall": false, "label": "T13 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 178.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[10.0, 178.0]], "isOverall": false, "label": "T1 - RF1-Aggregated", "isController": false}, {"data": [[9.0, 120754.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[9.0, 120754.0]], "isOverall": false, "label": "T14 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 1051878.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[10.0, 1051878.0]], "isOverall": false, "label": "T14 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 3015.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[10.0, 3015.0]], "isOverall": false, "label": "T14 - Q11-Aggregated", "isController": false}, {"data": [[9.0, 8156.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[9.0, 8156.0]], "isOverall": false, "label": "T14 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 93884.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[10.0, 93884.0]], "isOverall": false, "label": "T14 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 81725.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[10.0, 81725.0]], "isOverall": false, "label": "T14 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 111333.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[10.0, 111333.0]], "isOverall": false, "label": "T14 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 8468867.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[10.0, 8468867.0]], "isOverall": false, "label": "T14 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 1954057.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[10.0, 1954057.0]], "isOverall": false, "label": "T14 - Q14-Aggregated", "isController": false}, {"data": [[6.0, 2273792.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[6.0, 2273792.0]], "isOverall": false, "label": "T1 - Q1-Aggregated", "isController": false}, {"data": [[1.0, 2714.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.0, 2714.0]], "isOverall": false, "label": "T1 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 141667.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[10.0, 141667.0]], "isOverall": false, "label": "T1 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 2264866.0]], "isOverall": false, "label": "T12 - Q9", "isController": false}, {"data": [[10.0, 2264866.0]], "isOverall": false, "label": "T12 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 1036107.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[10.0, 1036107.0]], "isOverall": false, "label": "T1 - Q4-Aggregated", "isController": false}, {"data": [[10.0, 28989.0]], "isOverall": false, "label": "T12 - Q7", "isController": false}, {"data": [[10.0, 28989.0]], "isOverall": false, "label": "T12 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 441002.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[10.0, 441002.0]], "isOverall": false, "label": "T1 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 106056.0]], "isOverall": false, "label": "T12 - Q8", "isController": false}, {"data": [[10.0, 106056.0]], "isOverall": false, "label": "T12 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 1595888.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[10.0, 1595888.0]], "isOverall": false, "label": "T1 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 18933.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[10.0, 18933.0]], "isOverall": false, "label": "T1 - Q7-Aggregated", "isController": false}, {"data": [[10.0, 667018.0]], "isOverall": false, "label": "T12 - Q5", "isController": false}, {"data": [[10.0, 667018.0]], "isOverall": false, "label": "T12 - Q5-Aggregated", "isController": false}, {"data": [[10.0, 38938.0]], "isOverall": false, "label": "T12 - Q6", "isController": false}, {"data": [[10.0, 38938.0]], "isOverall": false, "label": "T12 - Q6-Aggregated", "isController": false}, {"data": [[10.0, 103429.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[10.0, 103429.0]], "isOverall": false, "label": "T1 - Q8-Aggregated", "isController": false}, {"data": [[10.0, 5717.0]], "isOverall": false, "label": "T12 - Q3", "isController": false}, {"data": [[10.0, 5717.0]], "isOverall": false, "label": "T12 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 2869700.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[10.0, 2869700.0]], "isOverall": false, "label": "T1 - Q9-Aggregated", "isController": false}, {"data": [[10.0, 3299.0]], "isOverall": false, "label": "T12 - Q4", "isController": false}, {"data": [[10.0, 3299.0]], "isOverall": false, "label": "T12 - Q4-Aggregated", "isController": false}, {"data": [[8.0, 944403.0]], "isOverall": false, "label": "T11 - Q13", "isController": false}, {"data": [[8.0, 944403.0]], "isOverall": false, "label": "T11 - Q13-Aggregated", "isController": false}, {"data": [[10.0, 89306.0]], "isOverall": false, "label": "T11 - Q14", "isController": false}, {"data": [[10.0, 89306.0]], "isOverall": false, "label": "T11 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 5631630.0]], "isOverall": false, "label": "T11 - Q15", "isController": false}, {"data": [[10.0, 5631630.0]], "isOverall": false, "label": "T11 - Q15-Aggregated", "isController": false}, {"data": [[5.0, 3298.0]], "isOverall": false, "label": "T11 - Q16", "isController": false}, {"data": [[5.0, 3298.0]], "isOverall": false, "label": "T11 - Q16-Aggregated", "isController": false}, {"data": [[10.0, 54835.0]], "isOverall": false, "label": "T11 - Q10", "isController": false}, {"data": [[10.0, 54835.0]], "isOverall": false, "label": "T11 - Q10-Aggregated", "isController": false}, {"data": [[5.0, 459787.0]], "isOverall": false, "label": "T11 - Q11", "isController": false}, {"data": [[5.0, 459787.0]], "isOverall": false, "label": "T11 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 1375589.0]], "isOverall": false, "label": "T11 - Q12", "isController": false}, {"data": [[10.0, 1375589.0]], "isOverall": false, "label": "T11 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 276340.0]], "isOverall": false, "label": "T12 - Q21", "isController": false}, {"data": [[10.0, 276340.0]], "isOverall": false, "label": "T12 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 2881.0]], "isOverall": false, "label": "T12 - Q22", "isController": false}, {"data": [[10.0, 2881.0]], "isOverall": false, "label": "T12 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 95003.0]], "isOverall": false, "label": "T11 - Q18", "isController": false}, {"data": [[10.0, 95003.0]], "isOverall": false, "label": "T11 - Q18-Aggregated", "isController": false}, {"data": [[3.0, 932215.0]], "isOverall": false, "label": "T11 - Q19", "isController": false}, {"data": [[3.0, 932215.0]], "isOverall": false, "label": "T11 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 375059.0]], "isOverall": false, "label": "T13 - Q3", "isController": false}, {"data": [[10.0, 375059.0]], "isOverall": false, "label": "T13 - Q3-Aggregated", "isController": false}, {"data": [[10.0, 9108.0]], "isOverall": false, "label": "T13 - Q2", "isController": false}, {"data": [[10.0, 9108.0]], "isOverall": false, "label": "T13 - Q2-Aggregated", "isController": false}, {"data": [[10.0, 47991.0]], "isOverall": false, "label": "T13 - Q1", "isController": false}, {"data": [[10.0, 47991.0]], "isOverall": false, "label": "T13 - Q1-Aggregated", "isController": false}, {"data": [[10.0, 2647612.0]], "isOverall": false, "label": "T12 - Q18", "isController": false}, {"data": [[10.0, 2647612.0]], "isOverall": false, "label": "T12 - Q18-Aggregated", "isController": false}, {"data": [[10.0, 83723.0]], "isOverall": false, "label": "T12 - Q19", "isController": false}, {"data": [[10.0, 83723.0]], "isOverall": false, "label": "T12 - Q19-Aggregated", "isController": false}, {"data": [[10.0, 4283.0]], "isOverall": false, "label": "T12 - Q16", "isController": false}, {"data": [[10.0, 4283.0]], "isOverall": false, "label": "T12 - Q16-Aggregated", "isController": false}, {"data": [[6.0, 2651523.0]], "isOverall": false, "label": "T11 - Q21", "isController": false}, {"data": [[6.0, 2651523.0]], "isOverall": false, "label": "T11 - Q21-Aggregated", "isController": false}, {"data": [[10.0, 6714.0]], "isOverall": false, "label": "T11 - Q22", "isController": false}, {"data": [[10.0, 6714.0]], "isOverall": false, "label": "T11 - Q22-Aggregated", "isController": false}, {"data": [[10.0, 157428.0]], "isOverall": false, "label": "T12 - Q10", "isController": false}, {"data": [[10.0, 157428.0]], "isOverall": false, "label": "T12 - Q10-Aggregated", "isController": false}, {"data": [[10.0, 6335.0]], "isOverall": false, "label": "T12 - Q11", "isController": false}, {"data": [[10.0, 6335.0]], "isOverall": false, "label": "T12 - Q11-Aggregated", "isController": false}, {"data": [[10.0, 12236.0]], "isOverall": false, "label": "T12 - Q14", "isController": false}, {"data": [[10.0, 12236.0]], "isOverall": false, "label": "T12 - Q14-Aggregated", "isController": false}, {"data": [[10.0, 3433808.0]], "isOverall": false, "label": "T12 - Q15", "isController": false}, {"data": [[10.0, 3433808.0]], "isOverall": false, "label": "T12 - Q15-Aggregated", "isController": false}, {"data": [[10.0, 96722.0]], "isOverall": false, "label": "T12 - Q12", "isController": false}, {"data": [[10.0, 96722.0]], "isOverall": false, "label": "T12 - Q12-Aggregated", "isController": false}, {"data": [[10.0, 523258.0]], "isOverall": false, "label": "T12 - Q13", "isController": false}, {"data": [[10.0, 523258.0]], "isOverall": false, "label": "T12 - Q13-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.69218024E12, "maxY": 20300.65, "series": [{"data": [[1.69218456E12, 6.15], [1.69219344E12, 3.5833333333333335], [1.69218054E12, 1.6666666666666667], [1.69218396E12, 131.66666666666666], [1.69219284E12, 75.78333333333333], [1.69218336E12, 0.35], [1.69218156E12, 1.4], [1.69219608E12, 50.8], [1.69219932E12, 1.4], [1.69218678E12, 1.2166666666666666], [1.69219548E12, 142.63333333333333], [1.69218036E12, 17552.3], [1.69218198E12, 7176.383333333333], [1.692192E12, 63.03333333333333], [1.69218798E12, 6.433333333333334], [1.6921902E12, 48.583333333333336], [1.69218696E12, 8634.416666666666], [1.69218096E12, 0.38333333333333336], [1.69218636E12, 5.116666666666666], [1.69218858E12, 10.833333333333334], [1.69219524E12, 0.5666666666666667], [1.6921995E12, 341.4166666666667], [1.69219242E12, 131.66666666666666], [1.69218078E12, 48.583333333333336], [1.6921836E12, 8784.35], [1.69219248E12, 11564.116666666667], [1.69219956E12, 2.8833333333333333], [1.69218048E12, 83.51666666666667], [1.69218684E12, 6.366666666666666], [1.69219794E12, 1.4], [1.6921803E12, 12923.133333333333], [1.6921929E12, 5.383333333333334], [1.69218582E12, 132.05], [1.69219452E12, 48.55], [1.6921809E12, 72.93333333333334], [1.69219974E12, 64.7], [1.69218378E12, 10.833333333333334], [1.69218354E12, 6.933333333333334], [1.69218702E12, 5.383333333333334], [1.69218192E12, 1.4], [1.69219206E12, 3.6333333333333333], [1.6921953E12, 0.35], [1.69218822E12, 11298.45], [1.69219308E12, 5.016666666666667], [1.69219752E12, 0.38333333333333336], [1.69218648E12, 9.183333333333334], [1.69218144E12, 333.21666666666664], [1.69219194E12, 16.933333333333334], [1.69218588E12, 131.66666666666666], [1.69219032E12, 62.25], [1.69218126E12, 5.383333333333334], [1.69218348E12, 10.2], [1.69219092E12, 10.833333333333334], [1.69218024E12, 1004.1166666666667], [1.69218666E12, 4.35], [1.69218828E12, 10.833333333333334], [1.6921899E12, 131.66666666666666], [1.69218444E12, 2.216666666666667], [1.69219776E12, 8.166666666666666], [1.69218066E12, 6.233333333333333], [1.69219272E12, 12.6], [1.6921998E12, 5.383333333333334], [1.69219212E12, 20171.583333333332], [1.6921833E12, 7.45], [1.69218564E12, 113.51666666666667], [1.69218786E12, 147.03333333333333], [1.69219008E12, 6.366666666666666], [1.69219596E12, 12.8], [1.69219818E12, 263.3333333333333], [1.69219926E12, 4.95], [1.69219602E12, 5.2], [1.69219218E12, 14.133333333333333], [1.69218654E12, 7.966666666666667], [1.69219986E12, 327.76666666666665], [1.6921824E12, 10.966666666666667], [1.6921806E12, 48.583333333333336], [1.69219158E12, 0.35], [1.6921932E12, 20300.65], [1.6921845E12, 61.35], [1.69219806E12, 0.5666666666666667], [1.6921926E12, 6.6], [1.69219866E12, 16282.416666666666], [1.69218612E12, 6.433333333333334], [1.69218102E12, 9.583333333333334], [1.69218894E12, 0.5666666666666667], [1.69219782E12, 67.56666666666666], [1.69219236E12, 4651.416666666667], [1.69218954E12, 2.966666666666667], [1.69218528E12, 3.05], [1.69219074E12, 48.583333333333336], [1.69219278E12, 2.216666666666667], [1.69218042E12, 9678.75]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69218456E12, 0.0], [1.69219344E12, 0.0], [1.69218054E12, 0.0], [1.69218396E12, 0.0], [1.69219284E12, 0.0], [1.69218336E12, 0.0], [1.69218156E12, 0.0], [1.69219608E12, 0.0], [1.69219932E12, 0.0], [1.69218678E12, 0.0], [1.69219548E12, 0.0], [1.69218036E12, 0.0], [1.69218198E12, 0.0], [1.692192E12, 0.0], [1.69218798E12, 0.0], [1.6921902E12, 0.0], [1.69218696E12, 0.0], [1.69218096E12, 0.0], [1.69218636E12, 0.0], [1.69218858E12, 0.0], [1.69219524E12, 0.0], [1.6921995E12, 0.0], [1.69219242E12, 0.0], [1.69218078E12, 0.0], [1.6921836E12, 0.0], [1.69219248E12, 0.0], [1.69219956E12, 0.0], [1.69218048E12, 0.0], [1.69218684E12, 0.0], [1.69219794E12, 0.0], [1.6921803E12, 0.0], [1.6921929E12, 0.0], [1.69218582E12, 0.0], [1.69219452E12, 0.0], [1.6921809E12, 0.0], [1.69219974E12, 0.0], [1.69218378E12, 0.0], [1.69218354E12, 0.0], [1.69218702E12, 0.0], [1.69218192E12, 0.0], [1.69219206E12, 0.0], [1.6921953E12, 0.0], [1.69218822E12, 0.0], [1.69219308E12, 0.0], [1.69219752E12, 0.0], [1.69218648E12, 0.0], [1.69218144E12, 0.0], [1.69219194E12, 0.0], [1.69218588E12, 0.0], [1.69219032E12, 0.0], [1.69218126E12, 0.0], [1.69218348E12, 0.0], [1.69219092E12, 0.0], [1.69218024E12, 0.0], [1.69218666E12, 0.0], [1.69218828E12, 0.0], [1.6921899E12, 0.0], [1.69218444E12, 0.0], [1.69219776E12, 0.0], [1.69218066E12, 0.0], [1.69219272E12, 0.0], [1.6921998E12, 0.0], [1.69219212E12, 0.0], [1.6921833E12, 0.0], [1.69218564E12, 0.0], [1.69218786E12, 0.0], [1.69219008E12, 0.0], [1.69219596E12, 0.0], [1.69219818E12, 0.0], [1.69219926E12, 0.0], [1.69219602E12, 0.0], [1.69219218E12, 0.0], [1.69218654E12, 0.0], [1.69219986E12, 0.0], [1.6921824E12, 0.0], [1.6921806E12, 0.0], [1.69219158E12, 0.0], [1.6921932E12, 0.0], [1.6921845E12, 0.0], [1.69219806E12, 0.0], [1.6921926E12, 0.0], [1.69219866E12, 0.0], [1.69218612E12, 0.0], [1.69218102E12, 0.0], [1.69218894E12, 0.0], [1.69219782E12, 0.0], [1.69219236E12, 0.0], [1.69218954E12, 0.0], [1.69218528E12, 0.0], [1.69219074E12, 0.0], [1.69219278E12, 0.0], [1.69218042E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69219986E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 153.0, "minX": 1.69218024E12, "maxY": 9549266.0, "series": [{"data": [[1.6921833E12, 2328469.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.6921953E12, 2534036.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.6921836E12, 260365.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.69219008E12, 2098211.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.69218336E12, 1930766.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69218042E12, 13631.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69219212E12, 201325.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69218036E12, 9775.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69218564E12, 2268149.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69219776E12, 5157589.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.69219194E12, 1829866.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69219212E12, 46956.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.6921803E12, 79153.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69219212E12, 1326090.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.69218036E12, 79270.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.69219782E12, 48850.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.69218048E12, 63373.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.69219212E12, 9074.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69218042E12, 9020.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[1.69218564E12, 3291.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[1.69218054E12, 80631.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[1.69218528E12, 4795462.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[1.69219524E12, 2803090.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[1.6921998E12, 45403.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[1.6921932E12, 740402.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[1.69219776E12, 194640.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[1.69218036E12, 4349.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1.69219932E12, 1607211.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[1.69218036E12, 13291.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[1.69218042E12, 87773.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[1.69218786E12, 2202257.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[1.69219596E12, 427115.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1.6921824E12, 1867577.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[1.69218822E12, 381013.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[1.69219074E12, 2482165.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.69218048E12, 13627.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69218048E12, 111270.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.69219782E12, 33246.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.69218048E12, 34892.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[1.6921902E12, 1956259.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[1.69218024E12, 8280.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[1.69218684E12, 2260252.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[1.69218042E12, 5600.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[1.69218444E12, 484072.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[1.6921845E12, 6852.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[1.69219194E12, 996811.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[1.69218894E12, 2098647.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[1.69218456E12, 51483.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[1.69218198E12, 722119.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[1.69218102E12, 629393.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[1.69219092E12, 2018002.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[1.6921845E12, 48452.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[1.6921803E12, 50842.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[1.6921803E12, 27158.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[1.69218036E12, 9451.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[1.69219548E12, 2288873.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[1.69219452E12, 2174333.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[1.69219236E12, 429194.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[1.6921803E12, 78774.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[1.69219248E12, 459275.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1.69218378E12, 1887028.0]], "isOverall": false, "label": "T11 - Q1", "isController": false}, {"data": [[1.692192E12, 62793.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1.69219956E12, 1533737.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[1.6921932E12, 5260.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[1.69219806E12, 2037594.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[1.69219602E12, 76931.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[1.69219248E12, 3247.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[1.69219194E12, 9549266.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[1.69218048E12, 101418.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[1.69218042E12, 74673.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[1.69218126E12, 242660.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[1.69218456E12, 16996.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[1.69219974E12, 158496.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1.69218396E12, 1943886.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[1.69218036E12, 29377.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69218564E12, 365734.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[1.69218036E12, 41587.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[1.69218054E12, 73372.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.6921809E12, 357264.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69219242E12, 524509.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[1.6921926E12, 435578.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69219218E12, 37650.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.69218144E12, 521188.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.69218798E12, 140822.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.69218048E12, 23511.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69218786E12, 2220050.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.6921995E12, 128272.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[1.69219194E12, 1723244.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[1.69218048E12, 11729.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[1.6921803E12, 57278.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[1.69219752E12, 2293293.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[1.69218786E12, 7818.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[1.69218036E12, 6290.0]], "isOverall": false, "label": "T13 - Q10", "isController": false}, {"data": [[1.69219866E12, 501178.0]], "isOverall": false, "label": "T13 - Q11", "isController": false}, {"data": [[1.69218048E12, 94262.0]], "isOverall": false, "label": "T13 - Q12", "isController": false}, {"data": [[1.69219926E12, 628035.0]], "isOverall": false, "label": "T13 - Q13", "isController": false}, {"data": [[1.69219956E12, 308194.0]], "isOverall": false, "label": "T13 - Q14", "isController": false}, {"data": [[1.69218024E12, 13353.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.69218954E12, 8523836.0]], "isOverall": false, "label": "T13 - Q15", "isController": false}, {"data": [[1.6921803E12, 9580.0]], "isOverall": false, "label": "T13 - Q16", "isController": false}, {"data": [[1.69218828E12, 2385268.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69219596E12, 3545640.0]], "isOverall": false, "label": "T13 - Q18", "isController": false}, {"data": [[1.69219158E12, 2088758.0]], "isOverall": false, "label": "T13 - Q19", "isController": false}, {"data": [[1.69218588E12, 2328356.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69218036E12, 16479.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.6921926E12, 431944.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69218096E12, 481469.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69218042E12, 19476.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69219278E12, 213356.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69218042E12, 28128.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.69218696E12, 196678.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.6921806E12, 151810.0]], "isOverall": false, "label": "T13 - Q21", "isController": false}, {"data": [[1.69219032E12, 458218.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69219236E12, 450875.0]], "isOverall": false, "label": "T13 - Q22", "isController": false}, {"data": [[1.69219986E12, 252464.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69219794E12, 2467865.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69218036E12, 146975.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69219956E12, 1639758.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69219272E12, 356309.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69218564E12, 2198203.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.6921803E12, 5241.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[1.69219272E12, 363760.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[1.6921932E12, 469206.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69218042E12, 7379.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[1.69218048E12, 99418.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69218348E12, 2822030.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.692192E12, 15746.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[1.69219236E12, 225193.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[1.69219284E12, 9180.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[1.6921929E12, 10404.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[1.692192E12, 13487.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[1.69219284E12, 3313.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[1.69218612E12, 339806.0]], "isOverall": false, "label": "T11 - Q3", "isController": false}, {"data": [[1.69218042E12, 8026.0]], "isOverall": false, "label": "T11 - Q2", "isController": false}, {"data": [[1.69219344E12, 317016.0]], "isOverall": false, "label": "T11 - Q5", "isController": false}, {"data": [[1.69219608E12, 29193.0]], "isOverall": false, "label": "T11 - Q4", "isController": false}, {"data": [[1.69218654E12, 367122.0]], "isOverall": false, "label": "T11 - Q7", "isController": false}, {"data": [[1.69218582E12, 2027322.0]], "isOverall": false, "label": "T11 - Q6", "isController": false}, {"data": [[1.69219818E12, 2100290.0]], "isOverall": false, "label": "T11 - Q9", "isController": false}, {"data": [[1.69218042E12, 26194.0]], "isOverall": false, "label": "T11 - Q8", "isController": false}, {"data": [[1.69218858E12, 2106588.0]], "isOverall": false, "label": "T12 - Q1", "isController": false}, {"data": [[1.6921803E12, 5105.0]], "isOverall": false, "label": "T12 - Q2", "isController": false}, {"data": [[1.69219284E12, 6626.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[1.69218042E12, 80453.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[1.69218036E12, 15299.0]], "isOverall": false, "label": "T13 - Q7", "isController": false}, {"data": [[1.69219194E12, 153.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69219194E12, 325680.0]], "isOverall": false, "label": "T13 - Q6", "isController": false}, {"data": [[1.69218036E12, 11866.0]], "isOverall": false, "label": "T13 - Q5", "isController": false}, {"data": [[1.6921803E12, 16243.0]], "isOverall": false, "label": "T13 - Q4", "isController": false}, {"data": [[1.69219818E12, 2221187.0]], "isOverall": false, "label": "T13 - Q9", "isController": false}, {"data": [[1.69218036E12, 15229.0]], "isOverall": false, "label": "T13 - Q8", "isController": false}, {"data": [[1.69218666E12, 178.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69219284E12, 120754.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[1.69218156E12, 1051878.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[1.69219236E12, 3015.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[1.69219284E12, 8156.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[1.69218054E12, 93884.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[1.6921803E12, 81725.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[1.69219212E12, 111333.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[1.692192E12, 8468867.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[1.69218354E12, 1954057.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[1.69219548E12, 2273792.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69219986E12, 2714.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69218066E12, 141667.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69218582E12, 2264866.0]], "isOverall": false, "label": "T12 - Q9", "isController": false}, {"data": [[1.69218666E12, 1036107.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69218648E12, 28989.0]], "isOverall": false, "label": "T12 - Q7", "isController": false}, {"data": [[1.69219236E12, 441002.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69218648E12, 106056.0]], "isOverall": false, "label": "T12 - Q8", "isController": false}, {"data": [[1.69219194E12, 1595888.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69218702E12, 18933.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69219272E12, 667018.0]], "isOverall": false, "label": "T12 - Q5", "isController": false}, {"data": [[1.6921803E12, 38938.0]], "isOverall": false, "label": "T12 - Q6", "isController": false}, {"data": [[1.69218678E12, 103429.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69218048E12, 5717.0]], "isOverall": false, "label": "T12 - Q3", "isController": false}, {"data": [[1.6921899E12, 2869700.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.6921809E12, 3299.0]], "isOverall": false, "label": "T12 - Q4", "isController": false}, {"data": [[1.69219308E12, 944403.0]], "isOverall": false, "label": "T11 - Q13", "isController": false}, {"data": [[1.69218054E12, 89306.0]], "isOverall": false, "label": "T11 - Q14", "isController": false}, {"data": [[1.69219218E12, 5631630.0]], "isOverall": false, "label": "T11 - Q15", "isController": false}, {"data": [[1.69219866E12, 3298.0]], "isOverall": false, "label": "T11 - Q16", "isController": false}, {"data": [[1.6921803E12, 54835.0]], "isOverall": false, "label": "T11 - Q10", "isController": false}, {"data": [[1.69219866E12, 459787.0]], "isOverall": false, "label": "T11 - Q11", "isController": false}, {"data": [[1.69218192E12, 1375589.0]], "isOverall": false, "label": "T11 - Q12", "isController": false}, {"data": [[1.69218078E12, 276340.0]], "isOverall": false, "label": "T12 - Q21", "isController": false}, {"data": [[1.69218648E12, 2881.0]], "isOverall": false, "label": "T12 - Q22", "isController": false}, {"data": [[1.69218042E12, 95003.0]], "isOverall": false, "label": "T11 - Q18", "isController": false}, {"data": [[1.69219956E12, 932215.0]], "isOverall": false, "label": "T11 - Q19", "isController": false}, {"data": [[1.69218102E12, 375059.0]], "isOverall": false, "label": "T13 - Q3", "isController": false}, {"data": [[1.69218024E12, 9108.0]], "isOverall": false, "label": "T13 - Q2", "isController": false}, {"data": [[1.6921803E12, 47991.0]], "isOverall": false, "label": "T13 - Q1", "isController": false}, {"data": [[1.69218354E12, 2647612.0]], "isOverall": false, "label": "T12 - Q18", "isController": false}, {"data": [[1.69218036E12, 83723.0]], "isOverall": false, "label": "T12 - Q19", "isController": false}, {"data": [[1.69218036E12, 4283.0]], "isOverall": false, "label": "T12 - Q16", "isController": false}, {"data": [[1.69219608E12, 2651523.0]], "isOverall": false, "label": "T11 - Q21", "isController": false}, {"data": [[1.69218654E12, 6714.0]], "isOverall": false, "label": "T11 - Q22", "isController": false}, {"data": [[1.6921809E12, 157428.0]], "isOverall": false, "label": "T12 - Q10", "isController": false}, {"data": [[1.69218036E12, 6335.0]], "isOverall": false, "label": "T12 - Q11", "isController": false}, {"data": [[1.69219206E12, 12236.0]], "isOverall": false, "label": "T12 - Q14", "isController": false}, {"data": [[1.69219206E12, 3433808.0]], "isOverall": false, "label": "T12 - Q15", "isController": false}, {"data": [[1.69218048E12, 96722.0]], "isOverall": false, "label": "T12 - Q12", "isController": false}, {"data": [[1.69218636E12, 523258.0]], "isOverall": false, "label": "T12 - Q13", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69219986E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69218024E12, "maxY": 9549266.0, "series": [{"data": [[1.6921833E12, 2328469.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.6921953E12, 2534036.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.6921836E12, 260357.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.69219008E12, 2098211.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.69218336E12, 1930766.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69218042E12, 13631.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69219212E12, 201321.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69218036E12, 9762.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69218564E12, 2268149.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69219776E12, 5157588.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.69219194E12, 1829866.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69219212E12, 46956.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.6921803E12, 79153.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69219212E12, 1326090.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.69218036E12, 79270.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.69219782E12, 48849.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.69218048E12, 63372.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.69219212E12, 9070.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69218042E12, 9000.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[1.69218564E12, 3291.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[1.69218054E12, 80630.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[1.69218528E12, 4795462.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[1.69219524E12, 2803090.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[1.6921998E12, 45402.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[1.6921932E12, 740402.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[1.69219776E12, 194640.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[1.69218036E12, 4349.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1.69219932E12, 1607211.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[1.69218036E12, 13290.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[1.69218042E12, 87773.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[1.69218786E12, 2202257.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[1.69219596E12, 427115.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1.6921824E12, 1867577.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[1.69218822E12, 380989.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[1.69219074E12, 2482165.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.69218048E12, 13627.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69218048E12, 111270.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.69219782E12, 33246.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.69218048E12, 34892.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[1.6921902E12, 1956259.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[1.69218024E12, 8262.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[1.69218684E12, 2260252.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[1.69218042E12, 5599.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[1.69218444E12, 484072.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[1.6921845E12, 6852.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[1.69219194E12, 996811.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[1.69218894E12, 2098647.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[1.69218456E12, 51483.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[1.69218198E12, 722113.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[1.69218102E12, 629393.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[1.69219092E12, 2018001.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[1.6921845E12, 48452.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[1.6921803E12, 50842.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[1.6921803E12, 27130.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[1.69218036E12, 9451.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[1.69219548E12, 2288873.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[1.69219452E12, 2174333.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[1.69219236E12, 429194.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[1.6921803E12, 78774.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[1.69219248E12, 459275.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1.69218378E12, 1887028.0]], "isOverall": false, "label": "T11 - Q1", "isController": false}, {"data": [[1.692192E12, 62793.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1.69219956E12, 1533737.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[1.6921932E12, 5254.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[1.69219806E12, 2037594.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[1.69219602E12, 76931.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[1.69219248E12, 3241.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[1.69219194E12, 9549266.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[1.69218048E12, 101417.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[1.69218042E12, 74673.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[1.69218126E12, 242660.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[1.69218456E12, 16996.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[1.69219974E12, 158496.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1.69218396E12, 1943886.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[1.69218036E12, 29377.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69218564E12, 365733.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[1.69218036E12, 41587.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[1.69218054E12, 73371.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.6921809E12, 357263.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69219242E12, 524509.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[1.6921926E12, 435578.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69219218E12, 37650.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.69218144E12, 521188.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.69218798E12, 140822.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.69218048E12, 23511.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69218786E12, 2220050.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.6921995E12, 128271.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[1.69219194E12, 1723244.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[1.69218048E12, 11729.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[1.6921803E12, 57276.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[1.69219752E12, 2293293.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[1.69218786E12, 7818.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[1.69218036E12, 6290.0]], "isOverall": false, "label": "T13 - Q10", "isController": false}, {"data": [[1.69219866E12, 501175.0]], "isOverall": false, "label": "T13 - Q11", "isController": false}, {"data": [[1.69218048E12, 94262.0]], "isOverall": false, "label": "T13 - Q12", "isController": false}, {"data": [[1.69219926E12, 628035.0]], "isOverall": false, "label": "T13 - Q13", "isController": false}, {"data": [[1.69219956E12, 308194.0]], "isOverall": false, "label": "T13 - Q14", "isController": false}, {"data": [[1.69218024E12, 13351.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.69218954E12, 8523836.0]], "isOverall": false, "label": "T13 - Q15", "isController": false}, {"data": [[1.6921803E12, 9551.0]], "isOverall": false, "label": "T13 - Q16", "isController": false}, {"data": [[1.69218828E12, 2385268.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69219596E12, 3545640.0]], "isOverall": false, "label": "T13 - Q18", "isController": false}, {"data": [[1.69219158E12, 2088758.0]], "isOverall": false, "label": "T13 - Q19", "isController": false}, {"data": [[1.69218588E12, 2328356.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69218036E12, 16479.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.6921926E12, 431944.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69218096E12, 481469.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69218042E12, 19476.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69219278E12, 213356.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69218042E12, 28127.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.69218696E12, 196603.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.6921806E12, 151810.0]], "isOverall": false, "label": "T13 - Q21", "isController": false}, {"data": [[1.69219032E12, 458217.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69219236E12, 450875.0]], "isOverall": false, "label": "T13 - Q22", "isController": false}, {"data": [[1.69219986E12, 252464.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69219794E12, 2467865.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69218036E12, 146974.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69219956E12, 1639758.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69219272E12, 356309.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69218564E12, 2198203.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.6921803E12, 5241.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[1.69219272E12, 363760.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[1.6921932E12, 469199.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69218042E12, 7378.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[1.69218048E12, 99418.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69218348E12, 2822030.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.692192E12, 15746.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[1.69219236E12, 225193.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[1.69219284E12, 9180.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[1.6921929E12, 10404.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[1.692192E12, 13487.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[1.69219284E12, 3313.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[1.69218612E12, 339805.0]], "isOverall": false, "label": "T11 - Q3", "isController": false}, {"data": [[1.69218042E12, 8025.0]], "isOverall": false, "label": "T11 - Q2", "isController": false}, {"data": [[1.69219344E12, 317016.0]], "isOverall": false, "label": "T11 - Q5", "isController": false}, {"data": [[1.69219608E12, 29193.0]], "isOverall": false, "label": "T11 - Q4", "isController": false}, {"data": [[1.69218654E12, 367121.0]], "isOverall": false, "label": "T11 - Q7", "isController": false}, {"data": [[1.69218582E12, 2027322.0]], "isOverall": false, "label": "T11 - Q6", "isController": false}, {"data": [[1.69219818E12, 2100290.0]], "isOverall": false, "label": "T11 - Q9", "isController": false}, {"data": [[1.69218042E12, 26193.0]], "isOverall": false, "label": "T11 - Q8", "isController": false}, {"data": [[1.69218858E12, 2106588.0]], "isOverall": false, "label": "T12 - Q1", "isController": false}, {"data": [[1.6921803E12, 5104.0]], "isOverall": false, "label": "T12 - Q2", "isController": false}, {"data": [[1.69219284E12, 6626.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[1.69218042E12, 80453.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[1.69218036E12, 15299.0]], "isOverall": false, "label": "T13 - Q7", "isController": false}, {"data": [[1.69219194E12, 153.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69219194E12, 325680.0]], "isOverall": false, "label": "T13 - Q6", "isController": false}, {"data": [[1.69218036E12, 11866.0]], "isOverall": false, "label": "T13 - Q5", "isController": false}, {"data": [[1.6921803E12, 16243.0]], "isOverall": false, "label": "T13 - Q4", "isController": false}, {"data": [[1.69219818E12, 2221187.0]], "isOverall": false, "label": "T13 - Q9", "isController": false}, {"data": [[1.69218036E12, 15229.0]], "isOverall": false, "label": "T13 - Q8", "isController": false}, {"data": [[1.69218666E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69219284E12, 120754.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[1.69218156E12, 1051878.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[1.69219236E12, 3005.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[1.69219284E12, 8156.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[1.69218054E12, 93884.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[1.6921803E12, 81725.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[1.69219212E12, 111325.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[1.692192E12, 8468866.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[1.69218354E12, 1954057.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[1.69219548E12, 2273791.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69219986E12, 2713.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69218066E12, 141667.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69218582E12, 2264866.0]], "isOverall": false, "label": "T12 - Q9", "isController": false}, {"data": [[1.69218666E12, 1036106.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69218648E12, 28988.0]], "isOverall": false, "label": "T12 - Q7", "isController": false}, {"data": [[1.69219236E12, 441002.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69218648E12, 106055.0]], "isOverall": false, "label": "T12 - Q8", "isController": false}, {"data": [[1.69219194E12, 1595888.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69218702E12, 18933.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69219272E12, 667018.0]], "isOverall": false, "label": "T12 - Q5", "isController": false}, {"data": [[1.6921803E12, 38938.0]], "isOverall": false, "label": "T12 - Q6", "isController": false}, {"data": [[1.69218678E12, 103429.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69218048E12, 5716.0]], "isOverall": false, "label": "T12 - Q3", "isController": false}, {"data": [[1.6921899E12, 2869700.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.6921809E12, 3298.0]], "isOverall": false, "label": "T12 - Q4", "isController": false}, {"data": [[1.69219308E12, 944403.0]], "isOverall": false, "label": "T11 - Q13", "isController": false}, {"data": [[1.69218054E12, 89306.0]], "isOverall": false, "label": "T11 - Q14", "isController": false}, {"data": [[1.69219218E12, 5631630.0]], "isOverall": false, "label": "T11 - Q15", "isController": false}, {"data": [[1.69219866E12, 3294.0]], "isOverall": false, "label": "T11 - Q16", "isController": false}, {"data": [[1.6921803E12, 54835.0]], "isOverall": false, "label": "T11 - Q10", "isController": false}, {"data": [[1.69219866E12, 459783.0]], "isOverall": false, "label": "T11 - Q11", "isController": false}, {"data": [[1.69218192E12, 1375589.0]], "isOverall": false, "label": "T11 - Q12", "isController": false}, {"data": [[1.69218078E12, 276340.0]], "isOverall": false, "label": "T12 - Q21", "isController": false}, {"data": [[1.69218648E12, 2881.0]], "isOverall": false, "label": "T12 - Q22", "isController": false}, {"data": [[1.69218042E12, 95003.0]], "isOverall": false, "label": "T11 - Q18", "isController": false}, {"data": [[1.69219956E12, 932215.0]], "isOverall": false, "label": "T11 - Q19", "isController": false}, {"data": [[1.69218102E12, 375058.0]], "isOverall": false, "label": "T13 - Q3", "isController": false}, {"data": [[1.69218024E12, 9105.0]], "isOverall": false, "label": "T13 - Q2", "isController": false}, {"data": [[1.6921803E12, 47990.0]], "isOverall": false, "label": "T13 - Q1", "isController": false}, {"data": [[1.69218354E12, 2647612.0]], "isOverall": false, "label": "T12 - Q18", "isController": false}, {"data": [[1.69218036E12, 83723.0]], "isOverall": false, "label": "T12 - Q19", "isController": false}, {"data": [[1.69218036E12, 4275.0]], "isOverall": false, "label": "T12 - Q16", "isController": false}, {"data": [[1.69219608E12, 2651523.0]], "isOverall": false, "label": "T11 - Q21", "isController": false}, {"data": [[1.69218654E12, 6714.0]], "isOverall": false, "label": "T11 - Q22", "isController": false}, {"data": [[1.6921809E12, 157427.0]], "isOverall": false, "label": "T12 - Q10", "isController": false}, {"data": [[1.69218036E12, 6331.0]], "isOverall": false, "label": "T12 - Q11", "isController": false}, {"data": [[1.69219206E12, 12236.0]], "isOverall": false, "label": "T12 - Q14", "isController": false}, {"data": [[1.69219206E12, 3433808.0]], "isOverall": false, "label": "T12 - Q15", "isController": false}, {"data": [[1.69218048E12, 96722.0]], "isOverall": false, "label": "T12 - Q12", "isController": false}, {"data": [[1.69218636E12, 523258.0]], "isOverall": false, "label": "T12 - Q13", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69219986E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69218024E12, "maxY": 1261.0, "series": [{"data": [[1.6921833E12, 0.0]], "isOverall": false, "label": "T9 - Q18", "isController": false}, {"data": [[1.6921953E12, 0.0]], "isOverall": false, "label": "T9 - Q19", "isController": false}, {"data": [[1.6921836E12, 0.0]], "isOverall": false, "label": "T9 - Q16", "isController": false}, {"data": [[1.69219008E12, 0.0]], "isOverall": false, "label": "T10 - Q18", "isController": false}, {"data": [[1.69218336E12, 0.0]], "isOverall": false, "label": "T10 - Q19", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T9 - Q10", "isController": false}, {"data": [[1.69219212E12, 0.0]], "isOverall": false, "label": "T10 - Q16", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T9 - Q11", "isController": false}, {"data": [[1.69218564E12, 0.0]], "isOverall": false, "label": "T10 - Q14", "isController": false}, {"data": [[1.69219776E12, 0.0]], "isOverall": false, "label": "T10 - Q15", "isController": false}, {"data": [[1.69219194E12, 1.0]], "isOverall": false, "label": "T10 - Q12", "isController": false}, {"data": [[1.69219212E12, 0.0]], "isOverall": false, "label": "T9 - Q14", "isController": false}, {"data": [[1.6921803E12, 1249.0]], "isOverall": false, "label": "T10 - Q13", "isController": false}, {"data": [[1.69219212E12, 0.0]], "isOverall": false, "label": "T9 - Q15", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T9 - Q12", "isController": false}, {"data": [[1.69219782E12, 0.0]], "isOverall": false, "label": "T10 - Q10", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T9 - Q13", "isController": false}, {"data": [[1.69219212E12, 0.0]], "isOverall": false, "label": "T10 - Q11", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T16 - Q11", "isController": false}, {"data": [[1.69218564E12, 0.0]], "isOverall": false, "label": "T16 - Q10", "isController": false}, {"data": [[1.69218054E12, 0.0]], "isOverall": false, "label": "T17 - Q6", "isController": false}, {"data": [[1.69218528E12, 0.0]], "isOverall": false, "label": "T16 - Q15", "isController": false}, {"data": [[1.69219524E12, 0.0]], "isOverall": false, "label": "T16 - Q14", "isController": false}, {"data": [[1.6921998E12, 0.0]], "isOverall": false, "label": "T17 - Q7", "isController": false}, {"data": [[1.6921932E12, 0.0]], "isOverall": false, "label": "T17 - Q4", "isController": false}, {"data": [[1.69219776E12, 0.0]], "isOverall": false, "label": "T16 - Q13", "isController": false}, {"data": [[1.69218036E12, 1.0]], "isOverall": false, "label": "T17 - Q5", "isController": false}, {"data": [[1.69219932E12, 0.0]], "isOverall": false, "label": "T16 - Q12", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T17 - Q2", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T16 - Q19", "isController": false}, {"data": [[1.69218786E12, 0.0]], "isOverall": false, "label": "T16 - Q18", "isController": false}, {"data": [[1.69219596E12, 1.0]], "isOverall": false, "label": "T17 - Q3", "isController": false}, {"data": [[1.6921824E12, 0.0]], "isOverall": false, "label": "T17 - Q1", "isController": false}, {"data": [[1.69218822E12, 0.0]], "isOverall": false, "label": "T16 - Q16", "isController": false}, {"data": [[1.69219074E12, 0.0]], "isOverall": false, "label": "T9 - Q21", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T9 - Q22", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T10 - Q21", "isController": false}, {"data": [[1.69219782E12, 0.0]], "isOverall": false, "label": "T10 - Q22", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T16 - Q22", "isController": false}, {"data": [[1.6921902E12, 0.0]], "isOverall": false, "label": "T16 - Q21", "isController": false}, {"data": [[1.69218024E12, 1200.0]], "isOverall": false, "label": "T15 - Q2", "isController": false}, {"data": [[1.69218684E12, 0.0]], "isOverall": false, "label": "T15 - Q18", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T15 - Q3", "isController": false}, {"data": [[1.69218444E12, 0.0]], "isOverall": false, "label": "T15 - Q4", "isController": false}, {"data": [[1.6921845E12, 0.0]], "isOverall": false, "label": "T15 - Q5", "isController": false}, {"data": [[1.69219194E12, 0.0]], "isOverall": false, "label": "T15 - Q19", "isController": false}, {"data": [[1.69218894E12, 0.0]], "isOverall": false, "label": "T15 - Q14", "isController": false}, {"data": [[1.69218456E12, 0.0]], "isOverall": false, "label": "T15 - Q13", "isController": false}, {"data": [[1.69218198E12, 0.0]], "isOverall": false, "label": "T15 - Q16", "isController": false}, {"data": [[1.69218102E12, 1.0]], "isOverall": false, "label": "T15 - Q15", "isController": false}, {"data": [[1.69219092E12, 0.0]], "isOverall": false, "label": "T15 - Q1", "isController": false}, {"data": [[1.6921845E12, 0.0]], "isOverall": false, "label": "T15 - Q10", "isController": false}, {"data": [[1.6921803E12, 0.0]], "isOverall": false, "label": "T15 - Q12", "isController": false}, {"data": [[1.6921803E12, 0.0]], "isOverall": false, "label": "T15 - Q11", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T17 - Q8", "isController": false}, {"data": [[1.69219548E12, 0.0]], "isOverall": false, "label": "T17 - Q9", "isController": false}, {"data": [[1.69219452E12, 0.0]], "isOverall": false, "label": "T15 - Q21", "isController": false}, {"data": [[1.69219236E12, 0.0]], "isOverall": false, "label": "T15 - Q22", "isController": false}, {"data": [[1.6921803E12, 1201.0]], "isOverall": false, "label": "T17 - Q19", "isController": false}, {"data": [[1.69219248E12, 0.0]], "isOverall": false, "label": "T17 - Q22", "isController": false}, {"data": [[1.69218378E12, 1.0]], "isOverall": false, "label": "T11 - Q1", "isController": false}, {"data": [[1.692192E12, 0.0]], "isOverall": false, "label": "T17 - Q21", "isController": false}, {"data": [[1.69219956E12, 0.0]], "isOverall": false, "label": "T17 - Q12", "isController": false}, {"data": [[1.6921932E12, 0.0]], "isOverall": false, "label": "T17 - Q11", "isController": false}, {"data": [[1.69219806E12, 0.0]], "isOverall": false, "label": "T17 - Q14", "isController": false}, {"data": [[1.69219602E12, 0.0]], "isOverall": false, "label": "T17 - Q13", "isController": false}, {"data": [[1.69219248E12, 0.0]], "isOverall": false, "label": "T17 - Q16", "isController": false}, {"data": [[1.69219194E12, 0.0]], "isOverall": false, "label": "T17 - Q15", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T17 - Q18", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T15 - Q6", "isController": false}, {"data": [[1.69218126E12, 0.0]], "isOverall": false, "label": "T15 - Q7", "isController": false}, {"data": [[1.69218456E12, 0.0]], "isOverall": false, "label": "T15 - Q8", "isController": false}, {"data": [[1.69219974E12, 0.0]], "isOverall": false, "label": "T17 - Q10", "isController": false}, {"data": [[1.69218396E12, 0.0]], "isOverall": false, "label": "T15 - Q9", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T10 - Q5", "isController": false}, {"data": [[1.69218564E12, 1.0]], "isOverall": false, "label": "T16 - Q8", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T16 - Q7", "isController": false}, {"data": [[1.69218054E12, 0.0]], "isOverall": false, "label": "T10 - Q6", "isController": false}, {"data": [[1.6921809E12, 0.0]], "isOverall": false, "label": "T10 - Q7", "isController": false}, {"data": [[1.69219242E12, 0.0]], "isOverall": false, "label": "T16 - Q9", "isController": false}, {"data": [[1.6921926E12, 0.0]], "isOverall": false, "label": "T10 - Q8", "isController": false}, {"data": [[1.69219218E12, 0.0]], "isOverall": false, "label": "T10 - Q1", "isController": false}, {"data": [[1.69218144E12, 0.0]], "isOverall": false, "label": "T10 - Q2", "isController": false}, {"data": [[1.69218798E12, 0.0]], "isOverall": false, "label": "T10 - Q3", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T10 - Q4", "isController": false}, {"data": [[1.69218786E12, 0.0]], "isOverall": false, "label": "T10 - Q9", "isController": false}, {"data": [[1.6921995E12, 0.0]], "isOverall": false, "label": "T16 - Q2", "isController": false}, {"data": [[1.69219194E12, 0.0]], "isOverall": false, "label": "T16 - Q1", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T16 - Q4", "isController": false}, {"data": [[1.6921803E12, 1209.0]], "isOverall": false, "label": "T16 - Q3", "isController": false}, {"data": [[1.69219752E12, 0.0]], "isOverall": false, "label": "T16 - Q6", "isController": false}, {"data": [[1.69218786E12, 0.0]], "isOverall": false, "label": "T16 - Q5", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T13 - Q10", "isController": false}, {"data": [[1.69219866E12, 0.0]], "isOverall": false, "label": "T13 - Q11", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T13 - Q12", "isController": false}, {"data": [[1.69219926E12, 0.0]], "isOverall": false, "label": "T13 - Q13", "isController": false}, {"data": [[1.69219956E12, 0.0]], "isOverall": false, "label": "T13 - Q14", "isController": false}, {"data": [[1.69218024E12, 1227.0]], "isOverall": false, "label": "T9 - Q2", "isController": false}, {"data": [[1.69218954E12, 0.0]], "isOverall": false, "label": "T13 - Q15", "isController": false}, {"data": [[1.6921803E12, 0.0]], "isOverall": false, "label": "T13 - Q16", "isController": false}, {"data": [[1.69218828E12, 1.0]], "isOverall": false, "label": "T9 - Q1", "isController": false}, {"data": [[1.69219596E12, 0.0]], "isOverall": false, "label": "T13 - Q18", "isController": false}, {"data": [[1.69219158E12, 0.0]], "isOverall": false, "label": "T13 - Q19", "isController": false}, {"data": [[1.69218588E12, 0.0]], "isOverall": false, "label": "T9 - Q9", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T9 - Q8", "isController": false}, {"data": [[1.6921926E12, 0.0]], "isOverall": false, "label": "T9 - Q7", "isController": false}, {"data": [[1.69218096E12, 1.0]], "isOverall": false, "label": "T9 - Q6", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T9 - Q5", "isController": false}, {"data": [[1.69219278E12, 0.0]], "isOverall": false, "label": "T9 - Q4", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T9 - Q3", "isController": false}, {"data": [[1.69218696E12, 0.0]], "isOverall": false, "label": "T1 - Q11", "isController": false}, {"data": [[1.6921806E12, 0.0]], "isOverall": false, "label": "T13 - Q21", "isController": false}, {"data": [[1.69219032E12, 0.0]], "isOverall": false, "label": "T1 - Q10", "isController": false}, {"data": [[1.69219236E12, 0.0]], "isOverall": false, "label": "T13 - Q22", "isController": false}, {"data": [[1.69219986E12, 0.0]], "isOverall": false, "label": "T1 - Q13", "isController": false}, {"data": [[1.69219794E12, 0.0]], "isOverall": false, "label": "T1 - Q12", "isController": false}, {"data": [[1.69218036E12, 1229.0]], "isOverall": false, "label": "T1 - Q15", "isController": false}, {"data": [[1.69219956E12, 0.0]], "isOverall": false, "label": "T1 - Q14", "isController": false}, {"data": [[1.69219272E12, 0.0]], "isOverall": false, "label": "T1 - Q22", "isController": false}, {"data": [[1.69218564E12, 0.0]], "isOverall": false, "label": "T1 - Q21", "isController": false}, {"data": [[1.6921803E12, 0.0]], "isOverall": false, "label": "T14 - Q4", "isController": false}, {"data": [[1.69219272E12, 0.0]], "isOverall": false, "label": "T14 - Q3", "isController": false}, {"data": [[1.6921932E12, 0.0]], "isOverall": false, "label": "T1 - Q16", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T14 - Q2", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T1 - Q19", "isController": false}, {"data": [[1.69218348E12, 1.0]], "isOverall": false, "label": "T1 - Q18", "isController": false}, {"data": [[1.692192E12, 0.0]], "isOverall": false, "label": "T14 - Q1", "isController": false}, {"data": [[1.69219236E12, 0.0]], "isOverall": false, "label": "T14 - Q9", "isController": false}, {"data": [[1.69219284E12, 0.0]], "isOverall": false, "label": "T14 - Q8", "isController": false}, {"data": [[1.6921929E12, 0.0]], "isOverall": false, "label": "T14 - Q7", "isController": false}, {"data": [[1.692192E12, 0.0]], "isOverall": false, "label": "T14 - Q6", "isController": false}, {"data": [[1.69219284E12, 0.0]], "isOverall": false, "label": "T14 - Q5", "isController": false}, {"data": [[1.69218612E12, 0.0]], "isOverall": false, "label": "T11 - Q3", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T11 - Q2", "isController": false}, {"data": [[1.69219344E12, 0.0]], "isOverall": false, "label": "T11 - Q5", "isController": false}, {"data": [[1.69219608E12, 0.0]], "isOverall": false, "label": "T11 - Q4", "isController": false}, {"data": [[1.69218654E12, 0.0]], "isOverall": false, "label": "T11 - Q7", "isController": false}, {"data": [[1.69218582E12, 1.0]], "isOverall": false, "label": "T11 - Q6", "isController": false}, {"data": [[1.69219818E12, 0.0]], "isOverall": false, "label": "T11 - Q9", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T11 - Q8", "isController": false}, {"data": [[1.69218858E12, 0.0]], "isOverall": false, "label": "T12 - Q1", "isController": false}, {"data": [[1.6921803E12, 0.0]], "isOverall": false, "label": "T12 - Q2", "isController": false}, {"data": [[1.69219284E12, 0.0]], "isOverall": false, "label": "T14 - Q22", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T14 - Q21", "isController": false}, {"data": [[1.69218036E12, 1.0]], "isOverall": false, "label": "T13 - Q7", "isController": false}, {"data": [[1.69219194E12, 0.0]], "isOverall": false, "label": "T1 - RF2", "isController": false}, {"data": [[1.69219194E12, 0.0]], "isOverall": false, "label": "T13 - Q6", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T13 - Q5", "isController": false}, {"data": [[1.6921803E12, 0.0]], "isOverall": false, "label": "T13 - Q4", "isController": false}, {"data": [[1.69219818E12, 0.0]], "isOverall": false, "label": "T13 - Q9", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T13 - Q8", "isController": false}, {"data": [[1.69218666E12, 0.0]], "isOverall": false, "label": "T1 - RF1", "isController": false}, {"data": [[1.69219284E12, 0.0]], "isOverall": false, "label": "T14 - Q13", "isController": false}, {"data": [[1.69218156E12, 0.0]], "isOverall": false, "label": "T14 - Q12", "isController": false}, {"data": [[1.69219236E12, 0.0]], "isOverall": false, "label": "T14 - Q11", "isController": false}, {"data": [[1.69219284E12, 0.0]], "isOverall": false, "label": "T14 - Q10", "isController": false}, {"data": [[1.69218054E12, 0.0]], "isOverall": false, "label": "T14 - Q19", "isController": false}, {"data": [[1.6921803E12, 1199.0]], "isOverall": false, "label": "T14 - Q18", "isController": false}, {"data": [[1.69219212E12, 0.0]], "isOverall": false, "label": "T14 - Q16", "isController": false}, {"data": [[1.692192E12, 0.0]], "isOverall": false, "label": "T14 - Q15", "isController": false}, {"data": [[1.69218354E12, 0.0]], "isOverall": false, "label": "T14 - Q14", "isController": false}, {"data": [[1.69219548E12, 0.0]], "isOverall": false, "label": "T1 - Q1", "isController": false}, {"data": [[1.69219986E12, 0.0]], "isOverall": false, "label": "T1 - Q2", "isController": false}, {"data": [[1.69218066E12, 0.0]], "isOverall": false, "label": "T1 - Q3", "isController": false}, {"data": [[1.69218582E12, 0.0]], "isOverall": false, "label": "T12 - Q9", "isController": false}, {"data": [[1.69218666E12, 0.0]], "isOverall": false, "label": "T1 - Q4", "isController": false}, {"data": [[1.69218648E12, 1.0]], "isOverall": false, "label": "T12 - Q7", "isController": false}, {"data": [[1.69219236E12, 0.0]], "isOverall": false, "label": "T1 - Q5", "isController": false}, {"data": [[1.69218648E12, 0.0]], "isOverall": false, "label": "T12 - Q8", "isController": false}, {"data": [[1.69219194E12, 0.0]], "isOverall": false, "label": "T1 - Q6", "isController": false}, {"data": [[1.69218702E12, 0.0]], "isOverall": false, "label": "T1 - Q7", "isController": false}, {"data": [[1.69219272E12, 0.0]], "isOverall": false, "label": "T12 - Q5", "isController": false}, {"data": [[1.6921803E12, 1209.0]], "isOverall": false, "label": "T12 - Q6", "isController": false}, {"data": [[1.69218678E12, 0.0]], "isOverall": false, "label": "T1 - Q8", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T12 - Q3", "isController": false}, {"data": [[1.6921899E12, 0.0]], "isOverall": false, "label": "T1 - Q9", "isController": false}, {"data": [[1.6921809E12, 0.0]], "isOverall": false, "label": "T12 - Q4", "isController": false}, {"data": [[1.69219308E12, 0.0]], "isOverall": false, "label": "T11 - Q13", "isController": false}, {"data": [[1.69218054E12, 0.0]], "isOverall": false, "label": "T11 - Q14", "isController": false}, {"data": [[1.69219218E12, 0.0]], "isOverall": false, "label": "T11 - Q15", "isController": false}, {"data": [[1.69219866E12, 0.0]], "isOverall": false, "label": "T11 - Q16", "isController": false}, {"data": [[1.6921803E12, 1261.0]], "isOverall": false, "label": "T11 - Q10", "isController": false}, {"data": [[1.69219866E12, 0.0]], "isOverall": false, "label": "T11 - Q11", "isController": false}, {"data": [[1.69218192E12, 0.0]], "isOverall": false, "label": "T11 - Q12", "isController": false}, {"data": [[1.69218078E12, 0.0]], "isOverall": false, "label": "T12 - Q21", "isController": false}, {"data": [[1.69218648E12, 0.0]], "isOverall": false, "label": "T12 - Q22", "isController": false}, {"data": [[1.69218042E12, 0.0]], "isOverall": false, "label": "T11 - Q18", "isController": false}, {"data": [[1.69219956E12, 0.0]], "isOverall": false, "label": "T11 - Q19", "isController": false}, {"data": [[1.69218102E12, 0.0]], "isOverall": false, "label": "T13 - Q3", "isController": false}, {"data": [[1.69218024E12, 1207.0]], "isOverall": false, "label": "T13 - Q2", "isController": false}, {"data": [[1.6921803E12, 1.0]], "isOverall": false, "label": "T13 - Q1", "isController": false}, {"data": [[1.69218354E12, 0.0]], "isOverall": false, "label": "T12 - Q18", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T12 - Q19", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T12 - Q16", "isController": false}, {"data": [[1.69219608E12, 0.0]], "isOverall": false, "label": "T11 - Q21", "isController": false}, {"data": [[1.69218654E12, 0.0]], "isOverall": false, "label": "T11 - Q22", "isController": false}, {"data": [[1.6921809E12, 0.0]], "isOverall": false, "label": "T12 - Q10", "isController": false}, {"data": [[1.69218036E12, 0.0]], "isOverall": false, "label": "T12 - Q11", "isController": false}, {"data": [[1.69219206E12, 0.0]], "isOverall": false, "label": "T12 - Q14", "isController": false}, {"data": [[1.69219206E12, 0.0]], "isOverall": false, "label": "T12 - Q15", "isController": false}, {"data": [[1.69218048E12, 0.0]], "isOverall": false, "label": "T12 - Q12", "isController": false}, {"data": [[1.69218636E12, 0.0]], "isOverall": false, "label": "T12 - Q13", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69219986E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 153.0, "minX": 1.69218024E12, "maxY": 9549266.0, "series": [{"data": [[1.69218456E12, 51483.0], [1.69219344E12, 317016.0], [1.69218054E12, 93884.0], [1.69218396E12, 1943886.0], [1.69219284E12, 120754.0], [1.69218336E12, 1930766.0], [1.69218156E12, 1051878.0], [1.69219608E12, 2651523.0], [1.69219932E12, 1607211.0], [1.69218678E12, 103429.0], [1.69219548E12, 2288873.0], [1.69218036E12, 146975.0], [1.69218198E12, 722119.0], [1.692192E12, 8468867.0], [1.69218798E12, 140822.0], [1.6921902E12, 1956259.0], [1.69218696E12, 196678.0], [1.69218096E12, 481469.0], [1.69218636E12, 523258.0], [1.69218858E12, 2106588.0], [1.69219524E12, 2803090.0], [1.6921995E12, 128272.0], [1.69219242E12, 524509.0], [1.69218078E12, 276340.0], [1.6921836E12, 260365.0], [1.69219248E12, 459275.0], [1.69219956E12, 1639758.0], [1.69218048E12, 111270.0], [1.69218684E12, 2260252.0], [1.69219794E12, 2467865.0], [1.6921803E12, 81725.0], [1.6921929E12, 10404.0], [1.69218582E12, 2264866.0], [1.69219452E12, 2174333.0], [1.6921809E12, 357264.0], [1.69219974E12, 158496.0], [1.69218378E12, 1887028.0], [1.69218354E12, 2647612.0], [1.69218702E12, 18933.0], [1.69218192E12, 1375589.0], [1.69219206E12, 3433808.0], [1.6921953E12, 2534036.0], [1.69218822E12, 381013.0], [1.69219308E12, 944403.0], [1.69219752E12, 2293293.0], [1.69218648E12, 106056.0], [1.69218144E12, 521188.0], [1.69219194E12, 9549266.0], [1.69218588E12, 2328356.0], [1.69219032E12, 458218.0], [1.69218126E12, 242660.0], [1.69218348E12, 2822030.0], [1.69219092E12, 2018002.0], [1.69218024E12, 13353.0], [1.69218666E12, 1036107.0], [1.69218828E12, 2385268.0], [1.6921899E12, 2869700.0], [1.69218444E12, 484072.0], [1.69219776E12, 5157589.0], [1.69218066E12, 141667.0], [1.69219272E12, 667018.0], [1.6921998E12, 45403.0], [1.69219212E12, 1326090.0], [1.6921833E12, 2328469.0], [1.69218564E12, 2268149.0], [1.69218786E12, 2220050.0], [1.69219008E12, 2098211.0], [1.69219596E12, 3545640.0], [1.69219818E12, 2221187.0], [1.69219926E12, 628035.0], [1.69219602E12, 76931.0], [1.69219218E12, 5631630.0], [1.69218654E12, 367122.0], [1.69219986E12, 252464.0], [1.6921824E12, 1867577.0], [1.6921806E12, 151810.0], [1.69219158E12, 2088758.0], [1.6921932E12, 740402.0], [1.6921845E12, 48452.0], [1.69219806E12, 2037594.0], [1.6921926E12, 435578.0], [1.69219866E12, 501178.0], [1.69218612E12, 339806.0], [1.69218102E12, 629393.0], [1.69218894E12, 2098647.0], [1.69219782E12, 48850.0], [1.69219236E12, 450875.0], [1.69218954E12, 8523836.0], [1.69218528E12, 4795462.0], [1.69219074E12, 2482165.0], [1.69219278E12, 213356.0], [1.69218042E12, 95003.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69218456E12, 51483.0], [1.69219344E12, 317016.0], [1.69218054E12, 93884.0], [1.69218396E12, 1943886.0], [1.69219284E12, 120754.0], [1.69218336E12, 1930766.0], [1.69218156E12, 1051878.0], [1.69219608E12, 2651523.0], [1.69219932E12, 1607211.0], [1.69218678E12, 103429.0], [1.69219548E12, 2288873.0], [1.69218036E12, 102698.60000000005], [1.69218198E12, 722119.0], [1.692192E12, 8468867.0], [1.69218798E12, 140822.0], [1.6921902E12, 1956259.0], [1.69218696E12, 196678.0], [1.69218096E12, 481469.0], [1.69218636E12, 523258.0], [1.69218858E12, 2106588.0], [1.69219524E12, 2803090.0], [1.6921995E12, 128272.0], [1.69219242E12, 524509.0], [1.69218078E12, 276340.0], [1.6921836E12, 260365.0], [1.69219248E12, 459275.0], [1.69219956E12, 1639758.0], [1.69218048E12, 109299.6], [1.69218684E12, 2260252.0], [1.69219794E12, 2467865.0], [1.6921803E12, 80696.2], [1.6921929E12, 10404.0], [1.69218582E12, 2264866.0], [1.69219452E12, 2174333.0], [1.6921809E12, 357264.0], [1.69219974E12, 158496.0], [1.69218378E12, 1887028.0], [1.69218354E12, 2647612.0], [1.69218702E12, 18933.0], [1.69218192E12, 1375589.0], [1.69219206E12, 3433808.0], [1.6921953E12, 2534036.0], [1.69218822E12, 381013.0], [1.69219308E12, 944403.0], [1.69219752E12, 2293293.0], [1.69218648E12, 106056.0], [1.69218144E12, 521188.0], [1.69219194E12, 9549266.0], [1.69218588E12, 2328356.0], [1.69219032E12, 458218.0], [1.69218126E12, 242660.0], [1.69218348E12, 2822030.0], [1.69219092E12, 2018002.0], [1.69218024E12, 13353.0], [1.69218666E12, 1036107.0], [1.69218828E12, 2385268.0], [1.6921899E12, 2869700.0], [1.69218444E12, 484072.0], [1.69219776E12, 5157589.0], [1.69218066E12, 141667.0], [1.69219272E12, 667018.0], [1.6921998E12, 45403.0], [1.69219212E12, 1326090.0], [1.6921833E12, 2328469.0], [1.69218564E12, 2268149.0], [1.69218786E12, 2220050.0], [1.69219008E12, 2098211.0], [1.69219596E12, 3545640.0], [1.69219818E12, 2221187.0], [1.69219926E12, 628035.0], [1.69219602E12, 76931.0], [1.69219218E12, 5631630.0], [1.69218654E12, 367122.0], [1.69219986E12, 252464.0], [1.6921824E12, 1867577.0], [1.6921806E12, 151810.0], [1.69219158E12, 2088758.0], [1.6921932E12, 740402.0], [1.6921845E12, 48452.0], [1.69219806E12, 2037594.0], [1.6921926E12, 435578.0], [1.69219866E12, 501178.0], [1.69218612E12, 339806.0], [1.69218102E12, 629393.0], [1.69218894E12, 2098647.0], [1.69219782E12, 48850.0], [1.69219236E12, 450875.0], [1.69218954E12, 8523836.0], [1.69218528E12, 4795462.0], [1.69219074E12, 2482165.0], [1.69219278E12, 213356.0], [1.69218042E12, 92834.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69218456E12, 51483.0], [1.69219344E12, 317016.0], [1.69218054E12, 93884.0], [1.69218396E12, 1943886.0], [1.69219284E12, 120754.0], [1.69218336E12, 1930766.0], [1.69218156E12, 1051878.0], [1.69219608E12, 2651523.0], [1.69219932E12, 1607211.0], [1.69218678E12, 103429.0], [1.69219548E12, 2288873.0], [1.69218036E12, 146975.0], [1.69218198E12, 722119.0], [1.692192E12, 8468867.0], [1.69218798E12, 140822.0], [1.6921902E12, 1956259.0], [1.69218696E12, 196678.0], [1.69218096E12, 481469.0], [1.69218636E12, 523258.0], [1.69218858E12, 2106588.0], [1.69219524E12, 2803090.0], [1.6921995E12, 128272.0], [1.69219242E12, 524509.0], [1.69218078E12, 276340.0], [1.6921836E12, 260365.0], [1.69219248E12, 459275.0], [1.69219956E12, 1639758.0], [1.69218048E12, 111270.0], [1.69218684E12, 2260252.0], [1.69219794E12, 2467865.0], [1.6921803E12, 81725.0], [1.6921929E12, 10404.0], [1.69218582E12, 2264866.0], [1.69219452E12, 2174333.0], [1.6921809E12, 357264.0], [1.69219974E12, 158496.0], [1.69218378E12, 1887028.0], [1.69218354E12, 2647612.0], [1.69218702E12, 18933.0], [1.69218192E12, 1375589.0], [1.69219206E12, 3433808.0], [1.6921953E12, 2534036.0], [1.69218822E12, 381013.0], [1.69219308E12, 944403.0], [1.69219752E12, 2293293.0], [1.69218648E12, 106056.0], [1.69218144E12, 521188.0], [1.69219194E12, 9549266.0], [1.69218588E12, 2328356.0], [1.69219032E12, 458218.0], [1.69218126E12, 242660.0], [1.69218348E12, 2822030.0], [1.69219092E12, 2018002.0], [1.69218024E12, 13353.0], [1.69218666E12, 1036107.0], [1.69218828E12, 2385268.0], [1.6921899E12, 2869700.0], [1.69218444E12, 484072.0], [1.69219776E12, 5157589.0], [1.69218066E12, 141667.0], [1.69219272E12, 667018.0], [1.6921998E12, 45403.0], [1.69219212E12, 1326090.0], [1.6921833E12, 2328469.0], [1.69218564E12, 2268149.0], [1.69218786E12, 2220050.0], [1.69219008E12, 2098211.0], [1.69219596E12, 3545640.0], [1.69219818E12, 2221187.0], [1.69219926E12, 628035.0], [1.69219602E12, 76931.0], [1.69219218E12, 5631630.0], [1.69218654E12, 367122.0], [1.69219986E12, 252464.0], [1.6921824E12, 1867577.0], [1.6921806E12, 151810.0], [1.69219158E12, 2088758.0], [1.6921932E12, 740402.0], [1.6921845E12, 48452.0], [1.69219806E12, 2037594.0], [1.6921926E12, 435578.0], [1.69219866E12, 501178.0], [1.69218612E12, 339806.0], [1.69218102E12, 629393.0], [1.69218894E12, 2098647.0], [1.69219782E12, 48850.0], [1.69219236E12, 450875.0], [1.69218954E12, 8523836.0], [1.69218528E12, 4795462.0], [1.69219074E12, 2482165.0], [1.69219278E12, 213356.0], [1.69218042E12, 95003.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69218456E12, 51483.0], [1.69219344E12, 317016.0], [1.69218054E12, 93884.0], [1.69218396E12, 1943886.0], [1.69219284E12, 120754.0], [1.69218336E12, 1930766.0], [1.69218156E12, 1051878.0], [1.69219608E12, 2651523.0], [1.69219932E12, 1607211.0], [1.69218678E12, 103429.0], [1.69219548E12, 2288873.0], [1.69218036E12, 146975.0], [1.69218198E12, 722119.0], [1.692192E12, 8468867.0], [1.69218798E12, 140822.0], [1.6921902E12, 1956259.0], [1.69218696E12, 196678.0], [1.69218096E12, 481469.0], [1.69218636E12, 523258.0], [1.69218858E12, 2106588.0], [1.69219524E12, 2803090.0], [1.6921995E12, 128272.0], [1.69219242E12, 524509.0], [1.69218078E12, 276340.0], [1.6921836E12, 260365.0], [1.69219248E12, 459275.0], [1.69219956E12, 1639758.0], [1.69218048E12, 111270.0], [1.69218684E12, 2260252.0], [1.69219794E12, 2467865.0], [1.6921803E12, 81725.0], [1.6921929E12, 10404.0], [1.69218582E12, 2264866.0], [1.69219452E12, 2174333.0], [1.6921809E12, 357264.0], [1.69219974E12, 158496.0], [1.69218378E12, 1887028.0], [1.69218354E12, 2647612.0], [1.69218702E12, 18933.0], [1.69218192E12, 1375589.0], [1.69219206E12, 3433808.0], [1.6921953E12, 2534036.0], [1.69218822E12, 381013.0], [1.69219308E12, 944403.0], [1.69219752E12, 2293293.0], [1.69218648E12, 106056.0], [1.69218144E12, 521188.0], [1.69219194E12, 9549266.0], [1.69218588E12, 2328356.0], [1.69219032E12, 458218.0], [1.69218126E12, 242660.0], [1.69218348E12, 2822030.0], [1.69219092E12, 2018002.0], [1.69218024E12, 13353.0], [1.69218666E12, 1036107.0], [1.69218828E12, 2385268.0], [1.6921899E12, 2869700.0], [1.69218444E12, 484072.0], [1.69219776E12, 5157589.0], [1.69218066E12, 141667.0], [1.69219272E12, 667018.0], [1.6921998E12, 45403.0], [1.69219212E12, 1326090.0], [1.6921833E12, 2328469.0], [1.69218564E12, 2268149.0], [1.69218786E12, 2220050.0], [1.69219008E12, 2098211.0], [1.69219596E12, 3545640.0], [1.69219818E12, 2221187.0], [1.69219926E12, 628035.0], [1.69219602E12, 76931.0], [1.69219218E12, 5631630.0], [1.69218654E12, 367122.0], [1.69219986E12, 252464.0], [1.6921824E12, 1867577.0], [1.6921806E12, 151810.0], [1.69219158E12, 2088758.0], [1.6921932E12, 740402.0], [1.6921845E12, 48452.0], [1.69219806E12, 2037594.0], [1.6921926E12, 435578.0], [1.69219866E12, 501178.0], [1.69218612E12, 339806.0], [1.69218102E12, 629393.0], [1.69218894E12, 2098647.0], [1.69219782E12, 48850.0], [1.69219236E12, 450875.0], [1.69218954E12, 8523836.0], [1.69218528E12, 4795462.0], [1.69219074E12, 2482165.0], [1.69219278E12, 213356.0], [1.69218042E12, 95003.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69218456E12, 16996.0], [1.69219344E12, 317016.0], [1.69218054E12, 73372.0], [1.69218396E12, 1943886.0], [1.69219284E12, 3313.0], [1.69218336E12, 1930766.0], [1.69218156E12, 1051878.0], [1.69219608E12, 29193.0], [1.69219932E12, 1607211.0], [1.69218678E12, 103429.0], [1.69219548E12, 2273792.0], [1.69218036E12, 4283.0], [1.69218198E12, 722119.0], [1.692192E12, 13487.0], [1.69218798E12, 140822.0], [1.6921902E12, 1956259.0], [1.69218696E12, 196678.0], [1.69218096E12, 481469.0], [1.69218636E12, 523258.0], [1.69218858E12, 2106588.0], [1.69219524E12, 2803090.0], [1.6921995E12, 128272.0], [1.69219242E12, 524509.0], [1.69218078E12, 276340.0], [1.6921836E12, 260365.0], [1.69219248E12, 3247.0], [1.69219956E12, 308194.0], [1.69218048E12, 5717.0], [1.69218684E12, 2260252.0], [1.69219794E12, 2467865.0], [1.6921803E12, 5105.0], [1.6921929E12, 10404.0], [1.69218582E12, 2027322.0], [1.69219452E12, 2174333.0], [1.6921809E12, 3299.0], [1.69219974E12, 158496.0], [1.69218378E12, 1887028.0], [1.69218354E12, 1954057.0], [1.69218702E12, 18933.0], [1.69218192E12, 1375589.0], [1.69219206E12, 12236.0], [1.6921953E12, 2534036.0], [1.69218822E12, 381013.0], [1.69219308E12, 944403.0], [1.69219752E12, 2293293.0], [1.69218648E12, 2881.0], [1.69218144E12, 521188.0], [1.69219194E12, 153.0], [1.69218588E12, 2328356.0], [1.69219032E12, 458218.0], [1.69218126E12, 242660.0], [1.69218348E12, 2822030.0], [1.69219092E12, 2018002.0], [1.69218024E12, 8280.0], [1.69218666E12, 1036107.0], [1.69218828E12, 2385268.0], [1.6921899E12, 2869700.0], [1.69218444E12, 484072.0], [1.69219776E12, 194640.0], [1.69218066E12, 141667.0], [1.69219272E12, 356309.0], [1.6921998E12, 45403.0], [1.69219212E12, 9074.0], [1.6921833E12, 2328469.0], [1.69218564E12, 3291.0], [1.69218786E12, 7818.0], [1.69219008E12, 2098211.0], [1.69219596E12, 427115.0], [1.69219818E12, 2100290.0], [1.69219926E12, 628035.0], [1.69219602E12, 76931.0], [1.69219218E12, 37650.0], [1.69218654E12, 6714.0], [1.69219986E12, 2714.0], [1.6921824E12, 1867577.0], [1.6921806E12, 151810.0], [1.69219158E12, 2088758.0], [1.6921932E12, 5260.0], [1.6921845E12, 6852.0], [1.69219806E12, 2037594.0], [1.6921926E12, 431944.0], [1.69219866E12, 3298.0], [1.69218612E12, 339806.0], [1.69218102E12, 375059.0], [1.69218894E12, 2098647.0], [1.69219782E12, 33246.0], [1.69219236E12, 3015.0], [1.69218954E12, 8523836.0], [1.69218528E12, 4795462.0], [1.69219074E12, 2482165.0], [1.69219278E12, 213356.0], [1.69218042E12, 5600.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69218456E12, 34239.5], [1.69219344E12, 317016.0], [1.69218054E12, 84968.5], [1.69218396E12, 1943886.0], [1.69219284E12, 8156.0], [1.69218336E12, 1930766.0], [1.69218156E12, 1051878.0], [1.69219608E12, 1340358.0], [1.69219932E12, 1607211.0], [1.69218678E12, 103429.0], [1.69219548E12, 2281332.5], [1.69218036E12, 14260.0], [1.69218198E12, 722119.0], [1.692192E12, 39269.5], [1.69218798E12, 140822.0], [1.6921902E12, 1956259.0], [1.69218696E12, 196678.0], [1.69218096E12, 481469.0], [1.69218636E12, 523258.0], [1.69218858E12, 2106588.0], [1.69219524E12, 2803090.0], [1.6921995E12, 128272.0], [1.69219242E12, 524509.0], [1.69218078E12, 276340.0], [1.6921836E12, 260365.0], [1.69219248E12, 231261.0], [1.69219956E12, 1232976.0], [1.69218048E12, 63373.0], [1.69218684E12, 2260252.0], [1.69219794E12, 2467865.0], [1.6921803E12, 47991.0], [1.6921929E12, 10404.0], [1.69218582E12, 2146094.0], [1.69219452E12, 2174333.0], [1.6921809E12, 157428.0], [1.69219974E12, 158496.0], [1.69218378E12, 1887028.0], [1.69218354E12, 2300834.5], [1.69218702E12, 18933.0], [1.69218192E12, 1375589.0], [1.69219206E12, 1723022.0], [1.6921953E12, 2534036.0], [1.69218822E12, 381013.0], [1.69219308E12, 944403.0], [1.69219752E12, 2293293.0], [1.69218648E12, 28989.0], [1.69218144E12, 521188.0], [1.69219194E12, 1595888.0], [1.69218588E12, 2328356.0], [1.69219032E12, 458218.0], [1.69218126E12, 242660.0], [1.69218348E12, 2822030.0], [1.69219092E12, 2018002.0], [1.69218024E12, 9108.0], [1.69218666E12, 1036107.0], [1.69218828E12, 2385268.0], [1.6921899E12, 2869700.0], [1.69218444E12, 484072.0], [1.69219776E12, 2676114.5], [1.69218066E12, 141667.0], [1.69219272E12, 363760.0], [1.6921998E12, 45403.0], [1.69219212E12, 111333.0], [1.6921833E12, 2328469.0], [1.69218564E12, 1281968.5], [1.69218786E12, 2202257.0], [1.69219008E12, 2098211.0], [1.69219596E12, 1986377.5], [1.69219818E12, 2160738.5], [1.69219926E12, 628035.0], [1.69219602E12, 76931.0], [1.69219218E12, 2834640.0], [1.69218654E12, 186918.0], [1.69219986E12, 127589.0], [1.6921824E12, 1867577.0], [1.6921806E12, 151810.0], [1.69219158E12, 2088758.0], [1.6921932E12, 469206.0], [1.6921845E12, 27652.0], [1.69219806E12, 2037594.0], [1.6921926E12, 433761.0], [1.69219866E12, 459787.0], [1.69218612E12, 339806.0], [1.69218102E12, 502226.0], [1.69218894E12, 2098647.0], [1.69219782E12, 41048.0], [1.69219236E12, 429194.0], [1.69218954E12, 8523836.0], [1.69218528E12, 4795462.0], [1.69219074E12, 2482165.0], [1.69219278E12, 213356.0], [1.69218042E12, 22835.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69219986E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 178.0, "minX": 1.0, "maxY": 195659.0, "series": [{"data": [[1.0, 195659.0], [2.0, 57278.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 178.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 195621.5, "series": [{"data": [[1.0, 195621.5], [2.0, 57276.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69218024E12, "maxY": 0.26666666666666666, "series": [{"data": [[1.69218456E12, 0.03333333333333333], [1.69219344E12, 0.016666666666666666], [1.69218054E12, 0.06666666666666667], [1.69218396E12, 0.016666666666666666], [1.69219284E12, 0.08333333333333333], [1.69218336E12, 0.016666666666666666], [1.69218156E12, 0.016666666666666666], [1.69219608E12, 0.03333333333333333], [1.69219932E12, 0.016666666666666666], [1.69218678E12, 0.016666666666666666], [1.69219548E12, 0.03333333333333333], [1.69218036E12, 0.26666666666666666], [1.69218198E12, 0.016666666666666666], [1.692192E12, 0.06666666666666667], [1.69218798E12, 0.016666666666666666], [1.6921902E12, 0.016666666666666666], [1.69218696E12, 0.016666666666666666], [1.69218096E12, 0.016666666666666666], [1.69218636E12, 0.016666666666666666], [1.69218858E12, 0.016666666666666666], [1.69219524E12, 0.016666666666666666], [1.69219242E12, 0.016666666666666666], [1.69218078E12, 0.016666666666666666], [1.6921836E12, 0.016666666666666666], [1.69219248E12, 0.03333333333333333], [1.69219956E12, 0.03333333333333333], [1.69218048E12, 0.18333333333333332], [1.69218684E12, 0.016666666666666666], [1.69219794E12, 0.016666666666666666], [1.6921803E12, 0.21666666666666667], [1.69218582E12, 0.03333333333333333], [1.6921809E12, 0.05], [1.69219974E12, 0.016666666666666666], [1.69218378E12, 0.016666666666666666], [1.69218354E12, 0.03333333333333333], [1.69218702E12, 0.016666666666666666], [1.69218192E12, 0.016666666666666666], [1.69219206E12, 0.03333333333333333], [1.69218822E12, 0.016666666666666666], [1.69219308E12, 0.016666666666666666], [1.69219752E12, 0.016666666666666666], [1.69218648E12, 0.05], [1.69218144E12, 0.016666666666666666], [1.69219194E12, 0.11666666666666667], [1.69218588E12, 0.016666666666666666], [1.69219032E12, 0.016666666666666666], [1.69218126E12, 0.016666666666666666], [1.69218348E12, 0.016666666666666666], [1.69219092E12, 0.016666666666666666], [1.69218024E12, 0.21666666666666667], [1.69218666E12, 0.03333333333333333], [1.6921899E12, 0.016666666666666666], [1.69218828E12, 0.016666666666666666], [1.69218444E12, 0.016666666666666666], [1.69219776E12, 0.03333333333333333], [1.69218066E12, 0.016666666666666666], [1.69219272E12, 0.03333333333333333], [1.69219212E12, 0.08333333333333333], [1.6921833E12, 0.016666666666666666], [1.69218564E12, 0.06666666666666667], [1.69218786E12, 0.05], [1.69219008E12, 0.016666666666666666], [1.69219596E12, 0.03333333333333333], [1.69219818E12, 0.03333333333333333], [1.69219926E12, 0.016666666666666666], [1.69219602E12, 0.016666666666666666], [1.69219218E12, 0.03333333333333333], [1.69218654E12, 0.03333333333333333], [1.69219986E12, 0.016666666666666666], [1.6921824E12, 0.016666666666666666], [1.6921806E12, 0.016666666666666666], [1.69219158E12, 0.016666666666666666], [1.6921932E12, 0.05], [1.6921845E12, 0.03333333333333333], [1.69219806E12, 0.016666666666666666], [1.6921926E12, 0.03333333333333333], [1.69219866E12, 0.05], [1.69218612E12, 0.016666666666666666], [1.69218102E12, 0.03333333333333333], [1.69218894E12, 0.016666666666666666], [1.69219782E12, 0.016666666666666666], [1.69219236E12, 0.08333333333333333], [1.69218954E12, 0.016666666666666666], [1.69218528E12, 0.016666666666666666], [1.69219074E12, 0.016666666666666666], [1.69219278E12, 0.016666666666666666], [1.69218042E12, 0.2]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69219986E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69218024E12, "maxY": 0.26666666666666666, "series": [{"data": [[1.69218456E12, 0.03333333333333333], [1.69219344E12, 0.016666666666666666], [1.69218054E12, 0.06666666666666667], [1.69218396E12, 0.016666666666666666], [1.69219284E12, 0.08333333333333333], [1.69218336E12, 0.016666666666666666], [1.69218156E12, 0.016666666666666666], [1.69219608E12, 0.03333333333333333], [1.69219932E12, 0.016666666666666666], [1.69218678E12, 0.016666666666666666], [1.69219548E12, 0.03333333333333333], [1.69218036E12, 0.26666666666666666], [1.69218198E12, 0.016666666666666666], [1.692192E12, 0.06666666666666667], [1.69218798E12, 0.016666666666666666], [1.6921902E12, 0.016666666666666666], [1.69218696E12, 0.016666666666666666], [1.69218096E12, 0.016666666666666666], [1.69218636E12, 0.016666666666666666], [1.69218858E12, 0.016666666666666666], [1.69219524E12, 0.016666666666666666], [1.6921995E12, 0.016666666666666666], [1.69219242E12, 0.016666666666666666], [1.69218078E12, 0.016666666666666666], [1.6921836E12, 0.016666666666666666], [1.69219248E12, 0.03333333333333333], [1.69219956E12, 0.06666666666666667], [1.69218048E12, 0.18333333333333332], [1.69218684E12, 0.016666666666666666], [1.69219794E12, 0.016666666666666666], [1.6921803E12, 0.21666666666666667], [1.6921929E12, 0.016666666666666666], [1.69218582E12, 0.03333333333333333], [1.69219452E12, 0.016666666666666666], [1.6921809E12, 0.05], [1.69219974E12, 0.016666666666666666], [1.69218378E12, 0.016666666666666666], [1.69218354E12, 0.03333333333333333], [1.69218702E12, 0.016666666666666666], [1.69218192E12, 0.016666666666666666], [1.69219206E12, 0.03333333333333333], [1.6921953E12, 0.016666666666666666], [1.69218822E12, 0.016666666666666666], [1.69219308E12, 0.016666666666666666], [1.69219752E12, 0.016666666666666666], [1.69218648E12, 0.05], [1.69218144E12, 0.016666666666666666], [1.69219194E12, 0.11666666666666667], [1.69218588E12, 0.016666666666666666], [1.69219032E12, 0.016666666666666666], [1.69218126E12, 0.016666666666666666], [1.69218348E12, 0.016666666666666666], [1.69219092E12, 0.016666666666666666], [1.69218024E12, 0.05], [1.69218666E12, 0.016666666666666666], [1.69218828E12, 0.016666666666666666], [1.6921899E12, 0.016666666666666666], [1.69218444E12, 0.016666666666666666], [1.69219776E12, 0.03333333333333333], [1.69218066E12, 0.016666666666666666], [1.69219272E12, 0.05], [1.6921998E12, 0.016666666666666666], [1.69219212E12, 0.08333333333333333], [1.6921833E12, 0.016666666666666666], [1.69218564E12, 0.06666666666666667], [1.69218786E12, 0.05], [1.69219008E12, 0.016666666666666666], [1.69219596E12, 0.03333333333333333], [1.69219818E12, 0.03333333333333333], [1.69219926E12, 0.016666666666666666], [1.69219602E12, 0.016666666666666666], [1.69219218E12, 0.03333333333333333], [1.69218654E12, 0.03333333333333333], [1.69219986E12, 0.03333333333333333], [1.6921824E12, 0.016666666666666666], [1.6921806E12, 0.016666666666666666], [1.69219158E12, 0.016666666666666666], [1.6921932E12, 0.05], [1.6921845E12, 0.03333333333333333], [1.69219806E12, 0.016666666666666666], [1.6921926E12, 0.03333333333333333], [1.69219866E12, 0.05], [1.69218612E12, 0.016666666666666666], [1.69218102E12, 0.03333333333333333], [1.69218894E12, 0.016666666666666666], [1.69219782E12, 0.03333333333333333], [1.69219236E12, 0.08333333333333333], [1.69218954E12, 0.016666666666666666], [1.69218528E12, 0.016666666666666666], [1.69219074E12, 0.016666666666666666], [1.69219278E12, 0.016666666666666666], [1.69218042E12, 0.2]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69218666E12, 0.016666666666666666]], "isOverall": false, "label": "23505 0", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69219986E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69218024E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.69218396E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q9-success", "isController": false}, {"data": [[1.69218648E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q8-success", "isController": false}, {"data": [[1.692192E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q6-success", "isController": false}, {"data": [[1.69219344E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q5-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q4-success", "isController": false}, {"data": [[1.69218102E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q3-success", "isController": false}, {"data": [[1.69218144E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q2-success", "isController": false}, {"data": [[1.69219524E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q14-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q16-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q10-success", "isController": false}, {"data": [[1.69219278E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q4-success", "isController": false}, {"data": [[1.69219956E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q14-success", "isController": false}, {"data": [[1.6921998E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q7-success", "isController": false}, {"data": [[1.692192E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q15-success", "isController": false}, {"data": [[1.69219866E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q11-success", "isController": false}, {"data": [[1.69219194E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q1-success", "isController": false}, {"data": [[1.6921926E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q7-success", "isController": false}, {"data": [[1.69219092E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q1-success", "isController": false}, {"data": [[1.69218702E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q7-success", "isController": false}, {"data": [[1.69219248E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q16-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q11-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q8-success", "isController": false}, {"data": [[1.6921809E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q7-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q7-success", "isController": false}, {"data": [[1.69219452E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q21-success", "isController": false}, {"data": [[1.69219194E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q6-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q19-success", "isController": false}, {"data": [[1.69218156E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q12-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q10-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q3-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q12-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q2-success", "isController": false}, {"data": [[1.69218564E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q14-success", "isController": false}, {"data": [[1.69218666E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF1-failure", "isController": false}, {"data": [[1.69219272E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q3-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q6-success", "isController": false}, {"data": [[1.69219236E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q22-success", "isController": false}, {"data": [[1.69218636E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q13-success", "isController": false}, {"data": [[1.69219074E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q21-success", "isController": false}, {"data": [[1.6921932E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q11-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q19-success", "isController": false}, {"data": [[1.69219986E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q2-success", "isController": false}, {"data": [[1.69219926E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q13-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q2-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q21-success", "isController": false}, {"data": [[1.69219194E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - RF2-success", "isController": false}, {"data": [[1.69218054E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q14-success", "isController": false}, {"data": [[1.69219818E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q9-success", "isController": false}, {"data": [[1.69218648E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q22-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q13-success", "isController": false}, {"data": [[1.69218654E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q7-success", "isController": false}, {"data": [[1.69219284E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q8-success", "isController": false}, {"data": [[1.6921932E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q16-success", "isController": false}, {"data": [[1.69218126E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q7-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q6-success", "isController": false}, {"data": [[1.69219806E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q14-success", "isController": false}, {"data": [[1.69219866E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q16-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q22-success", "isController": false}, {"data": [[1.69218654E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q22-success", "isController": false}, {"data": [[1.69218024E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q2-success", "isController": false}, {"data": [[1.69219158E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q19-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q11-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q5-success", "isController": false}, {"data": [[1.69219212E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q11-success", "isController": false}, {"data": [[1.69219206E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q14-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q5-success", "isController": false}, {"data": [[1.69219752E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q6-success", "isController": false}, {"data": [[1.69219236E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q5-success", "isController": false}, {"data": [[1.69219194E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q19-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q5-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q3-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q16-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q12-success", "isController": false}, {"data": [[1.69218336E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q19-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q19-success", "isController": false}, {"data": [[1.6921926E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q8-success", "isController": false}, {"data": [[1.69219308E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q13-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q8-success", "isController": false}, {"data": [[1.69219242E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q9-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q8-success", "isController": false}, {"data": [[1.69218354E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q14-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q11-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q5-success", "isController": false}, {"data": [[1.69218444E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q4-success", "isController": false}, {"data": [[1.69218678E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q8-success", "isController": false}, {"data": [[1.69218696E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q11-success", "isController": false}, {"data": [[1.69219608E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q4-success", "isController": false}, {"data": [[1.69219284E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q5-success", "isController": false}, {"data": [[1.6921833E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q18-success", "isController": false}, {"data": [[1.69219956E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q19-success", "isController": false}, {"data": [[1.69218894E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q14-success", "isController": false}, {"data": [[1.69219866E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q11-success", "isController": false}, {"data": [[1.69219212E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q16-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q2-success", "isController": false}, {"data": [[1.69219212E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q15-success", "isController": false}, {"data": [[1.69219236E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q11-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q8-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q19-success", "isController": false}, {"data": [[1.69218582E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q9-success", "isController": false}, {"data": [[1.69218786E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q18-success", "isController": false}, {"data": [[1.69218054E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q6-success", "isController": false}, {"data": [[1.69218564E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q8-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q18-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q11-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q12-success", "isController": false}, {"data": [[1.69218348E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q18-success", "isController": false}, {"data": [[1.69219236E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q22-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q7-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q13-success", "isController": false}, {"data": [[1.69218378E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q1-success", "isController": false}, {"data": [[1.69219956E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q12-success", "isController": false}, {"data": [[1.6921809E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q4-success", "isController": false}, {"data": [[1.6921953E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q19-success", "isController": false}, {"data": [[1.6921845E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q5-success", "isController": false}, {"data": [[1.69218066E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q3-success", "isController": false}, {"data": [[1.69218858E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q1-success", "isController": false}, {"data": [[1.69218456E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q13-success", "isController": false}, {"data": [[1.69219032E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q10-success", "isController": false}, {"data": [[1.69219596E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q3-success", "isController": false}, {"data": [[1.69219218E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q15-success", "isController": false}, {"data": [[1.69218054E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q19-success", "isController": false}, {"data": [[1.69219212E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q14-success", "isController": false}, {"data": [[1.692192E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q21-success", "isController": false}, {"data": [[1.69218078E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q21-success", "isController": false}, {"data": [[1.69219782E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q22-success", "isController": false}, {"data": [[1.69219956E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q14-success", "isController": false}, {"data": [[1.69218648E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q7-success", "isController": false}, {"data": [[1.69219212E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q16-success", "isController": false}, {"data": [[1.69219782E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q10-success", "isController": false}, {"data": [[1.69218582E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q6-success", "isController": false}, {"data": [[1.6921929E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q7-success", "isController": false}, {"data": [[1.6921902E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q21-success", "isController": false}, {"data": [[1.69218798E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q3-success", "isController": false}, {"data": [[1.69218024E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q2-success", "isController": false}, {"data": [[1.69218528E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q15-success", "isController": false}, {"data": [[1.69219986E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q13-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q3-success", "isController": false}, {"data": [[1.69218054E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q6-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q10-success", "isController": false}, {"data": [[1.69218096E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q6-success", "isController": false}, {"data": [[1.69218198E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q16-success", "isController": false}, {"data": [[1.69219008E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q18-success", "isController": false}, {"data": [[1.69219194E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q6-success", "isController": false}, {"data": [[1.69218024E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q2-success", "isController": false}, {"data": [[1.69219194E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q15-success", "isController": false}, {"data": [[1.69219932E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q12-success", "isController": false}, {"data": [[1.69219818E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q9-success", "isController": false}, {"data": [[1.69218564E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q21-success", "isController": false}, {"data": [[1.69219548E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q9-success", "isController": false}, {"data": [[1.69219974E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q10-success", "isController": false}, {"data": [[1.6921806E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q21-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q4-success", "isController": false}, {"data": [[1.69219284E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q13-success", "isController": false}, {"data": [[1.6921809E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q10-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q4-success", "isController": false}, {"data": [[1.69218042E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q3-success", "isController": false}, {"data": [[1.6921899E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q9-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q2-success", "isController": false}, {"data": [[1.69219794E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q12-success", "isController": false}, {"data": [[1.69218822E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q16-success", "isController": false}, {"data": [[1.69218612E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q3-success", "isController": false}, {"data": [[1.69219284E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q22-success", "isController": false}, {"data": [[1.692192E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q1-success", "isController": false}, {"data": [[1.69219776E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q15-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q12-success", "isController": false}, {"data": [[1.6921836E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q16-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q1-success", "isController": false}, {"data": [[1.69219548E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q1-success", "isController": false}, {"data": [[1.69219284E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q10-success", "isController": false}, {"data": [[1.69219776E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q13-success", "isController": false}, {"data": [[1.69218354E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q18-success", "isController": false}, {"data": [[1.69218588E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q9-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q18-success", "isController": false}, {"data": [[1.69218102E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q15-success", "isController": false}, {"data": [[1.6921824E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q1-success", "isController": false}, {"data": [[1.69219272E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q22-success", "isController": false}, {"data": [[1.69218036E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q15-success", "isController": false}, {"data": [[1.69219236E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q9-success", "isController": false}, {"data": [[1.69219272E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q5-success", "isController": false}, {"data": [[1.69219602E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q13-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T14 - Q18-success", "isController": false}, {"data": [[1.69218456E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q8-success", "isController": false}, {"data": [[1.69219608E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q21-success", "isController": false}, {"data": [[1.69218786E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q5-success", "isController": false}, {"data": [[1.6921932E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q4-success", "isController": false}, {"data": [[1.69219596E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q18-success", "isController": false}, {"data": [[1.69219206E12, 0.016666666666666666]], "isOverall": false, "label": "T12 - Q15-success", "isController": false}, {"data": [[1.69219218E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q1-success", "isController": false}, {"data": [[1.69218828E12, 0.016666666666666666]], "isOverall": false, "label": "T9 - Q1-success", "isController": false}, {"data": [[1.6921803E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q4-success", "isController": false}, {"data": [[1.69219194E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q12-success", "isController": false}, {"data": [[1.6921845E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q10-success", "isController": false}, {"data": [[1.69218684E12, 0.016666666666666666]], "isOverall": false, "label": "T15 - Q18-success", "isController": false}, {"data": [[1.6921995E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q2-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q22-success", "isController": false}, {"data": [[1.69219248E12, 0.016666666666666666]], "isOverall": false, "label": "T17 - Q22-success", "isController": false}, {"data": [[1.69218786E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q9-success", "isController": false}, {"data": [[1.69218192E12, 0.016666666666666666]], "isOverall": false, "label": "T11 - Q12-success", "isController": false}, {"data": [[1.69218954E12, 0.016666666666666666]], "isOverall": false, "label": "T13 - Q15-success", "isController": false}, {"data": [[1.69218048E12, 0.016666666666666666]], "isOverall": false, "label": "T10 - Q21-success", "isController": false}, {"data": [[1.69218564E12, 0.016666666666666666]], "isOverall": false, "label": "T16 - Q10-success", "isController": false}, {"data": [[1.69218666E12, 0.016666666666666666]], "isOverall": false, "label": "T1 - Q4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69219986E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69218024E12, "maxY": 0.26666666666666666, "series": [{"data": [[1.69218456E12, 0.03333333333333333], [1.69219344E12, 0.016666666666666666], [1.69218054E12, 0.06666666666666667], [1.69218396E12, 0.016666666666666666], [1.69219284E12, 0.08333333333333333], [1.69218336E12, 0.016666666666666666], [1.69218156E12, 0.016666666666666666], [1.69219608E12, 0.03333333333333333], [1.69219932E12, 0.016666666666666666], [1.69218678E12, 0.016666666666666666], [1.69219548E12, 0.03333333333333333], [1.69218036E12, 0.26666666666666666], [1.69218198E12, 0.016666666666666666], [1.692192E12, 0.06666666666666667], [1.69218798E12, 0.016666666666666666], [1.6921902E12, 0.016666666666666666], [1.69218696E12, 0.016666666666666666], [1.69218096E12, 0.016666666666666666], [1.69218636E12, 0.016666666666666666], [1.69218858E12, 0.016666666666666666], [1.69219524E12, 0.016666666666666666], [1.6921995E12, 0.016666666666666666], [1.69219242E12, 0.016666666666666666], [1.69218078E12, 0.016666666666666666], [1.6921836E12, 0.016666666666666666], [1.69219248E12, 0.03333333333333333], [1.69219956E12, 0.06666666666666667], [1.69218048E12, 0.18333333333333332], [1.69218684E12, 0.016666666666666666], [1.69219794E12, 0.016666666666666666], [1.6921803E12, 0.21666666666666667], [1.6921929E12, 0.016666666666666666], [1.69218582E12, 0.03333333333333333], [1.69219452E12, 0.016666666666666666], [1.6921809E12, 0.05], [1.69219974E12, 0.016666666666666666], [1.69218378E12, 0.016666666666666666], [1.69218354E12, 0.03333333333333333], [1.69218702E12, 0.016666666666666666], [1.69218192E12, 0.016666666666666666], [1.69219206E12, 0.03333333333333333], [1.6921953E12, 0.016666666666666666], [1.69218822E12, 0.016666666666666666], [1.69219308E12, 0.016666666666666666], [1.69219752E12, 0.016666666666666666], [1.69218648E12, 0.05], [1.69218144E12, 0.016666666666666666], [1.69219194E12, 0.11666666666666667], [1.69218588E12, 0.016666666666666666], [1.69219032E12, 0.016666666666666666], [1.69218126E12, 0.016666666666666666], [1.69218348E12, 0.016666666666666666], [1.69219092E12, 0.016666666666666666], [1.69218024E12, 0.05], [1.69218666E12, 0.016666666666666666], [1.69218828E12, 0.016666666666666666], [1.6921899E12, 0.016666666666666666], [1.69218444E12, 0.016666666666666666], [1.69219776E12, 0.03333333333333333], [1.69218066E12, 0.016666666666666666], [1.69219272E12, 0.05], [1.6921998E12, 0.016666666666666666], [1.69219212E12, 0.08333333333333333], [1.6921833E12, 0.016666666666666666], [1.69218564E12, 0.06666666666666667], [1.69218786E12, 0.05], [1.69219008E12, 0.016666666666666666], [1.69219596E12, 0.03333333333333333], [1.69219818E12, 0.03333333333333333], [1.69219926E12, 0.016666666666666666], [1.69219602E12, 0.016666666666666666], [1.69219218E12, 0.03333333333333333], [1.69218654E12, 0.03333333333333333], [1.69219986E12, 0.03333333333333333], [1.6921824E12, 0.016666666666666666], [1.6921806E12, 0.016666666666666666], [1.69219158E12, 0.016666666666666666], [1.6921932E12, 0.05], [1.6921845E12, 0.03333333333333333], [1.69219806E12, 0.016666666666666666], [1.6921926E12, 0.03333333333333333], [1.69219866E12, 0.05], [1.69218612E12, 0.016666666666666666], [1.69218102E12, 0.03333333333333333], [1.69218894E12, 0.016666666666666666], [1.69219782E12, 0.03333333333333333], [1.69219236E12, 0.08333333333333333], [1.69218954E12, 0.016666666666666666], [1.69218528E12, 0.016666666666666666], [1.69219074E12, 0.016666666666666666], [1.69219278E12, 0.016666666666666666], [1.69218042E12, 0.2]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.69218666E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69219986E12, "title": "Total Transactions Per Second"}},
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
