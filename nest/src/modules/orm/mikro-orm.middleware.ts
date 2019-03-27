import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { MikroORM, RequestContext } from 'mikro-orm';

@Injectable()
export class MikroOrmMiddleware implements NestMiddleware {

  constructor(private readonly orm: MikroORM) { }

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      RequestContext.create(this.orm.em, next);
    };
  }

}
