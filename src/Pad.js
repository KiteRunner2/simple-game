class Pad {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.width = 200;
    this.height = 20;
    this.speed = 5;
    this.element = document.createElement("div");
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.border = "1px solid black";
    this.element.style.backgroundColor = "yellow";
    this.element.style.position = "absolute";
    this.right = 5;
    this.bottom = 10;
    this.element.style.bottom = this.bottom + "px";
    this.element.style.right = this.right + "px";
    parentElement.appendChild(this.element);
  }

  moveRight() {
    // console.log(
    //   "moving right",
    //   this.element.getBoundingClientRect().right -
    //     this.parentElement.getBoundingClientRect().right
    // );
    if (
      this.element.getBoundingClientRect().right -
        this.parentElement.getBoundingClientRect().right >
      1
    )
      return;
    this.element.style.right = this.right - this.speed + "px";
    this.right = this.right - this.speed;
    // console.log(this.parentElement.getBoundingClientRect().top);
    // console.log(this.parentElement.getBoundingClientRect().left);
    // console.log(this.parentElement.getBoundingClientRect().right);
    // console.log(this.parentElement.getBoundingClientRect().bottom);
  }

  moveLeft() {
    // console.log(
    //   "moving left",
    //   this.element.getBoundingClientRect().left -
    //     this.parentElement.getBoundingClientRect().left
    // );
    if (
      this.element.getBoundingClientRect().left -
        this.parentElement.getBoundingClientRect().left <
      1
    )
      return;
    this.element.style.right = this.right + this.speed + "px";
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
