import { User } from '../entities/user.entity';

export type UserWOPassword = Omit<User, 'password'>;
