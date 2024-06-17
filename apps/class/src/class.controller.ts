import { Controller } from '@nestjs/common'

import {
  ClassServiceController,
  ClassServiceControllerMethods,
  CreateClassDto,
  DeleteClassDto,
  GetAllClessesDto,
  GetOneClassByIdDto,
  ResponseGetAllClassesDto,
  ResponseGetClassById,
  UpdateClassDto,
} from '@app/common'

import { Observable } from 'rxjs'
import { ClassService } from './class.service'

@Controller()
@ClassServiceControllerMethods()
export class ClassController implements ClassServiceController {
  constructor(private readonly classService: ClassService) {}

  createClass(
    dto: CreateClassDto,
  ): ResponseGetClassById | Promise<ResponseGetClassById> | Observable<ResponseGetClassById> {
    return this.classService.createClass(dto)
  }

  getAllClasses(
    dto: GetAllClessesDto,
  ): Promise<ResponseGetAllClassesDto> | Observable<ResponseGetAllClassesDto> {
    return this.classService.getAllClasses(dto)
  }

  getClassById(
    dto: GetOneClassByIdDto,
  ): Promise<ResponseGetClassById> | Observable<ResponseGetClassById> {
    return this.classService.getClassById(dto)
  }

  updateClass(
    dto: UpdateClassDto,
  ): Promise<ResponseGetClassById> | Observable<ResponseGetClassById> {
    return this.classService.updateClass(dto)
  }

  deleteClass(
    dto: DeleteClassDto,
  ): Promise<ResponseGetClassById> | Observable<ResponseGetClassById> {
    return this.classService.deleteClass(dto)
  }
}
