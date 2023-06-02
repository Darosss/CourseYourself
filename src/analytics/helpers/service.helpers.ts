import { Progress } from 'src/progress/entities/progress.entity';
import { ExerciseStatistics } from '../interfaces/exercise-statistics.interface';
import { WorkoutsStatistics } from '../interfaces/workouts-statistics.interface';
import { ExerciseProgress } from 'src/progress/interfaces/exercise-progress.interface';
export const getProgressStatisticsIntoArray = (progresses: Progress[]) => {
  //TODO: move this to aggregate functions from mysql?
  //TODO: add 'relation' between these exerciseIds
  const progressDataWorkouts = new Map<string, WorkoutsStatistics>();
  let progressDataExercises: [string, ExerciseStatistics][] = [];

  progresses.forEach((progress) => {
    const { workout, workoutExercises } = progress;

    //Workout statistics
    if (!progressDataWorkouts.has(workout.id)) {
      progressDataWorkouts.set(workout.id, { done: 1 });
    } else {
      const prevMap = progressDataWorkouts.get(workout.id);
      progressDataWorkouts.set(workout.id, { done: ++prevMap.done });
    }

    //Exercises statistics
    progressDataExercises = getWorkoutExercisesStatistics(workoutExercises);
  });

  return {
    workouts: Array.from(progressDataWorkouts),
    exercises: progressDataExercises,
  };
};

const getWorkoutExercisesStatistics = (exercises: ExerciseProgress[]) => {
  const progressDataExercises = new Map<string, ExerciseStatistics>();

  exercises.forEach((exercise) => {
    const { exerciseId, reps, sets, weight, duration } = exercise;
    if (!progressDataExercises.has(exerciseId)) {
      progressDataExercises.set(exerciseId, {
        sets: sets,
        reps: reps,
        weight: weight,
        duration: duration,
      });
    } else {
      const prevMap = progressDataExercises.get(exerciseId);
      progressDataExercises.set(exerciseId, {
        sets: sets + prevMap.sets,
        reps: reps + prevMap.reps,
        weight: weight + prevMap.weight,
        duration: duration + prevMap.duration,
      });
    }
  });

  return Array.from(progressDataExercises);
};
