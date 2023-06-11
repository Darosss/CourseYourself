import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

export * from './groups';
export * from './workouts';

import { groupsPolicies } from './groups';
import { workoutsPolicies } from './workouts';

export const policies: Type<PolicyHandler>[] = [
  ...groupsPolicies,
  ...workoutsPolicies,
];
