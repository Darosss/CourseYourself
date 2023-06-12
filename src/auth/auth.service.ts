import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from './auth.utils';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { UserWOPassword } from 'src/user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.registerUser(createUserDto);
  }

  async validateUser(email: string, pass: string): Promise<UserWOPassword> {
    const user = await this.usersService.getUserLoginCredentials(email);
    if (user) {
      const passwordMatch = await comparePasswords(pass, user.password);

      if (passwordMatch) {
        // To return everything without password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: LoginDto) {
    const { id, isAdmin } = await this.usersService.getUserByEmail(user.email);
    const payload = { email: user.email, id: id, isAdmin: isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
