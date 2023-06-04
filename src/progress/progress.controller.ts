import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateExerciseProgressDto } from './dto/update-progress.dto';
import { User } from 'src/decorators/request-user.decorator';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';

@ApiBearerAuth()
@ApiTags(SwaggerTags.PROGRESSES)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
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
  update(
    @Param('id') id: string,
    @Param('exerciseId') exerciseId: string,
    @Body() updateExerciseProgressDto: UpdateExerciseProgressDto,
  ) {
    return this.progressService.updateWorkoutExercise(
      id,
      exerciseId,
      updateExerciseProgressDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressService.remove(id);
  }
}
