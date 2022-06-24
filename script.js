const canvas = document.getElementById("canvas");
const speedmeter = document.getElementById("speed");

const myPad = new Pad(canvas);
const bomber = new Bomber();
bomber.startDroppingBombs();
speedmeter.innerHTML = myPad.currentSpeed;

function handleKeyPress(e) {
  const { key } = e;
  switch (key) {
    case "ArrowLeft":
      return myPad.moveLeft();
    case "ArrowRight":
      return myPad.moveRight();
    case "ArrowUp":
      return myPad.increaseSpeed();
    case "ArrowDown":
      return myPad.decreaseSpeed();
    default:
      return;
  }
}
document.addEventListener("keydown", handleKeyPress);
