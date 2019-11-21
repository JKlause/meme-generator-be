const { Router } = require('express');
const Meme = require('../model/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    Meme.create(req.body)
      .then(meme => res.json(meme))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Meme.findById(req.params.id)
      .then(meme => res.json(meme))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Meme.find()
      .lean()
      .then(memes => res.json(memes))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Meme.findOneAndRemove(req.params.id)
      .then(meme => res.json(meme))
      .catch(next);
  });
