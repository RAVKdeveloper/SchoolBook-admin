import { Cache } from '@nestjs/cache-manager'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import {
  SCHOOL_EVENTS_SERVICE_NAME,
  SchoolEventsServiceClient,
  UpdateSchoolEventDto,
} from '@app/common'

import { CreateSchoolEventDto } from './dto/create-school-events.dto'
import { GetAllEventsDto } from './dto/get-all-events.dto'

@Injectable()
export class SchoolEventsService implements OnModuleInit {
  private schoolEventsService: SchoolEventsServiceClient
  private cachePrefixKey = '/api/school-events'

  constructor(
    @Inject(SCHOOL_EVENTS_SERVICE_NAME) private client: ClientGrpc,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.schoolEventsService = this.client.getService<SchoolEventsServiceClient>(
      SCHOOL_EVENTS_SERVICE_NAME,
    )
  }

  public createSchoolEvent(dto: CreateSchoolEventDto, userId: number) {
    return this.schoolEventsService.createSchoolEvent({ ...dto, creatorId: userId })
  }

  public async getAllEvents(dto: GetAllEventsDto) {
    const cacheValue = await this.cacheManager.get(this.cachePrefixKey)

    if (cacheValue) return cacheValue

    const events = await this.schoolEventsService.getAllSchoolEvents(dto).toPromise()

    await this.cacheManager.set(this.cachePrefixKey, events)

    return events
  }

  public getSchoolEventById(id: number) {
    return this.schoolEventsService.getSchoolEventById({ schoolEventId: id })
  }

  public updateSchoolEvent(dto: UpdateSchoolEventDto) {
    return this.schoolEventsService.updateSchoolEvent(dto)
  }

  public deleteSchoolEvent(id: number, userId: number) {
    return this.schoolEventsService.deleteSchoolEvent({ id, creatorId: userId })
  }
}
