import { Provider } from '@nestjs/common';

import { groupPolicyProviders } from './groups';
import { workoutPolicyProviders } from './workouts';

export const providers: Provider[] = [
  ...groupPolicyProviders,
  ...workoutPolicyProviders,
];
