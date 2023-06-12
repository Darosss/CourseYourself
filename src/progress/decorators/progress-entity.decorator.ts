import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { Progress } from '../entities/progress.entity';

export const ProgressEntity = createParamDecorator<
  unknown,
  ExecutionContext,
  Progress
>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.progress;
});
