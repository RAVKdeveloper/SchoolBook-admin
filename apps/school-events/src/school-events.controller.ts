import { Controller } from '@nestjs/common'

import {
  CreateOkEventDto,
  CreateSchoolEventDto,
  DeleteSchoolEventDto,
  GetAllSchoolEventsDto,
  GetSchoolEventByIdDto,
  ReturnAllSchoolEventsDto,
  SchoolEventsServiceController,
  SchoolEventsServiceControllerMethods,
  UpdateSchoolEventDto,
} from '@app/common'

import { Observable } from 'rxjs'
import { SchoolEventsService } from './school-events.service'

@Controller()
@SchoolEventsServiceControllerMethods()
export class SchoolEventsController implements SchoolEventsServiceController {
  constructor(private readonly schoolEventsService: SchoolEventsService) {}

  createSchoolEvent(
    dto: CreateSchoolEventDto,
  ): CreateOkEventDto | Promise<CreateOkEventDto> | Observable<CreateOkEventDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.schoolEventsService.create(dto)
  }

  getAllSchoolEvents(
    dto: GetAllSchoolEventsDto,
  ):
    | ReturnAllSchoolEventsDto
    | Promise<ReturnAllSchoolEventsDto>
    | Observable<ReturnAllSchoolEventsDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.schoolEventsService.getAllSchoolEvents(dto)
  }

  getSchoolEventById(
    dto: GetSchoolEventByIdDto,
  ): CreateOkEventDto | Promise<CreateOkEventDto> | Observable<CreateOkEventDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.schoolEventsService.getSchoolEventById(dto)
  }

  updateSchoolEvent(
    dto: UpdateSchoolEventDto,
  ): CreateOkEventDto | Promise<CreateOkEventDto> | Observable<CreateOkEventDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.schoolEventsService.updateSchoolEventsById(dto)
  }

  deleteSchoolEvent(
    dto: DeleteSchoolEventDto,
  ): CreateOkEventDto | Promise<CreateOkEventDto> | Observable<CreateOkEventDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.schoolEventsService.deleteSchoolEvent(dto)
  }
}
