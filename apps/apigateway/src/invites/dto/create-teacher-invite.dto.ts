import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CreateTeacherInviteDto {
  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  schoolId: number

  @ApiProperty({ description: 'Lesson id', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  lessonId?: number

  @ApiProperty({ description: 'Chef class id', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  chiefClassId?: number

  @ApiProperty({ description: 'Max count', example: 5, required: false })
  @IsOptional()
  @IsNumber()
  maxCount?: number
}
