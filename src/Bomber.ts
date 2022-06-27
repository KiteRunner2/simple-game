import { Bomb } from "./Bomb.js";
import { Pad } from "./Pad.js";

export class Bomber {
  pad: Pad;
  canvas: HTMLElement;
  releasedBombCount: number;
  private releaseInterval: number;
  private bombHitCount: number;
  private bombMissCount: number;
  autoDestroyCount: number;
  private bombsInAirList: Bomb[];
  constructor(myPad: Pad, canvas: HTMLElement) {
    this.pad = myPad;
    this.canvas = canvas;
    this.releasedBombCount = 0;
    this.releaseInterval = 5000;
    this.bombHitCount = 0;
    this.bombMissCount = 0;
    this.autoDestroyCount = 0;
    this.bombsInAirList = [];
  }

  private releaseBomb() {
    this.bombsInAirList.push(new Bomb(this.canvas, this.pad, this));
    this.releasedBombCount += 1;
  }

  public increaseHitCount() {
    this.bombHitCount += 1;
  }

  public increaseMissCount() {
    this.bombMissCount += 1;
  }

  public increaseAutoDestroyCount() {
    this.autoDestroyCount += 1;
  }

  startDroppingBombs() {
    setInterval(() => {
      this.releaseBomb();
    }, this.releaseInterval);
  }

  public get bombsInAir() {
    return this.bombsInAirList;
  }

  public get hitCount() {
    return this.bombHitCount;
  }

  public get missCount() {
    return this.bombMissCount;
  }
}
