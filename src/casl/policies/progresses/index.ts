import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

import { UpdateProgressHandler } from './update-progress.policy';
import { RemoveProgressHandler } from './remove-progress.policy';
import { CreateProgressHandler } from './create-progress.policy';

export * from './remove-progress.policy';
export * from './update-progress.policy';
export * from './create-progress.policy';

export const progresssPolicies: Type<PolicyHandler>[] = [
  RemoveProgressHandler,
  UpdateProgressHandler,
  CreateProgressHandler,
];
