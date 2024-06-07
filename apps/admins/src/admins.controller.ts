import { Controller } from '@nestjs/common'

import {
  AdminsServiceController,
  AdminsServiceControllerMethods,
  CreateRoleDto,
  DeleteRoleDto,
  GetAllRolesDto,
  OkAdminsResponse,
  RefreshRoleTokenDto,
  ResponseAllAccounts,
} from '@app/common'

import { Observable } from 'rxjs'
import { AdminsService } from './admins.service'

@Controller()
@AdminsServiceControllerMethods()
export class AdminsController implements AdminsServiceController {
  constructor(private readonly adminsService: AdminsService) {}

  createOwner(
    dto: CreateRoleDto,
  ): OkAdminsResponse | Promise<OkAdminsResponse> | Observable<OkAdminsResponse> {
    return this.adminsService.createOwner(dto)
  }

  createModerator(
    dto: CreateRoleDto,
  ): OkAdminsResponse | Promise<OkAdminsResponse> | Observable<OkAdminsResponse> {
    return this.adminsService.createModerator(dto)
  }

  getAllAccountsByuserId(
    dto: GetAllRolesDto,
  ): ResponseAllAccounts | Promise<ResponseAllAccounts> | Observable<ResponseAllAccounts> {
    return this.adminsService.getAllAccounts(dto)
  }

  deleteModerator(
    dto: DeleteRoleDto,
  ): OkAdminsResponse | Promise<OkAdminsResponse> | Observable<OkAdminsResponse> {
    return this.adminsService.deleteModerator(dto)
  }

  refreshRoleToken(
    dto: RefreshRoleTokenDto,
  ): OkAdminsResponse | Observable<OkAdminsResponse> | Promise<OkAdminsResponse> {
    return this.adminsService.refreshRoleToken(dto)
  }
}
