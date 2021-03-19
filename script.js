const pixel = document.createElement("div");

document.getElementById("container").style.gridTemplate = "repeat(16, 1fr) / repeat(16, 1fr)";

function makeGrid(sideLength) {
  for (let i = 0; i < (sideLength ** 2); i++) {
      document.getElementById("container").appendChild(pixel);
    }
}