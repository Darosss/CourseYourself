import { AppAbility } from 'src/casl/casl-ability.factory';
import { Group } from 'src/group/entities/group.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class UpdateGroupHandler implements PolicyHandler {
  constructor(private group: Group) {}

  handle(ability: AppAbility): boolean {
    if (!this.group) return false;
    return ability.can(Action.Update, this.group);
  }
}
