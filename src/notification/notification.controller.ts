import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { User } from 'src/decorators/request-user.decorator';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import {
  CreateNotificationHandler,
  RemoveNotificationHandler,
  UpdateNotificationHandler,
} from 'src/casl/policies';
import { NotificationEntity } from './decorators/notification-entity.decorator';
import { Notification } from './entities/notification.entity';

@ApiBearerAuth()
@UseGuards(PoliciesGuard)
@ApiTags(SwaggerTags.NOTIFICATIONS)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @CheckPolicies(CreateNotificationHandler)
  async create(
    @User() user: UserRequestPayload,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.create(createNotificationDto, user.email);
  }

  @Get()
  async findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.notificationService.findOneById(id);
  }

  @Patch(':id')
  @CheckPolicies(UpdateNotificationHandler)
  async update(
    @Param('id') _: string,
    @NotificationEntity() notification: Notification,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(notification, updateNotificationDto);
  }

  @Delete(':id')
  @CheckPolicies(RemoveNotificationHandler)
  async remove(
    @Param('id') _: string,
    @NotificationEntity() { id }: Notification,
  ) {
    return this.notificationService.remove(id);
  }
}
