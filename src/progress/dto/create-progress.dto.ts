import { IsString } from 'class-validator';

export class CreateProgressDto {
  @IsString()
  workoutId: string;
}
