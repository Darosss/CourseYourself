import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { UserModule } from 'src/user/user.module';
import { RetrieveWorkoutByIdMiddleware } from './middlewares/get-workout-by-id.middleware';
import { WORKOUTS_ROUTE_NAME } from './constants';

@Module({
  imports: [TypeOrmModule.forFeature([Workout]), ExerciseModule, UserModule],
  controllers: [WorkoutController],
  providers: [WorkoutService],
  exports: [WorkoutService],
})
export class WorkoutModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RetrieveWorkoutByIdMiddleware).forRoutes(
      {
        path: `${WORKOUTS_ROUTE_NAME}/:id`,
        method: RequestMethod.PATCH,
      },
      {
        path: `${WORKOUTS_ROUTE_NAME}/:id`,
        method: RequestMethod.DELETE,
      },
    );
  }
}
