import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToOne } from 'typeorm'

import { BasicEntity } from '../basic/basic.entity'
import { UserEntity } from './user.entity'

@Entity('invite_teacher')
export class InviteTeacherEntity extends BasicEntity {
  @ApiProperty({ description: 'Creator', enum: () => UserEntity })
  @ManyToOne(() => UserEntity)
  creator: UserEntity

  @ApiProperty({ description: 'School id', example: 1 })
  @Column({ name: 'school_id' })
  schoolId: number

  @ApiProperty({ description: 'Lesson id', example: 1, required: false })
  @Column({ name: 'lesson_id', nullable: true })
  lessonId: number

  @ApiProperty({ description: 'Chief class id', example: 1, required: false })
  @Column({ name: 'chief_class_id', nullable: true })
  chiefClassId: number

  @ApiProperty({ description: 'Max count', example: 5 })
  @Column({ name: 'max_count', default: 1 })
  maxCount: number

  @ApiProperty({ description: 'Key invite', example: '424ert43-rwr34f-34tfe43' })
  @Column({ name: 'key_invite' })
  keyInvite: string

  @ApiProperty({ description: 'Count', example: 2 })
  @Column()
  count: number
}
