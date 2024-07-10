import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { DayScheduleEntity } from '@entities/src'

export class ResponseDayScheduleDto {
  @ApiProperty({ description: 'Message', example: 'Ok' })
  @IsString()
  readonly message: string

  @ApiProperty({ description: 'Schedule', type: DayScheduleEntity })
  readonly schedule: DayScheduleEntity
}
