import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RemoveNotificationHandler } from 'src/casl/policies';

export const RemoveNotificationPolicyProvider: Provider = {
  provide: RemoveNotificationHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new RemoveNotificationHandler(request.notification);
  },
};
