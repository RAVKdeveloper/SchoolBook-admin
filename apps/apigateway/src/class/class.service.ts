import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { CLASS_SERVICE_NAME, ClassServiceClient } from '@app/common'

import { CreateClassDto } from './dto/create-class.dto'
import { DeleteClassDto } from './dto/delete-class.dto'
import { GetAllClessesDto } from './dto/get-all-classes.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@Injectable()
export class ClassService implements OnModuleInit {
  private classService: ClassServiceClient

  constructor(@Inject(CLASS_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.classService = this.client.getService<ClassServiceClient>(CLASS_SERVICE_NAME)
  }

  public create(dto: CreateClassDto) {
    return this.classService.createClass(dto)
  }

  public findAll(dto: GetAllClessesDto) {
    return this.classService.getAllClasses({ ...dto, schoolId: Number(dto.schoolId) })
  }

  public findOne(id: number) {
    return this.classService.getClassById({ id })
  }

  public update(dto: UpdateClassDto) {
    return this.classService.updateClass(dto)
  }

  public remove(dto: DeleteClassDto) {
    return this.classService.deleteClass(dto)
  }
}
