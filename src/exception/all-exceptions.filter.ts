import {
  ArgumentsHost,
  // BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private statusCode: number;
  private response: any;
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.statusCode = 500;
    this.response = {
      message: 'Internal server error',
    };
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (exception instanceof HttpException) {
      // if (exception instanceof BadRequestException) {
      //   this.statusCode = exception.getStatus();
      //   this.response = exception.getResponse();
      // } else {
      this.statusCode = exception.getStatus();
      this.response = exception.getResponse();
      // }
    } else if (exception instanceof TypeORMError) {
      if (exception instanceof QueryFailedError) {
        this.statusCode = 400;
        this.response = {
          message: exception.message,
          error: exception.name,
        };
      }
    }
    console.error(exception, 'debug');

    httpAdapter.reply(ctx.getResponse(), this.response, this.statusCode);
  }
}
