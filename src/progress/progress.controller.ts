import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateExerciseProgressDto } from './dto/update-progress.dto';
import { User } from 'src/decorators/request-user.decorator';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';
import { ProgressEntity } from './decorators/progress-entity.decorator';
import { Progress } from './entities/progress.entity';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import {
  CreateProgressHandler,
  RemoveProgressHandler,
  UpdateProgressHandler,
} from 'src/casl/policies';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { PROGRESS_ROUTE_NAME } from './constants';

@ApiBearerAuth()
@UseGuards(PoliciesGuard)
@ApiTags(SwaggerTags.PROGRESSES)
@Controller(PROGRESS_ROUTE_NAME)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  @CheckPolicies(CreateProgressHandler)
  create(
    @User() user: UserRequestPayload,
    @Body() createProgressDto: CreateProgressDto,
  ) {
    return this.progressService.create(createProgressDto, user.email);
  }

  @Get()
  findAll() {
    return this.progressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressService.findOneById(id);
  }

  @Patch(':id/exercises/:exerciseId')
  @CheckPolicies(UpdateProgressHandler)
  update(
    @Param('id') _: string,
    @Param('exerciseId') exerciseId: string,
    @ProgressEntity() progress: Progress,
    @Body() updateExerciseProgressDto: UpdateExerciseProgressDto,
  ) {
    return this.progressService.updateWorkoutExercise(
      progress,
      exerciseId,
      updateExerciseProgressDto,
    );
  }

  @Delete(':id')
  @CheckPolicies(RemoveProgressHandler)
  async remove(@Param('id') _: string, @ProgressEntity() { id }: Progress) {
    const removed = await this.progressService.remove(id);
    if (removed) return { message: 'Progress removed successfully' };
    else throw new InternalServerErrorException();
  }
}
