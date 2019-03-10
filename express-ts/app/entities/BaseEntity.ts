import { IEntity, PrimaryKey, Property } from 'mikro-orm';
import { ObjectID } from 'mongodb';

export abstract class BaseEntity {

  @PrimaryKey()
  _id: ObjectID;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

}

export interface BaseEntity extends IEntity<string> { }
