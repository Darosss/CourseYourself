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
  ReadWorkoutHandler,
  RemoveWorkoutHandler,
  UpdateWorkoutHandler,
} from 'src/casl/policies';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { WorkoutEntity } from './decorators/workout-entity.decorator';
import { Workout } from './entities/workout.entity';
import { WORKOUTS_ROUTE_NAME } from './constants';

@ApiBearerAuth()
@ApiTags(SwaggerTags.WORKOUTS)
@UseGuards(PoliciesGuard)
@Controller(WORKOUTS_ROUTE_NAME)
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
  async findAll(@User() user: UserRequestPayload) {
    const workouts = await this.workoutService.findAll();
    const filteredWorkouts = workouts.filter(
      ({ createdBy }) => createdBy.id === user.id,
    );
    return filteredWorkouts;
  }

  @Get(':id')
  @CheckPolicies(ReadWorkoutHandler)
  async findOne(@Param('id') id: string, @WorkoutEntity() workout: Workout) {
    return workout;
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
