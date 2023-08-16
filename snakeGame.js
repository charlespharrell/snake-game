let canvas = document.getElementById('game')
const ctx = canvas.getContext('2d');
let keys = document.querySelectorAll('.keys a')
let score = document.getElementById( 'scores')
let highScoreElement = document.getElementById('highscore')
let play = document.getElementById('play')

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
let speed =7;
let tileCount = 20;
let tileSize = 400/tileCount-2;

//we declare the position of the snake in both x and y direction
let headX = 10;
let headY = 10;
let snakeParts = []
let tailLength = 2;

// to move snake, we set two variables
let xVelocity = 0;
let yVelocity = 0;

//We declare the position of the food in both x and y direction
let foodX = 5
let foodY = 5

//initial value for score
let scores = 0;

// inital value for high score
 let highScores = localStorage.getItem("highscore") ;
 highScoreElement.innerText = `High Score: ${highScores}`;


 play.addEventListener('click', Play)
 document.body.addEventListener('keydown', keyDown)
 keys.forEach(button=>button.addEventListener("click", ()=>changeDirection({key: button.dataset.key })))
  

 function playAgain(){
    speed =7;
    tileCount = 20;
    tileSize = 400/tileCount-2;
    foodX = 5;
    foodY = 5;
     headX = 10;
     headY = 10;
    snakeParts = []
    tailLength = 2;
    xVelocity = 0;
    yVelocity = 0;
    drawGame();
    location.reload()
GameOver()

}

// game loop
function drawGame(){
    ChangeSnakePosition()
    let result = GameOver();
    if (result){
        return;
    }
    clearScreen()  
    checkFoodCollision()
    Wall();
    drawSnake()  
    drawFood()
    GetSpeed()
    
    setTimeout(drawGame, 1000/speed)
}

// to help increase the speed after certain scores
function GetSpeed(){
     if (scores > 7){
        speed = 11
    }
      else if (scores > 15){
        speed = 15
    }
    else if ( scores > 25){
        speed = 21;
    }
    else if ( scores > 35){
        speed = 27;
    }
    else if ( scores > 50){
        speed = 35;
    }
}

//to clear the screen completely
function clearScreen(){
    ctx.fillStyle = '#222';
    ctx.fillRect(0,0, canvas.width, canvas.height)
}

//head and body of the snake
function drawSnake(){ 
    ctx.fillStyle = 'lightblue';
    for (let i = 0; i< snakeParts.length; i++){
        let part = snakeParts [i]
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push( new SnakePart(headX, headY));
    while(snakeParts.length > tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle ='lightcoral';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize )
}

//food forthe snake
function drawFood(){
    ctx.fillStyle = 'green'
    ctx.fillRect(foodX* tileCount, foodY * tileCount, tileSize, tileSize)
}

//movement of the snake
function ChangeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity
}

//when the snake eats the food
function checkFoodCollision(){
    if (foodX === headX & foodY === headY){
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount)
        tailLength++;
        scores = scores + 1; 
        score.innerHTML =  scores  
        console.log(scores)    
    }
}

//when the snake hits the walls of the container
function Wall(){  
    if(headX < 0){
       headX = tileCount-1;
    }
    else if(headX >=tileCount ){
        headX = 0;
    }
    else if(headY < 0 ){
        headY = tileCount-1;
    }
    else if (headY >= tileCount ){
        headY = 0;
    }
}

//gameover
function GameOver(){
    let gameOver = false;
    if(xVelocity === 0 && yVelocity === 0){
        return false;
    }

    for ( let i = 0; i< snakeParts.length; i++){
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }
    if (gameOver){
        if(scores>=highScores){
            localStorage.setItem("highscore", scores)
            highScoreElement.innerText= `High Score: ${scores}`
        }
    }
    if (gameOver){     
        ctx.fillStyle= 'white';
        ctx.font = "40px magenta "

        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        ctx.fillStyle = gradient;
        ctx.fillText('Ouch!! ', canvas.width/2.8, canvas.height/ 3)
        ctx.fillText("Game Over Bi*ches", canvas.width/10, canvas.height/ 2);

    }
    return gameOver;
}

//these are for the directional keys on the screen 
function changeDirection(e){
    //up
    if(e.key === 'ArrowUp'){
        if(yVelocity === 1)
            return;        
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if(e.key === 'ArrowDown'){
        if(yVelocity === -1)
        return;  
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if(e.key === 'ArrowLeft'){
        if(xVelocity === 1)
        return;  
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if(e.key === 'ArrowRight'){
        if(xVelocity === -1)
        return;  
        yVelocity = 0;
        xVelocity = 1;
    }
}

//theys are the directional keys for keyboard if you don't want to use the ones on the screen
function keyDown(e){
    //up 
    if ( e.keyCode === 38){
        if(yVelocity === 1)
            return;        
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if ( e.keyCode === 40){
        if(yVelocity === -1)
        return;  
    yVelocity = 1;
    xVelocity = 0;
}
//left
if(e.keyCode === 37){
    if(xVelocity === 1)
    return;  
yVelocity = 0;
xVelocity = -1;
}
     //right
     if(e.keyCode === 39){
        if(xVelocity === -1)
        return;  
        yVelocity = 0;
        xVelocity = 1;
    }
    //pause
    if(e.keyCode === 32){
        xVelocity =0;
        yVelocity=0;
    }
    
}  

//to reset the game
function Play(){  
    playAgain()
}

drawGame()


