const canvas = document.getElementById("canvas");
const increasebtn = document.getElementById("increase");
const decreasebtn = document.getElementById("decrease");
const sizeEle = document.getElementById("size");
const colorsIn = document.getElementById("color");
const clearbtn = document.getElementById("clear");
const undoBtn = document.getElementById("undo");
const saveBtn = document.getElementById("save");
const shapeSelector = document.getElementById("shape");
const eraserBtn = document.getElementById("eraser");

const ctx = canvas.getContext("2d");

let size = 30;
let isPressed = false;
let color = "black";
let currentShape = "circle";
let isEraser = false;

let x = undefined;
let y = undefined;
let drawHistory = [];

// Canvas events
canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;
  drawHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
});

// clearbutton event
clearbtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
});

// undo button event
undoBtn.addEventListener("click", () => {
  if (drawHistory.length > 1) {
    drawHistory.pop();
    ctx.putImageData(drawHistory[drawHistory.length - 1], 0, 0);
  }
});

// save button event
saveBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Shape changes event
shapeSelector.addEventListener("change", (e) => {
  currentShape = e.target.value;
});

// eraser event
eraserBtn.addEventListener("click", () => {
  isEraser = !isEraser;
  color = isEraser ? "#fff" : color;
  eraserBtn.style.backgroundColor = isEraser ? "#ff0000" : "#f0f0f0";
});

// canvas mouse move event
canvas.addEventListener("mousemove", (e) => {
  const x2 = e.offsetX;
  const y2 = e.offsetY;

  if (isPressed) {
    if (currentShape === "line") {
      drawLine(x, y, x2, y2);
    } else if (currentShape === "circle") {
      drawCircle(x2, y2);
    } else if (currentShape === "square") {
      drawSquare(x2, y2);
    }
    x = x2;
    y = y2;
  }
});

// Incresse button event
increasebtn.addEventListener("click", () => {
  size += 5;
  updateSizeOnTheScreen();
});

// decrease button event
decreasebtn.addEventListener("click", () => {
  size = size - 5 < 5 ? 5 : size - 5;
  updateSizeOnTheScreen();
});

// colors event
colorsIn.addEventListener("change", (e) => {
  color = e.target.value;
});

// function for draw circle shape line
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// function for draw line
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

// function for draw square shape line
function drawSquare(x, y) {
  ctx.beginPath();
  ctx.rect(x - size / 2, y - size / 2, size, size);
  ctx.fillStyle = color;
  ctx.fill();
}

function updateSizeOnTheScreen() {
  sizeEle.innerText = size;
}