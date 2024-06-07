import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as sharp from 'sharp'
import { Repository } from 'typeorm'

import { School, UploadUserAvatarDto, UserEntity } from '@app/common'
import { S3Api } from './common/s3.service'

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(School) private schoolRepo: Repository<School>,
    @Inject('S3') private s3: S3Api,
  ) {}

  public async uploadUserAvatar(dto: UploadUserAvatarDto) {
    const optimizeImgs = await this.prepareSizesAvatars(dto.data.fileData)

    await Promise.all(
      optimizeImgs.map(async ({ img, size }) => await this.s3.upload({ body: img, size })),
    )

    return { message: 'Ok' }
  }

  private async prepareSizesAvatars(fileBuffer: Uint8Array) {
    const img32 = await sharp(fileBuffer).resize(32).webp().toBuffer()
    const img64 = await sharp(fileBuffer).resize(64).webp().toBuffer()

    const objImg32 = {
      size: 32,
      img: img32,
    }

    const objImg64 = {
      size: 64,
      img: img64,
    }

    return [objImg32, objImg64]
  }
}
