import { EntityManager, MikroORM } from 'mikro-orm';
import { Logger, Module } from '@nestjs/common';

import { Author, Book, BaseEntity, BookTag, Publisher } from '../../entities';
import { MikroOrmMiddleware } from './mikro-orm.middleware';

const logger = new Logger(MikroORM.name);
const ormOptions = {
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  entitiesDirsTs: ['src/entities'],
  dbName: 'mikro-orm-nest-ts',
  type: 'mysql',
  port: 3307,
  debug: true,
  logger: logger.log.bind(logger),
};

const providers = [
  MikroOrmMiddleware,
  { provide: MikroORM, useFactory: async () => MikroORM.init(ormOptions) },
  { provide: EntityManager, useFactory: (orm: MikroORM) => orm.em, inject: [MikroORM] },
  { provide: 'AuthorRepository', useFactory: (em: EntityManager) => em.getRepository(Author), inject: [EntityManager] },
  { provide: 'BookRepository', useFactory: (em: EntityManager) => em.getRepository(Book), inject: [EntityManager] },
];

@Module({
  exports: providers,
  providers,
})
export class OrmModule { }
