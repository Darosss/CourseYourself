import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

import { RemoveNotificationHandler } from './remove-notification.policy';
import { UpdateNotificationHandler } from './update-notification.policy';
import { CreateNotificationHandler } from './create-notification.policy';

export * from './remove-notification.policy';
export * from './update-notification.policy';
export * from './create-notification.policy';

export const notificationsPolicies: Type<PolicyHandler>[] = [
  RemoveNotificationHandler,
  UpdateNotificationHandler,
  CreateNotificationHandler,
];
