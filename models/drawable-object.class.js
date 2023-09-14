/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
  /**
   * The x-coordinate of the object.
   * @type {number}
   */
  x = 120;

  /**
   * The y-coordinate of the object.
   * @type {number}
   */
  y = 190;

  /**
   * Image object representing the appearance of the object.
   * @type {Image}
   */
  img;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 250;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 150;

  /**
   * Cache of images to be used by the object.
   * @type {Object}
   */
  imageCache = {};

  /**
   * Index of the current image being used by the object.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Loads an image for the object.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images for the object.
   * @param {Array} arr - An array of paths to image files.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the object on the canvas if the object is an instance of Character, Chicken, or Coins.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Coins
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
