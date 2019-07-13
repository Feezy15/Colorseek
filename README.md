## Introduction
This app aims to find a color palette that represents a given input image.
Written using Javascript, Jquery, Bootstrap

## How it Works
First, the image's colors are quantified through rgb pixel data. For the histogram algorithm, the rgb color space is partitioned into 27 buckets, or a 3 x 3 x 3 grid. The top 5 buckets that contain the most pixels from the image are chosen, and the average pixel value for each bucket is computed. This results in the 5-tone color palette that is extracted from the image.

## Todo:
- Implement a k-means algorithm
- Add varying partition inputs for histogram approach (e.g. 3 -> 3 x 3 x 3, 4 -> 4 x 4 x 4)
- Add variable color palette size
