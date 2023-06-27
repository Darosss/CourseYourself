import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

import { RemoveWorkoutHandler } from './remove-workout.policy';
import { UpdateWorkoutHandler } from './update-workout.policy';
import { CreateWorkoutHandler } from './create-workout.policy';
import { ReadWorkoutHandler } from './read-workout.policy';

export * from './remove-workout.policy';
export * from './update-workout.policy';
export * from './create-workout.policy';
export * from './read-workout.policy';

export const workoutsPolicies: Type<PolicyHandler>[] = [
  RemoveWorkoutHandler,
  UpdateWorkoutHandler,
  CreateWorkoutHandler,
  ReadWorkoutHandler,
];
