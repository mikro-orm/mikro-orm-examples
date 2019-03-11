'use strict';

const { Collection } = require('mikro-orm');
const { Book } = require('./Book');
const { BaseEntity } = require('./BaseEntity');

/**
 * @property {string} name
 * @property {string} type
 * @property {Collection<Book>} books
 */
class Publisher extends BaseEntity {

  constructor(name = 'asd', type = 'local') {
    super();
    this.name = name;
    this.type = type;
  }

}

const schema = {
  name: 'Publisher',
  extends: 'BaseEntity',
  properties: {
    name: {
      type: 'string',
    },
    books: {
      reference: '1:m',
      fk: 'publisher',
      type: 'Book',
    },
    type: {
      type: 'string',
    },
  },
  path: __filename,
};

module.exports.Publisher = Publisher;
module.exports.entity = Publisher;
module.exports.schema = schema;
