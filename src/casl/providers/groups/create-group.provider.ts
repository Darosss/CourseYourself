import { Provider } from '@nestjs/common';
import { CreateGroupHandler } from 'src/casl/policies/';

export const CreateGroupPolicyProvider: Provider = CreateGroupHandler;
