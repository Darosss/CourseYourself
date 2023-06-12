import { AppAbility } from 'src/casl/casl-ability.factory';
import { Progress } from 'src/progress/entities/progress.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class RemoveProgressHandler implements PolicyHandler {
  constructor(private progress: Progress) {}

  handle(ability: AppAbility): boolean {
    if (!this.progress) return false;
    return ability.can(Action.Delete, this.progress);
  }
}
