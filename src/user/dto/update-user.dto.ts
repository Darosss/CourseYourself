import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsNumber, IsString, IsArray } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  fitnessLevel?: string;

  @IsOptional()
  @IsString()
  workoutPreferences?: string;

  @IsOptional()
  @IsArray()
  groups?: string[];
}
