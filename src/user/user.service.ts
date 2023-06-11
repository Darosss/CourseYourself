import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from '../auth/auth.utils';
import { UserWOPassword } from './interfaces/user.interface';
import { GroupService } from 'src/group/group.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
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
    const user = (await this.userRepository.findOne({
      where: {
        id: userId,
      },
    })) as UserWOPassword;

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
        id: true,
        password: true,
        email: true,
        isAdmin: true,
      },
    });
  }

  async updateUserProfile(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = user;
    if (updateUserDto.groups) {
      const groups = await this.groupService.findAllByIds(updateUserDto.groups);
      updatedUser.groups = groups;
    } else {
      updatedUser.groups = user.groups;
    }

    updatedUser.name = updateUserDto.name || user.name;
    updatedUser.email = updateUserDto.email || user.email;
    updatedUser.age = updateUserDto.age || user.age;
    updatedUser.gender = updateUserDto.gender || user.gender;
    updatedUser.fitnessLevel = updateUserDto.fitnessLevel || user.fitnessLevel;
    updatedUser.workoutPreferences =
      updateUserDto.workoutPreferences || user.workoutPreferences;

    return this.userRepository.save(updatedUser);
  }
}
