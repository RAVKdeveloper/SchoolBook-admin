import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

import { UpdateDayScheduleDto as ImplementsDto } from '@shared'

export class UpdateDayScheduleDto implements ImplementsDto {
  @ApiProperty({ description: 'Remove teachers arr', isArray: true, example: [1] })
  @IsArray()
  readonly removeTeachersId: number[]

  @ApiProperty({ description: 'Add teachers arr', isArray: true, example: [1] })
  @IsArray()
  readonly addTeachersId: number[]

  @ApiProperty({ description: 'Remove lessons arr', isArray: true, example: [3] })
  @IsArray()
  readonly removeLessonsId: number[]

  @ApiProperty({ description: 'Add lessons arr', example: [1], isArray: true })
  @IsArray()
  readonly addLessonsId: number[]

  @ApiProperty({ description: 'Day name', example: 'Monday', required: false })
  @IsOptional()
  @IsString()
  readonly dayName?: string

  @ApiProperty({ description: 'Date', example: '2024-05-05', required: false })
  @IsOptional()
  readonly date?: string

  @ApiProperty({ description: 'Schedule id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly scheduleId: number

  @ApiProperty({ description: 'School id', example: 4 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number
}
