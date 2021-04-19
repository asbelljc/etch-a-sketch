[**LIVE PREVIEW**](https://asbelljc.github.io/etch-a-sketch/)

This project is a continuous-line digital sketchpad powered by JavaScript.

It served mainly as an exploration of DOM manipulation but touched on many other areas too. Of interest:
- **CSS Grid** and **Flexbox** were used to make responsive layout.
- **Hex-to-RGB converter** coded into script to allow for easier color modification.
- Responsive 3D **custom buttons**, which used transitions with **cubic-bezier curves** and **brightness filters** to yield realistic motion and lighting effects.
- **Radio button functionality** was built from scratch to allow for custom user interface.
- **Regex** was used to extract strings from node properties and modify them.
- **Template literals** simplified insertion of variable values into CSS properties.

An interesting lesson in optimization was learned regarding the CSS "filter" property. Attempting to change this property in the DOM with JavaScript yielded the elegant code below.
```javascript
function darken(e) {
   let pixelBrightness = e.target.style.filter.match(/\d(\.\d)?/);  
   if (pixelBrightness === "0") {
     return;
   } else {
     e.target.style.filter = `brightness(${(pixelBrightness[0] - 0.1).toFixed(1)})`;
   }
}
```
Only problem was, it was horrendously slow! It was back to the drawing board to figure out a more primitive way of incrementally darkening divs. A similar, if slightly less human-readable form was eventually found:
```javascript
function colorDarker(e) {
  let oldColor = e.target.style.backgroundColor.slice(4, -1).replace(/ /g, "").split(",");
  let newColor = oldColor.map(function(value) {
    if (value < 25) {
      return 0;
    } else {
      return value - 25;
    }
  });
  e.target.style.backgroundColor = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`
}
```

All in all this project was hugely informative! Going forward I would like to further enhance the appearance of the buttons and make images saveable.
