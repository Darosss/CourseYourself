import { Provider } from '@nestjs/common';

import { RemoveGroupPolicyProvider } from './remove-group.provider';
import { UpdateGroupPolicyProvider } from './update-group.provider';
import { CreateGroupPolicyProvider } from './create-group.provider';

export const groupPolicyProviders: Provider[] = [
  RemoveGroupPolicyProvider,
  UpdateGroupPolicyProvider,
  CreateGroupPolicyProvider,
];
