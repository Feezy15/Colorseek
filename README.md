## Introduction
This app aims to extract a color palette that accurately represents a given input image.
Written using Javascript, Jquery, Bootstrap

## How it Works
The image's colors are quantified through rgb pixel data.

For the histogram algorithm, the rgb color space is partitioned based on the input, where 3 will partition into 3 x 3 x 3, 4 into 4 x 4 x 4, and so on. Each partition represents one bucket of the histogram; the top N buckets that contain the most pixels from the image are chosen, and the average pixel value for each bucket is computed. This results in an N-tone color palette.

k-means is a simple unsupervised learning algorithm. Because the initial seeding of the k different means can affect the results a lot, the algorithm is run 20 times and the result yielding the lowest error is chosen. This implementation follows three simple steps:

1. Initialize the cluster centers by randomly picking k points from the training set
2. Assign each point in the set to the closest cluster center
3. Reassign each cluster center to the mean of the points contained in it
4. Repeat steps 2 and 3 until convergence is reached (i.e. no points move to different clusters, cluster centers stay the same)

The end result is k different clusters, each assigned a varying number of pixels from the original image. The pixels in each cluster are averaged to produced a k-tone color palette.

## Problems
While implementing k-means, I found that empty clusters sometimes arose during any given iteration. The algorithm isn't designed to handle this well, so I decided to just assign the cluster center to the previous iterations's value whenever this happened. There are probably better ways to handle this, but I just opted for the simplest fix.

## Todo:
- Improve k-means algorithm efficiency
