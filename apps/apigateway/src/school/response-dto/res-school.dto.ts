import { ApiProperty } from '@nestjs/swagger'

import { School } from '@app/common'

export class ResponseOneSchoolDto {
  @ApiProperty({ description: 'School', type: School })
  readonly school: School

  @ApiProperty({ description: 'Message', example: 'Ok' })
  readonly message: string
}
