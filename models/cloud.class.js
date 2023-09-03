class Cloud extends MovableObject{
    y = 20;
    width = 450;
    height = 250;



    constructor(){
        super().loadImage('../img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500; // Zahl zwischen 500 und 700

        this.animate();
        
    }

    animate(){
        setInterval(() => {
            if(this.x > -450){
                this.moveLeft();
            }else{
                this.x = 3000;
            }
            
        }, 1000/60);
        
    }


}