import { Bomb } from './Bomb';
import { Pad } from './Pad';

export class Bullet {
  parent: HTMLElement;
  bullet: HTMLElement;
  left: number;
  top: number;
  speed: number;
  width: number;
  height: number;
  intervalHandle: number | undefined;

  constructor(parentElement: HTMLElement, pad: Pad) {
    this.parent = parentElement; // This is the canvas
    this.width = 5; // px
    this.height = 15; // px

    const canvasRect = this.parent.getBoundingClientRect();
    const padViewportCoords = pad.coordinates; // These are viewport-relative

    // Calculate bullet's initial position relative to the canvas
    this.left = padViewportCoords.left + (pad.width / 2) - (this.width / 2) - canvasRect.left;
    this.top = padViewportCoords.top - this.height - canvasRect.top;

    this.speed = 10; // px per interval

    this.bullet = document.createElement('div');
    this.bullet.setAttribute('class', 'bullet');
    this.bullet.style.width = this.width + 'px';
    this.bullet.style.height = this.height + 'px';
    this.bullet.style.backgroundColor = 'white';
    this.bullet.style.position = 'absolute';
    this.bullet.style.left = this.left + 'px'; // This is now canvas-relative
    this.bullet.style.top = this.top + 'px';   // This is now canvas-relative
    this.parent.appendChild(this.bullet);
    this.startMoving();
  }

  private startMoving() {
    this.intervalHandle = setInterval(() => {
      this.top -= this.speed;
      this.bullet.style.top = this.top + 'px';

      if (this.top < 0) {
        this.remove();
      }
    }, 20); // Adjust interval for speed
  }

  public get coordinates() {
    const rect = this.bullet.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
    };
  }

  public remove() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = undefined;
    }
    this.bullet.remove();
  }

  public hasHitBomb(bomb: Bomb): boolean {
    const bombCoords = bomb.coordinates;
    const bulletCoords = this.coordinates;

    if (bomb.isExploded) {
      return false;
    }

    const hit =
      bulletCoords.left < bombCoords.right &&
      bulletCoords.right > bombCoords.left &&
      bulletCoords.top < bombCoords.bottom &&
      bulletCoords.bottom > bombCoords.top;

    return hit;
  }
}
