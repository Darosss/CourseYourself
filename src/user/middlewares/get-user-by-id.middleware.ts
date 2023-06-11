import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from '../user.service';

@Injectable()
export class RetrieveUserByIdMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: () => void) {
    if (!req.params.id) {
      throw new BadRequestException('Missing id');
    }
    const user = await this.userService.getUserById(req.params.id);
    if (!user) {
      throw new NotFoundException('User with provided id does not exist');
    }
    req.userEntity = user;
    next();
  }
}
