import { ExerciseProgress } from 'src/progress/interfaces/exercise-progress.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExerciseStatistics
  extends Omit<ExerciseProgress, 'exerciseId' | 'date'> {}
