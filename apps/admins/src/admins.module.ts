import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  DatabaseModule,
  ModeratorEntity,
  OwnerEntity,
  School,
  TokensModule,
  UserEntity,
} from '@app/common'

import { AdminsController } from './admins.controller'
import { AdminsService } from './admins.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([OwnerEntity, ModeratorEntity, UserEntity, School]),
    DatabaseModule,
    TokensModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
