import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

import { ActiveClassesArrayDto, GetAllSchoolEventsDto } from '@app/common'
import { ActiveClassesDto } from './create-school-events.dto'

class SchoolEventTagsDto {
  @ApiProperty({ description: 'Tags', example: 'One' })
  @IsOptional()
  readonly tag?: string
}

export class GetAllEventsDto implements GetAllSchoolEventsDto {
  @ApiProperty({ description: 'Start date', example: '2022-02-02', required: false })
  @IsOptional()
  readonly startDate?: string

  @ApiProperty({ description: 'End date', example: '2022-04-24', required: false })
  @IsOptional()
  readonly endDate?: string

  @ApiProperty({ description: 'Tags', type: SchoolEventTagsDto, isArray: true })
  @IsArray()
  readonly tags: SchoolEventTagsDto[]

  @ApiProperty({ description: 'Active classes', type: ActiveClassesDto, isArray: true })
  @IsArray()
  readonly classes: ActiveClassesArrayDto[]

  @ApiProperty({ description: 'Is popular', example: true, required: false })
  @IsBoolean()
  readonly isPopular?: boolean

  @ApiProperty({ description: 'My id', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  readonly onlyMy?: number

  @ApiProperty({ description: 'Page', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly page: number

  @ApiProperty({ description: 'Limit', example: 10, required: false })
  @IsOptional()
  @IsNumber()
  readonly limit?: number

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number
}
