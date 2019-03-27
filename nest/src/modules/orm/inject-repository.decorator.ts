import { Inject } from '@nestjs/common';

export const InjectRepository = (entity: any) => Inject(`${entity.name}Repository`);
