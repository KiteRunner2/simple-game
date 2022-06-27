import { gameController } from "./GameController";
import { BASE_URL, SERVER_TOKEN } from "../env";

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

async function doCheck() {
  const url = `${BASE_URL}user/przemek+prof@kritik.io/exist?token=${SERVER_TOKEN}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}

export function initElementListeners() {
  document
    .getElementById("start-game-button")
    ?.addEventListener("click", startGame);
  document.getElementById("do-check")?.addEventListener("click", doCheck);
}
