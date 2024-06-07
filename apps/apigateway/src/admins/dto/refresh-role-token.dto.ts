import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class RefreshRoleTokenDto {
  @ApiProperty({ description: 'Role', example: 'OWNER' })
  @IsNotEmpty()
  readonly role: string

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number
}
