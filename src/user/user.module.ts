import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GroupModule } from 'src/group/group.module';
import { RetrieveUserByIdMiddleware } from './middlewares/get-user-by-id.middleware';
import { USERS_ROUTE_NAME } from './constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => GroupModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RetrieveUserByIdMiddleware).forRoutes({
      path: `${USERS_ROUTE_NAME}/:id`,
      method: RequestMethod.PUT,
    });
  }
}
