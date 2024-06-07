import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'

import { BasicEntity, RolesUser } from '../basic'
import { School } from './school.entity'
import { UserEntity } from './user.entity'

@Entity('owner_account')
export class OwnerEntity extends BasicEntity {
  @ManyToOne(() => UserEntity)
  @ApiProperty({
    default: () => UserEntity,
    description: 'Reference to user id',
    enum: () => UserEntity,
  })
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity

  @OneToOne(() => School, school => school.owner, { nullable: true })
  @ApiProperty({ default: [], description: 'School id', enum: () => School })
  @JoinColumn({ name: 'school_id' })
  school: School

  @ApiProperty({ description: 'Role - OWNER', example: 'OWNER' })
  @Column({ default: RolesUser.OWNER })
  role: string
}
