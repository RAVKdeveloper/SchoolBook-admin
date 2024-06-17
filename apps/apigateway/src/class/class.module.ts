import { join } from 'path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { CLASS_SERVICE_NAME, Packages } from '@app/common'

import { ClassController } from './class.controller'
import { ClassService } from './class.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: CLASS_SERVICE_NAME,
        options: {
          package: Packages.CLASS,
          protoPath: join(__dirname, '../class.proto'),
          url: process.env.CLASS_URL,
        },
      },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
