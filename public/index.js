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

function displayQuestion(){
	var settings = {
		url: "questions.json",
		data: {},
		dataType: 'json',
		type: 'GET',
		success: function(json){
			for(var i = 0; i < json.length; i++) {
				var question = json[i];
				var html = createQuestion(question, i);
				$('.quiz').append(html);
			}
			
			$('.questions' ).first().show().addClass('show');
			$('#next').removeClass('hidden');
			$(this).toggleClass('hidden');
		},
		error: function(){
			debugger;
		}
	};
	$.ajax(settings);
	

}

function createQuestion(questionJson, index){
	return `
		<div class="questions hidden">
			<h2> ${questionJson.question} </h2>
			<ul>	
				<li><input type="radio" name="ans-${index}" value="1"><label>${questionJson.options[0]}</label></li>
				<li><input type="radio" name="ans-${index}" value="2"><label>${questionJson.options[1]}</label></li>
				<li><input type="radio" name="ans-${index}" value="3"><label>${questionJson.options[2]}</label></li>
				<li><input type="radio" name="ans-${index}" value="4"><label>${questionJson.options[3]}</label></li>
			</ul>
			<p> ${index+=1} of 3</p>
		</div>
	`;
}

$(document).ready(function() {
	$('#begin').click(function(){
		displayQuestion();
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
	/*$('#start-over').click(function(){
		$('.finalscore').removeClass('show').addClass('hidden');
		$('#begin').toggleClass('hidden');
		$(this).toggleClass('hidden');
	}); */
	
})

