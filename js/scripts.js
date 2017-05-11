var sessionTime = 25;
var breakTime = 5;
var countDownTime;
var interval;
var inProgress = false;
var paused = false;
var counter = 0;

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

	$("#enterTask").on('keypress', function(e){
		if (e.which == 13){
			$('#task').html($("#enterTask").val());
			$('input#check')[0].checked = false;
			$('#divTaskIP').removeClass("hide");
			$('#divTaskEntry').addClass("hide");
		}	
	});

	$('input[type="checkbox"]').change(function() {
		if (this.checked) {			
			setTimeout(function(){
				$("#enterTask").val("");
				$('#divTaskIP').addClass("hide");
				$('#divTaskEntry').removeClass("hide");	
				ChangeCounter(0);
			}, 1000);				
		}
	});

	$('#upArrow').click(function(){
		ChangeCounter(counter + 1);	
	});

	$('#downArrow').click(function(){
		if (counter > 0){
			ChangeCounter(counter - 1);		
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
			ChangeCounter(counter + 1);
			timerColor();
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
	var timer = 20;
	var blinkInterval = setInterval(function(){
		$(".innerContainerTop").toggleClass('alert');
		timer--;
		if (timer === 0) {
			clearInterval(blinkInterval);
		}
	}, 200);
} 

function ChangeCounter(val) {
	counter = val;
	$('#taskIP').html(val.toString());
}

