import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateWorkoutHandler } from 'src/casl/policies/';

export const UpdateWorkoutPolicyProvider: Provider = {
  provide: UpdateWorkoutHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new UpdateWorkoutHandler(request.workout);
  },
};
