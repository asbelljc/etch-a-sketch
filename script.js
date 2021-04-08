const container = document.getElementById("container");
let sizeSlider = document.getElementById("size-slider");
sizeSlider.value = 16; // makes starting grid 16 x 16
let chooseBtn = document.getElementById("choose-btn");
let randomBtn = document.getElementById("random-btn");
let darkenBtn = document.getElementById("darken-btn");
let colorTypes = document.getElementById("color-types");

colorTypes.addEventListener("click", (e) => {
  // target and parent both needed due to custom button design
  const isButton = e.target.nodeName === "BUTTON" || 
  e.target.parentNode.nodeName === "BUTTON";

  if (!isButton) {return;}
  if (
    e.target.classList.contains("current") ||
    e.target.parentNode.classList.contains("current")
  ) {
    return;
  }

  if (e.target.id === "choose-btn" || e.target.parentNode.id === "choose-btn") {
    chooseBtn.classList.add("current");
    randomBtn.classList.remove("current");
    darkenBtn.classList.remove("current");
  } else if (e.target.id === "random-btn" || e.target.parentNode.id === "random-btn") {
    randomBtn.classList.add("current");
    chooseBtn.classList.remove("current");
    darkenBtn.classList.remove("current");
  } else if (e.target.id === "darken-btn" || e.target.parentNode.id === "darken-btn") {
    darkenBtn.classList.add("current");
    chooseBtn.classList.remove("current");
    randomBtn.classList.remove("current");
  }
});

function hexToRgb(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5), 16);
  return [r, g, b];
}

function colorChosen(e) {
  let chosenColor = hexToRgb(document.getElementById("color-picker").value);
  e.target.style.backgroundColor = `rgb(${chosenColor[0]}, ${chosenColor[1]}, ${chosenColor[2]})`;
}

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

function colorRandom(e) {
  let red = Math.floor(Math.random()*255);
  let green = Math.floor(Math.random()*255);
  let blue = Math.floor(Math.random()*255);
  e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function colorIt(e) {
  if (chooseBtn.classList.contains("current")) {
    colorChosen(e);
  } else if (randomBtn.classList.contains("current")) {
    colorRandom(e);
  } else {
    colorDarker(e);
  }
}

function clearGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function sizeGrid(sideLength) {
  container.style.gridTemplate = `repeat(${sideLength}, 1fr) / repeat(${sideLength}, 1fr)`;
}

function fillGrid(sideLength) {
  for (let i = 0; i < (sideLength ** 2); i++) {
    const pixel = document.createElement("div");
    pixel.style.backgroundColor = "rgb(255, 255, 255)";
    pixel.addEventListener("mouseover", colorIt);
    container.appendChild(pixel);
  }
}

function makeGrid(sideLength) {
  clearGrid();
  sizeGrid(sideLength);
  fillGrid(sideLength);
}

function showSliderValue() {
  let sliderLabel = document.getElementById("slider-label");
  sliderLabel.innerHTML = sizeSlider.value + "2".sup();
}

showSliderValue();

sizeSlider.oninput = showSliderValue;

makeGrid(sizeSlider.value);

document.getElementById("reset-btn").onclick = function(){makeGrid(sizeSlider.value)};

// SAVE THIS FOR README DOCUMENTATION
// function darken(e) {
//   let pixelBrightness = e.target.style.filter.match(/\d(\.\d)?/);  
//   if (pixelBrightness === "0") {
//     return;
//   } else {
//     e.target.style.filter = `brightness(${(pixelBrightness[0] - 0.1).toFixed(1)})`;
//   }
// }