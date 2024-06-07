import { IsNotEmpty } from 'class-validator'

export class UploadFileDto {
  @IsNotEmpty()
  readonly body: Uint8Array

  @IsNotEmpty()
  readonly size: number
}
