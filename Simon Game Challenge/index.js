var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickPattern = [];
var started = false;
var level = 0;
var wrong = new Audio('./sounds/wrong.mp3');


$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickPattern.length-1);
});

function nextSequence(){
    userClickPattern = [];
    level++;

    $("h1").text("level "+level);

    var randomNumber = Math.floor((Math.random()*3)+1);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var buttonSound  = new Audio('./sounds/'+name+'.mp3');
    buttonSound.play();
}

function animatePress(currentColor){
    var buttonAnimate = $("#"+currentColor)
    buttonAnimate.addClass("pressed");
    setTimeout(function(){buttonAnimate.removeClass("pressed");},100);
}

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Correct Selection");
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }else{
        wrong.play();
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level =0;
    started = false;
}