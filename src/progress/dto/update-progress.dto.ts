import { PartialType } from '@nestjs/mapped-types';
import { CreateProgressDto } from './create-progress.dto';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateExerciseProgressDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sets: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  reps: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  weight: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  duration: number;
}

export class UpdateProgressDto extends PartialType(CreateProgressDto) {}
