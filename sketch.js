var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost,ghostImg,ghostImg2;
var invisibleBlockGroup, invisibleBlock;
var gameOver,gameOverImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png");
  ghostImg2 = loadAnimation("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
  gameOverImage=loadImage("gameOver.png");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.4;
  ghost.addAnimation("ghost", ghostImg);
  ghost.addAnimation("ghost2",ghostImg2);
  
  gameOver=createSprite(300,300,20,20);
  gameOver.addImage(gameOverImage);
}

function draw(){
  background("white");
  
   drawSprites();
  
  if (gameState === PLAY) {
    gameOver.visible=false;
    
    ghost.visible=true;
    
    textSize(20);
   fill("red");
  text("Score: "+ score, 300,50);
    
    ghost.changeAnimation("ghost", ghostImg); 
    
    score = score + Math.round(getFrameRate()/60);
  
    
    
    ghost.velocityY = ghost.velocityY + 0.4;
    
    tower.velocityY =2+score/100;
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -2 ;
      ghost.changeAnimation("ghost2",ghostImg2);
    }
    
    
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      gameState = END;
    }
   
  }
  if (gameState === END){
    gameOver.visible=true;
    ghost.visible=false;
    tower.velocityY = 0;
     doorsGroup.destroyEach();
    climbersGroup.destroyEach();
     invisibleBlockGroup.destroyEach();
    textSize(32);
    fill("red");
    text("YOUR SCORE: "+score,150,400);
    text("PRESS ENTER TO RESTART",150,450)
    
    if(keyDown("enter")){
      gameState=PLAY;
      score=0;
      ghost.x=300;
     ghost.y=300;
    }
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1+score/100;
    climber.velocityY = 1+score/100;
    invisibleBlock.velocityY = 1+score/100;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

