import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { SCHOOL_STATISTIC_SERVICE_NAME, SchoolStatisticServiceClient } from '@app/common'

import { QueryAveragePointDto } from './dto/query-average-point.dto'

@Injectable()
export class SchoolStatisticService implements OnModuleInit {
  private schoolStatisticService: SchoolStatisticServiceClient

  constructor(@Inject(SCHOOL_STATISTIC_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.schoolStatisticService = this.client.getService<SchoolStatisticServiceClient>(
      SCHOOL_STATISTIC_SERVICE_NAME,
    )
  }

  public getAveragePoint(dto: QueryAveragePointDto) {
    return this.schoolStatisticService.getAveragePoint(dto)
  }
}
