import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class TokenGenRoleDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number

  @IsNotEmpty()
  @IsString()
  readonly role: string

  @IsOptional()
  readonly ownerId?: number

  @IsOptional()
  readonly moderatorId?: number

  @IsOptional()
  readonly teacherId?: number
}
