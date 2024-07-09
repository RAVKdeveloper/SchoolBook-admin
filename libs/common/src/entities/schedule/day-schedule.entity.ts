import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

import { BasicEntity } from '../../basic'
import { LessonEntity } from '../lesson.entity'
import { PointEntity } from '../point-system.entity'
import { StudentEntity } from '../student.entity'
import { TeacherEntity } from '../teacher.entity'
import { WeekScheduleEntity } from './week-schedule.entity'

@Entity('day_schedule')
export class DayScheduleEntity extends BasicEntity {
  @ManyToMany(() => TeacherEntity)
  @ApiProperty({ example: [], description: 'Active teachers this day', enum: () => TeacherEntity })
  @JoinTable({ name: 'active_teachers' })
  readonly activeTeachers: TeacherEntity[]

  @ManyToMany(() => StudentEntity)
  @ApiProperty({ example: [], description: 'Empty this day students', enum: () => StudentEntity })
  @JoinTable({ name: 'empty_students' })
  readonly emptyStudents: StudentEntity[]

  @ManyToMany(() => LessonEntity)
  @ApiProperty({ example: [], description: 'This lesson in the day', enum: () => LessonEntity })
  @JoinTable({ name: 'lessons_this_day' })
  readonly lessons: LessonEntity[]

  @OneToMany(() => PointEntity, point => point.day)
  @ApiProperty({ example: [], description: 'This points in the day', enum: () => PointEntity })
  @JoinColumn({ name: 'points_this_day' })
  readonly points: PointEntity[]

  @ManyToOne(() => WeekScheduleEntity, schedule => schedule.days, { onDelete: 'CASCADE' })
  @ApiProperty({ enum: () => WeekScheduleEntity })
  readonly schedule: WeekScheduleEntity

  //   @ApiProperty({ description: 'Home works', enum: () => HomeWork, isArray: true })
  //   @OneToMany(() => HomeWork, homeWork => homeWork.daySchedule, { onDelete: 'CASCADE' })
  //   homeWorks: HomeWork[]

  @ApiProperty({ example: 'Среда', description: 'Day week name' })
  @Column({ name: 'day_name' })
  readonly dayName: string

  @ApiProperty({ example: '8:00-8:45' })
  @Column({ nullable: true })
  readonly time: string

  @ApiProperty({ example: '2022-03-03', description: 'Date' })
  @Column({ nullable: true, type: 'date' })
  readonly date: string
}
