import { Group } from 'src/group/entities/group.entity';
import { Workout } from 'src/workout/entities/workout.entity';

export type FlatGroup = Group & {
  'createdBy.id': Group['createdBy']['id'];
};

export type FlatWorkout = Workout & {
  'createdBy.id': Workout['createdBy']['id'];
};
