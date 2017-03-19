const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../server'); 

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

});


