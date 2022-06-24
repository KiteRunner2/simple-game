class Bomb {
  constructor(parentElement) {
    this.parent = parentElement;
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
    this.destruction = null;
    this.dropping = null;
  }

  removeFromDom() {
    this.bomb.remove();
    clearInterval(this.destruction);
    clearInterval(this.dropping);
  }

  autoDestruction() {
    this.destruction = setInterval(() => {
      if (this.isDropping) {
        const shouldExplode = Math.floor(Math.random() * 100) === 0;
        if (shouldExplode) {
          this.removeFromDom();
        }
        if (this.top > this.parent.offsetHeight) {
          console.log(this.top, this.parent.offsetHeight);
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
}
