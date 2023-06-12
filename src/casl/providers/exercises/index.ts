import { Provider } from '@nestjs/common';

import { CreateExercisePolicyProvider } from './admin-exercise.provider';

export const exercisePolicyProviders: Provider[] = [
  CreateExercisePolicyProvider,
];
