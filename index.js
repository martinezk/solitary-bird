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
	if (currentPage > 5){
		philosopher();
		$('.score').text(quizTotal);
		$('#start-over').removeClass('hidden');
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

//event listenters
//--start button listener
//--next button listener 

$(document).ready(function() {
	$('#begin').click(function(){
		quizTotal = 0;
		$('div').first().removeClass('hidden').addClass('show');
		$('#next').removeClass('hidden');
		$(this).toggleClass('hidden');
	});
	$('#next').click(function(){
		var value = $('.show input:checked').val();
		if(value === undefined){
			alert("You haven't chosen one!");
		} else {
			value = parseInt(value);
			userChoice(value);
			//$('.show').next().removeClass('hidden').addClass('show');
			//$('.show').first('div').removeClass('show').addClass('hidden');
			$('.show').removeClass('show').addClass('hidden').next().removeClass('hidden').addClass('show');
			currentPage++;
			displayScore();
		}
	});
	$('#start-over').click(function(){
		$('.kant').addClass('hidden');
		$('.derrida').addClass('hidden');
		$('.hume').addClass('hidden');
		$('.nietsche').addClass('hidden');
		$('.finalscore').removeClass('show').addClass('hidden');
		$('#begin').toggleClass('hidden');
		$(this).toggleClass('hidden');
	});
})