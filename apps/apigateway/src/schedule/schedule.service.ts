import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { SCHEDULE_SERVICE_NAME, ScheduleServiceClient } from '@shared'

import { CreateDayScheduleDto } from './dto/create-day-schedule.dto'
import { CreateWeekScheduleDto } from './dto/create-week-schedule.dto'
import { DeleteScheduleDto } from './dto/delete-schedule.dto'
import { GetDayScheduleDto } from './dto/get-day-schedule.dto'
import { GetWeekScheduleDto } from './dto/get-week-schedule.dto'
import { RecoverScheduleDto } from './dto/recover-schedule.dto'
import { UpdateDayScheduleDto } from './dto/update-schedule.dto'

@Injectable()
export class ScheduleService implements OnModuleInit {
  private scheduleService: ScheduleServiceClient

  constructor(@Inject(SCHEDULE_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.scheduleService = this.client.getService<ScheduleServiceClient>(SCHEDULE_SERVICE_NAME)
  }

  public createWeekSchedule(dto: CreateWeekScheduleDto) {
    return this.scheduleService.createWeekSchedule(dto)
  }

  public createDaySchedule(dto: CreateDayScheduleDto) {
    return this.scheduleService.createDaySchedule(dto)
  }

  public getWeekSchedule(dto: GetWeekScheduleDto) {
    return this.scheduleService.getWeekSchedule(dto)
  }

  public getDaySchedule(dto: GetDayScheduleDto) {
    return this.scheduleService.getDaySchedule(dto)
  }

  public updateDaySchedule(dto: UpdateDayScheduleDto) {
    return this.scheduleService.updateDaySchedule(dto)
  }

  public softDelete(dto: DeleteScheduleDto) {
    return this.scheduleService.softDeleteSchedule(dto)
  }

  public hardDelete(dto: DeleteScheduleDto) {
    return this.scheduleService.hardDeleteSchedule(dto)
  }

  public async recoverSchedule(dto: RecoverScheduleDto) {
    return this.scheduleService.recoverSchedule(dto)
  }
}
