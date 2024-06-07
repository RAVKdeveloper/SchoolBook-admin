import { Controller } from '@nestjs/common'

import {
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

  uploadUserAvatar(
    dto: UploadUserAvatarDto,
  ): OkUploadResponse | Observable<OkUploadResponse> | Promise<OkUploadResponse> {
    return this.filesService.uploadUserAvatar(dto)
  }

  uploadSchoolAvatar(
    request: UploadSchoolAvatarDto,
  ): OkUploadResponse | Observable<OkUploadResponse> | Promise<OkUploadResponse> {
    throw new Error('Method not implemented.')
  }
}
