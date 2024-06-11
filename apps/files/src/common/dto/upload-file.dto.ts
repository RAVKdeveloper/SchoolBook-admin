import { IsArray, IsNotEmpty } from 'class-validator'

export class UploadFileDto {
  @IsNotEmpty()
  @IsArray()
  readonly body: { img: Buffer; size: number }[]
}
