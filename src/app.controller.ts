import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { Public } from './auth/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from './helpers/swagger.helpers';
import { LoginDto } from './auth/dto/login.dto';

@ApiTags(SwaggerTags.AUTH)
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.registerUser(createUserDto);
    return { message: 'User registered successfully', user };
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
