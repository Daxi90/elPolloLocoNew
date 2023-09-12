class Bottle extends DrawableObject{
    width = 100;
    height = 100;

    y = 320;

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 300 + Math.random() * 1800; // Zahl zwischen 500 und 700

    }
}