import { join } from 'path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { Packages, SCHOOL_EVENTS_SERVICE_NAME } from '@app/common'

import { SchoolEventsController } from './school-events.controller'
import { SchoolEventsService } from './school-events.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: SCHOOL_EVENTS_SERVICE_NAME,
        options: {
          package: Packages.SCHOOL_EVENTS,
          protoPath: join(__dirname, '../school-events.proto'),
          url: process.env.SCHOOL_EVENTS_URL,
        },
      },
    ]),
  ],
  controllers: [SchoolEventsController],
  providers: [SchoolEventsService],
})
export class SchoolEventsModule {}
