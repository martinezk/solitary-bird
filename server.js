var express = require('express');
var app = express();
app.use(express.static('public'));
const quizRouter = require('./quizRouter');
app.use('/quizzes', quizRouter);
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});