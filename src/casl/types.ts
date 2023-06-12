import { Group } from 'src/group/entities/group.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Workout } from 'src/workout/entities/workout.entity';

export type FlatGroup = Group & {
  'createdBy.id': Group['createdBy']['id'];
};

export type FlatWorkout = Workout & {
  'createdBy.id': Workout['createdBy']['id'];
};

export type FlatNotification = Notification & {
  'createdBy.id': Notification['createdBy']['id'];
};
