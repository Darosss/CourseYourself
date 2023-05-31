import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateExerciseProgressDto } from './dto/update-progress.dto';
import { UserService } from 'src/user/user.service';
import { WorkoutService } from 'src/workout/workout.service';
import { ExerciseProgress } from './interfaces/exercise-progress.interface';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(WorkoutService)
    private readonly workoutService: WorkoutService,
  ) {}

  async create(
    createProgressDto: CreateProgressDto,
    ownerEmail: string,
  ): Promise<Progress> {
    const { workoutId, ...restCreateProgressDto } = createProgressDto;
    const owner = await this.userService.getUserByEmail(ownerEmail);
    const workout = await this.workoutService.findOneById(workoutId);
    const dateNow = new Date();
    const workoutExercises = workout.exercises?.map<ExerciseProgress>(
      (exercise) => {
        return {
          exerciseId: exercise.id,
          date: dateNow,
          sets: 0,
          reps: 0,
          weight: 0,
          duration: 0,
        };
      },
    );
    const progress = this.progressRepository.create({
      ...restCreateProgressDto,
      user: owner,
      workout: workout,
      workoutExercises: workoutExercises || [],
    });
    return await this.progressRepository.save(progress);
  }

  async findAll(): Promise<Progress[]> {
    return this.progressRepository.find();
  }

  async findOneById(id: string): Promise<Progress> {
    return this.progressRepository.findOne({ where: { id: id } });
  }

  async updateWorkoutExercise(
    id: string,
    exerciseId: string,
    updateExerciseProgressDto: UpdateExerciseProgressDto,
  ): Promise<Progress> {
    const progress = await this.progressRepository.findOneBy({ id: id });
    if (!progress) {
      throw new Error('Progress not found');
    }
    progress.user = progress.user;
    progress.workout = progress.workout;

    const exerciseIndex = progress.workoutExercises.findIndex(
      (exercise) => exercise.exerciseId == exerciseId,
    );

    if (exerciseIndex === -1) {
      throw new Error('Exercise not found in Progress entry');
    }

    const updatingExercise = progress.workoutExercises[exerciseIndex];

    progress.workoutExercises[exerciseIndex] = {
      ...updatingExercise,
      date: updateExerciseProgressDto.date || updatingExercise.date,
      sets: updateExerciseProgressDto.sets || updatingExercise.sets,
      reps: updateExerciseProgressDto.reps || updatingExercise.reps,
      weight: updateExerciseProgressDto.weight || updatingExercise.weight,
      duration: updateExerciseProgressDto.duration || updatingExercise.duration,
    };

    return this.progressRepository.save(progress);
  }

  async remove(id: string) {
    return await this.progressRepository.delete(id);
  }
}
