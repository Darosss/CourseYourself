import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  timestamp?: Date;
}
