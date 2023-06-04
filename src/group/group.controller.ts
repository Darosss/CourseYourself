import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from 'src/decorators/request-user.decorator';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';

@ApiBearerAuth()
@ApiTags(SwaggerTags.GROUPS)
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
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
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return await this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.groupService.remove(id);
  }
}
