import { CacheInterceptor } from '@nestjs/cache-manager'
import { Body, Controller, Get, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCookieAuth, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'
import type { Request } from 'express'
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions'

import { CustomHeaders } from '@app/common'

import { AuthGuard } from '../guards/auth.guard'
import { OnlyModeratorGuard } from '../guards/only-moderator.guard'
import { OnlyOwnerGuard } from '../guards/only-owner.guard'

import { InvitesService } from './invites.service'

import { CreateInviteDto } from './dto/create-moderator-invite.dto'
import { CreateStudentInviteDto } from './dto/create-student-invite.dto'
import { CreateTeacherInviteDto } from './dto/create-teacher-invite.dto'
import { GetAllInvitesToOwner } from './dto/getAll-owner-invites.dto'
import { ReturnGetAllAccountsDto } from './dto/return-get-all-accs.dto'

@ApiTags('invites')
@ApiCookieAuth()
@UseGuards(AuthGuard)
@UseInterceptors(GrpcToHttpInterceptor)
@UseInterceptors(CacheInterceptor)
@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @ApiOkResponse({
    description: 'Successful accept moderator',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @UseGuards(OnlyOwnerGuard)
  @Post('/accept-moderator')
  acceptModeratorInvite(@Body() dto: CreateInviteDto) {
    return this.invitesService.acceptInviteModerator(dto)
  }

  @ApiOkResponse({
    description: 'Return all invites',
    schema: {
      $ref: getSchemaPath(ReturnGetAllAccountsDto),
    },
  })
  @UseGuards(OnlyOwnerGuard)
  @Get('get-all-owner')
  getAllInvitesToOwner(@Query() dto: GetAllInvitesToOwner, @Req() req: Request) {
    return this.invitesService.getAllInvitesToOwner(dto, req[CustomHeaders.USER].userId)
  }

  @ApiOkResponse({
    description: 'Successful create link to student invite',
    type: ReturnGetAllAccountsDto,
  })
  @UseGuards(OnlyModeratorGuard)
  @Post('/create/student-invite')
  createStudentInvite(@Body() dto: CreateStudentInviteDto, @Req() req: Request) {
    return this.invitesService.createStudentInvite(dto, req[CustomHeaders.USER].userId)
  }

  @ApiOkResponse({
    description: 'Successful create link to teacher invite',
    schema: {
      type: 'object',
      example: {
        message: '2332mrwe-42342fwef-23rfwef',
      },
    },
  })
  @UseGuards(OnlyModeratorGuard)
  @Post('/create/teacher-invite')
  createTeacherInvite(@Body() dto: CreateTeacherInviteDto, @Req() req: Request) {
    return this.invitesService.createTeacherInvite(dto, req[CustomHeaders.USER].userId)
  }
}
