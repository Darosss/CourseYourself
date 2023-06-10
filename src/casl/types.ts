import { Group } from 'src/group/entities/group.entity';

export type FlatGroup = Group & {
  'createdBy.id': Group['createdBy']['id'];
};
