const Quiz = require('./models');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

Quiz.create('How to Train a Dragon');
Quiz.create('How to Succeed in Business Without Really Trying');
Quiz.create('How the West Was Won');

router.get('/', (req, res) => {
  res.json(Quiz.get());
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['name'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating quiz item \`${req.params.id}\``);
   const updatedItem = Quiz.update({
    id: req.params.id,
    name: req.body.name,
    checked: req.body.checked
  });
  res.json(updatedItem);
})

module.exports = router;