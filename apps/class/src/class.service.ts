import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions'
import { ILike, In, Repository } from 'typeorm'

import {
  ClassEntity,
  CreateClassDto,
  DeleteClassDto,
  GetAllClessesDto,
  GetOneClassByIdDto,
  LessonEntity,
  StudentEntity,
  TeacherEntity,
  UpdateClassDto,
} from '@app/common'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity) private classRepo: Repository<ClassEntity>,
    @InjectRepository(TeacherEntity) private teacherRepo: Repository<TeacherEntity>,
    @InjectRepository(LessonEntity) private lessonRepo: Repository<LessonEntity>,
  ) {}

  public async createClass(dto: CreateClassDto) {
    const newClass = await this.classRepo.manager.transaction(async entityManager => {
      const chiefsArray: TeacherEntity[] = []

      if (dto.chiefs && dto.chiefs.length > 0) {
        const chiefs = await entityManager.find(TeacherEntity, {
          where: {
            id: In(dto.chiefs),
            class: null,
          },
        })

        chiefsArray.push(...chiefs)
      }

      const newClass = await entityManager.save(ClassEntity, {
        school: { id: dto.schoolId },
        name: dto.name,
        parallel: dto.parallel,
        chiefs: chiefsArray,
      })

      return newClass
    })

    return { message: 'Ok', class: newClass }
  }

  public async getAllClasses(dto: GetAllClessesDto) {
    const take = dto.limit ? Number(dto.limit) : 10
    const skip = dto.page ? take * Number(Number(dto.page) - 1) : 0

    const whereObj = this.getWhereFiltersObj(dto)

    const classes = await this.classRepo.find({
      relations: {
        lessons: true,
        students: true,
        chiefs: {
          userId: true,
        },
      },
      where: { school: { id: dto.schoolId }, ...whereObj },
      take,
      skip,
      // order: {
      //   points: {
      //     point: 'DESC',
      //   },
      // },
    })

    const count = await this.classRepo.countBy({
      school: { id: dto.schoolId },
      ...whereObj,
    })

    return { count, data: classes }
  }

  public async getClassById(dto: GetOneClassByIdDto) {
    const classe = await this.classRepo.findOne({
      relations: {
        chiefs: {
          userId: true,
        },
        students: {
          userId: true,
        },
        lessons: {
          teacher: {
            userId: true,
          },
        },
        points: {
          student: {
            userId: true,
          },
        },
      },
      where: { id: dto.id },
    })

    if (!classe) throw new GrpcNotFoundException('Класс не найден')

    return { message: 'Ok', class: classe }
  }

  public async updateClass(dto: UpdateClassDto) {
    const { updateObj, classe } = await this.getUpdateClassObj(dto)

    await this.classRepo.update({ id: classe.id }, updateObj)

    return { message: 'Ok', class: classe }
  }

  public async deleteClass(dto: DeleteClassDto) {
    const checkClass = await this.classRepo.findOne({
      where: {
        school: { id: dto.schoolId },
        id: dto.id,
      },
    })

    if (!checkClass) throw new GrpcNotFoundException('Класс не найден')

    await this.classRepo.delete(checkClass)

    return { message: 'Ok', class: checkClass }
  }

  private getWhereFiltersObj(dto: GetAllClessesDto) {
    const whereObj: Record<string, unknown> = {}

    if (dto.searchValue) {
      const numberValue = Number(dto.searchValue)

      if (!isNaN(numberValue)) {
        whereObj.name = numberValue
      } else {
        whereObj.parallel = ILike(`%${dto.searchValue}%`)
      }
    }

    return whereObj
  }

  private async getUpdateClassObj(dto: UpdateClassDto) {
    const classe = await this.classRepo.findOne({
      relations: {
        lessons: true,
        chiefs: true,
        students: true,
      },
      where: { school: { id: dto.schoolId }, id: dto.id },
    })

    if (!classe) throw new GrpcNotFoundException('Класс не найден')

    const updateObj: Record<string, unknown> = {}

    if (dto.name) updateObj.name = dto.name

    if (dto.parallel) updateObj.parallel = dto.parallel

    try {
      await this.classRepo.manager.transaction(async entityManager => {
        if (dto.chiefs && dto.chiefs.length > 0) {
          const chiefs = await entityManager.find(TeacherEntity, {
            where: { id: In(dto.chiefs) },
          })

          if (chiefs.length === 0) throw new GrpcNotFoundException('Некоторые учителя не найдены')

          updateObj.chiefs = [...classe.chiefs, ...chiefs]
        }

        if (dto.lessons && dto.lessons.length > 0) {
          const lessons = await entityManager.find(LessonEntity, {
            where: { id: In(dto.lessons) },
          })

          if (lessons.length === 0) throw new GrpcNotFoundException('Некоторые уроки не найдены')

          updateObj.lessons = [...classe.lessons, ...lessons]
        }

        if (dto.students && dto.students.length > 0) {
          const students = await entityManager.find(StudentEntity, {
            where: { id: In(dto.students) },
          })

          if (students.length === 0) throw new GrpcNotFoundException('Некоторые ученики не найдены')

          updateObj.students = [...classe.students, ...students]
        }

        return 'Ok'
      })
    } catch (e) {
      throw e
    }

    return { updateObj, classe }
  }
}
