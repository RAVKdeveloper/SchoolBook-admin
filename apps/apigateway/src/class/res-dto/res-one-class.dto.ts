import { ApiProperty } from '@nestjs/swagger'

import { ClassEntity } from '@app/common'

export class ResponseOneClassDto {
  @ApiProperty({ description: 'Message', example: 'Ok' })
  readonly message: string

  @ApiProperty({ description: 'Class', type: ClassEntity })
  readonly class: ClassEntity
}
