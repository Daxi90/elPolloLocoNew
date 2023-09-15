/**
 * Represents a movable object in the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.speed = 0.15;
    this.otherDirection = false;
    this.speedY = 0;
    this.acceleration = 2.5;
    this.energy = 10;
    this.lastHit = 0;
    this.lastMoveTimestamp = Date.now();
  }

  /**
   * Applies gravity to the movable object.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        // Wenn er den Boden erreicht, setzen Sie die y-Position zurück
        // auf den Standardwert und die Geschwindigkeit in y-Richtung auf 0.
        this.y = 180; // Nehmen Sie an, dass 180 die Grundposition ist
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is moving downwards.
   * @returns {boolean}
   */
  isMovingDown() {
    return this.speedY < 0;
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean}
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable object should always fall
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
    this.lastMoveTimestamp = Date.now();
       
  }

  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
    this.lastMoveTimestamp = Date.now();
  }

  /**
   * Plays an animation for the object based on a list of images.
   * @param {string[]} images - List of paths to the animation images.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; Rest 0

    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Makes the object jump.
   */
  jump() {
    return (this.speedY = 30);
    this.lastMoveTimestamp = Date.now();
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {Object} obj - The object to check collision against.
   * @returns {boolean} - Returns true if colliding, false otherwise.
   */
  isColliding(obj) {
    // Überprüfe, ob sich die Rechtecke nicht überschneiden
    if (
      this.x + this.width < obj.x || // Linkes Rechteck ist rechts vom rechten Rechteck
      this.x > obj.x + obj.width || // Rechtes Rechteck ist links vom linken Rechteck
      this.y + this.height < obj.y || // Oberes Rechteck ist unterhalb des unteren Rechtecks
      this.y > obj.y + obj.height
    ) {
      // Unteres Rechteck ist oberhalb des oberen Rechtecks
      return false;
    }

    // Wenn die onCollisionCourse Bedingung benötigt wird
    if (obj.onCollisionCourse === false) {
      return false;
    }

    // Wenn keiner der oben genannten Fälle zutrifft, dann findet eine Kollision statt
    return true;
  }

  /**
   * Reduces the energy of the object when hit.
   */
  hit() {
    this.energy -= 2;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is dead (energy is 0).
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is hurt based on the time since the last hit.
   * @returns {boolean}
   */
  isHurt(obj) {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in seconds
    return timepassed < 1;
  }
}
