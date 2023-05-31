import { Exercise } from 'src/exercise/entities/exercise.entity';
import { Progress } from 'src/progress/entities/progress.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  DONE = 'done',
  MISSED = 'missed',
  SCHEDULED = 'scheduled',
}

export enum RepeatFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  CUSTOM = 'custom',
}

@Entity({ name: 'workouts' })
export class Workout {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  scheduledDate: Date;

  @Column()
  completed: boolean;

  @ManyToMany(() => Exercise)
  @JoinTable()
  exercises: Exercise[];

  @Column({ type: 'enum', enum: Status, default: Status.SCHEDULED })
  status: Status;

  @Column({ default: true })
  repeat: boolean;

  @Column({
    type: 'enum',
    enum: RepeatFrequency,
    default: RepeatFrequency.DAILY,
  })
  repeatFrequency: RepeatFrequency;

  @Column({ type: 'simple-array' })
  repeatDays: number[];

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @OneToMany(() => Progress, (progress) => progress.workout, { nullable: true })
  progress: Progress[];
}
