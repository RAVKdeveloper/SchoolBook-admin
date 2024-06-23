import { ApiProperty } from '@nestjs/swagger'

import { LessonEntity } from '@app/common'

export class ResponseAllLessonsDto {
  @ApiProperty({ description: 'Count', example: 23 })
  readonly count: number

  @ApiProperty({ description: 'Lessons', type: LessonEntity, isArray: true })
  readonly data: LessonEntity[]
}
