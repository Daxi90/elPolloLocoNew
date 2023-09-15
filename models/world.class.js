/**
 * Represents the game world.
 */
class World {
  character = new Character();
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  throwableObjects = [];
  lastThrown = 0;
  coinsCollected = 0;
  bottlesCollected = 0;
  totalCoins;
  totalBottles;


  coin_sound = new Audio("audio/coin.mp3");
  splash_sound = new Audio("audio/splash.mp3");
  game_sound = new Audio("audio/gamesound.mp3");

  /**
   * Create a World.
   * @param {HTMLCanvasElement} canvas - The canvas on which the world is drawn.
   * @param {Keyboard} keyboard - The keyboard object to capture player input.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.totalCoins = this.level.coins.length;
    this.totalBottles = this.level.bottles.length;
    this.run();

    if(soundOn){
      this.game_sound.play();
      this.game_sound.volume = 0.3;
    }
  }
  

  /**
   * Sets the world property for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts periodic checks in the game world for collisions and object throws.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCharacterOrBossDead();
    }, 50);
  }

  /**
   * Checks if character or boss is dead and takes appropriate actions.
   */
  checkCharacterOrBossDead() {
    if (this.character.energy == 0) {
      this.showGameOverScreen();
      this.clearAllIntervals();
      this.character.walking_sound.pause();
      this.game_sound.pause();
    } else {
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss && enemy.energy == 0) {
          this.character.walking_sound.pause();
          setTimeout(() => {
            this.clearAllIntervals();
            document.getElementById("startScreen").classList.remove("d-none");
            this.game_sound.pause();
          }, 3000); // Warte 3 Sekunden

          return;
        }
      });
    }
  }

  /**
   * Display the game over screen.
   */
  showGameOverScreen() {
    document.getElementById("endScreen").classList.remove("d-none");
  }

  /**
   * Clears all active intervals.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * Checks for throwable objects and handles their behavior.
   */
  checkThrowObjects() {
    const currentTime = Date.now();
    const oneSecond = 1000;
    if (
      this.keyboard.D &&
      currentTime - this.lastThrown > oneSecond &&
      this.bottlesCollected > 0
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.character.direction
      );
      this.throwableObjects.push(bottle);
      this.lastThrown = currentTime; // Aktualisiere den Zeitstempel
      this.bottlesCollected -= 1;
      this.bottleBar.setPercentage(
        (this.bottlesCollected / this.totalBottles) * 100
      );
    }
  }

  /**
   * Checks for collisions in the world.
   */
  checkCollisions() {
    //Check collision
    this.checkCollisionsWithEnemy();
    this.checkCollisionsWithCoin();
    this.checkCollisionsWithBottle();
    this.checkCollisionsWithThrowAbleObject();
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollisionsWithEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isMovingDown() && !enemy.isDead()) {
          enemy.hit(); // Schaden zufügen, wenn der Charakter auf den Gegner springt
          this.character.jump(); // Charakter springt leicht nach dem Treffen des Gegners
        } else if (this.canCharacterHit(enemy)) {
          this.character.hit(); // Charakter nimmt Schaden, wenn er den Gegner anders berührt
          this.healthBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and coins.
   */
  checkCollisionsWithCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isCollidingWithBuffer(coin)) {
        this.level.coins.splice(index, 1);
        this.coinsCollected += 1;
        this.coinBar.setPercentage(
          (this.coinsCollected / this.totalCoins) * 100
        );
        if(soundOn){
        this.coin_sound.play();
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles.
   */
  checkCollisionsWithBottle() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isCollidingWithBuffer(bottle)) {
        this.level.bottles.splice(index, 1);
        this.bottlesCollected += 1;
        this.bottleBar.setPercentage(
          (this.bottlesCollected / this.totalBottles) * 100
        );
        if(soundOn){
        this.splash_sound.play();
        }
      }
    });
  }

  /**
   * Checks for collisions of thrown objects with enemies.
   */
  checkCollisionsWithThrowAbleObject() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((throwableObject) => {
        if (throwableObject.isColliding(enemy) && !throwableObject.isHit) {
          if (!enemy.isDead()) {
            enemy.hit();
            throwableObject.isHit = true; // Setzen des Flaschenzustands auf getroffen
            throwableObject.animateSplash(); // Start der Splash-Animation
            if(soundOn){
            this.splash_sound.play();
            }
          }
        }
      });
    });
  }

  /**
   * Determines if the provided object is colliding with a given buffer.
   * @param {Object} object - The object to check collisions for.
   * @param {number} [buffer=5] - The buffer for collision checks.
   * @returns {boolean} - Whether the object is colliding or not.
   */
  isCollidingWithBuffer(object, buffer = 5) {
    return (
      this.x + buffer < object.x + object.width - buffer &&
      this.x + this.width - buffer > object.x + buffer &&
      this.y + buffer < object.y + object.height - buffer &&
      this.y + this.height - buffer > object.y + buffer
    );
  }

  /**
   * Determines if the character can hit the provided enemy.
   * @param {Enemy} enemy - The enemy to check against.
   * @returns {boolean} - Whether the character can hit the enemy or not.
   */
  canCharacterHit(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.isAboveGround() &&
      !enemy.isDead()
    );
  }

  /**
   * Draws the game world on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0); // BACK
    // ------------ SPACE FOR FIXED OBJECTS ----------
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0); // FORWARD

    this.addToMap(this.character);
    this.addObjectstoMap(this.level.enemies);
    this.addObjectstoMap(this.level.coins);
    this.addObjectstoMap(this.level.bottles);
    this.addObjectstoMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds a map object to the world and draws it on the canvas.
   * @param {MapObject} mo - The map object to be added.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    //mo.drawFrame(this.ctx); // UNCOMMENT TO DRAW FRAMES AROUND ENEMIES AND CHARACTER

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Adds an array of objects to the world.
   * @param {MapObject[]} objects - The array of map objects.
   */
  addObjectstoMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Flips an image in the game world.
   * @param {MapObject} mo - The map object containing the image to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips back an image in the game world to its original state.
   * @param {MapObject} mo - The map object containing the image to be flipped back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
