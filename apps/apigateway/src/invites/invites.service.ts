import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { INVITES_SERVICE_NAME, InvitesServiceClient } from '@app/common'

import { CreateInviteDto } from './dto/create-moderator-invite.dto'
import { CreateStudentInviteDto } from './dto/create-student-invite.dto'
import { CreateTeacherInviteDto } from './dto/create-teacher-invite.dto'
import { GetAllInvitesToOwner } from './dto/getAll-owner-invites.dto'

@Injectable()
export class InvitesService implements OnModuleInit {
  private invitesService: InvitesServiceClient

  constructor(@Inject(INVITES_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.invitesService = this.client.getService<InvitesServiceClient>(INVITES_SERVICE_NAME)
  }

  public acceptInviteModerator(dto: CreateInviteDto) {
    return this.invitesService.acceptModeratorInvite(dto)
  }

  public getAllInvitesToOwner(dto: GetAllInvitesToOwner, userId: number) {
    return this.invitesService.getAllInvites({ ...dto, userId })
  }

  public createTeacherInvite(dto: CreateTeacherInviteDto, userId: number) {
    return this.invitesService.createTeacherInvite({ ...dto, userId })
  }

  public createStudentInvite(dto: CreateStudentInviteDto, userId: number) {
    return this.invitesService.createStudentInvite({ ...dto, userId })
  }
}
