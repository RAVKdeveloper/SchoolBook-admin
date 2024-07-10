import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'

import { UpdatePassDto as ImplementsDto } from '@shared'

export class UpdatePasswordDto implements ImplementsDto {
  @ApiProperty({ description: 'User id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number

  @ApiProperty({ description: 'Password', example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  readonly password: string

  @ApiProperty({ description: 'Verify code', example: 2222 })
  @IsNotEmpty()
  @IsNumber()
  readonly code: number
}
