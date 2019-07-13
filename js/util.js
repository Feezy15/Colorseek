

class Utils {
   static rgbToHsl(r, g, b) {
      r /= 255, g /= 255, b /= 255;

      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
         h = s = 0; // achromatic
      } else {
         var d = max - min;
         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

         switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
         }

         h /= 6;
      }

      return [h, s, l];
   }

   static componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
   }

   static rgbToHex(r, g, b) {
      return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
   }

   static findAvgColor(group) {
      var sumRed = group.map(pixel => pixel.red).reduce(function (a, b) {
         return a + b;
      });

      var sumGreen = group.map(pixel => pixel.green).reduce(function (a, b) {
         return a + b;
      });

      var sumBlue = group.map(pixel => pixel.blue).reduce(function (a, b) {
         return a + b;
      });

      return {
         red: Math.round(sumRed / group.length),
         green: Math.round(sumGreen / group.length),
         blue: Math.round(sumBlue / group.length)
      };
   }

}

export default Utils;