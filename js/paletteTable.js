import Utils from './util.js';

class PaletteTable {
    static drawTable(groups, id) {
        var tableString = "";

        // header
        tableString += '<table class=\'table\'>';
        tableString += '<thead>';
        tableString += '<tr>';
        tableString += '<th scope=\'col\'>Color Code</th>';
        tableString += '<th scope=\'col\'>Color</th>';
        tableString += '<th scope=\'col\'>Percent</th>';
        tableString += '</tr>';
        tableString += '</thead>';

        groups.sort(function(group1, group2){
            var avgColor1 = Utils.findAvgColor(group1);
            var avgColor2 = Utils.findAvgColor(group2);
            avgColor1 = Utils.rgbToHsl(avgColor1.red, avgColor1.green, avgColor1.blue);
            avgColor2 = Utils.rgbToHsl(avgColor2.red, avgColor2.green, avgColor2.blue);
            return avgColor1[0] - avgColor2[0];
        });

        // var hueSorted = bucketsData.bucketColors;
        // hueSorted.sort(function(rgb1, rgb2){
        //     var hsl1 = Utils.rgbToHsl(rgb1.red, rgb1.green, rgb1.blue);
        //     var hsl2 = Utils.rgbToHsl(rgb2.red, rgb2.green, rgb2.blue); 
        //     return hsl1[0] - hsl2[0];
        // });
        var totalPixels = groups.map(group => group.length).reduce(function(a, b){
            return a + b;
        });

        tableString += '<tbody>';

        groups.forEach(function(group){
            var avg = Utils.findAvgColor(group);
            var hexString = Utils.rgbToHex(avg.red, avg.green, avg.blue);
            var percent = (group.length / totalPixels * 100).toFixed(2);
            tableString += '<tr>';
            tableString += '<td>' + hexString + '</td>';
            tableString += '<td>';
            tableString += '<div class=\"format-color\" style=\"background: ' + hexString + '\">';
            tableString += '</div>';
            tableString += '</td>';
            tableString += '<td>' + percent + '</td>';
            tableString += '</tr>';
        });

        tableString += '</tbody>';
        tableString += '</table>';
        
        $(id).append(tableString);
    }
}

export default PaletteTable;