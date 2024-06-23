import { Controller } from '@nestjs/common'

import {
  CreateLessonDto,
  DeleteLessonByIdDto,
  GetAllLessonsDto,
  GetOneLessonByIdDto,
  LessonsServiceController,
  LessonsServiceControllerMethods,
  ReturnAllLessonsDto,
  ReturnOneLessonDto,
  UpdateLessonDto,
} from '@app/common'

import { Observable } from 'rxjs'
import { LessonsService } from './lessons.service'

@Controller()
@LessonsServiceControllerMethods()
export class LessonsController implements LessonsServiceController {
  constructor(private readonly lessonsService: LessonsService) {}

  createLesson(dto: CreateLessonDto): Promise<ReturnOneLessonDto> | Observable<ReturnOneLessonDto> {
    return this.lessonsService.createLesson(dto)
  }

  getAllLessons(
    dto: GetAllLessonsDto,
  ): Promise<ReturnAllLessonsDto> | Observable<ReturnAllLessonsDto> {
    return this.lessonsService.getAllLessons(dto)
  }

  getLessonById(
    dto: GetOneLessonByIdDto,
  ): ReturnOneLessonDto | Promise<ReturnOneLessonDto> | Observable<ReturnOneLessonDto> {
    return this.lessonsService.getLessonById(dto)
  }

  updateLesson(
    dto: UpdateLessonDto,
  ): ReturnOneLessonDto | Promise<ReturnOneLessonDto> | Observable<ReturnOneLessonDto> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.lessonsService.updateLesson(dto)
  }

  deleteLesson(
    dto: DeleteLessonByIdDto,
  ): ReturnOneLessonDto | Promise<ReturnOneLessonDto> | Observable<ReturnOneLessonDto> {
    return this.lessonsService.deleteLesson(dto)
  }
}
