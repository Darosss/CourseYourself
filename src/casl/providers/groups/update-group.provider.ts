import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateGroupHandler } from 'src/casl/policies/';

export const UpdateGroupPolicyProvider: Provider = {
  provide: UpdateGroupHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new UpdateGroupHandler(request.group);
  },
};
