class Chicken extends MovableObject{

    y = 350;
    height = 80;
    width = 80;
    energy = 2;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ]


    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 300 + Math.random() * 500; // Zahl zwischen 500 und 700
        this.speed = 0.15 + Math.random() * 0.25;

        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate(){

        setInterval(() => {
            this.moveLeft();

        }, 1000 / 60);
       

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);


        
    }
}