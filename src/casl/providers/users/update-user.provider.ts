import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateUserHandler } from 'src/casl/policies/';

export const UpdateUserPolicyProvider: Provider = {
  provide: UpdateUserHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new UpdateUserHandler(request.userEntity);
  },
};
