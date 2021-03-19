const container = document.getElementById("container");

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

makeGrid(16);