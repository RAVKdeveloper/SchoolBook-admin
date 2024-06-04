import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';
import { join } from 'path';

import { AUTH_SERVICE_NAME, Packages } from '@app/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: Packages.AUTH,
          protoPath: join(__dirname, '../../../../proto/auth.proto'),
          url: process.env.AUTH_URL,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class AuthModule {}
