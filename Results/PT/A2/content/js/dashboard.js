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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.09090909090909091, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Q1"], "isController": false}, {"data": [0.0, 500, 1500, "Q2"], "isController": false}, {"data": [0.0, 500, 1500, "Q3"], "isController": false}, {"data": [0.0, 500, 1500, "Q4"], "isController": false}, {"data": [0.0, 500, 1500, "Q5"], "isController": false}, {"data": [0.0, 500, 1500, "Q6"], "isController": false}, {"data": [0.0, 500, 1500, "Q7"], "isController": false}, {"data": [0.0, 500, 1500, "Q8"], "isController": false}, {"data": [0.0, 500, 1500, "Q9"], "isController": false}, {"data": [0.0, 500, 1500, "Q11"], "isController": false}, {"data": [0.0, 500, 1500, "Q22"], "isController": false}, {"data": [0.0, 500, 1500, "Q10"], "isController": false}, {"data": [0.0, 500, 1500, "Q21"], "isController": false}, {"data": [0.0, 500, 1500, "Q13"], "isController": false}, {"data": [0.0, 500, 1500, "Q12"], "isController": false}, {"data": [0.0, 500, 1500, "Q15"], "isController": false}, {"data": [0.0, 500, 1500, "Q14"], "isController": false}, {"data": [0.0, 500, 1500, "Q16"], "isController": false}, {"data": [0.0, 500, 1500, "Q19"], "isController": false}, {"data": [0.0, 500, 1500, "Q18"], "isController": false}, {"data": [1.0, 500, 1500, "RF1"], "isController": false}, {"data": [1.0, 500, 1500, "RF2"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 22, 0, 0.0, 52249.22727272727, 6, 177288, 22440.0, 144542.9, 172516.04999999993, 177288.0, 0.01913865608356981, 1.0075115962857086, 0.0], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Q1", 1, 0, 0.0, 145475.0, 145475, 145475, 145475.0, 145475.0, 145475.0, 145475.0, 0.006874033339061694, 0.004417103454201753, 0.0], "isController": false}, {"data": ["Q2", 1, 0, 0.0, 28049.0, 28049, 28049, 28049.0, 28049.0, 28049.0, 28049.0, 0.03565189489821384, 0.6807980008199936, 0.0], "isController": false}, {"data": ["Q3", 1, 0, 0.0, 39293.0, 39293, 39293, 39293.0, 39293.0, 39293.0, 39293.0, 0.02544982566869417, 0.009593391316519482, 0.0], "isController": false}, {"data": ["Q4", 1, 0, 0.0, 2051.0, 2051, 2051, 2051.0, 2051.0, 2051.0, 2051.0, 0.4875670404680643, 0.06570727693807898, 0.0], "isController": false}, {"data": ["Q5", 1, 0, 0.0, 2532.0, 2532, 2532, 2532.0, 2532.0, 2532.0, 2532.0, 0.3949447077409163, 0.0829229610979463, 0.0], "isController": false}, {"data": ["Q6", 1, 0, 0.0, 138980.0, 138980, 138980, 138980.0, 138980.0, 138980.0, 138980.0, 0.00719527989638797, 1.6161273204777667E-4, 0.0], "isController": false}, {"data": ["Q7", 1, 0, 0.0, 17247.0, 17247, 17247, 17247.0, 17247.0, 17247.0, 17247.0, 0.05798109816199919, 0.01828895967414623, 0.0], "isController": false}, {"data": ["Q8", 1, 0, 0.0, 2940.0, 2940, 2940, 2940.0, 2940.0, 2940.0, 2940.0, 0.3401360544217687, 0.02424798044217687, 0.0], "isController": false}, {"data": ["Q9", 1, 0, 0.0, 142368.0, 142368, 142368, 142368.0, 142368.0, 142368.0, 142368.0, 0.007024050348392897, 0.05418945092998427, 0.0], "isController": false}, {"data": ["Q11", 1, 0, 0.0, 22328.0, 22328, 22328, 22328.0, 22328.0, 22328.0, 22328.0, 0.04478681476173414, 19.832992417032425, 0.0], "isController": false}, {"data": ["Q22", 1, 0, 0.0, 31964.0, 31964, 31964, 31964.0, 31964.0, 31964.0, 31964.0, 0.03128519584532599, 0.00473555210549368, 0.0], "isController": false}, {"data": ["Q10", 1, 0, 0.0, 22552.0, 22552, 22552, 22552.0, 22552.0, 22552.0, 22552.0, 0.044341965235899256, 0.171911720689961, 0.0], "isController": false}, {"data": ["Q21", 1, 0, 0.0, 10140.0, 10140, 10140, 10140.0, 10140.0, 10140.0, 10140.0, 0.09861932938856015, 0.280737641765286, 0.0], "isController": false}, {"data": ["Q13", 1, 0, 0.0, 39896.0, 39896, 39896, 39896.0, 39896.0, 39896.0, 39896.0, 0.025065169440545418, 0.007637043813916182, 0.0], "isController": false}, {"data": ["Q12", 1, 0, 0.0, 137681.0, 137681, 137681, 137681.0, 137681.0, 137681.0, 137681.0, 0.007263166304718879, 5.958066109339705E-4, 0.0], "isController": false}, {"data": ["Q15", 1, 0, 0.0, 17444.0, 17444, 17444, 17444.0, 17444.0, 17444.0, 17444.0, 0.05732630130703967, 0.01114056050791103, 0.0], "isController": false}, {"data": ["Q14", 1, 0, 0.0, 137422.0, 137422, 137422, 137422.0, 137422.0, 137422.0, 137422.0, 0.00727685523424197, 2.4161433394944042E-4, 0.0], "isController": false}, {"data": ["Q16", 1, 0, 0.0, 22158.0, 22158, 22158, 22158.0, 22158.0, 22158.0, 22158.0, 0.0451304269338388, 30.363522063137466, 0.0], "isController": false}, {"data": ["Q19", 1, 0, 0.0, 11662.0, 11662, 11662, 11662.0, 11662.0, 11662.0, 11662.0, 0.08574858514834506, 0.001758515906362545, 0.0], "isController": false}, {"data": ["Q18", 1, 0, 0.0, 177288.0, 177288, 177288, 177288.0, 177288.0, 177288.0, 177288.0, 0.005640539686837237, 0.03611818235018727, 0.0], "isController": false}, {"data": ["RF1", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 1.46484375, 0.0], "isController": false}, {"data": ["RF2", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 1.2555803571428572, 0.0], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 22, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
