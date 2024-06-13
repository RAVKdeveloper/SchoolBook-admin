import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ActiveTeachersDto {
  @ApiProperty({ description: 'Active teachers', example: 1 })
  @IsOptional()
  @IsNumber()
  readonly teacherId: number
}

export class ActiveClassesDto {
  @ApiProperty({ description: 'Active classes', example: 1 })
  @IsOptional()
  @IsNumber()
  readonly classId: number
}

export class ActiveStudentsDto {
  @ApiProperty({ description: 'Active student', example: 1 })
  @IsOptional()
  @IsNumber()
  readonly studentId: number
}

export class CreateSchoolEventDto {
  @ApiProperty({ description: 'Title', example: 'Последний звонок' })
  @IsNotEmpty()
  readonly title: string

  @ApiProperty({ description: 'Description', example: 'Description' })
  @IsNotEmpty()
  readonly description: string

  @ApiProperty({ description: 'Tags', isArray: true, example: ['Последний звонок'] })
  @IsNotEmpty()
  @IsArray()
  readonly tags: string[]

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number

  @ApiProperty({ description: 'Active teachers', isArray: true, type: ActiveTeachersDto })
  @IsArray()
  readonly activeTeachers: ActiveTeachersDto[]

  @ApiProperty({ description: 'Active students', isArray: true, type: ActiveStudentsDto })
  @IsArray()
  readonly activeStudents: ActiveStudentsDto[]

  @ApiProperty({ description: 'Active classes', isArray: true, type: ActiveClassesDto })
  @IsArray()
  readonly activeClasses: ActiveClassesDto[]

  @ApiProperty({ description: 'Is private', example: false })
  @IsNotEmpty()
  @IsBoolean()
  isPrivate: boolean

  @ApiProperty({ description: 'Planned date', example: '2024-06-05' })
  @IsNotEmpty()
  @IsString()
  plannedDate: string
}
