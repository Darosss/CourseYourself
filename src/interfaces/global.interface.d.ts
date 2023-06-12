import { Group } from 'src/group/entities/group.entity';
import { Workout } from 'src/workout/entities/workout.entity';
import { UserWOPassword } from 'src/user/interfaces/user.interface';
import { Notification } from 'src/notification/entities/notification.entity';
import { Progress } from 'src/progress/entities/progress.entity';

declare global {
  namespace Express {
    interface Request {
      group?: Group;
      workout?: Workout;
      //need to do, because passport by default uses User
      userEntity?: UserWOPassword;

      notification?: Notification;
      progress?: Progress;
    }
  }
}
