import {
  Body,
  Controller,
  Get,
  Patch,
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

import { CustomHeaders } from '@app/common'
import { UserEntity } from '@entities/src'
import { AuthGuard } from '../guards/auth.guard'

import { AuthService } from './auth.service'

import { CreateAuthDto } from './dto/create-auth.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { LoginAuthDto } from './dto/login-user.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
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

  @ApiOkResponse({ description: 'Forgot password', type: UserEntity })
  @UseGuards(AuthGuard)
  @Patch('/forgot-pass')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPass(dto)
  }

  @ApiOkResponse({
    description: 'Successful update user password',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @Patch('/update-pass')
  updatePassword(@Body() dto: UpdatePasswordDto) {
    return this.authService.updatePassword(dto)
  }
}
