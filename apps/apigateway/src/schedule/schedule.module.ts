import { join } from 'path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { Packages, SCHEDULE_SERVICE_NAME } from '@shared'

import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SCHEDULE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: Packages.SCHEDULE,
          protoPath: join(__dirname, '../schedule.proto'),
          url: process.env.SCHEDULE_URL,
        },
      },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
