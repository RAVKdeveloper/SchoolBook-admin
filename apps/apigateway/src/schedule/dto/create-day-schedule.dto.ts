import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

import { CreateDayScheduleDto as ImplementsDto } from '@shared'

export class CreateDayScheduleDto implements ImplementsDto {
  @ApiProperty({ description: 'Active teachers', isArray: true, example: [1] })
  @IsNotEmpty()
  @IsArray()
  readonly activeTeachersId: number[]

  @ApiProperty({ description: 'Lessons', isArray: true, example: [1] })
  @IsNotEmpty()
  @IsArray()
  readonly lessonsId: number[]

  @ApiProperty({ description: 'Day name', example: 'Monday' })
  @IsNotEmpty()
  @IsString()
  readonly dayName: string

  @ApiProperty({ description: 'Date', example: '2024-04-04' })
  @IsNotEmpty()
  readonly date: string

  @ApiProperty({ description: 'Schedule id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly scheduleId: number

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number
}
