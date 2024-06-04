import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BasicEntity, UserEntity } from '@app/common';

@Entity('auth_code')
export class AuthCodeEntity extends BasicEntity {
  @ApiProperty({ example: '1111', description: 'Email verification code' })
  @Column({ nullable: false })
  code: number;

  @ApiProperty({ example: '1', description: 'User id' })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;
}
