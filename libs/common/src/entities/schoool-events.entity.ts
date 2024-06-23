import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'

import { BasicEntity } from '../basic'
import { ClassEntity } from './class.entity'
import { School } from './school.entity'
import { StudentEntity } from './student.entity'
import { TeacherEntity } from './teacher.entity'
import { UserEntity } from './user.entity'

@Entity('school_event')
export class SchoolEventEntity extends BasicEntity {
  @ApiProperty({ description: 'Title event', example: 'Последний звонок' })
  @Column()
  readonly title: string

  @ApiProperty({ description: 'Description event', example: '1 сентября' })
  @Column()
  readonly description: string

  @ApiProperty({ description: 'Tags', example: 'Последний звонок', isArray: true })
  @Column({ array: true, type: 'text' })
  readonly tags: string[]

  @ApiProperty({ description: 'Creator', enum: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator' })
  readonly creator: UserEntity

  @ApiProperty({ description: 'School', enum: () => School })
  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  readonly school: School

  @ApiProperty({ description: 'Active teachers', enum: () => TeacherEntity, isArray: true })
  @ManyToMany(() => TeacherEntity)
  @JoinTable({ name: 'active_teachers' })
  readonly activeTeachers: TeacherEntity[]

  @ApiProperty({ description: 'Active students', enum: () => StudentEntity, isArray: true })
  @ManyToMany(() => StudentEntity)
  @JoinTable({ name: 'active_students' })
  readonly activeStudents: StudentEntity[]

  @ManyToMany(() => ClassEntity)
  @JoinTable({ name: 'active_classes' })
  @ApiProperty({ description: 'Active classes', enum: () => ClassEntity, isArray: true })
  readonly activeClasses: ClassEntity[]

  @ApiProperty({ description: 'Planned date', example: '2024-06-30' })
  @Column()
  readonly plannedDate: Date

  @ApiProperty({ description: 'Views', example: 134 })
  @Column({ default: 0 })
  readonly views: number

  @ApiProperty({ description: 'Image key', example: 'rewrew-werwerewr-werwerewrewrewr-ewrewr' })
  @Column({ default: process.env.DEFAULT_EVENT_AVATAR })
  readonly image: string

  @ApiProperty({ description: 'Is the visible event other schools', example: true })
  @Column({ name: 'is_private' })
  readonly isPrivate: boolean
}
