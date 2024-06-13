import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsOptional } from 'class-validator'

import { ActiveClassesDto, ActiveStudentsDto, ActiveTeachersDto } from './create-school-events.dto'

export class UpdateSchoolEventDto {
  @ApiProperty({ description: 'Title', example: 'title', required: false })
  @IsOptional()
  title?: string

  @ApiProperty({ description: 'Description', example: 'description', required: false })
  @IsOptional()
  description?: string

  @ApiProperty({ description: 'Image key', example: 'ewrwer-23rew-32rwe', required: false })
  @IsOptional()
  image?: string

  @ApiProperty({ description: 'Tags', isArray: true, example: 'tag' })
  @IsArray()
  tags: string[]

  @ApiProperty({ description: 'Active teachers', type: ActiveTeachersDto, isArray: true })
  @IsArray()
  activeTeachers: ActiveTeachersDto[]

  @ApiProperty({ description: 'Active students', type: ActiveStudentsDto, isArray: true })
  @IsArray()
  activeStudents: ActiveStudentsDto[]

  @ApiProperty({ description: 'Active classes', type: ActiveClassesDto, isArray: true })
  @IsArray()
  activeClasses: ActiveClassesDto[]

  @ApiProperty({ description: 'Is private', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean
}
