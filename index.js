const Blocks = {

  // Fundamental Blocks - 0 - 15
  Empty: 0,
  Exit: 1,

  // Solid tiles - 16 - 31 
  Block1: 16,
  Block2: 17

  // 
}

function blocksToDiv(code, coordinates) {
  switch (code) {
    case 0: 
      return "";
      break;
    case 1: return `<div class="block exit" style="top: ${coordinateToHtml(coordinates.y)}; left: ${coordinateToHtml(coordinates.x)};">#</div>`
  }
}

const gravityConstant = 0.025;

document.querySelector("button").addEventListener("mouseenter", () => {
  document.querySelector("button").style.borderRadius = "50px";
});

document.querySelector("button").addEventListener("mouseleave", () => {
  document.querySelector("button").style.borderRadius = "10px";
});

document.querySelector(".all").ondragstart = () => false;

document.querySelector("button").addEventListener("click", () => {
  document.querySelector(".startScreen").style.display = "none";
  document.querySelector(".map").style.display = "block";
});

function coordinateToHtml(coordinate) {
  return `${100 * (coordinate + 1) / 20}%`;
}

let jumpHeld = false;

let playerData = {
  coordinates: {
    x: -1.00, y: 19.00
  },
  speedY: 0,
  gravity: +1, 
  collision: {
    left: false,
    right: false,
    up: false,
    down: false
  },
  jumps: 0,
  maxJumps: Infinity
};

let player = document.querySelector(".player");

let keys = {
  left: false,
  right: false,
  up: false
}

function updatePlayer() {
  player.style.top = coordinateToHtml(playerData.coordinates.y);
  player.style.left = coordinateToHtml(playerData.coordinates.x);
}

function left() {
  playerData.coordinates.x -= 0.02;
  updatePlayer();
}

function right() {
  playerData.coordinates.x += 0.02;
  updatePlayer();
}

function up() {
  playerData.coordinates.y -= playerData.gravity * 0.05;
  updatePlayer();
}

function jump() {
  if (jumpHeld && !(playerData.gravity == -1 ? playerData.collision.up : playerData.collision.down)) return;
  if ((playerData.gravity == -1 ? playerData.collision.up : playerData.collision.down) || playerData.jumps <= playerData.maxJumps) {
    playerData.speedY = playerData.gravity * gravityConstant * -50;
    playerData.jumps++;
  }
  jumpHeld = true;
  updatePlayer();
}

let moveX = setInterval(() => {}, 1000);
clearInterval(moveX);

let moveY = setInterval(() => {}, 1000);
clearInterval(moveY);

function onKeyPress(e) {
  switch (e.key) {
    case "ArrowLeft": 
      keys.left = true;
      break;
    case "ArrowRight": 
      keys.right = true;
      break;
    case "ArrowUp": 
      keys.up = true;
      break;
  }
}

document.addEventListener("keydown", onKeyPress);
document.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowLeft": 
      keys.left = false;
      break;
    case "ArrowRight": 
      keys.right = false;
      break;
    case "ArrowUp": 
      keys.up = false;
      jumpHeld = false;
      break;
  }
});

let checkKeys = setInterval(() => {
  if (keys.left && !keys.right) {
    left();
  } else if (keys.right && !keys.left) {
    right();
  }

  if (keys.up) {
    // up();
    jump();
  }

  if (playerData.coordinates.x < -1) {
    playerData.coordinates.x = -1;
    playerData.collision.left = true;
  } else {
    playerData.collision.left = false;
  }
  if (playerData.coordinates.x > 18) {
    playerData.coordinates.x = 18;
    playerData.collision.right = true;
  } else {
    playerData.collision.right = false;
  }
  if (playerData.coordinates.y < 0) {
    playerData.coordinates.y = 0;
    playerData.collision.up = true;
  } else {
    playerData.collision.up = false;
  }
  if (playerData.coordinates.y > 19) {
    playerData.coordinates.y = 19;
    playerData.collision.down = true;
  } else {
    playerData.collision.down = false;
  }

  if (playerData.gravity == -1 ? playerData.collision.up : playerData.collision.down) {
    playerData.speedY = 0;
    playerData.jumps = 0;
  } else {
    playerData.speedY += playerData.gravity * gravityConstant * 0.5;
  }

  if (playerData.gravity == -1 ? playerData.collision.down : playerData.collision.up) {
    playerData.speedY = -playerData.speedY * 0.1;
  }

  playerData.coordinates.y += playerData.speedY * gravityConstant;

  updatePlayer();
}, 5);

function room() {
  let roomObject = {

  };

  roomObject["map"] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  roomObject["spawnCoordinates"] = {x: 0, y: 0};

  roomObject["exits"] = [];

  roomObject["placeBlock"] = (coordinates, blockType) => {
    roomObject["map"][coordinates.y][coordinates.x] = blockType;
  }

  roomObject["setSpawn"] = coordinates => {
    roomObject["spawnCoordinates"].x = coordinates.x;
    roomObject["spawnCoordinates"].y = coordinates.y;
  }

  roomObject["setExit"] = (exitCoordinates, handler) => {
    roomObject["map"][exitCoordinates.y][exitCoordinates.x] = Blocks.Exit;
    roomObject["exits"].push({
      coordinates: exitCoordinates,
      exitHandler: handler
    });
  }

  return roomObject;
}

function renderRoom(room) {
  for (var i = room.length - 1; i >= 0; i--) {
    for (var j = room[i].length - 2; j >= -1; j--) {
      room[i][j + 1]
    }
  }
}