import { Provider } from '@nestjs/common';

import { RemoveProgressPolicyProvider } from './remove-progress.provider';
import { UpdateProgressPolicyProvider } from './update-progress.provider';
import { CreateProgressPolicyProvider } from './create-progress.provider';

export const progressPolicyProviders: Provider[] = [
  RemoveProgressPolicyProvider,
  UpdateProgressPolicyProvider,
  CreateProgressPolicyProvider,
];
