import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';

import { CacheDatabaseModule, TokensModule } from '@app/common';

@Module({
  imports: [AuthModule, TokensModule, CacheDatabaseModule],
})
export class AppModule {}
