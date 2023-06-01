import { Optional } from '@nestjs/common';
import {
  ArrayUnique,
  IsArray,
  IsDate,
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
import { ArrayToNumbers } from 'src/decorators/array-to-number.decorator';
import { ToBoolean } from 'src/decorators/to-bolean.decorator';
import { Type } from 'class-transformer';

export class CreateWorkoutDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @Optional()
  @MaxLength(256)
  description: string;

  @IsDate()
  @Type(() => Date)
  scheduledDate: Date;

  @ToBoolean()
  completed: boolean;

  @IsArray()
  @IsString({ each: true })
  exercises: string[];

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
