import { Optional } from '@nestjs/common';
import {
  IsString,
  Length,
  MaxLength,
  IsArray,
  ArrayUnique,
  IsOptional,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @Optional()
  @MaxLength(256)
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  @IsOptional()
  users: string[];
}
