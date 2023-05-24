import { Optional } from '@nestjs/common';
import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { RepeatFrequency, Status } from '../entities/workout.entity';
import { ArrayMinSize } from 'class-validator';
import { ToBoolean } from 'src/decorators/to-bolean.decorator';
import { ArrayToNumbers } from 'src/decorators/array-to-number.decorator';

export class CreateWorkoutDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @Optional()
  @MaxLength(256)
  description: string;

  @IsDateString()
  scheduledDate: Date;

  @ToBoolean()
  completed: boolean;

  @IsString()
  exercises: string;

  @IsEnum(Status)
  status: Status;

  @ToBoolean()
  repeat: boolean;

  @IsEnum(RepeatFrequency)
  @Optional()
  repeatFrequency: RepeatFrequency;

  @IsArray()
  @ArrayToNumbers()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(7, { each: true })
  @Optional()
  repeatDays: number[];
}
