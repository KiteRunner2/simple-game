class Bomber {
  constructor() {
    this.bombs = [];
  }

  releaseBomb() {
    const newBomb = new Bomb(canvas);
    newBomb.startDropping();
    newBomb.autoDestruction();
  }

  startDroppingBombs() {
    setInterval(() => {
      this.releaseBomb();
    }, 3000);
  }
}
