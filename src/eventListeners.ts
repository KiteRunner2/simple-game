import { gameController } from './GameController';

// This object will hold the state of currently pressed keys
export const keyStates: { [key: string]: boolean } = {
  ArrowLeft: false,
  ArrowRight: false,
  // Space is not needed here for state tracking as shooting is a discrete event
};

function handleKeyDown(e: KeyboardEvent) {
  const { key } = e;

  // Update key states for movement keys
  if (key === 'ArrowLeft') {
    keyStates.ArrowLeft = true;
  } else if (key === 'ArrowRight') {
    keyStates.ArrowRight = true;
  }

  // Handle discrete actions like shooting or one-time speed changes
  switch (key) {
    case 'ArrowUp':
      gameController.increasePadSpeed(); // Assuming this is a one-time action per press
      break;
    case 'ArrowDown':
      gameController.decreasePadSpeed(); // Assuming this is a one-time action per press
      break;
    case ' ': // Space bar
      e.preventDefault(); // Prevent default space bar action (e.g., scrolling)
      gameController.shoot(); // Shoot action remains directly called
      break;
  }
}

function handleKeyUp(e: KeyboardEvent) {
  const { key } = e;

  // Update key states for movement keys
  if (key === 'ArrowLeft') {
    keyStates.ArrowLeft = false;
  } else if (key === 'ArrowRight') {
    keyStates.ArrowRight = false;
  }
}

export function initDocumentListeners() {
  // Remove previous listener if any, then add new ones
  
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
}

function startGame() {
  gameController.startGame();
}

export function initElementListeners() {
  document.getElementById('start-game-button')?.addEventListener('click', startGame);
}
