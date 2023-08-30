class MovableObject{
    x = 120;
    y = 190;
    img;
    height = 250;
    width = 150;
    imageCache = {};

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
        console.log('Moving right');
    }

    moveLeft(){
        
    }
}