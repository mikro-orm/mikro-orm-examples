'use strict';

const { Collection, ReferenceType } = require('mikro-orm');
const { MetadataStorage } = require('mikro-orm/dist/metadata');

/**
 * @property {ObjectID} _id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
class BaseEntity {

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();

    const meta = MetadataStorage.getMetadata(this.constructor.name);
    const props = meta.properties;

    Object.keys(props).forEach(prop => {
      if ([ReferenceType.ONE_TO_MANY, ReferenceType.MANY_TO_MANY].includes(props[prop].reference)) {
        this[prop] = new Collection(this);
      }
    });
  }

}

const schema = {
  properties: {
    _id: {
      primary: true,
      type: 'ObjectID',
    },
    createdAt: 'Date',
    updatedAt: {
      type: 'Date',
      onUpdate: () => new Date(),
    },
  },
  path: __filename,
};

module.exports.BaseEntity = BaseEntity;
module.exports.entity = BaseEntity;
module.exports.schema = schema;
