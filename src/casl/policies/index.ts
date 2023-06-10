import { Type } from '@nestjs/common';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

export * from './groups';

import { groupsPolicies } from './groups';

export const policies: Type<PolicyHandler>[] = [...groupsPolicies];
