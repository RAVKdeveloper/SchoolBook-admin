import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class UpdateSchoolDto {
  @ApiProperty({ description: 'School name', example: 'МБОУ СШ 52', required: false })
  @IsOptional()
  name?: string

  @ApiProperty({ description: 'School description', example: 'This good school', required: false })
  @IsOptional()
  description?: string

  @ApiProperty({ description: 'School license number', example: '5435435353543', required: false })
  @IsOptional()
  licenseNumber?: string

  @ApiProperty({ description: 'School location', example: 'ул. Новая, дом 65', required: false })
  @IsOptional()
  location?: string
}
