export class Pad {
  parentElement: HTMLElement;
  pad: HTMLElement;
  width: number;
  height: number;
  speed: number;
  right: number;
  bottom: number;
  constructor(parentElement: HTMLElement) {
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
    // console.log("mypad.top", this.pad.getClientRects());
    return this.pad.getClientRects()[0].top;
  }

  get coordinates() {
    return {
      left: this.pad.getClientRects()[0].left,
      right: this.pad.getClientRects()[0].right,
      top: this.pad.getClientRects()[0].top,
      bottom: this.pad.getClientRects()[0].bottom,
    };
  }

  moveRight() {
    // console.log(
    //   "moving right",
    //   this.pad.getBoundingClientRect().right -
    //     this.parentpad.getBoundingClientRect().right
    // );
    if (
      this.pad.getBoundingClientRect().right -
        this.parentElement.getBoundingClientRect().right >
      1
    )
      return;
    this.pad.style.right = this.right - this.speed + "px";
    this.right = this.right - this.speed;
    // console.log(this.parentpad.getBoundingClientRect().top);
    // console.log(this.parentpad.getBoundingClientRect().left);
    // console.log(this.parentpad.getBoundingClientRect().right);
    // console.log(this.parentpad.getBoundingClientRect().bottom);
  }

  moveLeft() {
    // console.log(
    //   "moving left",
    //   this.pad.getBoundingClientRect().left -
    //     this.parentpad.getBoundingClientRect().left
    // );
    if (
      this.pad.getBoundingClientRect().left -
        this.parentElement.getBoundingClientRect().left <
      1
    )
      return;
    this.pad.style.right = this.right + this.speed + "px";
    this.right = this.right + this.speed;
  }

  increaseSpeed() {
    this.speed += 5;
    if (this.speed > 25) this.speed = 25;
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
}
