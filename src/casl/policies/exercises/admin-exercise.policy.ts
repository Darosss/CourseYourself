import { AppAbility } from 'src/casl/casl-ability.factory';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class AdminExerciseHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Exercise);
  }
}
