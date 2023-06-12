import { AppAbility } from 'src/casl/casl-ability.factory';
import { Notification } from 'src/notification/entities/notification.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class UpdateNotificationHandler implements PolicyHandler {
  constructor(private notification: Notification) {}

  handle(ability: AppAbility): boolean {
    if (!this.notification) return false;
    return ability.can(Action.Update, this.notification);
  }
}
