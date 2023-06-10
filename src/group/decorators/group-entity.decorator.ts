import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { Group } from '../entities/group.entity';

export const GroupEntity = createParamDecorator<
  unknown,
  ExecutionContext,
  Group
>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.group;
});
