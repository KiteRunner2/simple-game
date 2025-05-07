import { Bomber } from './Bomber';
import { Pad } from './Pad';
import { Bullet } from './Bullet';
import { Bomb } from './Bomb';
import { keyStates } from './eventListeners'; // Added import

class GameController {
  canvas: HTMLElement;
  pad: Pad;
  bomber: Bomber;
  bullets: Bullet[];
  constructor() {
    this.canvas = document.getElementById('canvas')!;
    this.pad = this.createPad();
    this.bomber = this.createBomber();
    this.bullets = [];
    this.updateHitCount();
    this.updateMissCount();
    this.startGameLoop();
  }

  startGame() {
    this.bomber.startDroppingBombs();
  }

  shoot() {
    const newBullet = new Bullet(this.canvas, this.pad);
    this.bullets.push(newBullet);
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

  movePadUp() {
    this.pad.moveUp();
  }
  movePadDown() {
    this.pad.moveDown();
  }

  createBomber() {
    return new Bomber(this.pad, this.canvas);
  }

  createPad() {
    return new Pad(this.canvas);
  }

  get hitCount() {
    return this.bomber.hitCount;
  }

  get missCount() {
    return this.bomber.missCount;
  }

  updateHitCount() {
    setInterval(() => {
      document.getElementById('hit-count')!.innerText = `HITS: ${this.hitCount}`;
    }, 100);
  }

  updateMissCount() {
    setInterval(() => {
      document.getElementById('miss-count')!.innerText = `MISS: ${this.missCount}`;
    }, 100);
  }

  startGameLoop() {
    setInterval(() => {
      this.handlePadMovement(); // Added call
      this.checkCollisions();
    }, 50); // Check for collisions frequently
  }

  handlePadMovement() { // Added method
    if (keyStates.ArrowLeft) {
      this.pad.moveLeft();
    }
    if (keyStates.ArrowRight) {
      this.pad.moveRight();
    }
  }

  checkCollisions() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      if (!bullet) { 
        continue;
      }
      let bulletHitSomething = false;

      for (let j = this.bomber.bombs.length - 1; j >= 0; j--) {
        const bomb = this.bomber.bombs[j];
        if (!bomb) { 
            continue;
        }

        if (bullet.hasHitBomb(bomb)) {
          bomb.explode();
          this.bomber.bombs.splice(j, 1);
          bulletHitSomething = true;
          break; 
        }
      }

      if (bulletHitSomething) {
        bullet.remove();
        this.bullets.splice(i, 1);
      } else if (bullet.top < 0) {
        bullet.remove();
        this.bullets.splice(i, 1);
      }
    }
  }
}

export const gameController = new GameController();
