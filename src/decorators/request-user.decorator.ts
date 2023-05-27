import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserRequestPayload;
  },
);
