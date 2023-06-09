import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Repository } from 'typeorm';
import { ExerciseService } from 'src/exercise/exercise.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workouRepostiory: Repository<Workout>,
    private readonly exerciseService: ExerciseService,
    private readonly userService: UserService,
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto, creatorId: string) {
    const creator = await this.userService.getUserById(creatorId);
    const { exercises, ...restCreateData } = createWorkoutDto;

    const exercisesDB = await this.exerciseService.findAllByIds(exercises);
    const workout = this.workouRepostiory.create({
      ...restCreateData,
      exercises: exercisesDB,
      createdBy: creator,
    });
    return await this.workouRepostiory.save(workout);
  }

  async findAll() {
    const workouts = await this.workouRepostiory.find({
      relations: {
        exercises: true,
        createdBy: true,
      },
    });
    return workouts;
  }

  async findOneById(id: string) {
    const workout = await this.workouRepostiory.findOne({
      where: { id: id },
      select: {
        createdBy: {
          id: true,
          isAdmin: true,
          name: true,
        },
      },
      relations: {
        exercises: true,
        createdBy: true,
      },
    });
    return workout;
  }

  async update(
    workout: Workout,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<Workout> {
    if (updateWorkoutDto.exercises) {
      const exercises = await this.exerciseService.findAllByIds(
        updateWorkoutDto.exercises,
      );
      workout.exercises = exercises;
    } else {
      workout.exercises = workout.exercises;
    }

    workout.name = updateWorkoutDto.name || workout.name;
    workout.description = updateWorkoutDto.description || workout.description;
    workout.scheduledDate =
      updateWorkoutDto.scheduledDate || workout.scheduledDate;
    workout.completed = updateWorkoutDto.completed || workout.completed;
    workout.status = updateWorkoutDto.status || workout.status;
    workout.repeat = updateWorkoutDto.repeat || workout.repeat;
    workout.repeatFrequency =
      updateWorkoutDto.repeatFrequency || workout.repeatFrequency;
    workout.repeatDays = updateWorkoutDto.repeatDays || workout.repeatDays;

    return this.workouRepostiory.save(workout);
  }

  async remove(id: string) {
    return await this.workouRepostiory.delete({ id: id });
  }
}
