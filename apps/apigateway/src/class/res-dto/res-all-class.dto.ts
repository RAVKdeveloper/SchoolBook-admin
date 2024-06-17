import { ApiProperty } from '@nestjs/swagger'

import { ClassEntity } from '@app/common'

export class ResponseAllClassDto {
  @ApiProperty({ description: 'Count', example: 11 })
  readonly count: number

  @ApiProperty({ description: 'Classes array', isArray: true, type: ClassEntity })
  readonly data: ClassEntity[]
}
