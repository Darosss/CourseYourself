import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

export enum NotificationType {
  REMINDER = 'reminder',
  ALERT = 'alert',
  ACHIEVEMENT = 'achievement',
  SYSTEM = 'system',
  PROGRESS = 'progress',
}

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => User, (users) => users.notifications, { nullable: true })
  @JoinTable()
  users: User[];

  @Column()
  name: string;

  @Column()
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.ALERT,
  })
  type: NotificationType;

  @Column({ type: 'timestamp', nullable: true })
  timestamp: Date;

  @ManyToOne(() => User)
  createdBy?: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
