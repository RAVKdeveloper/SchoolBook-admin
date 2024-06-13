import { ApiProperty } from '@nestjs/swagger'

import { SchoolEventEntity } from '@app/common'

export class ResponseOneSchoolEventsDto {
  @ApiProperty({ description: 'Message', example: 'Ok' })
  readonly message: string

  @ApiProperty({ description: 'Event', type: SchoolEventEntity })
  readonly event: SchoolEventEntity
}
