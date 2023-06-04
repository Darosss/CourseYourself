import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';

@ApiBearerAuth()
@ApiTags(SwaggerTags.EXERCISES)
@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
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
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return await this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.exerciseService.remove(id);
  }
}
