var buttonColors=["red", "blue", "green", "yellow"];
var gamepatter=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
	if (!started){
		$("#leveltitle").text("level"+level);
		nextSequence();
		started=true;
	}
});

$(".btn").click(function(){
	var userChosenColor=$(this).attr("id");
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);

	checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel){
	if(gamepatter[currentlevel]===userClickedPattern[currentlevel]){
		if(userClickedPattern.length===gamepatter.length){
			setTimeout(function(){
				nextSequence();
			},1000);

		
	}
}
else{
	playSound("wrong");
	$("body").addClass("game-over");
	$("#leveltitle").text("Game over! press Any key to restart");

	setTimeout(function(){
		$("body").removeclass("game-over");
	},200);

	startOver();
  }
}

function nextSequence(){
	userClickedPattern=[];
	level++;
	$("#leveltitle").text("level "+level);
	var raandomNumber=Math.floor(Math.random()*4);
	var choseColors= buttonColors[raandomNumber];
	gamepatter.push(choseColors);

	$("#"+ choseColors).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(choseColors);
}
function playSound(name){
	var audio= new Audio("sound/"+ name+".mp3");
	audio.play();
}

function animatePress(currentColor){
	$("#"+currentColor).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColor).removeClass("pressed");
	},100);
}
function startOver(){
	level=0;
	gamepatter=[];
	started=false;
}
