'use strict';

const { QueryOrder } = require('mikro-orm');
const { Router } = require('express');
const server = require('../server');
const { Author } = require('../entities/Author');

const router = Router();

router.get('/', async (req, res) => {
  const authors = await server.DI.authorRepository.findAll(['books'], { name: QueryOrder.DESC }, 20);
  res.json(authors);
});

router.get('/:id', async (req, res) => {
  try {
    const author = await server.DI.authorRepository.findOne(req.params.id, ['books']);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.name || !req.body.email) {
    res.status(400);
    return res.json({ message: 'One of `name, email` is missing' });
  }

  try {
    const author = new Author(req.body.name, req.body.email);
    author.assign(req.body);
    await server.DI.authorRepository.persist(author);

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: e.message, stack: e.stack });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const author = await server.DI.authorRepository.findOne(req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    author.assign(req.body);
    await server.DI.authorRepository.persist(author);

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

module.exports.AuthorController = router;
