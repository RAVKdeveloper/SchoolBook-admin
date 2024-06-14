import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BasicEntity } from '../../basic/basic.entity'
import { PointEntity } from '../point-system.entity'
import { UserEntity } from '../user.entity'

@Entity('point_notification')
export class PointNotificationEntity extends BasicEntity {
  @ApiProperty({ description: 'To user', enum: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  readonly to: UserEntity

  @ApiProperty({ description: 'Title', example: 'Title' })
  @Column()
  readonly title: string

  @ApiProperty({ description: 'Description', example: 'Description' })
  @Column()
  readonly description: string

  @ApiProperty({ description: 'Point', enum: () => PointEntity })
  @ManyToOne(() => PointEntity)
  @JoinColumn()
  readonly point: PointEntity

  @ApiProperty({ description: 'Point creator', enum: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  readonly creator: UserEntity
}
