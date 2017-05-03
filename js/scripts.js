var sessionTime = 25;
var breakTime = 5;
var countDownTime;
var interval;
var inProgress = false;
var paused = false;

$(document).ready(function(){
	//set default session & break times
	$("#btnWork").click(function(){
		ResetTimer(sessionTime);
		if ($(this).text() === "Work") {
			StartCountDown(sessionTime);
			$(this).text("Reset");
			$("#btnBreak").text("Break");
		} else {					
			$(this).text("Work");
		}		
	});
	$("#btnBreak").click(function(){
		ResetTimer(breakTime);
		if($(this).text() === "Break") {
			StartCountDown(breakTime);
			$(this).text("Reset");
			$("#btnWork").text("Work");
		} else {		
			$(this).text("Break");
		}
	});

	$("#pause").click(function(){
		var src = $(this).attr("src");
		if (src.includes("pause")) {
			timerColor();
			if (inProgress) {
				StopTimer();
				paused = true;
				$(this).attr("src", src.replace("pause", "play"));
			}
		} else {
			StartCountDown(countDownTime/60);
			paused = false;
			$(this).attr("src", src.replace("play", "pause"));
		}		 
	});

	$("#sessionTime").on('input', function(e){
		sessionTime = $(this).val();
		if (inProgress === false && paused === false) {
			$("#timer").html(leadingZero(sessionTime) + ":00");
		}		
	});
	$("#breakTime").on('input', function(e){
		breakTime = $(this).val();
		if (inProgress === false && paused === false) {
			$("#timer").html(leadingZero(breakTime) + ":00");
		}
	});
});

function StartCountDown(startTime) {
	inProgress = true
	countDownTime = startTime * 60;
	interval = setInterval(function() {
		countDownTime--;
		var minutes = Math.floor(countDownTime / 60);
		var seconds = countDownTime % 60;
		$("#timer").html(leadingZero(minutes) + ":" + leadingZero(seconds));
		if (countDownTime == 0){
			StopTimer();
		}
	}, 1000);
}

function ResetTimer(time) {
	StopTimer();
	$("#timer").html(leadingZero(time) + ":00");
}

function StopTimer() {
	clearInterval(interval);
	inProgress = false;
}

function leadingZero(num) {
	if (num.toString().length === 1) {
		return '0' + num;
	} else {
		return num;
	}
}
function timerColor() {
	$("#innerContainer").animate({
		backgroundColor: "rgb( 20, 20, 20 )"
	});
}



