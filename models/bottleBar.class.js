/**
 * Represents a bottle status bar in the game.
 * Extends the StatusBar class.
 */
class BottleBar extends StatusBar {

    /**
     * @property {string[]} IMAGES - An array of paths to images that represent the various stages of the bottle status bar.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]

    /**
     * Creates a new BottleBar.
     */
    constructor() {
        super().loadImages(this.IMAGES);
        
        /**
         * @property {number} x - The x-coordinate for this bottle bar, default is 490.
         * @property {number} y - The y-coordinate for this bottle bar, default is 5.
         * @property {number} width - The width of the bottle bar, default is 200.
         * @property {number} height - The height of the bottle bar, default is 60.
         */
        this.x = 490;
        this.y = 5;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }
}
