import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RemoveWorkoutHandler } from 'src/casl/policies';

export const RemoveWorkoutPolicyProvider: Provider = {
  provide: RemoveWorkoutHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new RemoveWorkoutHandler(request.workout);
  },
};
