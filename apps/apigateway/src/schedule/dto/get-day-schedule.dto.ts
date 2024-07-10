import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { GetDayScheduleDto as ImplementsDto } from '@shared'

export class GetDayScheduleDto implements ImplementsDto {
  @ApiProperty({ description: 'Page', example: '1', required: false })
  @IsOptional()
  readonly page?: string

  @ApiProperty({ description: 'Date', example: '2024-04-04', required: false })
  @IsOptional()
  readonly date?: string

  @ApiProperty({ description: 'Class id', example: '1' })
  @IsNotEmpty()
  readonly classId: string

  @ApiProperty({ description: 'School id', example: '1' })
  @IsNotEmpty()
  readonly schoolId: string
}
