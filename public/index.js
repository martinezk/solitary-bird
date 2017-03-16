//state management
//--store answer total
var quizTotal = 0;
var currentPage = 1;

//state modification functions
//--if an answer is chosen, add to quiz total
function userChoice(selectedAns){	
	quizTotal+=selectedAns;
	console.log(quizTotal);
}

//render functions

function displayScore(){
	if (currentPage > 3){
		//alert('Your score is ' + quizTotal);
		$('.score').text(quizTotal);
		$('#start-over').removeClass('hidden');
		$('.finalscore').removeClass('hidden');
		$('#next').addClass('hidden');
	}
}

function philosopher(){
	if (quizTotal < 9){
		$('.hume').removeClass('hidden');
	} else if (8 < quizTotal < 11){
		$('.kant').removeClass('hidden');
	} else if (10 < quizTotal < 15 ){
		$('.nietsche').removeClass('hidden');
	} else {
		$('.derrida').removeClass('hidden');
	}
}

var QUIZZES_URL = '/quizzes';
var QUIZZES = [];

function displayQuizQuestions(quizIndex){
	var quiz = QUIZZES[quizIndex];
	for(var i = 0; i < quiz.questions.length; i++) {
		var question = quiz.questions[i];
		var html = createQuestion(question, i);
		$('.quiz').append(html);
	}	
	$('.questions' ).first().show().addClass('show');
	$('#next').removeClass('hidden');
	$(this).toggleClass('hidden');
};

function getQuizzes(){
	var settings = {
		url: QUIZZES_URL,
		data: {},
		dataType: 'json',
		type: 'GET',
		success: function(json){
			QUIZZES = json;
			displayQuizzes(QUIZZES);
		},
		error: function(){
			alert("Something went wrong. Please refresh the page and try again.	")
		}
	};
	$.ajax(settings);
}

function hideButtons(){	
	$('.begin').click(function(){
		$('.begin').addClass("hidden");
		$('.title-home').addClass('hidden');
	});}
	
function displayQuizzes(quizzes){
	var quizChoices = "";
	for (var i=0; i< quizzes.length; i++){
		quizChoices += `<button class= "begin" type="submit" onclick="displayQuizQuestions(${i})">${quizzes[i].name}</button>`;
	}
	var html = `
		<div class="quiz-choices">
			${quizChoices}
		</div>
	`;
	$('.buttons').append(html);
	hideButtons();
}

function createQuestion(questionJson, index){
	return `
		<div class="questions hidden">
			<h2> ${questionJson.question} </h2>
			<ul>	
				<li class= "answers"><input type="radio" name="ans-${index}" value="1"><label>${questionJson.answers[0]}</label></li>
				<li class= "answers"><input type="radio" name="ans-${index}" value="2"><label>${questionJson.answers[1]}</label></li>
				<li class= "answers"><input type="radio" name="ans-${index}" value="3"><label>${questionJson.answers[2]}</label></li>
				<li class= "answers"><input type="radio" name="ans-${index}" value="4"><label>${questionJson.answers[3]}</label></li>
			</ul>
			<p> ${index+=1} of 3</p>
		</div>
	`;
}

$(document).ready(function() {
	getQuizzes();
	$("#menu").click(function(){
		$(".nav").toggleClass("hidden");
	});

	$('#next').click(function(){
		var value = $('.show input:checked').val();
		if(value === undefined){
			alert("You haven't chosen one!");
		} else {
			value = parseInt(value);
			userChoice(value);
			$('.show').removeClass('show').hide().addClass('hidden').next().removeClass('hidden').addClass('show');
			currentPage++;
			displayScore();
		}
	});
	$('#start-over').click(function(){
		quizTotal = 0;
		currentPage = 1;
		$('.questions').remove();
		$('.finalscore').removeClass('show').addClass('hidden');
		$('.begin').toggleClass('hidden');
		$(this).toggleClass('hidden');
	});
	/*$(document).ready(function() {
				$('#nav-toggle').click(function(event) {
					$(this).toggleClass('active');
					if ($('#nav-toggle').hasClass('active')) 
					{
						$('#nav').show();
					} 
					else
					{
						$('#nav').hide();
					};
				});
	});*/
})

