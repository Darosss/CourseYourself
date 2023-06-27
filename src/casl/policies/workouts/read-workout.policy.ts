import { AppAbility } from 'src/casl/casl-ability.factory';
import { Workout } from 'src/workout/entities/workout.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class ReadWorkoutHandler implements PolicyHandler {
  constructor(private workout: Workout) {}

  handle(ability: AppAbility): boolean {
    if (!this.workout) return false;
    return ability.can(Action.Read, this.workout);
  }
}
