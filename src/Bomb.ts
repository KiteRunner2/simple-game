import { Pad } from "./Pad";
import { Bomber } from "./Bomber";
export class Bomb {
  parent: HTMLElement;
  bomb: HTMLElement;
  bomber: Bomber;
  pad: Pad;
  colors: string[];
  droppingSpeed: number;
  top: number;
  left: number;
  isDropping: boolean;
  isExploaded: boolean;
  destructionIntervalHandle: number | undefined;
  droppingIntervalHandle: number | undefined;
  hittingIntervalHandle: number | undefined;
  maxBombSpeed: number;
  intervalHandlesList: number[];

  constructor(parentElement: HTMLElement, pad: Pad, bomber: Bomber) {
    this.parent = parentElement;
    this.intervalHandlesList = [];
    this.pad = pad;
    this.maxBombSpeed = 15;
    this.isDropping = false;
    this.destructionIntervalHandle = undefined;
    this.droppingIntervalHandle = undefined;
    this.hittingIntervalHandle = undefined;
    this.top = 5;
    this.isExploaded = false;
    this.bomber = bomber;
    this.colors = [
      "red",
      "pink",
      "green",
      "blue",
      "black",
      "brown",
      "crimson",
      "Coral",
    ];
    this.droppingSpeed = this.getInitialSpeed(15);
    this.left = this.getInitialPosition();
    this.bomb = document.createElement("div");
    this.bomb.setAttribute("class", "bomb");
    this.bomb.style.backgroundColor = this.getBombColor();
    this.bomb.style.left = this.left + "px";
    parentElement.appendChild(this.bomb);
    this.startDropping();
  }

  private getInitialSpeed(maxSpeed: number) {
    return Math.ceil(Math.random() * maxSpeed);
  }

  private getBombColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  private getInitialPosition() {
    return Math.floor(Math.random() * this.parent.offsetWidth);
  }

  removeFromDom() {
    this.bomb.remove();
    this.clearAllIntervalHandles();
  }

  public get coordinates() {
    return {
      left: this.bomb.getClientRects()[0].left,
      right: this.bomb.getClientRects()[0].right,
      top: this.bomb.getClientRects()[0].top,
      bottom: this.bomb.getClientRects()[0].bottom,
    };
  }

  private enableAutoDestruction() {
    this.destructionIntervalHandle = setInterval(() => {
      if (this.isDropping) {
        const shouldExplode = Math.floor(Math.random() * 100) === 0;
        if (shouldExplode) {
          this.bomber.increaseAutoDestroyCount();
          this.removeFromDom();
        }
        if (this.top > this.parent.offsetHeight) {
          this.removeFromDom();
        }
      }
    }, 1000);
    this.intervalHandlesList.push(this.destructionIntervalHandle);
  }

  private startDropping() {
    this.isDropping = true;
    this.droppingIntervalHandle = setInterval(() => {
      this.bomb.style.top = this.top + "px";
      this.top += this.droppingSpeed;
    }, 500);
    this.intervalHandlesList.push(this.droppingIntervalHandle);
    this.enableAutoDestruction();
    this.enableHitDetector();
  }

  isPadHit() {
    if (
      this.coordinates.bottom >= this.pad.coordinates.top &&
      this.coordinates.left >= this.pad.coordinates.left &&
      this.coordinates.right <= this.pad.coordinates.right
    ) {
      return true;
    }
    return false;
  }

  isTargetHit() {
    if (this.coordinates.bottom > this.pad.coordinates.bottom) return true;
    return false;
  }

  private enableHitDetector() {
    this.hittingIntervalHandle = setInterval(() => {
      if (this.isPadHit()) {
        this.bomber.increaseMissCount();
        this.removeFromDom();
      } else if (this.isTargetHit() && !this.isExploaded) {
        this.isExploaded = true;
        this.bomber.increaseHitCount();
      }
    }, 100);
    this.intervalHandlesList.push(this.hittingIntervalHandle);
  }

  private clearAllIntervalHandles() {
    this.intervalHandlesList.forEach((interval) => clearInterval(interval));
  }
}
