import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions'
import { join } from 'path'

import { ADMINS_SERVICE_NAME, Packages } from '@app/common'

import { AdminsController } from './admins.controller'
import { AdminsService } from './admins.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: ADMINS_SERVICE_NAME,
        options: {
          package: Packages.ADMINS,
          protoPath: join(__dirname, '../../../../proto/admin.proto'),
          url: process.env.ADMINS_URL,
        },
      },
    ]),
  ],
  controllers: [AdminsController],
  providers: [
    AdminsService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class AdminsModule {}
