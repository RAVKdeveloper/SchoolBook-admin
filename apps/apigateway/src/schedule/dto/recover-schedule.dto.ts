import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator'

import { RecoverScheduleDto as ImplementsDto, ScheduleTypes } from '@shared'

export class RecoverScheduleDto implements ImplementsDto {
  @ApiProperty({ description: 'School id', example: 4 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number

  @ApiProperty({ description: 'Schedule id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly scheduleId: number

  @ApiProperty({ description: 'Type schedule', enum: ScheduleTypes })
  @IsNotEmpty()
  @IsEnum(ScheduleTypes)
  readonly typeSchedule: ScheduleTypes
}
