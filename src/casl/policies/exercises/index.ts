import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

import { AdminExerciseHandler } from './admin-exercise.policy';

export * from './admin-exercise.policy';

export const exercisesPolicies: Type<PolicyHandler>[] = [AdminExerciseHandler];
