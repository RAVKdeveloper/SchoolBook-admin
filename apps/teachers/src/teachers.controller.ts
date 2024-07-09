import { Controller } from '@nestjs/common'

import {
  GetTeacherByIdDto,
  QueryTeachersDto,
  ReturnAllTeachersDto,
  ReturnOneTeacherDto,
  TeachersServiceController,
  TeachersServiceControllerMethods,
} from '@app/common'

import { Observable } from 'rxjs'
import { TeachersService } from './teachers.service'

@Controller()
@TeachersServiceControllerMethods()
export class TeachersController implements TeachersServiceController {
  constructor(private readonly teachersService: TeachersService) {}

  getAllTeachers(
    dto: QueryTeachersDto,
  ): ReturnAllTeachersDto | Promise<ReturnAllTeachersDto> | Observable<ReturnAllTeachersDto> {
    return this.teachersService.getAllTeachers(dto)
  }

  getTeacherById(
    dto: GetTeacherByIdDto,
  ): ReturnOneTeacherDto | Promise<ReturnOneTeacherDto> | Observable<ReturnOneTeacherDto> {
    return this.teachersService.getTeacherById(dto)
  }
}
