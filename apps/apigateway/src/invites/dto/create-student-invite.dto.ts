import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CreateStudentInviteDto {
  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  schoolId: number

  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  classId: number

  @ApiProperty({ description: 'Max count', example: 5, required: false })
  @IsOptional()
  @IsNumber()
  maxCount?: number
}
