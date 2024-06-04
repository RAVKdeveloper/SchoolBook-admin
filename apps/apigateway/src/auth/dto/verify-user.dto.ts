import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { VerifyDto } from '@app/common';

export class VerifyUserDto implements VerifyDto {
  @ApiProperty({ description: 'User id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'Code', example: 1234 })
  @IsNotEmpty()
  @IsNumber()
  code: number;
}
