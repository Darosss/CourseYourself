import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserProfile(@Param('id') userId: string) {
    const user = await this.userService.getUserById(userId);
    return { user };
  }

  @Put(':id')
  async updateUserProfile(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUserProfile(
      userId,
      updateUserDto,
    );
    return { message: 'User profile updated successfully', user };
  }
}
