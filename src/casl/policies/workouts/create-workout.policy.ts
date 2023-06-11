import { AppAbility } from 'src/casl/casl-ability.factory';
import { Workout } from 'src/workout/entities/workout.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class CreateWorkoutHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Workout);
  }
}
