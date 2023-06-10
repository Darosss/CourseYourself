import { Group } from 'src/group/entities/group.entity';

declare global {
  namespace Express {
    interface Request {
      group?: Group;
    }
  }
}
