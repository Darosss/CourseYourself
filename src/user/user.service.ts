import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from '../auth/auth.utils';
import { UserWOPassword } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto;

    // Check if the user with the same email already exists
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAllByIds(ids: Array<string>) {
    return await this.userRepository.find({ where: { id: In(ids) } });
  }

  async getUserById(userId: string): Promise<UserWOPassword> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userRepository.findOneBy({
      id: userId,
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({
      email: email,
    });
  }

  async getUserLoginCredentials(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
      select: {
        password: true,
      },
    });
  }

  async updateUserProfile(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    user.name = updateUserDto.name || user.name;
    user.email = updateUserDto.email || user.email;
    user.age = updateUserDto.age || user.age;
    user.gender = updateUserDto.gender || user.gender;
    user.fitnessLevel = updateUserDto.fitnessLevel || user.fitnessLevel;
    user.workoutPreferences =
      updateUserDto.workoutPreferences || user.workoutPreferences;

    return this.userRepository.save(user);
  }
}
