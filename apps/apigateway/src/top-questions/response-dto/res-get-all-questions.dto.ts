import { ApiProperty } from '@nestjs/swagger'

import { QuestionsEntity } from '@app/common'

export class ResponseGetAllQuestionsDto {
  @ApiProperty({ description: 'Count', example: 2 })
  readonly count: number

  @ApiProperty({ description: 'All questions', isArray: true, type: QuestionsEntity })
  data: QuestionsEntity[]
}
