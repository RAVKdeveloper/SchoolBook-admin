import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { CreateUserDto } from '@app/common';

export class CreateAuthDto implements CreateUserDto {
  @ApiProperty({ description: 'Email', example: 'schoolbook@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Name', example: 'Kirill' })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(70)
  name: string;

  @ApiProperty({ description: 'Middlename', example: 'Tarasovich' })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(70)
  middlename: string;

  @ApiProperty({ description: 'Surname', example: 'Scherbakov' })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  surname: string;

  @ApiProperty({ description: 'Password', example: '1234567890' })
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(100)
  password: string;
}
