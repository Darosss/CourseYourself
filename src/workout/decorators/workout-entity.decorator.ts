import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { Workout } from '../entities/workout.entity';

export const WorkoutEntity = createParamDecorator<
  unknown,
  ExecutionContext,
  Workout
>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.workout;
});
