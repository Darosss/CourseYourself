import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ReadWorkoutHandler } from 'src/casl/policies/';

export const ReadWorkoutPolicyProvider: Provider = {
  provide: ReadWorkoutHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new ReadWorkoutHandler(request.workout);
  },
};
