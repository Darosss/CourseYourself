import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ProgressService } from '../progress.service';

@Injectable()
export class RetrieveProgressByIdMiddleware implements NestMiddleware {
  constructor(private progressService: ProgressService) {}

  async use(req: Request, res: Response, next: () => void) {
    if (!req.params.id) {
      throw new BadRequestException('Missing id');
    }
    const progress = await this.progressService.findOneById(req.params.id);
    if (!progress) {
      throw new NotFoundException('Progress with provided id does not exist');
    }
    req.progress = progress;
    next();
  }
}
