import { Provider } from '@nestjs/common';

import { groupPolicyProviders } from './groups';
import { workoutPolicyProviders } from './workouts';
import { userPolicyProviders } from './users';

export const providers: Provider[] = [
  ...userPolicyProviders,
  ...groupPolicyProviders,
  ...workoutPolicyProviders,
];
