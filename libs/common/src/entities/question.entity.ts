import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import { BasicEntity } from '../basic/basic.entity'
import { TopQuestionCommentEntity } from './comments/top-questions-comment.entity'
import { LikeEntity } from './like.entity'
import { School } from './school.entity'
import { UserEntity } from './user.entity'

@Entity('questions')
export class QuestionsEntity extends BasicEntity {
  @ApiProperty({ description: 'Question title', example: 'Title' })
  @Column()
  readonly title: string

  @ApiProperty({ description: 'Comment', example: 'Comment' })
  @Column()
  readonly comment: string

  @ApiProperty({ description: 'Creator', enum: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  readonly creator: UserEntity

  @ApiProperty({ description: 'Role creator', example: 'PARENT' })
  @Column()
  readonly role: string

  @ApiProperty({ description: 'Like', enum: () => LikeEntity, isArray: true })
  @OneToMany(() => LikeEntity, like => like.question)
  @JoinColumn({ name: 'question_likes' })
  readonly likes: LikeEntity[]

  @ApiProperty({ description: 'School', enum: () => School })
  @ManyToOne(() => School)
  @JoinColumn()
  readonly school: School

  @ApiProperty({ description: 'Comments', enum: () => TopQuestionCommentEntity, isArray: true })
  @OneToMany(() => TopQuestionCommentEntity, comment => comment.question)
  @JoinColumn({ name: 'question_comments' })
  readonly questionComments: TopQuestionCommentEntity[]

  @ApiProperty({ description: 'Likes count', example: 101 })
  @Column({ name: 'likes_count' })
  readonly likesCount: number
}
