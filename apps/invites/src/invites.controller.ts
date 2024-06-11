import { Controller } from '@nestjs/common'

import {
  AcceptInviteModeratorDto,
  CreateStudentInviteDto,
  CreateTeacherInviteDto,
  GetAccessStudentInviteDto,
  GetAccessTeacherInviteDto,
  GetAllInvitesQueryDto,
  InvitesServiceController,
  InvitesServiceControllerMethods,
  InvitingAllAccountDto,
  ReturnOkAcceptInvite,
} from '@app/common'

import { Observable } from 'rxjs'
import { InvitesService } from './invites.service'

@Controller()
@InvitesServiceControllerMethods()
export class InvitesController implements InvitesServiceController {
  constructor(private readonly invitesService: InvitesService) {}

  accessStudentInvite(
    dto: GetAccessStudentInviteDto,
  ): ReturnOkAcceptInvite | Observable<ReturnOkAcceptInvite> | Promise<ReturnOkAcceptInvite> {
    return this.invitesService.accessStudentInvite(dto)
  }

  accessTeacherInvite(
    dto: GetAccessTeacherInviteDto,
  ): ReturnOkAcceptInvite | Observable<ReturnOkAcceptInvite> | Promise<ReturnOkAcceptInvite> {
    return this.invitesService.accessTeacherInvite(dto)
  }

  createTeacherInvite(
    dto: CreateTeacherInviteDto,
  ): ReturnOkAcceptInvite | Promise<ReturnOkAcceptInvite> | Observable<ReturnOkAcceptInvite> {
    return this.invitesService.createTeacherInvite(dto)
  }

  createStudentInvite(
    dto: CreateStudentInviteDto,
  ): ReturnOkAcceptInvite | Promise<ReturnOkAcceptInvite> | Observable<ReturnOkAcceptInvite> {
    return this.invitesService.createStudentInvite(dto)
  }

  acceptModeratorInvite(
    dto: AcceptInviteModeratorDto,
  ): ReturnOkAcceptInvite | Promise<ReturnOkAcceptInvite> | Observable<ReturnOkAcceptInvite> {
    return this.invitesService.acceptModeratorInvite(dto)
  }

  getAllInvites(
    dto: GetAllInvitesQueryDto,
  ): InvitingAllAccountDto | Promise<InvitingAllAccountDto> | Observable<InvitingAllAccountDto> {
    return this.invitesService.getAllInvites(dto)
  }
}
