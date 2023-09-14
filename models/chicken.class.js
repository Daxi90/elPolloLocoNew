
/**
 * Represents a chicken enemy in the game.
 * Extends the MovableObject class.
 */
class Chicken extends MovableObject{

     /** @property {number} y - The y-coordinate of the chicken. */
    y = 350;

    /** @property {number} height - The height of the chicken. */
    height = 80;

    /** @property {number} width - The width of the chicken. */
    width = 80;

    /** @property {number} energy - The energy or health of the chicken. */
    energy = 2;

    // Array of image paths representing the chicken's walking animation.
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
// Array of image paths representing the chicken's death animation.
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ]

  /**
   * Initializes a new instance of the Chicken class.
   */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        /** @property {number} x - The x-coordinate of the chicken, randomized between certain values. */
        this.x = 300 + Math.random() * 500; // Zahl zwischen 500 und 700

        /** @property {number} speed - The speed of the chicken's movement, randomized between certain values. */
        this.speed = 0.15 + Math.random() * 0.25;

        // Loads the images for walking and death animations.
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

  /**
   * Handles the animation and movement of the chicken.
   */
    animate() {

       // Animation for the chicken's death
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 50);
    
        // Movement to the left
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    
        // Animation for the chicken's walking
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}