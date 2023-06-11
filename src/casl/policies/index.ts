import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

export * from './groups';
export * from './workouts';
export * from './users';

import { groupsPolicies } from './groups';
import { workoutsPolicies } from './workouts';
import { usersPolicies } from './users';

export const policies: Type<PolicyHandler>[] = [
  ...usersPolicies,
  ...groupsPolicies,
  ...workoutsPolicies,
];
