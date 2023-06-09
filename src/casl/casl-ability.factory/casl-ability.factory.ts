import {
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from '../action.enum';
import { Group } from 'src/group/entities/group.entity';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';

type Subjects = any | 'all';

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
    }

    can([Action.Delete, Action.Update], Group, {
      createdById: user.id,
    });

    return build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
