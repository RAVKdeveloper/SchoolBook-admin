import { ApiProperty } from '@nestjs/swagger'
import { Column, JoinColumn, ManyToOne } from 'typeorm'

import { BasicEntity } from '../basic/basic.entity'
import { UserEntity } from './user.entity'

export class InviteStudentEntity extends BasicEntity {
  @ApiProperty({ description: 'Creator', enum: () => UserEntity })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator' })
  creator: UserEntity

  @ApiProperty({ description: 'School id', example: 1 })
  @Column({ name: 'school_id' })
  schoolId: number

  @ApiProperty({ description: 'Class id', example: 1 })
  @Column({ name: 'class_id' })
  classId: number

  @ApiProperty({ description: 'Max count', example: 5 })
  @Column({ name: 'max_count', default: 1 })
  maxCount: number

  @ApiProperty({ description: 'Key invite', example: '424ert43-rwr34f-34tfe43' })
  @Column({ name: 'key_invite' })
  keyInvite: string

  @ApiProperty({ description: 'Count', example: 1 })
  @Column()
  count: number
}
