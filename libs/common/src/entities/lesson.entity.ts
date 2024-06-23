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
  readonly lessonName: string

  @ApiProperty({ example: 'https://schoolbook.ru/lessonIcons/23423' })
  @Column({ nullable: true })
  readonly icon: string

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'School', enum: () => School })
  @JoinColumn()
  readonly school: School

  @ManyToMany(() => TeacherEntity, teacher => teacher.lessons, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @ApiProperty({ enum: () => TeacherEntity, description: 'Teacher', isArray: true })
  @JoinTable()
  readonly teacher: TeacherEntity[]

  @ManyToOne(() => ClassEntity, classe => classe.lessons, { onDelete: 'CASCADE' })
  @ApiProperty({ enum: () => ClassEntity, description: 'Classes' })
  readonly classes: ClassEntity

  @ApiProperty({ description: 'Is required', example: true })
  @Column({ default: true, name: 'is_required' })
  readonly isRequired: boolean
}
