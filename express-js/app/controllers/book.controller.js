'use strict';

const { QueryOrder } = require('mikro-orm');
const { Router } = require('express');
const server = require('../server');
const { Book } = require('../entities');

const router = Router();

router.get('/', async (req, res) => {
  const books = await server.DI.bookRepository.findAll(['author'], { title: QueryOrder.DESC }, 20);
  res.json(books);
});

router.get('/:id', async (req, res) => {
  try {
    const book = await server.DI.bookRepository.findOne(req.params.id, ['author']);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.title || !req.body.author) {
    res.status(400);
    return res.json({ message: 'One of `title, author` is missing' });
  }

  try {
    const book = new Book(req.body.title, req.body.author);
    book.assign(req.body);
    await server.DI.bookRepository.persist(book);

    res.json(book);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const book = await server.DI.bookRepository.findOne(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.assign(req.body);
    await server.DI.bookRepository.persist(book);

    res.json(book);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

module.exports.BookController = router;
