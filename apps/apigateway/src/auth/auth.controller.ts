import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { CustomHeaders, UserEntity } from '@app/common'
import { AuthGuard } from '../guards/auth.guard'

import { AuthService } from './auth.service'

import { CreateAuthDto } from './dto/create-auth.dto'
import { LoginAuthDto } from './dto/login-user.dto'
import { VerifyUserDto } from './dto/verify-user.dto'

@ApiTags('Auth')
@UseInterceptors(GrpcToHttpInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Successful registration user',
    type: UserEntity,
  })
  @Post('/registration')
  create(@Body() dto: CreateAuthDto) {
    return this.authService.registration(dto)
  }

  @ApiCreatedResponse({
    description: 'Successful login user',
    type: UserEntity,
  })
  @Post('/login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto)
  }

  @ApiCookieAuth()
  @ApiOkResponse({ description: 'Get me', type: UserEntity })
  @UseGuards(AuthGuard)
  @Get('/me')
  me(@Req() req: Request) {
    return this.authService.me(req[CustomHeaders.USER].userId)
  }

  @ApiCreatedResponse({
    description: 'Successful verify user',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @Post('/verify')
  verifyUser(@Body() dto: VerifyUserDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.verifyUser(dto, res)
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Successful logOut user',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @UseGuards(AuthGuard)
  @Put('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logOut(res)
  }
}
