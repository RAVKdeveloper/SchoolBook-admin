import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'

import { FILES_SERVICE_NAME, Packages } from '@app/common'

import { FilesController } from './files.controller'
import { FilesService } from './files.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: FILES_SERVICE_NAME,
        options: {
          package: Packages.FILES,
          protoPath: join(__dirname, '../../../../proto/files.proto'),
          url: process.env.FILES_URL,
        },
      },
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
