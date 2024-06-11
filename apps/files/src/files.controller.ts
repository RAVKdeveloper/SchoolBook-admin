import { Controller } from '@nestjs/common'

import {
  DeleteSchoolAvatarDto,
  DeleteUserAvatarDto,
  FilesServiceController,
  FilesServiceControllerMethods,
  OkUploadResponse,
  UploadSchoolAvatarDto,
  UploadUserAvatarDto,
} from '@app/common'

import { Observable } from 'rxjs'
import { FilesService } from './files.service'

@Controller()
@FilesServiceControllerMethods()
export class FilesController implements FilesServiceController {
  constructor(private readonly filesService: FilesService) {}

  deleteUserAvatar(
    dto: DeleteUserAvatarDto,
  ): OkUploadResponse | Observable<OkUploadResponse> | Promise<OkUploadResponse> {
    return this.filesService.deleteUserAvatar(dto)
  }

  deleteSchoolAvatar(
    dto: DeleteSchoolAvatarDto,
  ): OkUploadResponse | Observable<OkUploadResponse> | Promise<OkUploadResponse> {
    return this.filesService.deleteSchoolAvatar(dto)
  }

  uploadUserAvatar(
    dto: UploadUserAvatarDto,
  ): OkUploadResponse | Observable<OkUploadResponse> | Promise<OkUploadResponse> {
    return this.filesService.uploadUserAvatar(dto)
  }

  uploadSchoolAvatar(
    dto: UploadSchoolAvatarDto,
  ): OkUploadResponse | Observable<OkUploadResponse> | Promise<OkUploadResponse> {
    return this.filesService.uploadSchoolAvatar(dto)
  }
}
