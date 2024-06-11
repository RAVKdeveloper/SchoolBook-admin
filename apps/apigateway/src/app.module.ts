import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'

import { AdminsModule } from './admins/admins.module'
import { AuthModule } from './auth/auth.module'
import { FilesModule } from './files/files.module'
import { InvitesModule } from './invites/invites.module'
import { SchoolModule } from './school/school.module'
import { TeachersModule } from './teachers/teachers.module'

import { CacheDatabaseModule, CommonThrottlerModule, TokensModule } from '@app/common'

@Module({
  imports: [
    AuthModule,
    TokensModule,
    CacheDatabaseModule,
    AdminsModule,
    FilesModule,
    InvitesModule,
    CommonThrottlerModule,
    SchoolModule,
    TeachersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
