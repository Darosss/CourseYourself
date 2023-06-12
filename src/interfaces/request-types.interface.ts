import { User } from 'src/user/entities/user.entity';

export type UserRequestPayload = Pick<User, 'id' | 'email' | 'isAdmin'>;
