import {
  Column,
  CreateDateColumn,
  Entity,
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

  //TODO: ManyToMany exercies
  @Column()
  exercises: string;

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
}
