import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { LESSONS_SERVICE_NAME, LessonsServiceClient } from '@app/common'

import { CreateLessonDto } from './dto/create-lesson.dto'
import { DeleteLessonDto } from './dto/delete-lesson.dto'
import { GetAllLessonsDto } from './dto/get-all-lessons.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'

@Injectable()
export class LessonsService implements OnModuleInit {
  private lessonService: LessonsServiceClient

  constructor(@Inject(LESSONS_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.lessonService = this.client.getService<LessonsServiceClient>(LESSONS_SERVICE_NAME)
  }

  public create(dto: CreateLessonDto) {
    return this.lessonService.createLesson(dto)
  }

  public findAll(dto: GetAllLessonsDto) {
    return this.lessonService.getAllLessons(dto)
  }

  public findOne(id: number, schoolId: number) {
    return this.lessonService.getLessonById({ lessonId: id, schoolId })
  }

  public update(id: number, dto: UpdateLessonDto) {
    return this.lessonService.updateLesson({ lessonId: id, ...dto })
  }

  public remove(dto: DeleteLessonDto) {
    return this.lessonService.deleteLesson(dto)
  }
}
