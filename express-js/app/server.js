'use strict';

const express = require('express');
const { AuthorController, BookController } = require('./controllers');
const { EntityManager, EntityRepository, JavaScriptMetadataProvider, MikroORM, RequestContext } = require('mikro-orm');
const { Author, Book, Publisher, BookTag, BaseEntity } = require('./entities');

/**
 * @property {MikroORM} orm
 * @property {EntityManager} em
 * @property {EntityRepository<Author>} authorRepository
 * @property {EntityRepository<Book>} bookRepository
 */
const DI = {};
module.exports.DI = DI;

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  DI.orm = await MikroORM.init({
    entities: [Author, Book, Publisher, BookTag, BaseEntity],
    dbName: 'mikro-orm-express-js',
    metadataProvider: JavaScriptMetadataProvider,
    logger: console.log.bind(console),
    debug: true,
  });
  DI.em = DI.orm.em;
  DI.authorRepository = DI.orm.em.getRepository(Author.entity);
  DI.bookRepository = DI.orm.em.getRepository(Book.entity);

  app.use(express.json());
  app.use((req, res, next) => {
    RequestContext.create(DI.orm.em, next);
    req.di = DI;
  });
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express JS example, try CRUD on /author and /book endpoints!' }));
  app.use('/author', AuthorController);
  app.use('/book', BookController);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  app.listen(port, () => {
    console.log(`MikroORM express JS example started at http://localhost:${port}`);
  });
})();
