import { Controller } from '@nestjs/common'

import {
  GetAveragePointDto,
  ReturnGetAveragePoint,
  SchoolStatisticServiceController,
  SchoolStatisticServiceControllerMethods,
} from '@app/common'

import { Observable } from 'rxjs'
import { SchoolStatisticService } from './school-statistic.service'

@Controller()
@SchoolStatisticServiceControllerMethods()
export class SchoolStatisticController implements SchoolStatisticServiceController {
  constructor(private readonly schoolStatisticService: SchoolStatisticService) {}

  getAveragePoint(
    dto: GetAveragePointDto,
  ): ReturnGetAveragePoint | Promise<ReturnGetAveragePoint> | Observable<ReturnGetAveragePoint> {
    return this.schoolStatisticService.getAveragePointStatistic(dto)
  }
}
