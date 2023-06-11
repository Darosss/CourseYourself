import { AppAbility } from 'src/casl/casl-ability.factory';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';
import { UserWOPassword } from 'src/user/interfaces/user.interface';

export class UpdateUserHandler implements PolicyHandler {
  constructor(private user: UserWOPassword) {}

  handle(ability: AppAbility): boolean {
    if (!this.user) return false;
    return ability.can(Action.Update, this.user);
  }
}
