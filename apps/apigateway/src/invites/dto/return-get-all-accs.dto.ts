import { ApiProperty } from '@nestjs/swagger'

import { OwnerEntity } from '@app/common'

export class ReturnGetAllAccountsDto {
  @ApiProperty({ description: 'Count', example: 1 })
  readonly count: number

  @ApiProperty({ description: 'Get all accounts', isArray: true, type: OwnerEntity })
  readonly accounts: OwnerEntity[]
}
