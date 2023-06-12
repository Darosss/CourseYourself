import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { Notification } from '../entities/notification.entity';

export const NotificationEntity = createParamDecorator<
  unknown,
  ExecutionContext,
  Notification
>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.notification;
});
