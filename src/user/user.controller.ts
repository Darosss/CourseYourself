import { Controller, Get, Body, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { UpdateUserHandler } from 'src/casl/policies';
import { User } from './entities/user.entity';
import { UserEntity } from './decorators/user-entity.decorator';
import { USERS_ROUTE_NAME } from './constants';
@ApiBearerAuth()
@ApiTags(SwaggerTags.USERS)
@Controller(USERS_ROUTE_NAME)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserProfile(@Param('id') userId: string) {
    const user = await this.userService.getUserById(userId);
    return { user };
  }

  @Put(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(UpdateUserHandler)
  async updateUserProfile(
    @Param('id') _: string,
    @UserEntity() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUserProfile(user, updateUserDto);
    return { message: 'User profile updated successfully', user };
  }
}
