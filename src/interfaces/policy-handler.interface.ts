import { AppAbility } from '../casl/casl-ability.factory';

export interface PolicyHandler {
  handle(ability: AppAbility): boolean;
}
