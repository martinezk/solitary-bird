var express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');
var app = express();
app.use(express.static('public'));
const quizRouter = require('./quizRouter');
app.use('/quizzes', quizRouter);

/*const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../server'); 

const should = chai.should();

chai.use(chaiHttp);

var request = require('request');
/*describe('Shopping List', function() {
    it('should list items on GET', function() {
    return chai.request(server)
      .get('/shopping-list')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');

        // because we create three items on app load
        res.body.length.should.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        const expectedKeys = ['id', 'name', 'checked'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
      });
  });
//...
});*/

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

/*describe('Quizzes', function() {
    it('should list items on GET', function() {
    return chai.request(server)
      .get('/quizzes')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        const expectedKeys = ['id', 'name', 'questions'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
      });
  });
//...
}); */