import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto) {
    const exercise = this.exerciseRepository.create(createExerciseDto);
    return await this.exerciseRepository.save(exercise);
  }

  async findAll() {
    const exercises = await this.exerciseRepository.find({});
    return exercises;
  }

  async findAllByIds(ids: Array<string>) {
    return await this.exerciseRepository.find({ where: { id: In(ids) } });
  }

  async findOneById(id: string) {
    const exercise = await this.exerciseRepository.findOneBy({ id: id });
    return exercise;
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    const exercise = await this.exerciseRepository.findOneBy({ id: id });
    if (!exercise) {
      throw new Error('Exercise not found');
    }

    exercise.name = updateExerciseDto.name || exercise.name;
    exercise.description =
      updateExerciseDto.description || exercise.description;
    exercise.videoUrl = updateExerciseDto.videoUrl || exercise.videoUrl;
    exercise.muscleGroup =
      updateExerciseDto.muscleGroup || exercise.muscleGroup;
    exercise.requiredEquipment =
      updateExerciseDto.requiredEquipment || exercise.requiredEquipment;
    exercise.difficultyLevel =
      updateExerciseDto.difficultyLevel || exercise.difficultyLevel;

    return this.exerciseRepository.save(exercise);
  }

  async remove(id: string) {
    return await this.exerciseRepository.delete({ id: id });
  }
}
