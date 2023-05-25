import { Optional } from '@nestjs/common';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ArrayMinSize } from 'class-validator';
import { DifficultyLevel } from '../entities/exercise.entity';

export class CreateExerciseDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @Optional()
  @MaxLength(256)
  description: string;

  @IsString()
  videoUrl: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  muscleGroup: string[];

  @IsArray()
  @ArrayUnique()
  @Optional()
  requiredEquipment: string[];

  @IsEnum(DifficultyLevel)
  difficultyLevel: DifficultyLevel;
}
