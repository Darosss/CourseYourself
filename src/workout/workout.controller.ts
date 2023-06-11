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
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';
import { User } from 'src/decorators/request-user.decorator';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import {
  CreateWorkoutHandler,
  RemoveWorkoutHandler,
  UpdateWorkoutHandler,
} from 'src/casl/policies';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { WorkoutEntity } from './decorators/workout-entity.decorator';
import { Workout } from './entities/workout.entity';

@ApiBearerAuth()
@ApiTags(SwaggerTags.WORKOUTS)
@UseGuards(PoliciesGuard)
@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  @CheckPolicies(CreateWorkoutHandler)
  async create(
    @User() user: UserRequestPayload,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return await this.workoutService.create(createWorkoutDto, user.id);
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
  @CheckPolicies(UpdateWorkoutHandler)
  async update(
    @Param('id') _: string,
    @WorkoutEntity() workout: Workout,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return await this.workoutService.update(workout, updateWorkoutDto);
  }

  @Delete(':id')
  @CheckPolicies(RemoveWorkoutHandler)
  async remove(@Param('id') _: string, @WorkoutEntity() { id }: Workout) {
    const removed = await this.workoutService.remove(id);
    if (removed) return { message: 'Workout removed successfully' };
    else throw new InternalServerErrorException();
  }
}
