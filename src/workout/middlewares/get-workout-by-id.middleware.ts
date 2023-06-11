import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { WorkoutService } from '../workout.service';

@Injectable()
export class RetrieveWorkoutByIdMiddleware implements NestMiddleware {
  constructor(private workoutService: WorkoutService) {}

  async use(req: Request, res: Response, next: () => void) {
    if (!req.params.id) {
      throw new BadRequestException('Missing id');
    }
    const workout = await this.workoutService.findOneById(req.params.id);
    console.log(workout, 'xd');
    if (!workout) {
      throw new NotFoundException('Workout with provided id does not exist');
    }
    req.workout = workout;
    next();
  }
}
