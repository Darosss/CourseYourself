import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { User } from 'src/decorators/request-user.decorator';
import { UserRequestPayload } from 'src/interfaces/request-types.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/helpers/swagger.helpers';

@ApiBearerAuth()
@ApiTags(SwaggerTags.ANALYTICS)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async getAllTimeAnalyics(@User() user: UserRequestPayload) {
    return await this.analyticsService.getAllTimeAnalyics(user.email);
  }

  @Get(':from/:to')
  async getAnalyticsFromPeriod(
    @Param('from') from: string,
    @Param('to') to: string,
    @User() user: UserRequestPayload,
  ) {
    return await this.analyticsService.getAnalyticsFromPeriod(
      user.email,
      new Date(from),
      new Date(to),
    );
  }
}
