import { ApiProperty } from '@nestjs/swagger'
import { Entity, ManyToOne } from 'typeorm'

import { BasicEntity } from '../basic'

import { QuestionsEntity } from './question.entity'
import { UserEntity } from './user.entity'

@Entity('top_comments_like')
export class LikeEntity extends BasicEntity {
  @ApiProperty({ description: 'User', enum: () => UserEntity })
  @ManyToOne(() => UserEntity)
  readonly user: UserEntity

  @ApiProperty({ description: 'Question', enum: () => QuestionsEntity })
  @ManyToOne(() => QuestionsEntity, { cascade: true })
  readonly question: QuestionsEntity
}
