import { User } from 'src/user/entities/user.entity';
import { Workout } from 'src/workout/entities/workout.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExerciseProgress } from '../interfaces/exercise-progress.interface';

@Entity({ name: 'progresses' })
export class Progress {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Workout, (workouts) => workouts.progress)
  @JoinColumn({ name: 'workoutId' })
  workout: Workout;

  @ManyToOne(() => User, (user) => user.progress)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'json' })
  workoutExercises: ExerciseProgress[];

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
