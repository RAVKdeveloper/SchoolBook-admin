import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

import { CreateWeekScheduleDto as ImplementsDto } from '@shared'

import { CreateDayScheduleDto } from './create-day-schedule.dto'

export class CreateWeekScheduleDto implements ImplementsDto {
  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number

  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number

  @ApiProperty({ description: 'Days array', isArray: true, type: CreateDayScheduleDto })
  @IsNotEmpty()
  @IsArray()
  readonly days: CreateDayScheduleDto[]
}
