import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

import { BasicEntity } from '../basic/basic.entity'
import { ClassEntity } from './class.entity'
import { PointEntity } from './point-system.entity'
import { School } from './school.entity'
import { UserEntity } from './user.entity'

@Entity('student_account')
export class StudentEntity extends BasicEntity {
  @ApiProperty({ example: '1', description: 'Reference to user id', enum: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity

  @ApiProperty({ example: true, description: 'Is admit student for school' })
  @Column({ default: false, nullable: false })
  isAdmit: boolean

  @ApiProperty({ example: '62', description: 'School id', enum: () => School })
  @ManyToOne(() => School, school => school.students)
  @JoinColumn({ name: 'school_id' })
  school: School

  @ManyToMany(() => ClassEntity, classe => classe.students)
  @ApiProperty({
    default: [],
    description: 'Class student',
    enum: () => ClassEntity,
    isArray: true,
  })
  @JoinColumn({ name: 'class' })
  class: ClassEntity[]

  @OneToMany(() => PointEntity, point => point.student)
  @ApiProperty({ description: 'Points student', enum: () => PointEntity, isArray: true })
  points: PointEntity[]

  @ApiProperty({
    example: '2024-03-02T11:18:30.993Z',
    description: 'Date of accession user in school',
  })
  @Column({ nullable: true, name: 'date_of_accession' })
  dateOfAccession: Date
}
