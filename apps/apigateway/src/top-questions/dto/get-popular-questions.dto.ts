import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { GetPopularQuestionsDto as implementsDto } from '@app/common'

export class GetPopularQuestionsDto implements implementsDto {
  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  schoolId: number

  @ApiProperty({ description: 'Filter by role', example: 'MODERATOR' })
  @IsNotEmpty()
  role: string

  @ApiProperty({ description: 'User role', example: 'OWNER' })
  @IsNotEmpty()
  userRole: string
}
