class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 10;
  lastHit = 0;



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


  isMovingDown() {
    return this.speedY < 0;
  }


  isAboveGround() {
    if(this instanceof ThrowableObject){ // Throwable object should always fall
      return true;
    }else{
      return this.y < 180;
    }
    
  }

  moveRight() {
    this.x += this.speed;
    this.walking_sound.play();
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; Rest 0

    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    return (this.speedY = 30);
  }

  // Bessere Formel zur Kollisionsberechnung (Genauer)
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

  hit() {
    this.energy -= 2;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt(obj) {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in seconds
    return timepassed < 1;
  }
}
