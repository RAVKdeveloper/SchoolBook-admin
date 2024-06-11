import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

import { BasicEntity } from '../basic/basic.entity'
import { StudentEntity } from './student.entity'
import { TeacherEntity } from './teacher.entity'
// import { ClassSchedule } from 'src/core/class-schedule/entities/class-schedule.entity'
// import { HomeWork } from 'src/core/home-work/entities/home-work.entity'
import { LessonEntity } from './lesson.entity'
import { PointEntity } from './point-system.entity'
import { School } from './school.entity'

@Entity('class')
export class ClassEntity extends BasicEntity {
  @ApiProperty({ example: '10', description: 'Class current' })
  @Column()
  name: number

  @ApiProperty({ example: 'A', description: 'Class parallel' })
  @Column()
  parallel: string

  @ManyToOne(() => School, school => school.classes)
  @ApiProperty({ default: School, description: 'School', enum: () => School })
  @JoinColumn({ name: 'school' })
  school: School

  @ManyToMany(() => TeacherEntity, teacher => teacher.class)
  @ApiProperty({
    default: [],
    enum: () => TeacherEntity,
    description: 'Chief this class',
    isArray: true,
  })
  @JoinTable({ name: 'chief_teachers' })
  chiefs: TeacherEntity[]

  @OneToMany(() => LessonEntity, lesson => lesson.classes)
  @ApiProperty({
    default: [],
    enum: () => LessonEntity,
    description: 'Lessons this class',
    isArray: true,
  })
  @JoinColumn({ name: 'lessons' })
  lessons: LessonEntity[]

  @ManyToMany(() => StudentEntity, student => student.class)
  @ApiProperty({ default: [], description: 'Students for class', enum: () => StudentEntity })
  @JoinTable({ name: 'students_table' })
  students: StudentEntity[]

  @OneToMany(() => PointEntity, point => point.classe)
  @ApiProperty({ description: 'Points', enum: () => PointEntity })
  points: PointEntity[]

  //   @OneToMany(() => ClassSchedule, schedule => schedule.class)
  //   @ApiProperty({ description: 'Schedule', enum: () => ClassSchedule })
  //   @JoinColumn()
  //   schedule: ClassSchedule[]

  //   @OneToMany(() => HomeWork, homeWork => homeWork.classe, { cascade: true })
  //   @ApiProperty({ description: 'Home works', enum: () => HomeWork, isArray: true })
  //   homeWorks: HomeWork[]
}
