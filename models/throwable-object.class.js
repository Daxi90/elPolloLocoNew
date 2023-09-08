class ThrowableObject extends MovableObject{
    speedY;
    speedX;

    constructor(x, y){
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
           this.x += 10; 
        }, 25);

        this.lastThrown = Date.now();
    }

    canBeThrown() {
        const currentTime = Date.now();
        const oneSecond = 1000;
        return currentTime - this.lastThrown > oneSecond;
    }

      
}