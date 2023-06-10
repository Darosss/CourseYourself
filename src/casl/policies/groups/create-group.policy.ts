import { AppAbility } from 'src/casl/casl-ability.factory';
import { Group } from 'src/group/entities/group.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class CreateGroupHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Group);
  }
}
