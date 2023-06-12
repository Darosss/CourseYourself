import { SetMetadata, Type } from '@nestjs/common';
import { CHECK_POLICIES_KEY } from 'src/casl/constants';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';

export const CheckPolicies = (...handlers: Type<PolicyHandler>[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
