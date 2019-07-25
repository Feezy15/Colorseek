import Utils from './util.js';

const num_trials = 20;

class kMeansPaletteGen {
    run(k, pixels) {
        var clusters = null, error = Infinity;
        for (var i = 0; i < num_trials; i++) {
            // console.log("trial " + i);
            var res = this.cluster(k, pixels);
            if(res.err < error){
                clusters = res.clusters;
                error = res.err;
            }
        }

        // console.log("fin run");
        return {
            clusters: clusters,
            err: error
        };
    }

    cluster(k, pixels) {
        var means = [];
        for (var i = 0; i < k; i++) {
            means.push(pixels[Math.floor(Math.random() * pixels.length)]);
        }

        var fin = false;
        var res = null;
        while (!fin) {
            res = this.makeAssignments(means, pixels);
            var newMeans = this.computeMeans(means, res.groups);
            fin = this.isFin(means, newMeans);
            means = newMeans;
        }

        return {
            clusters: res.groups,
            err: res.err,
            means: res.means
        };
    }

    isFin(means, newMeans) {
        var res = false;
        // console.log(means[0].red);
        // console.log(newMeans[0].red);
        means.forEach(function (mean1) {
            var meanInBoth = false;
            newMeans.forEach(function (mean2) {
                if ((mean1.red.toFixed(2) === mean2.red.toFixed(2)) &&
                    (mean1.green.toFixed(2) === mean2.green.toFixed(2)) &&
                    (mean1.blue.toFixed(2) === mean2.blue.toFixed(2)))
                    meanInBoth = true;
            });
            res |= meanInBoth;
        });
        return res;
    }

    computeMeans(means, groups) {
        return groups.map(function (group, index) {
            // empty cluster, assign previous mean
            if(group.length === 0)
                return {
                    red: means[index].red,
                    green: means[index].green,
                    blue: means[index].blue
                };

            // compute new mean from clustered points
            let avgColor = Utils.findAvgColor(group);
            return {
                red: avgColor.red,
                green: avgColor.green,
                blue: avgColor.blue,
            };
        });
    }

    makeAssignments(means, points) {
        var totalErr = 0;

        var groups = [];
        for(var i = 0; i < means.length; i++){
            groups.push(new Array(0));
        }

        var distance = function(p1, p2) {
            var squareDiff = p1.map(function (p, index) {
                var diff = p1[index] - p2[index];
                return diff * diff;
            });
    
            return Math.sqrt(squareDiff.reduce(function (a, b) {
                return a + b;
            }));
        };

        points.forEach(function (point) {
            var bestIndex;
            var bestErr = Infinity;

            means.forEach(function (mean, index) {
                var err = distance([point.red, point.green, point.blue], [mean.red, mean.green, mean.blue]);
                if (err < bestErr) {
                    bestErr = err;
                    bestIndex = index;
                }
            });

            groups[bestIndex].push(point);
            totalErr += bestErr;
        });

        // console.log("fin assignments");

        return {
            means: means,
            groups: groups,
            err: totalErr
        };
    }
}

export default kMeansPaletteGen;