import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { User } from 'src/decorators/request-user.decorator';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';

@ApiBearerAuth()
@ApiTags(SwaggerTags.NOTIFICATIONS)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
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
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.notificationService.remove(id);
  }
}
