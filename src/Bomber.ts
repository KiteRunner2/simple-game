import { Bomb } from "./Bomb.js";
import { Pad } from "./Pad.js";

export class Bomber {
  pad: Pad;
  canvas: HTMLElement;
  releasedBombCount: number;
  constructor(myPad: Pad, canvas: HTMLElement) {
    this.pad = myPad;
    this.canvas = canvas;
    this.releasedBombCount = 0;
  }

  releaseBomb() {
    const newBomb = new Bomb(this.canvas, this.pad);
    this.releasedBombCount += 1;
    newBomb.startDropping();
    newBomb.autoDestruction();
    newBomb.hit();
  }

  startDroppingBombs() {
    setInterval(() => {
      this.releaseBomb();
    }, 3000);
  }
}
