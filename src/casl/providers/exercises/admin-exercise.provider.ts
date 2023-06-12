import { Provider } from '@nestjs/common';
import { AdminExerciseHandler } from 'src/casl/policies/';

export const CreateExercisePolicyProvider: Provider = AdminExerciseHandler;
