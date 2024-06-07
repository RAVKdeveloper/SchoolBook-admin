import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { AuthGuard } from '../guards/auth.guard'
import { OnlyOwnerGuard } from '../guards/only-owner.guard'

import { AdminsService } from './admins.service'

import { CustomHeaders } from '@app/common'

import { RefreshRoleTokenDto } from './dto/refresh-role-token.dto'

@ApiTags('Admins')
@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(AuthGuard)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('/create-owner')
  createOwner(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.adminsService.createOwner(req[CustomHeaders.USER].userId, res)
  }

  @Post('/create-moderator')
  createModerator(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.adminsService.createModerator(req[CustomHeaders.USER].userId, res)
  }

  @Get('/my-accounts')
  findOne(@Req() req: Request) {
    return this.adminsService.findAllAccounts(req[CustomHeaders.USER].userId)
  }

  @Put('/refresh-token')
  refreshRoleToken(
    @Req() req: Request,
    @Body() dto: RefreshRoleTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.refreshRoleToken(req[CustomHeaders.USER].userId, dto, res)
  }

  @UseGuards(OnlyOwnerGuard)
  @Put(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.adminsService.deleteAdmin(+id, req[CustomHeaders.USER].userId)
  }
}
