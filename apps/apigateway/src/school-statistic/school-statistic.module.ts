import { join } from 'path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { Packages, SCHOOL_STATISTIC_SERVICE_NAME } from '@app/common'

import { SchoolStatisticController } from './school-statistic.controller'
import { SchoolStatisticService } from './school-statistic.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SCHOOL_STATISTIC_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: Packages.SCHOOL_STATISTIC,
          protoPath: join(__dirname, '../school-statistic.proto'),
          url: process.env.SCHOOL_STATISTIC_URL,
        },
      },
    ]),
  ],
  controllers: [SchoolStatisticController],
  providers: [SchoolStatisticService],
})
export class SchoolStatisticModule {}
