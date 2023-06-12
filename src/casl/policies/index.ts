import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

export * from './groups';
export * from './workouts';
export * from './users';
export * from './notifications';

import { groupsPolicies } from './groups';
import { workoutsPolicies } from './workouts';
import { usersPolicies } from './users';
import { notificationsPolicies } from './notifications';

export const policies: Type<PolicyHandler>[] = [
  ...usersPolicies,
  ...groupsPolicies,
  ...workoutsPolicies,
  ...notificationsPolicies,
];
