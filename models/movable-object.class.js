class MovableObject {
  x = 120;
  y = 190;
  img;
  height = 250;
  width = 150;
  speed = 0.15;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 180;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png','img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
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

    if(this.energy < 0){
        this.energy = 0;
    }else{
        this.lastHit = new Date().getTime();
    }
  }

  isDead(){
    return this.energy == 0;
  }

  isHurt(obj){
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in seconds
    return timepassed < 3;
  }


}
