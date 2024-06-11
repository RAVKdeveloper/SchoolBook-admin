import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { TEACHERS_SERVICE_SERVICE_NAME, TeachersServiceClient } from '@app/common'

import { QueryAllTeachersDto } from './dto/query-teachers.dto'

@Injectable()
export class TeachersService implements OnModuleInit {
  private teacherService: TeachersServiceClient

  constructor(@Inject(TEACHERS_SERVICE_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.teacherService = this.client.getService<TeachersServiceClient>(
      TEACHERS_SERVICE_SERVICE_NAME,
    )
  }

  public getAllTeachers(dto: QueryAllTeachersDto) {
    return this.teacherService.getAllTeachers({ ...dto })
  }

  public getTeacherById(teacherId: number) {
    return this.teacherService.getTeacherById({ teacherId })
  }
}
