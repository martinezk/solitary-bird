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
	//add question data to document
	//run testJson function
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
function testJson(){
	let json = [{
		question: "What is Art for?",
		answer: 1,
		options: ["To embody the most ethical ideas", "To teach us to be our 'super' selves", "To teach us to be our 'super' selves", "For expressing what words can never fully do"],
	}];
	for(var i = 0; i < json.length; i++) {
		var question = json[i];
		var html = createQuestion(question, i);
		$('body').append(html);
		
	}
}
function createQuestion(questionJson, index){
	return `
		<div class="">
			<h2> ${questionJson.question} </h2>
			<ul>	
				<li><input type="radio" name="ans-${index}" value="1"><label>${questionJson.options[0]}</label></li>
				<li><input type="radio" name="ans-${index}" value="2"><label>${questionJson.options[1]}</label></li>
				<li><input type="radio" name="ans-${index}" value="3"><label>${questionJson.options[2]}</label></li>
				<li><input type="radio" name="ans-${index}" value="4"><label>${questionJson.options[3]}</label></li>
			</ul>
			<p> ${index} of 5</p>
		</div>
	`;
}
//fix quiz