import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

import { DeleteLessonByIdDto as ImplementsDto } from '@app/common'

export class DeleteLessonDto implements ImplementsDto {
  @ApiProperty({ description: 'Id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number
}
