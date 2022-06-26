import { Control } from "./Control";

const gameController = new Control();

gameController.startGame();

const test = document.getElementById("test-something")!;

test.innerHTML = "TESTED";

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
