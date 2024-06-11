// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.1
//   protoc               v5.26.1
// source: proto/files.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import { Observable } from 'rxjs'

export const protobufPackageFiles = 'files'

export enum FileType {
  IMAGE = 0,
  VIDEO = 1,
  AUDIO = 2,
  DOCUMENT = 3,
  UNRECOGNIZED = -1,
}

export interface UploadUserAvatarDto {
  userId: number
  metadata?: FileMetadata | undefined
  data?: SaveFileRequest | undefined
}

export interface UploadSchoolAvatarDto {
  schoolId: number
  metadata?: FileMetadata | undefined
  data?: SaveFileRequest | undefined
}

export interface DeleteUserAvatarDto {
  userId: number
}

export interface DeleteSchoolAvatarDto {
  userId: number
  schoolId: number
}

export interface OkUploadResponse {
  message: string
}

export interface SaveFileRequest {
  fileData: Uint8Array
}

export interface FileMetadata {
  type: FileType
  /** Размер файла в байтах */
  size: number
  /** Имя файла */
  filename: string
  /** MIME-тип файла */
  mimeType: string
}

export const FILES_PACKAGE_NAME = 'files'

export interface FilesServiceClient {
  uploadUserAvatar(request: UploadUserAvatarDto): Observable<OkUploadResponse>

  uploadSchoolAvatar(request: UploadSchoolAvatarDto): Observable<OkUploadResponse>

  deleteUserAvatar(request: DeleteUserAvatarDto): Observable<OkUploadResponse>

  deleteSchoolAvatar(request: DeleteSchoolAvatarDto): Observable<OkUploadResponse>
}

export interface FilesServiceController {
  uploadUserAvatar(
    request: UploadUserAvatarDto,
  ): Promise<OkUploadResponse> | Observable<OkUploadResponse> | OkUploadResponse

  uploadSchoolAvatar(
    request: UploadSchoolAvatarDto,
  ): Promise<OkUploadResponse> | Observable<OkUploadResponse> | OkUploadResponse

  deleteUserAvatar(
    request: DeleteUserAvatarDto,
  ): Promise<OkUploadResponse> | Observable<OkUploadResponse> | OkUploadResponse

  deleteSchoolAvatar(
    request: DeleteSchoolAvatarDto,
  ): Promise<OkUploadResponse> | Observable<OkUploadResponse> | OkUploadResponse
}

export function FilesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'uploadUserAvatar',
      'uploadSchoolAvatar',
      'deleteUserAvatar',
      'deleteSchoolAvatar',
    ]
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcMethod('FilesService', method)(constructor.prototype[method], method, descriptor)
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcStreamMethod('FilesService', method)(constructor.prototype[method], method, descriptor)
    }
  }
}

export const FILES_SERVICE_NAME = 'FilesService'
