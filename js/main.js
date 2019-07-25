import HistogramPaletteGen from './histogram.js';
import kMeansPaletteGen from './kMeans.js';
import PaletteTable from './paletteTable.js';

$(document).ready(function(){
    document.getElementById('file-choose').addEventListener('change', handleImage, false);

    $('#run-histogram-algo').click(runHistogram);
    $('#run-k-means-algo').click(run_k_means);
});

function handleImage(event){
    clearPalette('#histogram-palette');
    clearPalette('#k-means-palette');
    var reader = new FileReader();
    reader.onload = function(e) {
        onReaderLoad(e);
    }

    reader.readAsDataURL(event.target.files[0]);
}

var onReaderLoad = function(e){
    var image = document.getElementById('output-img');
    document.querySelector('.format-img').setAttribute('style', 'display: block;');
    image.src = e.target.result; 
    
    document.querySelector('#extract-options').setAttribute('style', 'display: block;');

    image.onload = function(){
        onImageLoad(image);
    }

}

var onImageLoad = function(image){
    var imgWidth = image.width;
    var imgHeight = image.height;
    var maxDimension = imgWidth > imgHeight ? imgWidth : imgHeight;
  
    var scale = maxDimension / 100;
    var canvasHeight = imgHeight / scale;
    var canvasWidth = imgWidth / scale;
    
    var canvas = document.createElement('canvas');
    canvas.width = parseInt(canvasWidth);
    canvas.height = parseInt(canvasHeight);
    canvas.getContext('2d').drawImage(image, 0, 0, canvasWidth, canvasHeight);

    collectData(canvas);
}

var pixels = null;

function collectData(canvas){
    var ctx = canvas.getContext('2d');
    pixels = [];
    var nextPixel = null;
    // console.log("size: " + canvas.width + " x " + canvas.height);
    for(var x = 0; x < canvas.width; x++){
        for(var y = 0; y < canvas.height; y++){
            nextPixel = ctx.getImageData(x, y, 1, 1).data;
            pixels.push({
                red: nextPixel[0],
                green: nextPixel[1],
                blue: nextPixel[2]
            });
        }
    }
    // console.log("read: " + pixels.length + " pixels");
}

function runHistogram(){
    clearPalette('#histogram-palette');

    var partitionSize = parseInt($('#histPartitionSize').val());
    // console.log(partitionSize);
    var paletteSize = parseInt($('#histPaletteSize').val());

    var histoPaletteGen = new HistogramPaletteGen();
    var histoData = histoPaletteGen.bucketPixels(pixels, partitionSize, paletteSize);

    PaletteTable.drawTable(histoData, '#histogram-palette');
}

function run_k_means(){
    clearPalette('#k-means-palette');

    var k = parseInt($('#k-means-num').val());
    var kmeansPaletteGen = new kMeansPaletteGen();
    var kMeansData = kmeansPaletteGen.run(k, pixels);

    PaletteTable.drawTable(kMeansData.clusters, '#k-means-palette');
}

function clearPalette(id){
    $(id).empty();
}