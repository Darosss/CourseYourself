import {
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from '../enums/action.enum';
import { Group } from 'src/group/entities/group.entity';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';
import { FlatGroup, FlatProgress, FlatWorkout } from '../types';
import { Workout } from 'src/workout/entities/workout.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { UserWOPassword } from 'src/user/interfaces/user.interface';
import { User } from 'src/user/entities/user.entity';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { Progress } from 'src/progress/entities/progress.entity';

type Subjects =
  | UserWOPassword
  | typeof User
  | Group
  | typeof Group
  | Workout
  | typeof Workout
  | Notification
  | typeof Notification
  | Exercise
  | typeof Exercise
  | Progress
  | typeof Progress
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserRequestPayload) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');

      //Users permissions
      can(Action.Update, User, { id: user.id });

      //Group permissions
      can(Action.Create, Group);
      can<FlatGroup>([Action.Delete, Action.Update], Group, {
        'createdBy.id': user.id,
      });

      //Workouts permissions
      can(Action.Create, Workout);
      can<FlatWorkout>([Action.Delete, Action.Update], Workout, {
        'createdBy.id': user.id,
      });

      //Notifications permissions
      can(Action.Create, [Notification]);
      can<FlatWorkout>([Action.Delete, Action.Update], Notification, {
        'createdBy.id': user.id,
      });

      //Progresses permissions
      can(Action.Create, [Progress]);
      can<FlatProgress>([Action.Delete, Action.Update], Progress, {
        'user.id': user.id,
      });
    }

    return build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
