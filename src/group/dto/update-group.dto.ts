import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto, CreateGroupDtoService } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}

export class UpdateGroupDtoService extends PartialType(CreateGroupDtoService) {}
