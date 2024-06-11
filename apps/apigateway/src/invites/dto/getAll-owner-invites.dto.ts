import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class GetAllInvitesToOwner {
  @ApiProperty({ description: 'User role', example: 'MODERATOR', required: false })
  @IsOptional()
  role?: string

  @ApiProperty({ description: 'Page', example: 1 })
  @IsNotEmpty()
  page: number

  @ApiProperty({ description: 'Limit', example: 10, required: false })
  @IsOptional()
  limit?: number
}
