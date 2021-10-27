const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, redBall, invisibleGround;
var groundImg, redBallImg;
var monstersGroup, monster, monster2;

var score = 0;
 

function preload(){
	groundImg = loadImage("bg.png");
	redBallImg = loadImage("redBall.png");
	monster = loadImage("monster.png");
	monster2 = loadImage("monster2.png");
	
}

function setup() {
	createCanvas(1360, 625);
	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	ground = createSprite(680,360);
	ground.addImage(groundImg);
	ground.scale = 1.5
	ground.x = ground.width /2;
	ground.velocityX = -(6 + 3*score/100);

	redBall = createSprite(50, 620)
	redBall.addImage(redBallImg);
	redBall.scale = 0.15;

	invisibleGround = createSprite(50, 620, 500, 5);
	invisibleGround.visible = false;

	monstersGroup = new Group();

	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(255);

  text("Score: "+ score, 500,50);
 
  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  }

    if(keyDown("space") && redBall.y >= 159) {
		redBall.velocityY = -12;
    }
  
    redBall.velocityY = redBall.velocityY + 0.8
  
    if (ground.x < 0){
		ground.x = ground.width/2;
    }

	redBall.collide(invisibleGround);
	spawnMonsters();

	if(monstersGroup.isTouching(redBall)){
        gameState = END;
    }	
	
	else if (gameState === END) {
		
		ground.velocityX = 0;
		redBall.velocityY = 0;
		monstersGroup.setVelocityXEach(0);
		
		//set lifetime of the game objects so that they are never destroyed
		monstersGroup.setLifetimeEach(-1);

  	drawSprites();
}
}

function spawnMonsters() {
	if(frameCount % 60 === 0) {
	  var monster = createSprite(600,165,10,40);
	  //monster.debug = true;
	  monster.velocityX = -(6 + 3*score/100);
	  
	  //generate random monsters
	  var rand = Math.round(random(1,2));
	  switch(rand) {
		case 1: monster.addImage(monster);
				break;
		case 2: monster.addImage(monster2);
				break;
		default: break;
	  }
	  
	  //assign scale and lifetime to the monster           
	  monster.scale = 0.5;
	  monster.lifetime = 300;
	  //add each monster to the group
	  monstersGroup.add(monster, monster2);
	}
  }