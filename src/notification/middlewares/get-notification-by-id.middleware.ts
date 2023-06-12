import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { NotificationService } from '../notification.service';

@Injectable()
export class RetrieveNotificationByIdMiddleware implements NestMiddleware {
  constructor(private notificationService: NotificationService) {}

  async use(req: Request, res: Response, next: () => void) {
    if (!req.params.id) {
      throw new BadRequestException('Missing id');
    }
    const notification = await this.notificationService.findOneById(
      req.params.id,
    );
    if (!notification) {
      throw new NotFoundException(
        'Notification with provided id does not exist',
      );
    }
    req.notification = notification;
    next();
  }
}
