/**
 * Represents a bottle in the game world which can be drawn.
 * Extends the DrawableObject class.
 */
class Bottle extends DrawableObject {

    /**
     * @property {number} width - The width of the bottle, default is 100.
     * @property {number} height - The height of the bottle, default is 100.
     * @property {number} y - The y-coordinate for this bottle, default is 320.
     */
    width = 100;
    height = 100;
    y = 320;

    /**
     * Creates a new Bottle.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        
        /**
         * @property {number} x - The x-coordinate for this bottle. Set to a random value between 300 and 2100.
         */
        this.x = 300 + Math.random() * 1800; // Zahl zwischen 500 und 700
    }
}
