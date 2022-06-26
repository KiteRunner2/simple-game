import { Pad } from "./Pad";
export class Bomb {
  parent: HTMLElement;
  bomb: HTMLElement;
  pad: Pad;
  colors: string[];
  width: number;
  height: number;
  speed: number;
  top: number;
  left: number;
  isDropping: boolean;
  destruction: number | undefined;
  dropping: number | undefined;
  hitting: number | undefined;
  constructor(parentElement: HTMLElement, pad: Pad) {
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
      "Coral",
    ];
    this.width = 20;
    this.height = 20;
    this.speed = Math.ceil(Math.random() * 15);
    this.left = Math.floor(Math.random() * parentElement.offsetWidth);
    this.top = 0;
    this.bomb = document.createElement("div");
    this.bomb.style.width = this.width + "px";
    this.bomb.style.height = this.height + "px";
    this.bomb.style.backgroundColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];
    this.bomb.style.border = "1px solid black";
    this.bomb.style.borderRadius = "50%";
    this.bomb.style.position = "absolute";
    this.bomb.style.left = this.left + "px";
    this.isDropping = false;
    parentElement.appendChild(this.bomb);
    this.destruction = undefined;
    this.dropping = undefined;
    this.hitting = undefined;
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
      bottom: this.bomb.getClientRects()[0].bottom,
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
    }, 1000);
  }

  startDropping() {
    this.isDropping = true;
    this.dropping = setInterval(() => {
      this.bomb.style.top = this.top + "px";
      this.top += this.speed;
    }, 500);
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
    this.hitting = setInterval(() => {
      if (this.isPadHit()) {
        this.removeFromDom();
      }
    }, 100);
  }
}
