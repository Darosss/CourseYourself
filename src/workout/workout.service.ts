import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workouRepostiory: Repository<Workout>,
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto) {
    const workout = this.workouRepostiory.create(createWorkoutDto);
    console.log(workout);
    console.log('xd', createWorkoutDto);
    return await this.workouRepostiory.save(workout);
  }

  async findAll() {
    const workouts = await this.workouRepostiory.find({});
    return workouts;
  }

  async findOneById(id: string) {
    const workout = await this.workouRepostiory.findOneBy({ id: id });
    return workout;
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    const workout = await this.workouRepostiory.findOneBy({ id: id });
    if (!workout) {
      throw new Error('Workout not found');
    }

    workout.name = updateWorkoutDto.name || workout.name;
    workout.scheduledDate =
      updateWorkoutDto.scheduledDate || workout.scheduledDate;
    workout.completed = updateWorkoutDto.completed || workout.completed;
    workout.exercises = updateWorkoutDto.exercises || workout.exercises;
    workout.status = updateWorkoutDto.status || workout.status;
    workout.repeat = updateWorkoutDto.repeat || workout.repeat;
    workout.repeatFrequency =
      updateWorkoutDto.repeatFrequency || workout.repeatFrequency;
    workout.repeatDays = updateWorkoutDto.repeatDays || workout.repeatDays;
  }

  async remove(id: string) {
    return await this.workouRepostiory.delete({ id: id });
  }
}
