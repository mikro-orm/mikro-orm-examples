'use strict';

const { Collection } = require('mikro-orm');
const { Book } = require('./Book');
const { BaseEntity } = require('./BaseEntity');

/**
 * @property {string} name
 * @property {string} email
 * @property {number} age
 * @property {boolean} termsAccepted
 * @property {string[]} identities
 * @property {Date} born
 * @property {Collection<Book>} books
 * @property {Book} favouriteBook
 * @property {number} version
 * @property {string} versionAsString
 */
class Author extends BaseEntity {

  /**
   * @param {string} name
   * @param {string} email
   */
  constructor(name, email) {
    super();
    this.name = name;
    this.email = email;
    this.termsAccepted = false;
  }

}

Author.beforeDestroyCalled = 0;
Author.afterDestroyCalled = 0;

const schema = {
  name: 'Author',
  extends: 'BaseEntity',
  properties: {
    name: 'string',
    email: 'string',
    age: 'number',
    termsAccepted: 'boolean',
    identities: 'string[]',
    born: 'Date',
    books: {
      reference: '1:m',
      fk: 'author',
      type: 'Book',
    },
    favouriteBook: {
      reference: 'm:1',
      type: 'Book',
      fk: 'id',
    },
  },
  path: __filename,
};

module.exports.Author = Author;
module.exports.entity = Author;
module.exports.schema = schema;
