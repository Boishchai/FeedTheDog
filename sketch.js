var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var database = firebase.database();

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog=createButton("Feed The Dog");
  feedTheDog.position(670,95);
  // feedTheDog.mousePressed(hour);
  feedTheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime = database.ref("FeedTime");
  feedTime.on
  ("value", function(data)
  {
    feedTime = data.val();
  }
  );
 
  //write code to display text lastFed time here
  fill("red");
  noStroke();
  textSize(20);
  if(lastFed >= 12)
  {
    text(hour + "PM", 210, 20);
  }
  else if(lastFed === 0)
  {
    text(hour + "MIDNIGHT", 210, 20);
  }
  else
  {
    text(hour + "AM", 210, 20);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS--;
  hour();
  database.ref('/').update
  (
  {
    Food:foodS
  }
  );
  feedTime.update(hour());
}

//function to add food in stock
function addFoods()
{
  foodS++;
  database.ref('/').update
  (
  {
    Food:foodS
  }
  );
}
