import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RemoveProgressHandler } from 'src/casl/policies/';

export const RemoveProgressPolicyProvider: Provider = {
  provide: RemoveProgressHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new RemoveProgressHandler(request.progress);
  },
};
