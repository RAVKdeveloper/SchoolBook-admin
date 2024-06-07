import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'

import { TokensGenService } from './tokens.service'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.secretJWT,
      global: true,
    }),
  ],
  controllers: [],
  providers: [TokensGenService, JwtService],
  exports: [TokensGenService, JwtService],
})
export class TokensModule {}
