import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';
import { IsDateString } from 'class-validator';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsDateString()
  timestamp?: Date;
}
