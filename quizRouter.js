const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Quiz } = require('./models');

router.get('/', (req, res) => {
    Quiz
        .find()
        .exec()
        .then(quiz => {
            res.json(quiz);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong' });
        }
        );
}); 

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['name', 'questions'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating quiz item \`${req.params.id}\``);
    Quiz.update({
        id: req.params.id,
        name: req.body.name,
    })
        .exec()
        .then(() => res.status(204).end())
        .catch(() => res.status(500).json({ message: 'Internal server error' }));
});
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['name', 'questions'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    Quiz
        .create({
            name: req.body.name,
            questions: req.body.questions
        })
        .then(quiz => {
            res.json(quiz);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong' });
        });
});

router.delete('/:id', (req, res) => {
    Quiz
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(() => res.status(204).end())
        .catch(() => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = router;