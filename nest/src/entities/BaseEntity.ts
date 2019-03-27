import { IEntity, PrimaryKey, Property } from 'mikro-orm';

export abstract class BaseEntity {

  @PrimaryKey()
  id: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

}

export interface BaseEntity extends IEntity { }
