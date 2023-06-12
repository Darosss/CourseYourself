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
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { AdminExerciseHandler } from 'src/casl/policies';
import { EXERCISES_ROUTE_NAME } from './constants';

@ApiBearerAuth()
@UseGuards(PoliciesGuard)
@ApiTags(SwaggerTags.EXERCISES)
@Controller(EXERCISES_ROUTE_NAME)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @CheckPolicies(AdminExerciseHandler)
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    return await this.exerciseService.create(createExerciseDto);
  }

  @Get()
  async findAll() {
    return await this.exerciseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exerciseService.findOneById(id);
  }

  @Patch(':id')
  @CheckPolicies(AdminExerciseHandler)
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return await this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  @CheckPolicies(AdminExerciseHandler)
  async remove(@Param('id') id: string) {
    const removed = await this.exerciseService.remove(id);
    if (removed) return { message: 'Exercise removed successfully' };
    else throw new InternalServerErrorException();
  }
}
