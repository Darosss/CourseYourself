import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { GroupService } from '../group.service';

@Injectable()
export class RetrieveGroupByIdMiddleware implements NestMiddleware {
  constructor(private groupService: GroupService) {}

  async use(req: Request, res: Response, next: () => void) {
    if (!req.params.id) {
      throw new BadRequestException('Missing id');
    }
    const group = await this.groupService.findOneById(req.params.id);
    if (!group) {
      throw new NotFoundException('Group with provided id does not exist');
    }
    req.group = group;
    next();
  }
}
