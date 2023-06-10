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
import { FlatGroup } from '../types';

type Subjects = Group | typeof Group | 'all';

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
      can(Action.Create, Group);
      can<FlatGroup>([Action.Delete, Action.Update], Group, {
        'createdBy.id': user.id,
      });
    }

    return build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
