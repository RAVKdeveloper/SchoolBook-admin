import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateInviteDto {
  @ApiProperty({ description: 'Is accepted', example: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly isAccept: boolean

  @ApiProperty({ description: 'Moderator id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly moderatorId: number
}
