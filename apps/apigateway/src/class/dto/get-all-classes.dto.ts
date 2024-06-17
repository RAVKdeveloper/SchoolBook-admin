import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { GetAllClessesDto as ImplementDto } from '@app/common'

export class GetAllClessesDto implements ImplementDto {
  @ApiProperty({ description: 'School id', example: '1' })
  @IsNotEmpty()
  readonly schoolId: number

  @ApiProperty({ description: 'Search value', example: '10-A', required: false })
  @IsOptional()
  readonly searchValue?: string

  @ApiProperty({ description: 'Sort by points', default: false, example: false })
  @IsNotEmpty()
  readonly sortByRatingPoints: boolean

  @ApiProperty({ description: 'Page', example: 1 })
  @IsNotEmpty()
  readonly page: number

  @ApiProperty({ description: 'Limit', example: 10, default: 10, required: false })
  @IsOptional()
  readonly limit?: number
}
