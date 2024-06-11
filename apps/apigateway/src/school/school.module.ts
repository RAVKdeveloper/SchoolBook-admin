import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { Packages, SCHOOL_SERVICE_NAME } from '@app/common'

import { SchoolController } from './school.controller'
import { SchoolService } from './school.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SCHOOL_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: Packages.SCHOOL,
          protoPath: join(__dirname, '../school.proto'),
          url: process.env.SCHOOL_URL,
        },
      },
    ]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
