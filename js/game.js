let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game's settings.
 * Hides the start and end screens and sets up the game world.
 */
function init() {
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("endScreen").classList.add("d-none");
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);
}

// Attach touch-based event listeners once the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  /**
   * Handler for touchstart event on the left arrow.
   * @param {Event} e - The touchstart event object.
   */
  document.getElementById("leftArrow").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  /**
   * Handler for touchstart event on the right arrow.
   * @param {Event} e - The touchstart event object.
   */
  document.getElementById("rightArrow").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  /**
   * Handler for touchstart event on the jump button.
   * @param {Event} e - The touchstart event object.
   */
  document.getElementById("jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  /**
   * Handler for touchstart event on the throw button.
   * @param {Event} e - The touchstart event object.
   */
  document.getElementById("throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  /**
   * Handler for touchend event on the left arrow.
   * @param {Event} e - The touchstart event object.
   */
  document.getElementById("leftArrow").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  /**
   * Handler for touchend event on the right arrow.
   * @param {Event} e - The touchend event object.
   */
  document.getElementById("rightArrow").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  /**
   * Handler for touchstart event on the jump button.
   * @param {Event} e - The touchend event object.
   */
  document.getElementById("jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  /**
   * Handler for touchstart event on the throw button.
   * @param {Event} e - The touchend event object.
   */
  document.getElementById("throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
});

// Event listeners to handle keyboard input

/**
 * Handler for the keydown event.
 * Maps certain key codes to actions in the game.
 * @param {KeyboardEvent} e - The keydown event object.
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

/**
 * Handler for the keyup event.
 * Resets certain actions in the game when the respective keys are released.
 * @param {KeyboardEvent} e - The keyup event object.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
