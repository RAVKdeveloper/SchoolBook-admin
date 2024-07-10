import { Controller } from '@nestjs/common'

import {
  CreateDayScheduleDto,
  CreateWeekScheduleDto,
  GetDayScheduleDto,
  GetWeekScheduleDto,
  HardDeleteScheduleDto,
  RecoverScheduleDto,
  ReturnOkScheduleDeleteResponse,
  ReturnOneDayScheduleDto,
  ReturnOneWeekScheduleDto,
  ScheduleServiceController,
  ScheduleServiceControllerMethods,
  SoftDeleteScheduleDto,
  SuccessfulCreatedOrUpdatedDto,
  UpdateDayScheduleDto,
} from '@shared'

import { Observable } from 'rxjs'
import { ScheduleService } from './schedule.service'

@Controller()
@ScheduleServiceControllerMethods()
export class ScheduleController implements ScheduleServiceController {
  constructor(private readonly scheduleService: ScheduleService) {}

  public createWeekSchedule(
    dto: CreateWeekScheduleDto,
  ): Promise<SuccessfulCreatedOrUpdatedDto> | Observable<SuccessfulCreatedOrUpdatedDto> {
    return this.scheduleService.createWeekSchedule(dto)
  }

  public createDaySchedule(
    dto: CreateDayScheduleDto,
  ): Promise<SuccessfulCreatedOrUpdatedDto> | Observable<SuccessfulCreatedOrUpdatedDto> {
    return this.scheduleService.createDaySchedule(dto)
  }

  public getWeekSchedule(
    dto: GetWeekScheduleDto,
  ): Promise<ReturnOneWeekScheduleDto> | Observable<ReturnOneWeekScheduleDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.scheduleService.getWeekSchedule(dto)
  }

  public getDaySchedule(
    dto: GetDayScheduleDto,
  ): Promise<ReturnOneDayScheduleDto> | Observable<ReturnOneDayScheduleDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.scheduleService.getDaySchedule(dto)
  }

  public updateDaySchedule(
    dto: UpdateDayScheduleDto,
  ): Promise<ReturnOkScheduleDeleteResponse> | Observable<ReturnOkScheduleDeleteResponse> {
    return this.scheduleService.updateSchedule(dto)
  }

  public softDeleteSchedule(
    dto: SoftDeleteScheduleDto,
  ): Promise<ReturnOkScheduleDeleteResponse> | Observable<ReturnOkScheduleDeleteResponse> {
    return this.scheduleService.softDeleteSchedule(dto)
  }

  public hardDeleteSchedule(
    dto: HardDeleteScheduleDto,
  ): Promise<ReturnOkScheduleDeleteResponse> | Observable<ReturnOkScheduleDeleteResponse> {
    return this.scheduleService.hardDeleteSchedule(dto)
  }

  public recoverSchedule(
    dto: RecoverScheduleDto,
  ): Promise<ReturnOkScheduleDeleteResponse> | Observable<ReturnOkScheduleDeleteResponse> {
    return this.scheduleService.recoverSchedule(dto)
  }
}
