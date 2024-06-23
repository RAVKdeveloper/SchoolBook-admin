import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

import { CreateLessonDto as ImplementsDto } from '@app/common'

export class CreateLessonDto implements ImplementsDto {
  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number

  @ApiProperty({ description: 'School id', example: 4 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number

  @ApiProperty({ description: 'Teachers id', example: [1], isArray: true })
  @IsNotEmpty()
  @IsArray()
  readonly teacherId: number[]

  @ApiProperty({ description: 'Lesson name', example: 'History' })
  @IsNotEmpty()
  @IsString()
  readonly name: string
}
