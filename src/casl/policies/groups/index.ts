import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

import { RemoveGroupHandler } from './remove-group.policy';
import { UpdateGroupHandler } from './update-group.policy';
import { CreateGroupHandler } from './create-group.policy';

export * from './remove-group.policy';
export * from './update-group.policy';
export * from './create-group.policy';

export const groupsPolicies: Type<PolicyHandler>[] = [
  RemoveGroupHandler,
  UpdateGroupHandler,
  CreateGroupHandler,
];
