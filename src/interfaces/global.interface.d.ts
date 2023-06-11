import { Group } from 'src/group/entities/group.entity';
import { Workout } from 'src/workout/entities/workout.entity';

declare global {
  namespace Express {
    interface Request {
      group?: Group;
      workout?: Workout;
    }
  }
}
