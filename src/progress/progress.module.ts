import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Progress } from './entities/progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { WorkoutModule } from 'src/workout/workout.module';
import { RetrieveProgressByIdMiddleware } from './middlewares/get-progress-by-id.middleware';
import { PROGRESS_PATCH_NAME, PROGRESS_ROUTE_NAME } from './constants';

@Module({
  imports: [TypeOrmModule.forFeature([Progress]), UserModule, WorkoutModule],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RetrieveProgressByIdMiddleware).forRoutes(
      {
        path: `${PROGRESS_ROUTE_NAME}/:id`,
        method: RequestMethod.GET,
      },
      {
        path: PROGRESS_PATCH_NAME,
        method: RequestMethod.PATCH,
      },
      {
        path: `${PROGRESS_ROUTE_NAME}/:id`,
        method: RequestMethod.DELETE,
      },
    );
  }
}
