import { Control } from "./Control";

const gameController = new Control();

gameController.startGame();

const testSomethingDiv = document.getElementById("test-something");

testSomethingDiv.innerHTML = "Hello mamam!";

function handleKeyPress(e: KeyboardEvent) {
  const { key } = e;
  switch (key) {
    case "ArrowLeft":
      return gameController.movePadLeft();
    case "ArrowRight":
      return gameController.movePadRight();
    case "ArrowUp":
      return gameController.increasePadSpeed();
    case "ArrowDown":
      return gameController.decreasePadSpeed();
    default:
      return;
  }
}
document.addEventListener("keydown", handleKeyPress);
