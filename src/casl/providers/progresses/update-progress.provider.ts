import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateProgressHandler } from 'src/casl/policies/';

export const UpdateProgressPolicyProvider: Provider = {
  provide: UpdateProgressHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new UpdateProgressHandler(request.progress);
  },
};
