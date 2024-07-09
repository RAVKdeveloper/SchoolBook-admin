import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

import { BasicEntity } from '../../basic'
import { ClassEntity } from '../class.entity'
import { DayScheduleEntity } from './day-schedule.entity'

@Entity('class_schedule')
export class WeekScheduleEntity extends BasicEntity {
  @ApiProperty({ example: true, description: 'Class schedule is the top week?' })
  @Column({ default: false })
  readonly isTheTopWeek: boolean

  @OneToMany(() => DayScheduleEntity, day => day.schedule)
  @ApiProperty({ default: [], description: 'Days this week', enum: () => DayScheduleEntity })
  readonly days: DayScheduleEntity[]

  @ManyToOne(() => ClassEntity, clas => clas.schedule)
  @ApiProperty({ description: 'Class', enum: () => ClassEntity })
  readonly class: ClassEntity

  @ApiProperty({ example: 17 })
  @Column({ name: 'current_week' })
  readonly currentWeek: number

  @ApiProperty({ example: '2024' })
  @Column()
  readonly year: string

  @ApiProperty({ example: '19.04.2022-', description: 'Timeline start this week' })
  @Column()
  readonly timelineStart: string

  @ApiProperty({ example: '25.05.2022', description: 'Timeline end this week' })
  @Column()
  readonly timelineEnd: string
}
