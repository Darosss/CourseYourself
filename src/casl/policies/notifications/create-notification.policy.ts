import { AppAbility } from 'src/casl/casl-ability.factory';
import { Notification } from 'src/notification/entities/notification.entity';
import { PolicyHandler } from 'src/interfaces/policy-handler.interface';
import { Action } from '../../enums/action.enum';

export class CreateNotificationHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Notification);
  }
}
