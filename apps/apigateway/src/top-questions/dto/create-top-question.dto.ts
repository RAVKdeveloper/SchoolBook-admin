import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateTopQuestionDto {
  @ApiProperty({ description: 'Question title', example: 'Title' })
  @IsNotEmpty()
  title: string

  @ApiProperty({ description: 'Comment', example: 'Comment' })
  @IsNotEmpty()
  comment: string

  @ApiProperty({ description: 'Role creator', example: 'MODERATOR' })
  @IsNotEmpty()
  role: string

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNumber()
  schoolId: number
}
