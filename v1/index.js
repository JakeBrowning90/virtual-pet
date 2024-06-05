console.log("Hello world!");

let habitatSize = 15;

let fish = {
  name: "Artie",
  color: "blue",
  location: undefined,
  facingRight: true,
  ascending: true,
  foodEaten: 0,
  lengthsSwum: 0,
};

function getRandInt(x) {
  return Math.floor(Math.random() * x);
}

function clearCells() {
  let cells = document.getElementsByClassName("cell");
  for (i = 0; i < cells.length; i++) {
    while (cells[i].firstChild) {
      cells[i].removeChild(cells[i].firstChild);
    }
  }
}

function clearCell(id) {
  let node = document.getElementById(`${id[0]},${id[1]}`);
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function setRandomLocation() {
  let x = habitatSize;
  let locationX = getRandInt(x);
  let locationY = getRandInt(x);
  fish.location = [locationX, locationY];
}

function setLinearMovement() {
  if (fish.facingRight == true && fish.location[0] + 1 < habitatSize) {
    moveRight();
  } else if (fish.facingRight == true && fish.location[0] + 1 == habitatSize) {
    fish.facingRight = false;
    updateCounter();
    moveLeft();
  } else if (fish.facingRight == false && fish.location[0] - 1 > -1) {
    moveLeft();
  } else if (fish.facingRight == false && fish.location[0] - 1 == -1) {
    fish.facingRight = true;
    updateCounter();
  }
}
function setDepthMovement() {
  if (fish.ascending == true && fish.location[1] + 1 < habitatSize) {
    moveUp();
  } else if (fish.ascending == true && fish.location[1] + 1 == habitatSize) {
    fish.ascending = false;
    moveDown();
  } else if (fish.ascending == false && fish.location[1] - 1 > -1) {
    moveDown();
  } else if (fish.ascending == false && fish.location[1] - 1 == -1) {
    fish.ascending = true;
    moveUp();
  }
}

function moveRight() {
  fish.location = [fish.location[0] + 1, fish.location[1]];
}
function moveLeft() {
  fish.location = [fish.location[0] - 1, fish.location[1]];
}
function moveUp() {
  fish.location = [fish.location[0], fish.location[1] + 1];
}
function moveDown() {
  fish.location = [fish.location[0], fish.location[1] - 1];
}
function updateCounter() {
  fish.lengthsSwum++;
  let counter = document.getElementsByClassName("counter");
  counter[0].textContent = fish.lengthsSwum;
}

function moveFish() {
  clearCell(fish.location);
  setLinearMovement();
  if (getRandInt(3) == 0) {
    setDepthMovement();
  }
  let location = document.getElementById(
    `${fish.location[0]},${fish.location[1]}`
  );
  let fishDiv = document.createElement("div");
  fishDiv.setAttribute("class", "fish");
  location.appendChild(fishDiv);
}

function setHabitatSize(x) {
  let root = document.querySelector(":root");
  root.style.setProperty("--hSize", `${x}`);
  let habitat = document.getElementsByClassName("habitat");
  for (i = 0; i < x; i++) {
    for (j = 0; j < x; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.setAttribute("id", `${j},${i}`);
      habitat[0].appendChild(cell);
    }
  }
}

function placeFood() {
  let food = document.createElement("div");
  food.setAttribute("class", "food");
  let node = document.getElementById(
    `${getRandInt(habitatSize)},${getRandInt(habitatSize)}`
  );
  node.appendChild(food)
}

setHabitatSize(habitatSize);
setRandomLocation();
placeFood();

setInterval(moveFish, 200);
