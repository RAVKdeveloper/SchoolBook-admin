import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { FILES_SERVICE_NAME, FilesServiceClient } from '@app/common'

@Injectable()
export class FilesService implements OnModuleInit {
  private filesService: FilesServiceClient

  constructor(@Inject(FILES_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.filesService = this.client.getService<FilesServiceClient>(FILES_SERVICE_NAME)
  }

  async uploadUserAvatar(file: Express.Multer.File, userId: number) {
    return this.filesService.uploadUserAvatar({
      userId,
      metadata: {
        size: file.size,
        // @ts-expect-error
        type: file.type,
        filename: file.filename,
        mimeType: file.mimetype,
      },
      data: { fileData: file.buffer },
    })
  }

  async uploadSchoolAvatar(file: Express.Multer.File, schoolId: number) {
    return this.filesService.uploadSchoolAvatar({
      schoolId,
      metadata: {
        size: file.size,
        // @ts-expect-error
        type: file.type,
        filename: file.filename,
        mimeType: file.mimetype,
      },
      data: { fileData: file.buffer },
    })
  }

  async deleteUserAvatar(userId: number) {
    return this.filesService.deleteUserAvatar({ userId })
  }

  async deleteSchoolAvatar(schoolId: number, userId: number) {
    return this.filesService.deleteSchoolAvatar({ schoolId, userId })
  }
}
