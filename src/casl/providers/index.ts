import { Provider } from '@nestjs/common';

import { groupPolicyProviders } from './groups';
import { workoutPolicyProviders } from './workouts';
import { userPolicyProviders } from './users';
import { notificationPolicyProviders } from './notifications';
import { exercisePolicyProviders } from './exercises';
import { progressPolicyProviders } from './progresses';

export const providers: Provider[] = [
  ...userPolicyProviders,
  ...groupPolicyProviders,
  ...workoutPolicyProviders,
  ...notificationPolicyProviders,
  ...exercisePolicyProviders,
  ...progressPolicyProviders,
];
