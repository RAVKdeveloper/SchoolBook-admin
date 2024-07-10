import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { WeekScheduleEntity } from '@entities/src'

export class ResponseWeekScheduleDto {
  @ApiProperty({ description: 'Message', example: 'Ok' })
  @IsString()
  readonly message: string

  @ApiProperty({ description: 'Week schedule', type: WeekScheduleEntity })
  readonly schedule: WeekScheduleEntity

  @ApiProperty({ description: 'Count', example: 1 })
  readonly count: number
}
