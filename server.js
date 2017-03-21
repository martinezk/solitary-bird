const express = require('express');
const mongoose = require('mongoose');

const {DATABASE_URL, PORT} = require('./config');
const quizRouter = require('./quizRouter');

const app = express();
app.use(express.static('public'));

app.use('/quizzes', quizRouter);

mongoose.Promise = global.Promise;

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
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

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}
module.exports = {app, runServer, closeServer};
