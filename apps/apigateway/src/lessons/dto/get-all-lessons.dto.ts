import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { GetAllLessonsDto as ImplementsDto } from '@app/common'

export class GetAllLessonsDto implements ImplementsDto {
  @ApiProperty({ description: 'Class id', example: 1, required: false })
  @IsOptional()
  readonly classId?: number

  @ApiProperty({ description: 'Page', example: '1', required: false })
  @IsOptional()
  readonly page?: string

  @ApiProperty({ description: 'Limit', example: '10', required: false })
  @IsOptional()
  readonly limit?: string

  @ApiProperty({ description: 'Lesson name', example: 'History', required: false })
  @IsOptional()
  readonly lessonName?: string

  @ApiProperty({ description: 'Teacher id', example: '1', required: false })
  @IsOptional()
  readonly teacherId?: string

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  readonly schoolId: string

  @ApiProperty({ description: 'Only required lesson', example: true, required: false })
  @IsOptional()
  readonly isRequired?: boolean

  @ApiProperty({ description: 'Only my lessons', example: '1', required: false })
  @IsOptional()
  readonly onlyMy?: number
}
