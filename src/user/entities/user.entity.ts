import { Group } from 'src/group/entities/group.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Notification } from 'src/notification/entities/notification.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, select: false })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedDate: Date;

  @Column({ nullable: true })
  name: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true, select: false })
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, select: false })
  fitnessLevel: string;

  @Column('text', { nullable: true, select: false })
  workoutPreferences: string;

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];

  @ManyToMany(() => Notification, (notifications) => notifications, {
    nullable: true,
  })
  notifications: Notification[];

  @OneToMany(() => Progress, (progress) => progress.user, { nullable: true })
  progress: Progress[];

  @Column({ default: false })
  isAdmin: boolean;
}
