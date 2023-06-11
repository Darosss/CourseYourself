import { AppAbility } from 'src/casl/casl-ability.factory';
import { Workout } from 'src/workout/entities/workout.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class UpdateWorkoutHandler implements PolicyHandler {
  constructor(private workout: Workout) {}

  handle(ability: AppAbility): boolean {
    if (!this.workout) return false;
    return ability.can(Action.Update, this.workout);
  }
}
