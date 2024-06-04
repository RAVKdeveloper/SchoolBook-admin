import { Module } from '@nestjs/common';

import { DatabaseModule, TokensModule } from '@app/common';

import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, TokensModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
