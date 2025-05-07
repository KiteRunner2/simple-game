import { Pad } from './Pad';
import { Bomber } from './Bomber';
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
  isExploded: boolean; // Corrected typo: isExploaded -> isExploded
  destructionIntervalHandle: number | undefined;
  droppingIntervalHandle: number | undefined;
  hittingIntervalHandle: number | undefined;
  maxBombSpeed: number;
  intervalHandlesList: number[];
  isCaught: boolean; // Added to prevent multiple processing

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
    this.isExploded = false; // Corrected typo and ensure it's initialized
    this.isCaught = false; // Initialize isCaught
    this.bomber = bomber;
    this.colors = ['#ff5757', '#5ce1e6', '#c957ff', '#8eff70', '#ffde59', '#ff914d', '#5271ff', '#ff66c4'];
    this.droppingSpeed = this.getInitialSpeed(15);
    this.left = this.getInitialPosition();
    this.bomb = document.createElement('div');
    this.bomb.setAttribute('class', 'bomb');
    this.bomb.style.backgroundColor = this.getBombColor();
    this.bomb.style.left = this.left + 'px';
    parentElement.appendChild(this.bomb);
    this.startDropping();
  }

  public explode() {
    this.isExploded = true; // Corrected typo
    this.clearAllIntervalHandles();
    this.bomb.classList.add('bomb-exploding'); // Add CSS class for explosion animation

    // Remove the bomb after the animation duration (e.g., 500ms)
    setTimeout(() => {
      this.removeFromDom(false);
    }, 500);
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

  private animateCatchAndRemove() {
    this.isCaught = true;
    this.clearAllIntervalHandles(); // Stop movement and other checks
    this.bomb.classList.add('bomb-caught'); // Add CSS class for animation

    // Remove the bomb after the animation duration (e.g., 300ms)
    setTimeout(() => {
      this.removeFromDom(false); // Pass false to skip clearing intervals again
    }, 300);
  }

  removeFromDom(clearHandles: boolean = true) {
    this.bomb.remove();
    if (clearHandles) {
      this.clearAllIntervalHandles();
    }
  }

  public get coordinates() {
    if (!this.bomb || !this.bomb.isConnected) {
      return { left: -Infinity, right: -Infinity, top: -Infinity, bottom: -Infinity };
    }
    const rects = this.bomb.getClientRects();
    // Add extra checks for rects and rects[0]
    if (!rects || rects.length === 0 || !rects[0]) {
      return { left: -Infinity, right: -Infinity, top: -Infinity, bottom: -Infinity };
    }
    const rect = rects[0]; // rects[0] should be valid here
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
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
      this.bomb.style.top = this.top + 'px';
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
      if (this.isCaught) return; // Already caught, do nothing

      if (this.isPadHit()) {
        this.bomber.increaseHitCount(); // Correctly count as a hit
        this.animateCatchAndRemove();
      } else if (this.isTargetHit() && !this.isExploded) { // Corrected typo
        this.isExploded = true; // Mark as exploded (missed)
        this.bomber.increaseMissCount(); // Correctly count as a miss
        this.removeFromDom();
      }
    }, 50); // Check more frequently for smoother hit detection
    this.intervalHandlesList.push(this.hittingIntervalHandle);
  }

  private clearAllIntervalHandles() {
    this.intervalHandlesList.forEach((interval) => clearInterval(interval));
  }
}
