import { Provider } from '@nestjs/common';
import { CreateNotificationHandler } from 'src/casl/policies/';

export const CreateNotificationPolicyProvider: Provider =
  CreateNotificationHandler;
