import { Inject, Injectable } from '@nestjs/common';
import { ProgressService } from 'src/progress/progress.service';
import { Between } from 'typeorm';
import { ExerciseStatistics } from './interfaces/exercise-statistics.interface';
import { WorkoutsStatistics } from './interfaces/workouts-statistics.interface';
import { getProgressStatisticsIntoArray } from './helpers/service.helpers';

@Injectable()
export class AnalyticsService {
  constructor(
    @Inject(ProgressService)
    private readonly progressService: ProgressService,
  ) {}

  async getAllTimeAnalyics(userEmail: string) {
    const allProgressData = await this.progressService.findAll({
      where: {
        user: {
          email: userEmail,
        },
      },
      relations: {
        workout: true,
      },
    });

    const statistics = getProgressStatisticsIntoArray(allProgressData);

    return statistics;
  }

  async getAnalyticsFromPeriod(
    userEmail: string,
    from: Date,
    to?: Date,
  ): Promise<{
    workouts: [string, WorkoutsStatistics][];
    exercises: [string, ExerciseStatistics][];
  }> {
    const progressData = await this.progressService.findAll({
      where: {
        user: {
          email: userEmail,
        },
        createdDate: Between(from, to),
      },
      relations: {
        workout: true,
      },
    });

    const statistics = getProgressStatisticsIntoArray(progressData);

    return statistics;
  }
}
