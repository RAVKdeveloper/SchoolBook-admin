import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { TokenGenRoleDto } from './dto/token-gen-role.dto'
import { TokensGenerateDto } from './dto/token-gen.dto'

@Injectable()
export class TokensGenService {
  constructor(private service: JwtService) {}

  async generateTokens(payload: TokensGenerateDto) {
    const acces_token = await this.service.signAsync(payload)

    return acces_token
  }

  async generateRoleTokens(payload: TokenGenRoleDto) {
    const token = await this.service.signAsync(payload, {
      secret: process.env.secretJWT,
    })

    return token
  }
}
