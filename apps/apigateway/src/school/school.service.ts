import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { SCHOOL_SERVICE_NAME, SchoolServiceClient } from '@app/common'

import { CreateSchoolDto } from './dto/create-school.dto'
import { UpdateSchoolDto } from './dto/update-school.dto'

@Injectable()
export class SchoolService implements OnModuleInit {
  private schoolService: SchoolServiceClient

  constructor(@Inject(SCHOOL_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.schoolService = this.client.getService<SchoolServiceClient>(SCHOOL_SERVICE_NAME)
  }

  create(dto: CreateSchoolDto, ip: string, userId: number) {
    return this.schoolService.createSchool({ ...dto, ip, userId })
  }

  findOne(id: number) {
    return this.schoolService.getSchoolById({ schoolId: id })
  }

  update(dto: UpdateSchoolDto, ownerId: number) {
    return this.schoolService.updateSchoolMetedata({ ownerId, ...dto })
  }
}
