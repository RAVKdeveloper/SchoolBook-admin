import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

import { UpdateLessonDto as ImplementsDto } from '@app/common'

export class UpdateLessonDto implements Omit<ImplementsDto, 'lessonId'> {
  @ApiProperty({ description: 'Lesson name', example: 'History', required: false })
  @IsOptional()
  readonly name?: string

  @ApiProperty({ description: 'Class id', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  readonly classId?: number

  @ApiProperty({ description: 'Teachers id', example: [1], isArray: true })
  @IsNotEmpty()
  @IsArray()
  readonly teacherId: number[]

  @ApiProperty({ description: 'Is add teachers?', example: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly isAddTeachers: boolean
}
