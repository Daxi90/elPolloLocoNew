let canvas;
let world;
let keyboard = new Keyboard();


function init(){
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('endScreen').classList.add('d-none');
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);  
  
}


window.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('leftArrow').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.LEFT = true;
    })
    
    document.getElementById('rightArrow').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = true;
    })
    
    document.getElementById('jump').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.SPACE = true;
    })
    
    document.getElementById('throw').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.D = true;
    })



    document.getElementById('leftArrow').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.LEFT = false;
    })
    
    document.getElementById('rightArrow').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = false;
    })
    
    document.getElementById('jump').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.SPACE = false;
    })
    
    document.getElementById('throw').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.D = false;
    })

})





window.addEventListener('keydown', (e) =>{
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 68){
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (e) =>{
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 68){
        keyboard.D = false;
    }
})