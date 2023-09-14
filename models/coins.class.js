/**
 * Represents a collectible coin in the game.
 * @extends DrawableObject
 */
class Coins extends DrawableObject {
  /**
   * The width of the coin.
   * @type {number}
   */
  width = 150;

  /**
   * The height of the coin.
   * @type {number}
   */
  height = 150;

  /**
   * The y-coordinate of the coin.
   * @type {number}
   */
  y = 320;

  /**
   * Initializes a new instance of the Coins class.
   */
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");

    /**
     * The x-coordinate of the coin, randomly set between 500 and 700.
     * @type {number}
     */
    this.x = 300 + Math.random() * 1800;

    /**
     * The y-coordinate of the coin, randomly set between 50 and 320.
     * @type {number}
     */
    this.y = 50 + Math.random() * 270;
  }
}
