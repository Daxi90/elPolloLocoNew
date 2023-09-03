class MovableObject{
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


    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000/25);
    }

    isAboveGround(){
        return this.y < 180;
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png','img/image2.png', ...]
     */
    loadImages(arr){

        arr.forEach((path) =>{
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    moveRight(){
        this.x += this.speed;
        this.walking_sound.play();
    }

    moveLeft(){
        this.x -= this.speed;
    }

    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 0 % 6; Rest 0

        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;   
    }

    jump(){
        return this.speedY = 30;
    }
}