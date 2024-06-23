import { ApiProperty } from '@nestjs/swagger'

import { LessonEntity } from '@app/common'

export class ResponseOneLessonDto {
  @ApiProperty({ description: 'Message', example: 'Ok' })
  readonly message: string

  @ApiProperty({ description: 'Lesson', type: LessonEntity })
  readonly lesson: LessonEntity
}
