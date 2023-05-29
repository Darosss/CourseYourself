import {
  IsString,
  Length,
  IsArray,
  ArrayUnique,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { NotificationType } from '../entities/notification.entity';

export class CreateNotificationDto {
  @Length(3, 50)
  name: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  @IsOptional()
  users: string[];

  @MaxLength(256)
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;
}
