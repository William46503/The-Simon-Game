
var buttonColors = ["red", "blue", "green", "yellow"];
var delayTime = 100;
//System side: Random color pattern//
var gamePattern = [];

//Player Side: User Clicked Pattern//
var userClickedPattern = [];
//Step 1. Create a new pattern//
$(document).on("click",function nextSequence (){
  //Random generate Number 1 - 4//
    var randomNumber = Math.floor(Math.random()*4);
//Step 2. Add new gamePattern//
  //Choose random color//
    var randomChooseColor = buttonColors[randomNumber];
  //Add random color to gamePattern//
    gamePattern.push(randomChooseColor);

//Step 3. Show the nextSequence by Animation and sound//
  //Add Flash Animation to new added color//
    $("#" + randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //Play auto according to new chosen color//
    playSound(randomChooseColor);
});


//Step 4(Player Side). Detect clicks on button//
$(".btn").click(function(){
  //Detect ID of the clicked button//
  var userChosenColor = $(this).attr("id");

  //Add to User Clicked Pattern//
  userClickedPattern.push(userChosenColor);

  //Animate user clicked button//
  animatePress(userChosenColor);

  //Play Sound according to player clicks//
  playSound(userChosenColor);
});

//Step 6: Show user Clicks by adding animation//
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  //Remove Class to create flash effect//
  setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
}, delayTime);
}

//Step 5(Both Sides): Add Sound//
function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}
