import { Provider } from '@nestjs/common';

import { RemoveWorkoutPolicyProvider } from './remove-workout.provider';
import { UpdateWorkoutPolicyProvider } from './update-workout.provider';
import { CreateWorkoutPolicyProvider } from './create-workout.provider';
import { ReadWorkoutPolicyProvider } from './read-workout.provider';

export const workoutPolicyProviders: Provider[] = [
  RemoveWorkoutPolicyProvider,
  UpdateWorkoutPolicyProvider,
  CreateWorkoutPolicyProvider,
  ReadWorkoutPolicyProvider,
];
