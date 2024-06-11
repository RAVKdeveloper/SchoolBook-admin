import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { Packages, TEACHERS_SERVICE_SERVICE_NAME } from '@app/common'

import { TeachersController } from './teachers.controller'
import { TeachersService } from './teachers.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TEACHERS_SERVICE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: Packages.TEACHERS,
          protoPath: join(__dirname, '../teachers.proto'),
          url: process.env.TEACHERS_URL,
        },
      },
    ]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
