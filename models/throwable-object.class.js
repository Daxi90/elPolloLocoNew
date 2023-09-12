class ThrowableObject extends MovableObject{
    speedY;
    speedX;

    isHit = false; // Neuer Zustand für Flasche

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y){
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_SPLASH);
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

    animateSplash() {
        let splashInterval = setInterval(() => {
            if (this.currentImage >= this.IMAGES_SPLASH.length) {
                clearInterval(splashInterval); // Beenden der Animation
                this.currentImage = 0;
                let index = world.throwableObjects.indexOf(this);
                if (index > -1) world.throwableObjects.splice(index, 1); // Flasche aus Array entfernen
            } else {
                this.img = this.imageCache[this.IMAGES_SPLASH[this.currentImage]];
                this.currentImage++;
            }
        }, 100); // Sie können die Geschwindigkeit der Animation durch Anpassen dieser Zahl steuern
    }

      
}