import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class QueryAllTeachersDto {
  @ApiProperty({ description: 'Search', example: 'Nadeshda', required: false })
  @IsOptional()
  search?: string

  @ApiProperty({ description: 'Page', example: '1' })
  @IsNotEmpty()
  page: string

  @ApiProperty({ description: 'Limit', example: '10', required: false })
  @IsOptional()
  limit?: string

  @ApiProperty({ description: 'Range teachers by born', example: true, required: false })
  @IsOptional()
  sortData?: string

  @ApiProperty({ description: 'School id', example: '1' })
  @IsNotEmpty()
  readonly schoolId: string
}
