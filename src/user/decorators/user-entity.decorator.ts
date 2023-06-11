import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { UserWOPassword } from '../interfaces/user.interface';

export const UserEntity = createParamDecorator<
  unknown,
  ExecutionContext,
  UserWOPassword
>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.userEntity;
});
