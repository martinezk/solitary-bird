const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server'); 

const should = chai.should();

chai.use(chaiHttp);

describe('Quizzes', function() {
	before(function() {
		return runServer();
    });

    after(function() {
		return closeServer();
    });
	
    it('should list available quizzes on GET', function() {
		return chai.request(app)
		  .get('/quizzes')
		  .then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.length.should.be.at.least(1);
			const expectedKeys = ['name', 'questions'];
			res.body.forEach(function(item) {
			  item.should.be.a('object');
			  item.should.include.keys(expectedKeys);
			});
		  });
	});

   it('should add a quiz on POST', function() {
		const newQuiz =
		{
			"name": "How to Train Your Dragon",
			"questions": [{
				"question": "What is Art for?",
				"correct": 1,
				"answers": ["A catharis for our emotions", "To embody the most ethical ideas", "To teach us to be our 'super' selves", "For expressing what words can never fully do"]
				},
				{
				"question": "Which pastime seems appealing to you?",
				"correct": 1,
				"answers": ["Backgammon", "Dinner parties", "Reclining in a chair with a glass of milk", "Billards"]
				},
				{
				"question": "What is reason for?",
				"correct": 1,
				"answers": ["Reason is a slave to the emotions", "To help us make moral choices", "To give understanding to the emotions", "Reason is faulty. We privilege certain ideas over others"]
			}]
	};
		return chai.request(app)
		  .post('/quizzes')
		  .send(newQuiz)
		  .set('content-type', 'application/json')
		  .then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.include.keys('__v','_id', 'name', 'questions');
			res.body.name.should.equal(newQuiz.name);
			res.body.questions.should.be.a('array');
			res.body._id.should.not.be.null;
		  });
	}); 
});

