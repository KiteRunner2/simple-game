import { gameController } from "./GameController";

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

export function initDocumentListeners() {
  document.addEventListener("keydown", handleKeyPress);
}

function startGame() {
  gameController.startGame();
}

export function initElementListeners() {
  document
    .getElementById("start-game-button")
    ?.addEventListener("click", startGame);
}
