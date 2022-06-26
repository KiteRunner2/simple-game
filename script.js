"use strict";
(() => {
  // src/Bomb.ts
  var Bomb = class {
    constructor(parentElement, pad) {
      this.parent = parentElement;
      this.pad = pad;
      this.colors = [
        "red",
        "pink",
        "green",
        "blue",
        "black",
        "brown",
        "crimson",
        "Coral"
      ];
      this.width = 20;
      this.height = 20;
      this.speed = Math.ceil(Math.random() * 15);
      this.left = Math.floor(Math.random() * parentElement.offsetWidth);
      this.top = 0;
      this.bomb = document.createElement("div");
      this.bomb.style.width = this.width + "px";
      this.bomb.style.height = this.height + "px";
      this.bomb.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.bomb.style.border = "1px solid black";
      this.bomb.style.borderRadius = "50%";
      this.bomb.style.position = "absolute";
      this.bomb.style.left = this.left + "px";
      this.isDropping = false;
      parentElement.appendChild(this.bomb);
      this.destruction = void 0;
      this.dropping = void 0;
      this.hitting = void 0;
    }
    removeFromDom() {
      this.bomb.remove();
      clearInterval(this.destruction);
      clearInterval(this.dropping);
      clearInterval(this.hitting);
    }
    get coordinates() {
      return {
        left: this.bomb.getClientRects()[0].left,
        right: this.bomb.getClientRects()[0].right,
        top: this.bomb.getClientRects()[0].top,
        bottom: this.bomb.getClientRects()[0].bottom
      };
    }
    autoDestruction() {
      this.destruction = setInterval(() => {
        if (this.isDropping) {
          const shouldExplode = Math.floor(Math.random() * 100) === 0;
          if (shouldExplode) {
            this.removeFromDom();
          }
          if (this.top > this.parent.offsetHeight) {
            this.removeFromDom();
          }
        }
      }, 1e3);
    }
    startDropping() {
      this.isDropping = true;
      this.dropping = setInterval(() => {
        this.bomb.style.top = this.top + "px";
        this.top += this.speed;
      }, 500);
    }
    isPadHit() {
      if (this.coordinates.top >= this.pad.coordinates.top && this.coordinates.left >= this.pad.coordinates.left && this.coordinates.right <= this.pad.coordinates.right) {
        return true;
      }
      return false;
    }
    hit() {
      this.hitting = setInterval(() => {
        if (this.isPadHit()) {
          this.removeFromDom();
        }
      }, 100);
    }
  };

  // src/Bomber.ts
  var Bomber = class {
    constructor(myPad, canvas) {
      this.pad = myPad;
      this.canvas = canvas;
      this.releasedBombCount = 0;
    }
    releaseBomb() {
      if (this.releasedBombCount < 10) {
        const newBomb = new Bomb(this.canvas, this.pad);
        this.releasedBombCount += 1;
        newBomb.startDropping();
        newBomb.autoDestruction();
        newBomb.hit();
      }
    }
    startDroppingBombs() {
      setInterval(() => {
        this.releaseBomb();
      }, 3e3);
    }
  };

  // src/Pad.ts
  var Pad = class {
    constructor(parentElement) {
      this.parentElement = parentElement;
      this.width = 200;
      this.height = 20;
      this.speed = 5;
      this.pad = document.createElement("div");
      this.pad.style.width = this.width + "px";
      this.pad.style.height = this.height + "px";
      this.pad.style.border = "1px solid black";
      this.pad.style.backgroundColor = "yellow";
      this.pad.style.position = "absolute";
      this.right = 5;
      this.bottom = 10;
      this.pad.style.bottom = this.bottom + "px";
      this.pad.style.right = this.right + "px";
      parentElement.appendChild(this.pad);
    }
    get padWidth() {
      return this.width;
    }
    get padRight() {
      return this.right;
    }
    get top() {
      return this.pad.getClientRects()[0].top;
    }
    get coordinates() {
      return {
        left: this.pad.getClientRects()[0].left,
        right: this.pad.getClientRects()[0].right,
        top: this.pad.getClientRects()[0].top,
        bottom: this.pad.getClientRects()[0].bottom
      };
    }
    moveRight() {
      if (this.pad.getBoundingClientRect().right - this.parentElement.getBoundingClientRect().right > 1)
        return;
      this.pad.style.right = this.right - this.speed + "px";
      this.right = this.right - this.speed;
    }
    moveLeft() {
      if (this.pad.getBoundingClientRect().left - this.parentElement.getBoundingClientRect().left < 1)
        return;
      this.pad.style.right = this.right + this.speed + "px";
      this.right = this.right + this.speed;
    }
    increaseSpeed() {
      this.speed += 5;
      if (this.speed > 25)
        this.speed = 25;
    }
    decreaseSpeed() {
      if (this.speed - 5 <= 0) {
        this.speed = 1;
      } else {
        this.speed -= 5;
      }
    }
    get currentSpeed() {
      return this.speed.toString();
    }
  };

  // src/Control.ts
  var Control = class {
    constructor() {
      this.canvas = document.getElementById("canvas");
      this.pad = new Pad(this.canvas);
      this.bomber = new Bomber(this.pad, this.canvas);
    }
    startGame() {
      this.bomber.startDroppingBombs();
    }
    increasePadSpeed() {
      this.pad.increaseSpeed();
    }
    decreasePadSpeed() {
      this.pad.decreaseSpeed();
    }
    movePadLeft() {
      this.pad.moveLeft();
    }
    movePadRight() {
      this.pad.moveRight();
    }
  };

  // src/index.ts
  var gameController = new Control();
  gameController.startGame();
  function handleKeyPress(e) {
    const { key } = e;
    switch (key) {
      case "ArrowLeft":
        return gameController.movePadLeft();
      case "ArrowRight":
        return gameController.movePadRight();
      case "ArrowUp":
        return gameController.increasePadSpeed();
      case "ArrowDown":
        return gameController.decreasePadSpeed();
      default:
        return;
    }
  }
  document.addEventListener("keydown", handleKeyPress);
})();
