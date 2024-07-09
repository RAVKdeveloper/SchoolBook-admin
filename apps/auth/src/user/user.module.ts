import { join } from 'path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthCodeEntity, UserEntity } from '@entities/src'

import { MAIL_SERVICE_NAME, Packages, TokensGenService } from '@app/common'

import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MAIL_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: Packages.MAIL,
          protoPath: join(__dirname, '../mail.proto'),
          url: process.env.MAIL_URL,
        },
      },
    ]),
    TypeOrmModule.forFeature([UserEntity, AuthCodeEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, TokensGenService],
})
export class UserModule {}
