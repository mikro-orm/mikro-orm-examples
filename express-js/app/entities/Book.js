'use strict';

const { Publisher } = require('./Publisher');
const { Author } = require('./Author');
const { BookTag } = require('./BookTag');
const { BaseEntity } = require('./BaseEntity');
const { Collection } = require('mikro-orm');

/**
 * @property {string} title
 * @property {Author} author
 * @property {Publisher} publisher
 * @property {Collection<BookTag>} tags
 */
class Book extends BaseEntity {

  /**
   * @param {string} title
   * @param {Author} author
   */
  constructor(title, author) {
    super();
    this.title = title;
    this.author = author;
  }

}

const schema = {
  name: 'Book',
  extends: 'BaseEntity',
  properties: {
    title: 'string',
    author: {
      reference: 'm:1',
      type: 'Author',
      fk: 'id',
    },
    publisher: {
      reference: 'm:1',
      type: 'Publisher',
      fk: 'id',
    },
    tags: {
      reference: 'm:n',
      owner: true,
      inversedBy: 'books',
      type: 'BookTag',
    },
  },
  path: __filename,
};

module.exports.Book = Book;
module.exports.entity = Book;
module.exports.schema = schema;
