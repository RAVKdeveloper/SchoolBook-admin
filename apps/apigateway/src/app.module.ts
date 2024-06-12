import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'

import { CacheDatabaseModule, CommonThrottlerModule, TokensModule } from '@app/common'

import { AdminsModule } from './admins/admins.module'
import { AuthModule } from './auth/auth.module'
import { FilesModule } from './files/files.module'
import { InvitesModule } from './invites/invites.module'
import { SchoolStatisticModule } from './school-statistic/school-statistic.module'
import { SchoolModule } from './school/school.module'
import { TeachersModule } from './teachers/teachers.module'

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
    SchoolStatisticModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
