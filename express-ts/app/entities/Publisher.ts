import { ObjectID } from 'mongodb';
import { Collection, Entity, OneToMany, PrimaryKey, Property, IEntity } from 'mikro-orm';
import { Book } from '.';

@Entity()
export class Publisher {

  @PrimaryKey()
  _id: ObjectID;

  @Property()
  name: string;

  @OneToMany({ entity: () => Book.name, fk: 'publisher' })
  books = new Collection<Book>(this);

  @Property()
  type: PublisherType;

  constructor(name: string, type: PublisherType = PublisherType.LOCAL) {
    this.name = name;
    this.type = type;
  }

}

export interface Publisher extends IEntity<string> { }

export enum PublisherType {
  LOCAL = 'local',
  GLOBAL = 'global',
}
