var express = require('express');
var app = express();
app.use(express.static('public'));
const Quiz = require('./models');
//const quizRouter = require('./quizRouter');
//app.use('/quizzes', quizRouter);


Quiz.create('How to Train a Dragon');
Quiz.create('How to Succeed in Business Without Really Trying');
Quiz.create('How the West Was Won');


app.get('/quizzes', (req, res) => {
  res.json(Quiz.get());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});