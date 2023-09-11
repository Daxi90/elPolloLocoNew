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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCharacterDead();
    }, 50);

  }

  checkCharacterDead(){
    if(this.character.energy == 0){
      this.showEndScreen();
      this.clearAllIntervals();
      this.character.walking_sound.pause();
    }
  }

  showEndScreen(){
    document.getElementById('endScreen').classList.remove('d-none');
  }

  /* Alternative (quick and dirty), um alle Intervalle zu beenden. */
clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

  checkThrowObjects(){
    const currentTime = Date.now();
    const oneSecond = 1000;

    if(this.keyboard.D && currentTime - this.lastThrown > oneSecond){
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.lastThrown = currentTime; // Aktualisiere den Zeitstempel
    }
  }

  checkCollisions(){
    //Check collision
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
            if (this.character.isMovingDown() && !enemy.isDead()) {
                enemy.hit();  // Schaden zufügen, wenn der Charakter auf den Gegner springt
                this.character.jump(); // Charakter springt leicht nach dem Treffen des Gegners
            } else if (this.canCharacterHit(enemy)) {
                this.character.hit(); // Charakter nimmt Schaden, wenn er den Gegner anders berührt
                this.healthBar.setPercentage(this.character.energy);
            }
        }
    });
}



  canCharacterHit(enemy) {
      return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead();
  }

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
    this.addObjectstoMap(this.throwableObjects);
    
    


    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  addObjectstoMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
