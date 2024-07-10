import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

import { ForgotPasswordDto as ImplementsDto } from '@shared'

export class ForgotPasswordDto implements ImplementsDto {
  @ApiProperty({ description: 'Email', example: 'schoolbook@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string
}
