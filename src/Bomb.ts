import { Pad } from "./Pad";
export class Bomb {
  parent: HTMLElement;
  bomb: HTMLElement;
  pad: Pad;
  colors: string[];
  speed: number;
  top: number;
  left: number;
  isDropping: boolean;
  destructionIntervalHandle: number | undefined;
  droppingIntervalHandle: number | undefined;
  hittingIntervalHandle: number | undefined;
  maxBombSpeed: number;
  intervalHandlesList: number[];

  constructor(parentElement: HTMLElement, pad: Pad) {
    this.parent = parentElement;
    this.intervalHandlesList = [];
    this.pad = pad;
    this.maxBombSpeed = 15;
    this.isDropping = false;
    this.destructionIntervalHandle = undefined;
    this.droppingIntervalHandle = undefined;
    this.hittingIntervalHandle = undefined;
    this.top = 5;
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
    this.speed = this.getInitialSpeed(15);
    this.left = this.getInitialPosition();
    this.bomb = document.createElement("div");
    this.bomb.setAttribute("class", "bomb");
    this.bomb.style.backgroundColor = this.getBombColor();
    this.bomb.style.left = this.left + "px";
    parentElement.appendChild(this.bomb);
  }

  getInitialSpeed(maxSpeed: number) {
    return Math.ceil(Math.random() * maxSpeed);
  }

  getBombColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  getInitialPosition() {
    return Math.floor(Math.random() * this.parent.offsetWidth);
  }

  removeFromDom() {
    this.bomb.remove();
    this.clearAllIntervalHandles();
  }

  get coordinates() {
    return {
      left: this.bomb.getClientRects()[0].left,
      right: this.bomb.getClientRects()[0].right,
      top: this.bomb.getClientRects()[0].top,
      bottom: this.bomb.getClientRects()[0].bottom,
    };
  }

  autoDestruction() {
    this.destructionIntervalHandle = setInterval(() => {
      if (this.isDropping) {
        const shouldExplode = Math.floor(Math.random() * 100) === 0;
        if (shouldExplode) {
          this.removeFromDom();
        }
        if (this.top > this.parent.offsetHeight) {
          this.removeFromDom();
        }
      }
    }, 1000);
    this.intervalHandlesList.push(this.destructionIntervalHandle);
  }

  startDropping() {
    this.isDropping = true;
    this.droppingIntervalHandle = setInterval(() => {
      this.bomb.style.top = this.top + "px";
      this.top += this.speed;
    }, 500);
    this.intervalHandlesList.push(this.droppingIntervalHandle);
  }

  isPadHit() {
    if (
      this.coordinates.top >= this.pad.coordinates.top &&
      this.coordinates.left >= this.pad.coordinates.left &&
      this.coordinates.right <= this.pad.coordinates.right
    ) {
      return true;
    }
    return false;
  }

  hit() {
    this.hittingIntervalHandle = setInterval(() => {
      if (this.isPadHit()) {
        this.removeFromDom();
      }
    }, 100);
    this.intervalHandlesList.push(this.hittingIntervalHandle);
  }

  private clearAllIntervalHandles() {
    this.intervalHandlesList.forEach((interval) => clearInterval(interval));
  }
}
