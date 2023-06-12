import { Provider } from '@nestjs/common';
import { CreateProgressHandler } from 'src/casl/policies/';

export const CreateProgressPolicyProvider: Provider = CreateProgressHandler;
