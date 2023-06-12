import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from 'src/decorators/request-user.decorator';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { GroupEntity } from './decorators/group-entity.decorator';
import { Group } from './entities/group.entity';
import {
  CreateGroupHandler,
  UpdateGroupHandler,
  RemoveGroupHandler,
} from 'src/casl/policies';
import { GROUPS_ROUTE_NAME } from './constants';

@ApiBearerAuth()
@UseGuards(PoliciesGuard)
@ApiTags(SwaggerTags.GROUPS)
@Controller(GROUPS_ROUTE_NAME)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @CheckPolicies(CreateGroupHandler)
  async create(
    @User() user: UserRequestPayload,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return await this.groupService.create(createGroupDto, user.email);
  }

  @Get()
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.groupService.findOneById(id);
  }

  @Patch(':id')
  @CheckPolicies(UpdateGroupHandler)
  async update(
    @GroupEntity() group: Group,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return await this.groupService.update(group, updateGroupDto);
  }

  @Delete(':id')
  @CheckPolicies(RemoveGroupHandler)
  async remove(@Param('id') _: string, @GroupEntity() { id }: Group) {
    const removed = await this.groupService.remove(id);
    if (removed) return { message: 'Group removed successfully' };
    else throw new InternalServerErrorException();
  }
}
