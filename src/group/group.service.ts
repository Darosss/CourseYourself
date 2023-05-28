import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateGroupDtoService } from './dto/create-group.dto';
import { UpdateGroupDtoService } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { In, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(createGroupDto: CreateGroupDtoService) {
    const { users, ...restCreateData } = createGroupDto;
    const usersDB = await this.userService.findAllByIds(users);
    const group = this.groupRepository.create({
      users: usersDB,
      ...restCreateData,
    });
    return await this.groupRepository.save(group);
  }

  async findAll() {
    const groups = await this.groupRepository.find({
      relations: ['createdBy', 'users'],
    });
    return groups;
  }

  async findAllByIds(ids: Array<string>) {
    return await this.groupRepository.find({ where: { id: In(ids) } });
  }

  async findOneById(id: string) {
    const group = await this.groupRepository.findOneBy({ id: id });
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDtoService) {
    const group = await this.groupRepository.findOneBy({ id: id });
    if (!group) {
      throw new Error('Group not found');
    }

    if (updateGroupDto.users) {
      const users = await this.userService.findAllByIds(updateGroupDto.users);
      group.users = users;
    } else {
      group.users = group.users;
    }

    group.name = updateGroupDto.name || group.name;
    group.description = updateGroupDto.description || group.description;
    group.createdBy = group.createdBy;

    return this.groupRepository.save(group);
  }

  async remove(id: string) {
    return await this.groupRepository.delete({ id: id });
  }
}
