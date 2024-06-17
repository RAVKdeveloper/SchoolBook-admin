import { ApiProperty } from '@nestjs/swagger'

import { QuestionsEntity } from '@app/common'

export class ResponseGetOneQuestionDto {
  @ApiProperty({ description: 'Message', example: 'Ok' })
  readonly message: string

  @ApiProperty({ description: 'Question', type: QuestionsEntity })
  readonly question: QuestionsEntity
}
