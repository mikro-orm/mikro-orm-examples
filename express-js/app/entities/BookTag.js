'use strict';

const { Collection } = require('mikro-orm');
const { Book } = require('./Book');
const { BaseEntity } = require('./BaseEntity');

/**
 * @property {number} id
 * @property {string} name
 * @property {Collection<Book>} books
 */
class BookTag extends BaseEntity {

  /**
   * @param {string} name
   */
  constructor(name) {
    super();
    this.name = name;
  }

}

const schema = {
  name: 'BookTag',
  extends: 'BaseEntity',
  properties: {
    name: 'string',
    books: {
      reference: 'm:n',
      owner: false,
      mappedBy: 'tags',
      type: 'Book',
    },
  },
  path: __filename,
};

module.exports.BookTag = BookTag;
module.exports.entity = BookTag;
module.exports.schema = schema;
