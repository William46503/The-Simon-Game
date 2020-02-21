
var buttonColors = ["red", "blue", "green", "yellow"];
var delayTime = 100;
//Color pattern//
var gamePattern = [];
var userClickedPattern = [];

//GameManager//
var started = false;
var level = 0;

function nextSequence (){
    level++;
    $("#level-title").text("Level " + level);
  //Random generate Number 1 - 4//
    var randomNumber = Math.floor(Math.random()*4);
    var randomChooseColor = buttonColors[randomNumber];
  //Add random color to gamePattern//
    gamePattern.push(randomChooseColor);
//Step 3. Show the nextSequence by Animation and sound//
    $("#" + randomChooseColor).fadeOut(150).fadeIn(150);
  //Play audio according to new chosen color//
    playSound(randomChooseColor);
}

function checkAnswer(currentLevel){
  //Check if users latest click is equal to gamePatter//
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("sucess");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
       nextSequence();
       userClickedPattern = [];
      },1000);
    }
  } else {
    //Play wrong.mp3, add class to body to flash red//
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    //change H1 to gameover message//
    $("#level-title").html("Game Over,<br> Press 'A' Key to Restart");
    gameover();
  }
}
//Step 6: Show user Clicks by adding animation//
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  //Remove Class to create flash effect//
  setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
  }, delayTime);
  }

//game over function to call//
function gameover(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

//Step 5(Both Sides): Add Sound//
function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

//When the "A" Key is pressed, call nextSequence, game Start//
$(document).on("keydown",function(){
  if (event.keyCode == 65 && started == false){
    setTimeout(function(){
      nextSequence();
      $("#level-title").text("Level " + level);
      started = true;
    }, 500);
  } else if (started == true ){
    console.log("Already started");
  }
});

//Step 4(Player Side). Detect clicks on button//
$(".btn").click(function(){
  //Detect ID of the clicked button//
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //Animate user clicked button//
  animatePress(userChosenColor);
  //Play Sound according to player clicks//
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
