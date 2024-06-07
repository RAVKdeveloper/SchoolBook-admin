import { Injectable } from '@nestjs/common'
import * as S3 from 'aws-sdk/clients/s3'
import { v4 } from 'uuid'

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

  constructor() {}

  public async upload(dto: UploadFileDto) {
    const params = {
      Bucket: this.bucketName,
      Key: `${v4()}?${dto.size}.webp`,
      Body: dto.body,
    }

    const data = await this.s3.upload(params).promise()

    return data
  }
}
