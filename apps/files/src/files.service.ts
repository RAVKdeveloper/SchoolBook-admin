import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions'
import * as sharp from 'sharp'
import { Repository } from 'typeorm'

import {
  DeleteSchoolAvatarDto,
  DeleteUserAvatarDto,
  School,
  UploadSchoolAvatarDto,
  UploadUserAvatarDto,
  UserEntity,
} from '@app/common'
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

    const { key } = await this.s3.upload({ body: optimizeImgs })

    await this.insertUrlUserAvatar(key, dto.userId)

    return { message: 'Ok' }
  }

  public async uploadSchoolAvatar(dto: UploadSchoolAvatarDto) {
    const optimizeImgs = await this.prepareSizesAvatars(dto.data.fileData)

    const { key } = await this.s3.upload({ body: optimizeImgs })

    await this.insertUrlSchoolAvatar(key, dto.schoolId)

    return { message: 'Ok' }
  }

  public async deleteUserAvatar(dto: DeleteUserAvatarDto) {
    const user = await this.userRepo.findOne({
      where: { id: dto.userId },
    })

    if (!user) throw new GrpcNotFoundException('Пользователь не найден')

    await this.s3.delete({ key: user.avatar })

    await this.userRepo.update(
      { id: user.id },
      {
        avatar: process.env.DEFAULT_USER_AVATAR,
      },
    )

    return { message: 'Ok' }
  }

  public async deleteSchoolAvatar(dto: DeleteSchoolAvatarDto) {
    const school = await this.schoolRepo.findOne({
      where: [{ id: dto.schoolId, owner: { userId: { id: dto.userId } } }],
    })

    if (!school) throw new GrpcNotFoundException('Школа не найдена')

    await this.s3.delete({ key: school.avatarUrl })

    await this.schoolRepo.update(
      { id: school.id },
      {
        avatarUrl: process.env.DEFAULT_SCHOOL_AVATAR,
      },
    )

    return { message: 'Ok' }
  }

  private async insertUrlUserAvatar(path: string, userId: number) {
    await this.userRepo.update(
      { id: userId },
      {
        avatar: path,
      },
    )
  }

  private async insertUrlSchoolAvatar(path: string, schoolId: number) {
    await this.schoolRepo.update(
      { id: schoolId },
      {
        avatarUrl: path,
      },
    )
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
