// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.1
//   protoc               v5.26.1
// source: proto/admin.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import { Observable } from 'rxjs'

export const protobufPackageSchool = 'admins'

export interface CreateRoleDto {
  userId: number
  role: string
}

export interface GetAllRolesDto {
  userId: number
}

export interface DeleteRoleDto {
  deleteId: number
  userId: number
}

export interface OkAdminsResponse {
  message: string
  token: string
}

export interface AccountDto {
  id: number
  userId: UserDto | undefined
  school: SchoolDto | undefined
  createAt: Date
  updateAt: Date
}

export interface ResponseAllAccounts {
  accounts: AccountDto[]
}

export interface UserDto {
  id: number
  name: string
  middlename: string
  surname: string
  createAt: Date
  updateAt: Date
  email: string
  avatar: string
  isActivated: boolean
  blocked: boolean
  blockedDescription: string
}

export interface SchoolDto {
  name: string
  avatarUrl: string
  location: string
  licenseNumber: string
  licenseImg: string
  owner: AccountDto | undefined
  pointsSystem: string
  ip: string
  region: string
  IsActivated: boolean
  blocked: boolean
}

export interface RefreshRoleTokenDto {
  role: string
  userId: number
  schoolId: number
}

export const ADMINS_PACKAGE_NAME = 'admins'

export interface AdminsServiceClient {
  createOwner(request: CreateRoleDto): Observable<OkAdminsResponse>

  createModerator(request: CreateRoleDto): Observable<OkAdminsResponse>

  getAllAccountsByuserId(request: GetAllRolesDto): Observable<ResponseAllAccounts>

  deleteModerator(request: DeleteRoleDto): Observable<OkAdminsResponse>

  refreshRoleToken(dto: RefreshRoleTokenDto): Observable<OkAdminsResponse>
}

export interface AdminsServiceController {
  createOwner(
    request: CreateRoleDto,
  ): Promise<OkAdminsResponse> | Observable<OkAdminsResponse> | OkAdminsResponse

  createModerator(
    request: CreateRoleDto,
  ): Promise<OkAdminsResponse> | Observable<OkAdminsResponse> | OkAdminsResponse

  getAllAccountsByuserId(
    request: GetAllRolesDto,
  ): Promise<ResponseAllAccounts> | Observable<ResponseAllAccounts> | ResponseAllAccounts

  deleteModerator(
    request: DeleteRoleDto,
  ): Promise<OkAdminsResponse> | Observable<OkAdminsResponse> | OkAdminsResponse

  refreshRoleToken(
    dto: RefreshRoleTokenDto,
  ): Observable<OkAdminsResponse> | Promise<OkAdminsResponse> | OkAdminsResponse
}

export function AdminsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createOwner',
      'createModerator',
      'getAllAccountsByuserId',
      'deleteModerator',
      'refreshRoleToken',
    ]
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcMethod('AdminsService', method)(constructor.prototype[method], method, descriptor)
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcStreamMethod('AdminsService', method)(constructor.prototype[method], method, descriptor)
    }
  }
}

export const ADMINS_SERVICE_NAME = 'AdminsService'
