const mongoose = require('mongoose');

// this is our schema to represent a quiz
const quizSchema = mongoose.Schema({
  name: {type: String, required: true},
  questions: [{
	  question:{type: String, required: true},
	  correct:{type: String, required: true},
	  answers:[]
  }],
});

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the address object
// we're storing in Mongo.
// this virtual grabs the most recent grade for a restaurant.
/*restaurantSchema.virtual('question').get(function() {
  const gradeObj = this.questions.sort((a, b) => {return b.date - a.date})[0] || {};
  return gradeObj.question;
}); */

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
/*restaurantSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    name: this.name,
    cuisine: this.cuisine,
    borough: this.borough,
    grade: this.grade,
    address: this.addressString
  };
} */

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = {Quiz};
