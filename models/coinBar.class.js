/**
 * Represents a status bar displaying the collected coins in the game.
 * @extends StatusBar
 */
class CoinBar extends StatusBar {
  /**
   * The image paths for various coin statuses.
   * @type {string[]}
   */

  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * Initializes a new instance of the CoinBar class.
   */
  constructor() {
    super().loadImages(this.IMAGES);

    /**
     * The x-coordinate of the CoinBar.
     * @type {number}
     */
    this.x = 50;

    /**
     * The y-coordinate of the CoinBar.
     * @type {number}
     */
    this.y = 40;

    /**
     * The width of the CoinBar.
     * @type {number}
     */
    this.width = 200;

    /**
     * The height of the CoinBar.
     * @type {number}
     */
    this.height = 60;
    this.setPercentage(0);
  }
}
