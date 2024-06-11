import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'

import { BasicEntity } from '../basic/basic.entity'
import { ClassEntity } from './class.entity'
import { School } from './school.entity'
import { TeacherEntity } from './teacher.entity'

@Entity('lesson')
export class LessonEntity extends BasicEntity {
  @ApiProperty({ example: 'Информатика', description: 'Lesson name' })
  @Column({ name: 'lesson_name' })
  lessonName: string

  @ApiProperty({ example: 'https://schoolbook.ru/lessonIcons/23423' })
  @Column({ nullable: true })
  icon: string

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @ApiProperty({ default: School, enum: () => School })
  @JoinColumn()
  school: School

  @ManyToMany(() => TeacherEntity, teacher => teacher.lessons, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @ApiProperty({ enum: () => TeacherEntity, description: 'Teacher', isArray: true })
  @JoinTable()
  teacher: TeacherEntity[]

  @ManyToOne(() => ClassEntity, classe => classe.lessons, { onDelete: 'CASCADE' })
  @ApiProperty({ enum: () => ClassEntity, description: 'Classes' })
  classes: ClassEntity
}
