const mongoose = require('mongoose');

// this is our schema to represent a quiz
const quizSchema = mongoose.Schema({
    name: { type: String, required: true },
    questions: [{
        question: { type: String, required: true },
        correct: { type: String, required: true },
        answers: []
    }],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { Quiz };
