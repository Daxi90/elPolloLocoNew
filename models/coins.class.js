class Coins extends DrawableObject{

    width = 150;
    height = 150;

    y = 320;

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 300 + Math.random() * 1800; // Zahl zwischen 500 und 700
        this.y = 50 + Math.random() * 270; // Zahl zwischen 50 und 320

    }
}