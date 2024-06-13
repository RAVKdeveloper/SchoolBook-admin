import { ApiProperty } from '@nestjs/swagger'

import { SchoolEventEntity } from '@app/common'

export class ReturnAlSchoolEventsDto {
  @ApiProperty({ description: 'Count', example: 1 })
  readonly count: number

  @ApiProperty({ description: 'All school-events', isArray: true, type: SchoolEventEntity })
  readonly data: SchoolEventEntity[]
}
