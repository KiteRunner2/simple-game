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
    this.updateHitCount();
    this.updateMissCount();
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

  get hitCount() {
    return this.bomber.hitCount;
  }

  get missCount() {
    return this.bomber.missCount;
  }

  updateHitCount() {
    setInterval(() => {
      document.getElementById(
        "hit-count"
      )!.innerText = `HITS: ${this.hitCount}`;
    }, 100);
  }

  updateMissCount() {
    setInterval(() => {
      document.getElementById(
        "miss-count"
      )!.innerText = `MISS: ${this.missCount}`;
    }, 100);
  }
}

export const gameController = new GameController();
