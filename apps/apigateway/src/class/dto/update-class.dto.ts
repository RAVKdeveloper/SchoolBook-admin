import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

import { UpdateClassDto as implementDto } from '@app/common'

export class UpdateClassDto implements implementDto {
  @ApiProperty({ description: 'Name', example: 10, required: false })
  @IsOptional()
  @IsNumber()
  readonly name?: number

  @ApiProperty({ description: 'Parallel', example: 'A', required: false })
  @IsOptional()
  readonly parallel?: string

  @ApiProperty({ description: 'Students array', example: 2, isArray: true })
  @IsArray()
  readonly students: number[]

  @ApiProperty({ description: 'Lessons array', example: 1, isArray: true })
  @IsArray()
  readonly lessons: number[]

  @ApiProperty({ description: 'Chiefs array', example: 1, isArray: true })
  @IsArray()
  readonly chiefs: number[]

  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number
}
