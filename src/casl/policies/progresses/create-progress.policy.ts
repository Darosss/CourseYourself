import { AppAbility } from 'src/casl/casl-ability.factory';
import { Progress } from 'src/progress/entities/progress.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class CreateProgressHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Progress);
  }
}
