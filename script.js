const container = document.getElementById("container");
let sizeSlider = document.getElementById("size-slider");
sizeSlider.value=16; // makes starting grid 16 x 16

function colorIt(e) {
  e.target.style.backgroundColor = "black";
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