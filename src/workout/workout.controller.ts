import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto) {
    console.log(createWorkoutDto);
    return await this.workoutService.create(createWorkoutDto);
  }

  @Get()
  async findAll() {
    return await this.workoutService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workoutService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return await this.workoutService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.workoutService.remove(id);
  }
}
