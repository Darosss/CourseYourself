import { Provider } from '@nestjs/common';

import { RemoveNotificationPolicyProvider } from './remove-notification.provider';
import { UpdateNotificationPolicyProvider } from './update-notification.provider';
import { CreateNotificationPolicyProvider } from './create-notification.provider';

export const notificationPolicyProviders: Provider[] = [
  RemoveNotificationPolicyProvider,
  UpdateNotificationPolicyProvider,
  CreateNotificationPolicyProvider,
];
