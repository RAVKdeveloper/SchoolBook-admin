import { Injectable } from '@nestjs/common'
import * as S3 from 'aws-sdk/clients/s3'
import { v4 } from 'uuid'

import { DeleteFileDto } from './dto/delete-file.dto'
import { UploadFileDto } from './dto/upload-file.dto'

@Injectable()
export class S3Api {
  private s3 = new S3({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
    endpoint: 'https://s3.storage.selcloud.ru',
    s3ForcePathStyle: true,
    region: 'ru-1',
    apiVersion: 'latest',
  })
  private bucketName = process.env.BUCKET_NAME
  private sizes: number[] = [32, 64]

  constructor() {}

  public async upload(dto: UploadFileDto) {
    const mainKey = v4()

    const data = await Promise.all(
      dto.body.map(async ({ img, size }) => {
        const params = {
          Bucket: this.bucketName,
          Key: `${mainKey}?${size}.webp`,
          Body: img,
        }

        const data = await this.s3.upload(params).promise()

        return data
      }),
    )

    return { data, key: mainKey }
  }

  public async delete(dto: DeleteFileDto) {
    const data = await Promise.all(
      this.sizes.map(async size => {
        const params = {
          Bucket: this.bucketName,
          Key: `${dto.key}?${size}.webp`,
        }

        await this.s3.deleteObject(params).promise()
      }),
    )

    return data
  }
}
