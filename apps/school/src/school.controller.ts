import { Controller } from '@nestjs/common'

import {
  CreateSchoolDto,
  GetOneSchoolDto,
  ReturnGetOneSchool,
  ReturnSchoolCreateOk,
  SchoolServiceController,
  SchoolServiceControllerMethods,
  UpdateSchoolDto,
} from '@app/common'

import { Observable } from 'rxjs'
import { SchoolService } from './school.service'

@Controller()
@SchoolServiceControllerMethods()
export class SchoolController implements SchoolServiceController {
  constructor(private readonly schoolService: SchoolService) {}

  createSchool(
    dto: CreateSchoolDto,
  ): ReturnSchoolCreateOk | Promise<ReturnSchoolCreateOk> | Observable<ReturnSchoolCreateOk> {
    return this.schoolService.createSchool(dto)
  }

  getSchoolById(
    dto: GetOneSchoolDto,
  ): ReturnGetOneSchool | Promise<ReturnGetOneSchool> | Observable<ReturnGetOneSchool> {
    return this.schoolService.getSchoolById(dto)
  }

  updateSchoolMetedata(
    dto: UpdateSchoolDto,
  ): ReturnGetOneSchool | Promise<ReturnGetOneSchool> | Observable<ReturnGetOneSchool> {
    return this.schoolService.updateSchoolMetadata(dto)
  }
}
