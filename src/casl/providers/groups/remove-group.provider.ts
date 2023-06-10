import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RemoveGroupHandler } from 'src/casl/policies/';

export const RemoveGroupPolicyProvider: Provider = {
  provide: RemoveGroupHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new RemoveGroupHandler(request.group);
  },
};
