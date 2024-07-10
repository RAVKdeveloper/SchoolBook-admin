import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { GetWeekScheduleDto as ImplementsDto } from '@shared'

export class GetWeekScheduleDto implements ImplementsDto {
  @ApiProperty({ description: 'Page', example: '1', required: false })
  @IsOptional()
  readonly page?: string

  @ApiProperty({ description: 'Class id', example: '1' })
  @IsNotEmpty()
  readonly classId: string

  @ApiProperty({ description: 'School id', example: '1' })
  @IsNotEmpty()
  readonly schoolId: string
}
