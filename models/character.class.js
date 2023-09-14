/**
 * Represents the main character of the game.
 * Extends the MovableObject class.
 */
class Character extends MovableObject {

   /** @property {number} energy - The energy of the character. */
  energy = 50;

// Various arrays of image paths representing different character animations/states
  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ]

  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ]

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png"
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png"
  ]

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png"
  ]

  /** @property {object} world - Represents the game world in which the character resides. */
  world;

  /** @property {number} speed - The speed of the character movement. */
  speed = 5;

  /** @property {boolean} hasJumped - A flag that determines if the character has jumped. */
  hasJumped = false;

  /** @property {Audio} walking_sound - The sound played when the character is walking. */
  walking_sound = new Audio('audio/walking.mp3');

  /** @property {Audio} jump_sound - The sound played when the character jumps. */
  jump_sound = new Audio('audio/jump.mp3');

  /**
   * Initializes a new instance of the Character class.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");

    // Loads various character images for different animations/states
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Checks if the character is colliding with a given object within a buffer.
   * @param {object} object - The object to check for collision.
   * @param {number} [buffer=50] - The buffer distance for collision.
   * @returns {boolean} - Returns true if the character is colliding, false otherwise.
   */
  isCollidingWithBuffer(object, buffer = 50) {
    return this.x + buffer < object.x + object.width - buffer &&
           this.x + this.width - buffer > object.x + buffer &&
           this.y + buffer < object.y + object.height - buffer &&
           this.y + this.height - buffer > object.y + buffer;
  }

    /**
   * Animates the character based on its actions and the environment.
   */
  animate() {
     // main game loop handling character movements and actions
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.otherDirection = false;
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.otherDirection = true;
        this.moveLeft();
        this.walking_sound.play();
      }

      if(this.world.keyboard.SPACE && !this.isAboveGround()){
        this.jump();
        this.jump_sound.play();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    // Idle animations interval
    setInterval(() => {
      if (Date.now() - this.lastMoveTimestamp >= 3000) {
        this.playAnimation(this.IMAGES_IDLE);
      }

      if (Date.now() - this.lastMoveTimestamp >= 10000) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      }
    }, 700);

    // Various animations based on character states
    setInterval(() => {
      // logic for animations like jumping, hurt, dead, etc..
      if(this.isHurt()){
        this.playAnimation(this.IMAGES_HURT);
      }
      else if(this.isDead()){
        this.playAnimation(this.IMAGES_DEAD);
      }
      else if (this.isAboveGround()) {
        this.hasJumped = true; // setzen Sie hasJumped auf true, wenn der Charakter in der Luft ist
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.hasJumped) {
          this.hasJumped = false; // setzen Sie hasJumped auf false, nachdem der Charakter gelandet ist
          this.img.src = this.IMAGES_WALKING[0]; // laden Sie das erste Bild von IMAGES_WALKING
        }
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          //Walk animation
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 50);
  }
}
