/**
 * Represents a status bar in the game, which visually displays a percentage.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /**
   * An array of image paths that represent different states of the status bar.
   * @type {string[]}
   */
  IMAGES = [];

  /**
   * The percentage value that the status bar currently represents.
   * @type {number}
   */
  percentage = 100;

  /**
   * Initializes a new instance of the StatusBar class.
   */
  constructor() {
    super().loadImages(this.IMAGES);
    this.x = 50;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage of the status bar and updates its visual representation.
   * @param {number} percentage - The percentage value to set (from 0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image in the IMAGES array based on the current percentage.
   * @returns {number} - Index of the appropriate image for the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
