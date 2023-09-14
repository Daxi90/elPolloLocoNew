/**
 * Represents a moving cloud in the game's background.
 */
class Cloud extends MovableObject {
  /**
   * The y-coordinate of the cloud. Always set to 20.
   * @type {number}
   */
  y = 20;

  /**
   * The width of the cloud. Always set to 450.
   * @type {number}
   */
  width = 450;

  /**
   * The height of the cloud. Always set to 250.
   * @type {number}
   */
  height = 250;

  /**
   * Initializes a new instance of the Cloud class.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    /**
     * Random x-coordinate for the cloud between 0 and 500.
     * @type {number}
     */
    this.x = Math.random() * 500; // Zahl zwischen 500 und 700

    this.animate();
  }

  /**
   * Animates the cloud movement from right to left.
   */
  animate() {
    setInterval(() => {
      if (this.x > -450) {
        this.moveLeft();
      } else {
        this.x = 3000;
      }
    }, 1000 / 60);
  }
}
