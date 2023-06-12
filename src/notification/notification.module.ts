import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { RetrieveNotificationByIdMiddleware } from './middlewares/get-notification-by-id.middleware';
import { NOTIFICATIONS_ROUTE_NAME } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    forwardRef(() => UserModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RetrieveNotificationByIdMiddleware).forRoutes(
      {
        path: `${NOTIFICATIONS_ROUTE_NAME}/:id`,
        method: RequestMethod.PATCH,
      },
      {
        path: `${NOTIFICATIONS_ROUTE_NAME}/:id`,
        method: RequestMethod.GET,
      },
      {
        path: `${NOTIFICATIONS_ROUTE_NAME}/:id`,
        method: RequestMethod.DELETE,
      },
    );
  }
}
