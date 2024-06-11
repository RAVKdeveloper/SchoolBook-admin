import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm'

import { RolesUser } from '../basic'
import { BasicEntity } from '../basic/basic.entity'
import { ClassEntity } from './class.entity'
import { LessonEntity } from './lesson.entity'
import { School } from './school.entity'
import { UserEntity } from './user.entity'

@Entity('teacher_account')
export class TeacherEntity extends BasicEntity {
  @ApiProperty({ example: false, description: 'Is admit user' })
  @Column({ name: 'is_admit', default: false })
  isAdmit: boolean

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @ApiProperty({ example: 'Nadeshda Kolimenko', description: 'Lead class', enum: () => UserEntity })
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity

  @ManyToOne(() => School, school => school.teachers)
  @ApiProperty({ example: '62', description: 'School id', enum: () => School })
  @JoinColumn({ name: 'school_id' })
  school: School

  @ManyToMany(() => LessonEntity, lesson => lesson.teacher, { cascade: true })
  @ApiProperty({
    default: [],
    enum: () => LessonEntity,
    description: 'Teacher lessons',
    isArray: true,
  })
  lessons: LessonEntity[]

  @ApiProperty()
  @ApiProperty({ example: '7:30 - 17:00', description: 'Opening times' })
  @Column({ name: 'opening_times' })
  OpeningTimes: string

  @ApiProperty({
    default: [],
    description: 'Chief to class',
    enum: () => ClassEntity,
    isArray: true,
  })
  @ManyToMany(() => ClassEntity, classe => classe.chiefs, { nullable: true })
  class: ClassEntity[]

  @ApiProperty({ description: 'Role', default: RolesUser.TEACHER })
  @Column({ default: RolesUser.TEACHER })
  role: string
}
