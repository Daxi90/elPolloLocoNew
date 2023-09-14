/**
 * Represents a background object in the game world which can be moved.
 * Extends the MovableObject class.
 */
class BackgroundObject extends MovableObject {

    /**
     * @property {number} width - The width of the background object, default is 720.
     * @property {number} height - The height of the background object, default is 480.
     */
    width = 720;
    height = 480;

    /**
     * Creates a new BackgroundObject.
     * @param {string} imagePath - The path to the image resource for this background object.
     * @param {number} x - The initial x-coordinate for this background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        
        /**
         * @property {number} y - The y-coordinate for this background object. Set to the difference of canvas height and the object's height.
         */
        this.y = 480 - this.height;

        /**
         * @property {number} x - The x-coordinate for this background object. Set based on the provided parameter.
         */
        this.x = x;
    }
}
