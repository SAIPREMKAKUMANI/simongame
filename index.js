var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var randomChosenColor;
var userClickedPattern=[];
var level=0;
var started=false;
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
$(document).keypress(function(){
    if (!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})
function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $("h1").html("Level "+level);
    var rand=Math.floor(Math.random()*4);
    randomChosenColor=buttonColors[rand];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};
function playSound(randomChosenColor){
    var audio=new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },1);
};
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
            if(gamePattern.length===userClickedPattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            playSound("wrong");
        },200);
        $("h1").html("Press Any Button To Restart");
        startOver();
    }
}
function startOver(){
    gamePattern=[];
    started=true;
    level=0;
}