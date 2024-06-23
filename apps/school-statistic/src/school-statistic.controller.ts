import { Controller } from '@nestjs/common'

import {
  GetAllEmptyStudentsDto,
  GetAveragePointDto,
  ReturnGetAllEmptyStudentsDto,
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.schoolStatisticService.getAveragePointStatistic(dto)
  }

  getAllEmptyStudents(
    dto: GetAllEmptyStudentsDto,
  ): Promise<ReturnGetAllEmptyStudentsDto> | Observable<ReturnGetAllEmptyStudentsDto> {
    throw new Error('')
  }
}
