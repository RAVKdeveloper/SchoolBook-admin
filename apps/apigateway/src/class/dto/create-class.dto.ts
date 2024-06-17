import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

import { CreateClassDto as implementDto } from '@app/common'

export class CreateClassDto implements implementDto {
  @ApiProperty({ description: 'Class name', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  readonly name: number

  @ApiProperty({ description: 'Parallel', example: 'A' })
  @IsNotEmpty()
  readonly parallel: string

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number

  @ApiProperty({ description: 'Chiefs ids array', isArray: true, example: [1] })
  @IsNotEmpty()
  @IsArray()
  readonly chiefs: number[]
}
