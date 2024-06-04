import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { LoginUserDto } from '@app/common';

export class LoginAuthDto implements LoginUserDto {
  @ApiProperty({ description: 'Email', example: 'schoolbook@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password', example: '1234567890' })
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(100)
  readonly password: string;
}
