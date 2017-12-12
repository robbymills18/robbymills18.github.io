var PipeTop;
var PipeBottom;
var bird;
var bx = 0;
var by = 0;
var pipes = [];
var flappyBird;
var startScreen = true;
var endGame = false;
var score = 0;

function preload () {
  PipeTop = loadImage("Pipe Top.png");
  PipeBottom = loadImage("Pipe Bottom.png");
  bird = loadImage("bird.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  by = height-100;
  for (var i = 0; i < 100; i++) {
    pipes[i] = new Pipe(i*300, 0);
  }
  flappyBird = new FlappyBird()
}

function draw() {
  
  if(startScreen == true) {
     background(255);
     textSize(50);
     fill(47, 165, 14);
     text("START GAME!", width/2-20, 300);  
  }
  else if(endGame == true) {
    background(255);
    textSize(50);
    fill(47, 165, 14);
    text("YOU DIED!", width/2-20, 300);

  }
  else {
     background(255);
    for (var i = 0; i < 100; i++) {
      pipes[i].display();
      pipes[i].move();
      if (pipes[i].collision() === true) {
        console.log("Hit a pipe");
      }
    }
    flappyBird.display();
    scoreBoard(50, 50, getScore());  
  }
}

function mousePressed() {
  if (startScreen === true) {
    startScreen = false;
  }
  else if(endGame === true) {
    startScreen = true;
    endGame = false;
    flappyBird.reset();
    console.log("resettt")
    // reset all of the pipes
    for (var i = 0; i < 100; i++) {
      pipes[i].reset();
    }
  }
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    flappyBird.velocity= -3.5; 
  }
  // else if(keyCode === DOWN_ARROW) {
  //   flappyBird.y+= 50;
  // }
  // else if(keyCode === RIGHT_ARROW) {
  //   flappyBird.x+= 25;
 
}

function FlappyBird(width, height, x, y) {
  this.x = 200;
  this.y = 500;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = -7.5;
  this.gravitySpeed = 0;
  this.velocity = 0; 
  
  this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;

  }
  this.display = function() {
     image(bird, this.x-bird.width*.15+8, this.y, bird.width*.15, bird.height*.15);
     this.velocity -= this.gravity/100
     this.y += this.velocity
     // console.log(this.y);
     
  }
  this.reset = function() {
    this.x = 200;
    this.y = 500;
    console.log(this.x);
  }
}

function Pipe(x, y) {
  this.startX = x;
  this.startY = y;
  this.x =x+100;
  this.y =y;
  this.separation = random(-300, 0);
  this.display = function() {
    image(PipeTop, this.x, this.y+this.separation, PipeTop.width*2, PipeTop.height*2);
    image(PipeBottom, this.x, this.y+this.separation+100+PipeTop.height*2, PipeBottom.width*2, PipeBottom.height*2);
  }

  this.move = function() {
    this.x--;
  }
  this.collision = function() {
    var pipeTX = this.x;
    var pipeTY = this.y + this.separation;
    var pipeBX = this.x;
    var pipeBY = this.y+this.separation+100+PipeTop.height*2;
    
    
    if(flappyBird.x > pipeBX && flappyBird.x < pipeBX + PipeBottom.width && flappyBird.y > pipeBY && flappyBird.y < pipeBY + PipeBottom.height*2) {
      
      endGame = true;
      return true;

    }
    else if(flappyBird.x > pipeTX && flappyBird.x < pipeTX + PipeTop.width && flappyBird.y > pipeTY && flappyBird.y < pipeTY + PipeTop.height*2) {
      endGame = true;
      return true;
    }
    else {
      return false;
    }
  }
  this.reset = function() {
    this.x = this.startX+300;
    this.y = this.startY;
  }
}
function scoreBoard(x, y, score) {
  fill(209, 7, 0);
  text("Score:" + score, x, y);
}
function getScore() {
  var s = 0;
  for(var i = 0; i < pipes.length; i++) {
    if(flappyBird.x > pipes[i].x) {
      s++;
    } 
  }
  return s;
}

