import { IsNotEmpty } from 'class-validator'

export class DeleteFileDto {
  @IsNotEmpty()
  readonly key: string
}
