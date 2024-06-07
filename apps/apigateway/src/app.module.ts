import { Module } from '@nestjs/common'

import { AdminsModule } from './admins/admins.module'
import { AuthModule } from './auth/auth.module'
import { FilesModule } from './files/files.module'

import { CacheDatabaseModule, TokensModule } from '@app/common'

@Module({
  imports: [AuthModule, TokensModule, CacheDatabaseModule, AdminsModule, FilesModule],
})
export class AppModule {}
