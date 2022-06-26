import { Bomber } from "./Bomber";
import { Pad } from "./Pad";

class GameController {
  canvas: HTMLElement;
  pad: Pad;
  bomber: Bomber;
  constructor() {
    this.canvas = document.getElementById("canvas")!;
    this.pad = this.createPad();
    this.bomber = this.createBomber();
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

  createBomber() {
    return new Bomber(this.pad, this.canvas);
  }

  createPad() {
    return new Pad(this.canvas);
  }
}

export const gameController = new GameController();
