import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BasicEntity } from '../../basic'
import { QuestionsEntity } from '../question.entity'
import { UserEntity } from '../user.entity'

@Entity('top_question_comment')
export class TopQuestionCommentEntity extends BasicEntity {
  @ApiProperty({ description: 'Comment', example: 'Comment' })
  @Column()
  readonly comment: string

  @ApiProperty({ description: 'Creator', enum: () => UserEntity })
  @ManyToOne(() => UserEntity, { cascade: true })
  @JoinColumn()
  readonly creator: UserEntity

  @ApiProperty({ description: 'Response comment', enum: () => TopQuestionCommentEntity })
  @ManyToOne(() => TopQuestionCommentEntity)
  @JoinColumn({ name: 'response_comment' })
  readonly responseComment: TopQuestionCommentEntity

  @ApiProperty({ description: 'Question', enum: () => QuestionsEntity })
  @ManyToOne(() => QuestionsEntity, question => question.questionComments, { cascade: true })
  readonly question: QuestionsEntity
}
