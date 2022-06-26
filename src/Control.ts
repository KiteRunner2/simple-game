import { Bomber } from "./Bomber";
import { Pad } from "./Pad";

export class Control {
  canvas: HTMLElement;
  pad: Pad;
  bomber: Bomber;
  constructor() {
    this.canvas = document.getElementById("canvas")!;
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
}
