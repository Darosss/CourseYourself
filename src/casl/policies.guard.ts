import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Scope,
  Type,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef, Reflector } from '@nestjs/core';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY } from './constants';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policiesHandlersRef =
      this.reflector.get<Type<PolicyHandler>[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    if (policiesHandlersRef.length === 0) return true;

    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId(
      context.switchToHttp().getRequest(),
      contextId,
    );

    const policyHandlers: PolicyHandler[] = [];
    for (let i = 0; i < policiesHandlersRef.length; i++) {
      const policyHandlerRef = policiesHandlersRef[i];
      const policyScope = this.moduleRef.introspect(policyHandlerRef).scope;
      let policyHandler: PolicyHandler;
      if (policyScope === Scope.DEFAULT) {
        policyHandler = this.moduleRef.get(policyHandlerRef, { strict: false });
      } else {
        policyHandler = await this.moduleRef.resolve(
          policyHandlerRef,
          contextId,
          { strict: false },
        );
      }
      policyHandlers.push(policyHandler);
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) return false;

    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      // this.execPolicyHandler(handler, ability),
      handler.handle(ability),
    );
  }

  // private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
  //   if (typeof handler === 'function') {
  //     return handler(ability);
  //   }
  //   return handler.handle(ability);
  // }
}
