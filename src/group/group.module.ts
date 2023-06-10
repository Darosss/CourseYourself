import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { RetrieveGroupByIdMiddleware } from './middlewares/get-group-by-id.middleware';
import { GROUPS_ROUTE_NAME } from './constants';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), forwardRef(() => UserModule)],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RetrieveGroupByIdMiddleware)
      .forRoutes(
        { path: `${GROUPS_ROUTE_NAME}/:id`, method: RequestMethod.PATCH },
        { path: `${GROUPS_ROUTE_NAME}/:id`, method: RequestMethod.DELETE },
      );
  }
}
