import { Provider } from '@nestjs/common';

import { UpdateUserPolicyProvider } from './update-user.provider';

export const userPolicyProviders: Provider[] = [UpdateUserPolicyProvider];
