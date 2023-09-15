/**
 * Represents the end boss of the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /**
   * Width of the end boss.
   * @type {number}
   */
  width = 250;

  /**
   * Height of the end boss.
   * @type {number}
   */
  height = 400;

  /**
   * Y-coordinate of the end boss.
   * @type {number}
   */
  y = 50;

  /**
   * Speed of the end boss.
   * @type {number}
   */
  speed = 15;

  /**
   * Whether the end boss had its first contact or not.
   * @type {boolean}
   */
  hadFirstContact = false;

  LEFT_BOUNDARY = 300;
  RIGHT_BOUNDARY = 2300;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Constructs the end boss, loads its images and sets its initial position.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2300;
    this.animate();
  }

    /**
   * Animates the end boss based on its state.
   */
    animate() {
      let i = 0;
      
      const animationInterval = 200;
      const interval = setInterval(() => {
        if (this.hadFirstContact) {
          this.moveTowardsBoundary(this.LEFT_BOUNDARY, false, () => this.hadFirstContact = false);
        } else {
          this.moveTowardsBoundary(this.RIGHT_BOUNDARY, true, () => this.hadFirstContact = true);
        }
  
        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.isDead()) {
          this.playAnimation(this.IMAGES_DEAD);
        } else {
          this.playRegularAnimations(i);
          i = (i < 20) ? i + 1 : 0;
        }
  
        if (world.character.x > 1600 && !this.hadFirstContact) {
          i = 0;
          this.hadFirstContact = true;
        }
      }, animationInterval);
    }
  
    moveTowardsBoundary(boundary, moveRight, callbackWhenReached) {
      if (moveRight) {
        this.otherDirection = true;
        this.moveRight();
        if (this.x >= boundary) {
          callbackWhenReached();
        }
      } else {
        this.otherDirection = false;
        this.moveLeft();
        if (this.x <= boundary) {
          callbackWhenReached();
        }
      }
    }
  
    playRegularAnimations(i) {
      const alertAnimationTrigger = 10;
      if (i < alertAnimationTrigger) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }

}
