import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions'
import { ILike, Repository } from 'typeorm'

import { GetTeacherByIdDto, QueryTeachersDto, TeacherEntity } from '@app/common'

@Injectable()
export class TeachersService {
  constructor(@InjectRepository(TeacherEntity) private teacherRepo: Repository<TeacherEntity>) {}

  public async getAllTeachers(dto: QueryTeachersDto) {
    const take = dto.limit ? Number(dto.limit) : 10
    const skip = dto.page ? take * Number(Number(dto.page) - 1) : 0

    const whereObj = this.getWhereObjAllTeachers(dto)

    const teachers = await this.teacherRepo.find({
      relations: {
        userId: true,
        lessons: {
          classes: true,
        },
      },
      where: dto.search ? whereObj : { school: { id: +dto.schoolId } },
      // where: { userId: { id: Number(dto.search) } },
      take,
      skip,
      cache: true,
    })

    const count = await this.teacherRepo.countBy(
      dto.search ? whereObj : { school: { id: +dto.schoolId } },
    )

    return { count, data: teachers }
  }

  public async getTeacherById(dto: GetTeacherByIdDto) {
    const teacher = await this.teacherRepo.findOne({
      relations: {
        lessons: {
          classes: true,
        },
        userId: true,
      },
      where: { id: dto.teacherId },
    })

    if (!teacher) throw new GrpcNotFoundException('Учитель не существует')

    return { message: 'Ok', teacher }
  }

  private getWhereObjAllTeachers(dto: QueryTeachersDto) {
    const whereObj = []

    const query = dto.search
    const schoolId = Number(dto.schoolId)

    if (dto.search) {
      if (query[0] === '#') {
        const array = [
          { school: { id: schoolId }, userId: { id: Number(query.substring(1)) } },
          { school: { id: schoolId }, id: Number(query.substring(1)) },
        ]

        whereObj.push(...array)
      } else {
        const array = [
          { school: { id: schoolId }, userId: { name: ILike(`%${dto.search}%`) } },
          { school: { id: schoolId }, userId: { surname: ILike(`%${dto.search}%`) } },
        ]

        whereObj.push(...array)
      }
    }
    return whereObj
  }
}
