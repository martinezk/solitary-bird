//state management
//--store answer total
var quizTotal = 0;
var currentPage = 1;
var numberOfPages = 0;

//state modification functions
//--if an answer is chosen, add to quiz total
function userChoice(selectedAns) {
    quizTotal += selectedAns;
    console.log(quizTotal);
    if (quizTotal===3 || quizTotal===4) {
        console.log("You are most like David Hume");
    }
    else if (quizTotal===5 || quizTotal===6 ){
        console.log("You are most like Immanuel Kant");
    }
    else if (quizTotal===7 || quizTotal===8 ){
        console.log("You are most like Friedrich Nietsche");
    }
    else {
        console.log("You are most like Jacques Derrida");
    }
    
}
//render functions
function displayScore() {
    if (currentPage > numberOfPages) {
        $('.score').text(quizTotal);
        $('#start-over').removeClass('hidden');
        $('.finalscore').removeClass('hidden');
        $('#next').addClass('hidden');
    }
}

var QUIZZES_URL = '/quizzes';
var QUIZZES = [];

function displayQuizQuestions(quizIndex) { // eslint-disable-line
    var quiz = QUIZZES[quizIndex];
    numberOfPages = quiz.questions.length;
    for (var i = 0; i < quiz.questions.length; i++) {
        var question = quiz.questions[i];
        var html = createQuestion(question, i, quiz.questions.length);
        $('.quiz').append(html);
    }
    $('.questions').first().toggleClass('hidden').addClass('show');
    $('#next').removeClass('hidden');
    hideQuizChoices();
    $('.quiz').removeClass('center');
}

function getQuizzes() {
    var settings = {
        url: QUIZZES_URL,
        data: {},
        dataType: 'json',
        type: 'GET',
        success: function (json) {
            QUIZZES = json;
            displayQuizzes(QUIZZES);
        },
        error: function () {
            alert('Something went wrong. Please refresh the page and try again.    ');
        }
    };
    $.ajax(settings);
}

function hideQuizChoices() {
    $('.quiz-choices').toggleClass('hidden');
}

function displayQuizzes(quizzes) {
    var quizChoices = '';
    for (var i = 0; i < quizzes.length; i++) {
        quizChoices += `
        <button class= "begin inline" type="submit" onclick="displayQuizQuestions(${i})"><h3>${quizzes[i].name}</h3></button>`;
    }
    var html = `
        <div class="quiz-choices">
            ${quizChoices}
        </div>
    `;
    $('.quiz').append(html);
}

function createQuestion(questionJson, index, length) {
    return `
        <div class="questions hidden">
            <h2 class="quiz-title"> ${questionJson.question} </h2>
            <ul>
                <li class= "answers"><input type="radio" name="ans-${index}" value="1"><label>${questionJson.answers[0]}</label></li>
                <li class= "answers"><input type="radio" name="ans-${index}" value="2"><label>${questionJson.answers[1]}</label></li>
                <li class= "answers"><input type="radio" name="ans-${index}" value="3"><label>${questionJson.answers[2]}</label></li>
                <li class= "answers"><input type="radio" name="ans-${index}" value="4"><label>${questionJson.answers[3]}</label></li>
            </ul>
            <p> ${index += 1} of ${length}</p>
        </div>
    `;
}

function resetQuizzes() {
    quizTotal = 0;
    currentPage = 1;
    $('.questions').remove();
    $('.finalscore').removeClass('show').addClass('hidden');
    $('.quiz-choices').removeClass('hidden');
    $('#start-over').addClass('hidden');
    $('#next').addClass('hidden');
}

$(document).ready(function () {
    getQuizzes();
    $('#next').click(function () {
        var value = $('.show input:checked').val();
        if (value === undefined) {
            alert('You haven\'t chosen one!');
        } else {
            value = parseInt(value);
            userChoice(value);
            $('.show').removeClass('show').addClass('hidden').next().removeClass('hidden').addClass('show');
            currentPage++;
            displayScore();
        }
    });
    $('#start-over').click(resetQuizzes);
    $('#nav-quizzes').click(resetQuizzes);
    $('#header__icon').click(function () {
        $('.links').toggleClass('hidden');
    });
});

