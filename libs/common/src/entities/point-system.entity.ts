import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BasicEntity } from '../basic/basic.entity'
import { StudentEntity } from './student.entity'
// import { DaySchedule } from 'src/core/class-schedule/entities/day-schedule.entity'
import { ClassEntity } from './class.entity'
import { LessonEntity } from './lesson.entity'
import { School } from './school.entity'

@Entity('point')
export class PointEntity extends BasicEntity {
  @ApiProperty({ example: 5, description: 'Point' })
  @Column()
  point: string

  @ApiProperty({ example: 'Отличные знания', nullable: true })
  @Column()
  description: string

  @ManyToOne(() => StudentEntity, student => student.points, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Student', enum: () => StudentEntity })
  @JoinColumn({ name: 'student' })
  student: StudentEntity

  @ManyToOne(() => LessonEntity, { onDelete: 'CASCADE' })
  @ApiProperty({ enum: () => LessonEntity, description: 'Lesson' })
  @JoinColumn({ name: 'lesson' })
  lesson: LessonEntity

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @ApiProperty({ enum: () => School, description: 'School' })
  school: School

  @ManyToOne(() => ClassEntity, classe => classe.points, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Class', enum: () => ClassEntity })
  @JoinColumn({ name: 'class' })
  classe: ClassEntity

  @ApiProperty({ description: 'Type', example: 'HOMEWORK' })
  @Column()
  type: string

  //   @ManyToOne(() => DaySchedule, day => day.points, { onDelete: 'CASCADE' })
  //   @ApiProperty({ description: 'Day', enum: () => DaySchedule })
  //   day: DaySchedule
}
