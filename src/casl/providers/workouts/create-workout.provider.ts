import { Provider } from '@nestjs/common';
import { CreateWorkoutHandler } from 'src/casl/policies/';

export const CreateWorkoutPolicyProvider: Provider = CreateWorkoutHandler;
