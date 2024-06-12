import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { GetAveragePointDto } from '@app/common'

export class QueryAveragePointDto implements GetAveragePointDto {
  @ApiProperty({ description: 'Period', example: 'YEAR' })
  @IsNotEmpty()
  period: string

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  schoolId: number

  @ApiProperty({ description: 'Point system', example: '5' })
  @IsNotEmpty()
  system: number
}
