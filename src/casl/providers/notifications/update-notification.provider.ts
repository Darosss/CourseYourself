import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateNotificationHandler } from 'src/casl/policies/';

export const UpdateNotificationPolicyProvider: Provider = {
  provide: UpdateNotificationHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new UpdateNotificationHandler(request.notification);
  },
};
