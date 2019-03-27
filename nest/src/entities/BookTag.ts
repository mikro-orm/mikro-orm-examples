import { Collection, Entity, ManyToMany, PrimaryKey, Property, IEntity } from 'mikro-orm';
import { Book } from '.';

@Entity()
export class BookTag {

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @ManyToMany({ entity: () => Book.name, mappedBy: 'tags' })
  books: Collection<Book> = new Collection<Book>(this);

  constructor(name: string) {
    this.name = name;
  }

}

export interface BookTag extends IEntity { }
