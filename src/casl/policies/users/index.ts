import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

import { UpdateUserHandler } from './update-user.policy';

export * from './update-user.policy';

export const usersPolicies: Type<PolicyHandler>[] = [UpdateUserHandler];
