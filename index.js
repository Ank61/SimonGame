var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() { //Main function 1:pressed any key it applies to tthe whole document!
  if (!started) {                 //is pressed then calling
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {  // Main function -2: After key pressed is over and a randomcolour is added to game pattern now

  var userChosenColour = $(this).attr("id"); //Get color Id of colour clicked!
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); // Now check: It has to be same with the earlier one which we pushed into gamepattern!
});

function checkAnswer(currentLevel) { //Main funcion 3: If they are same and the length is same then agin call next nextSequence.

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence(); //If it is corect then: next sequence gives new colour and then pushes into gamepattern array with 1000 milliseconds delay!
        }, 1000);
      }
    } else { //if not same as gamepattern
      playSound("wrong");
      $("body").addClass("game-over"); //get css class : game over!
      $("#level-title").text("Game Over, Press Any Key to Restart"); //Change title

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver(); //Main function 4: calling to Restart everything!
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) { // the one which is coming from the calling function i have just reanmed it for new function
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() { //Main function 4 : reseeting everything!
  level = 0;
  gamePattern = [];
  started = false;
}
