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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 22, 0, 0.0, 64886.13636363637, 5, 448851, 25320.5, 143221.8, 403232.24999999936, 448851.0, 0.0154114291158323, 0.8113295139988316, 0.0], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Q1", 1, 0, 0.0, 144726.0, 144726, 144726, 144726.0, 144726.0, 144726.0, 144726.0, 0.0069096085015823, 0.004439963275430814, 0.0], "isController": false}, {"data": ["Q2", 1, 0, 0.0, 28057.0, 28057, 28057, 28057.0, 28057.0, 28057.0, 28057.0, 0.035641729336707416, 0.680603882275368, 0.0], "isController": false}, {"data": ["Q3", 1, 0, 0.0, 39292.0, 39292, 39292, 39292.0, 39292.0, 39292.0, 39292.0, 0.025450473378804846, 0.009593635472869795, 0.0], "isController": false}, {"data": ["Q4", 1, 0, 0.0, 1879.0, 1879, 1879, 1879.0, 1879.0, 1879.0, 1879.0, 0.532197977647685, 0.06912337014369345, 0.0], "isController": false}, {"data": ["Q5", 1, 0, 0.0, 2205.0, 2205, 2205, 2205.0, 2205.0, 2205.0, 2205.0, 0.45351473922902497, 0.0952203798185941, 0.0], "isController": false}, {"data": ["Q6", 1, 0, 0.0, 139712.0, 139712, 139712, 139712.0, 139712.0, 139712.0, 139712.0, 0.007157581310123683, 1.6076598645785618E-4, 0.0], "isController": false}, {"data": ["Q7", 1, 0, 0.0, 14006.0, 14006, 14006, 14006.0, 14006.0, 14006.0, 14006.0, 0.07139797229758674, 0.022521040089961444, 0.0], "isController": false}, {"data": ["Q8", 1, 0, 0.0, 2943.0, 2943, 2943, 2943.0, 2943.0, 2943.0, 2943.0, 0.3397893306150187, 0.02422326282704723, 0.0], "isController": false}, {"data": ["Q9", 1, 0, 0.0, 448851.0, 448851, 448851, 448851.0, 448851.0, 448851.0, 448851.0, 0.00222791082118565, 0.017187983874381477, 0.0], "isController": false}, {"data": ["Q11", 1, 0, 0.0, 22584.0, 22584, 22584, 22584.0, 22584.0, 22584.0, 22584.0, 0.044279135671271695, 19.60817634996015, 0.0], "isController": false}, {"data": ["Q22", 1, 0, 0.0, 22041.0, 22041, 22041, 22041.0, 22041.0, 22041.0, 22041.0, 0.045369992287101306, 0.006867528129395218, 0.0], "isController": false}, {"data": ["Q10", 1, 0, 0.0, 31628.0, 31628, 31628, 31628.0, 31628.0, 31628.0, 31628.0, 0.03161755406601745, 0.12412360092323257, 0.0], "isController": false}, {"data": ["Q21", 1, 0, 0.0, 21435.0, 21435, 21435, 21435.0, 21435.0, 21435.0, 21435.0, 0.046652670865407045, 0.1328052105201773, 0.0], "isController": false}, {"data": ["Q13", 1, 0, 0.0, 39777.0, 39777, 39777, 39777.0, 39777.0, 39777.0, 39777.0, 0.025140156371772634, 0.007659891394524474, 0.0], "isController": false}, {"data": ["Q12", 1, 0, 0.0, 137669.0, 137669, 137669, 137669.0, 137669.0, 137669.0, 137669.0, 0.007263799402915689, 5.958585447704276E-4, 0.0], "isController": false}, {"data": ["Q15", 1, 0, 0.0, 18355.0, 18355, 18355, 18355.0, 18355.0, 18355.0, 18355.0, 0.05448106782892945, 0.010481221056932716, 0.0], "isController": false}, {"data": ["Q14", 1, 0, 0.0, 137914.0, 137914, 137914, 137914.0, 137914.0, 137914.0, 137914.0, 0.007250895485592471, 2.4075238917006252E-4, 0.0], "isController": false}, {"data": ["Q16", 1, 0, 0.0, 22084.0, 22084, 22084, 22084.0, 22084.0, 22084.0, 22084.0, 0.045281651874660385, 30.465265435383085, 0.0], "isController": false}, {"data": ["Q19", 1, 0, 0.0, 108317.0, 108317, 108317, 108317.0, 108317.0, 108317.0, 108317.0, 0.00923216115660515, 1.8933142996944156E-4, 0.0], "isController": false}, {"data": ["Q18", 1, 0, 0.0, 44008.0, 44008, 44008, 44008.0, 44008.0, 44008.0, 44008.0, 0.02272314124704599, 0.14550355191101616, 0.0], "isController": false}, {"data": ["RF1", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 1.7578125, 0.0], "isController": false}, {"data": ["RF2", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 1.2555803571428572, 0.0], "isController": false}]}, function(index, item){
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
