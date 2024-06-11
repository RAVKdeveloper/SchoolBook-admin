import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateSchoolDto {
  @ApiProperty({ description: 'School name', example: 'МБОУ СШ 62' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'School location', example: 'ул. Новая, дом 65' })
  @IsNotEmpty()
  location: string

  @ApiProperty({ description: 'License number', example: '22324we344324' })
  @IsNotEmpty()
  licenseNumber: string

  @ApiProperty({ description: 'Point system', example: '5' })
  @IsNotEmpty()
  pointsSystem: string

  @ApiProperty({ description: 'School region', example: 'Donetsk' })
  @IsNotEmpty()
  region: string
}
