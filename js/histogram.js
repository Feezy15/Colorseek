import Utils from './util.js';

const max_dimension = 256;

class HistogramPaletteGen {

    // note: numBuckets refers to number of buckets per dimension (r, g, b)
    bucketPixels(pixels, numBuckets){
        var N = 5;

        var getPixelKey = function(pixel, numBuckets){
            var bucketSize = max_dimension / numBuckets;
            var redBucket = Math.floor(pixel.red / bucketSize);
            var greenBucket = Math.floor(pixel.green / bucketSize);
            var blueBucket = Math.floor(pixel.blue / bucketSize);
            return redBucket + " " + greenBucket + " " + blueBucket;
        };

        var bucketMap = {}; // is an object
        pixels.forEach(function(pixel){
            var key = getPixelKey(pixel, numBuckets);
            if(key in bucketMap)
                bucketMap[key].push(pixel);
            else
                bucketMap[key] = [pixel];
        });

        // sort by length descending, i.e. largest buckets come first
        var sortedArray = Object.values(bucketMap).sort(function(arr1, arr2){
            return -(arr1.length - arr2.length);
        });

        // let bucketsavg = [];
        // sortedArray.slice(0, N).forEach(function(bucket){
        //     bucketsavg.push(Utils.findAvgColor(bucket));
        // });
        return sortedArray.slice(0, N);
        // return {
        //     buckets: sortedArray.slice(0, 10),
        //     bucketColors: bucketsavg
        // };
    }
}

export default HistogramPaletteGen;