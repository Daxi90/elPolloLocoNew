class World {
  character = new Character();
  level = level1;
  
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectstoMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectstoMap(this.level.enemies);
    this.addObjectstoMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    if(mo.otherDirection){
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }

     this.ctx.beginPath();
     this.ctx.lineWidth = "5";
     this.ctx.strokeStyle = "blue";
     this.ctx.rect(mo.x, mo.y, mo.x + mo.width, mo.y + mo.height);
     this.ctx.stroke();


    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if(mo.otherDirection){
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  addObjectstoMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }
}
