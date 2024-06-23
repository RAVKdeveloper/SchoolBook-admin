import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions'
import { ILike, In, Repository } from 'typeorm'

import {
  ClassEntity,
  CreateLessonDto,
  DeleteLessonByIdDto,
  GetAllLessonsDto,
  GetOneLessonByIdDto,
  LessonEntity,
  TeacherEntity,
  UpdateLessonDto,
} from '@app/common'

@Injectable()
export class LessonsService {
  constructor(@InjectRepository(LessonEntity) private lessonRepo: Repository<LessonEntity>) {}

  public async createLesson(dto: CreateLessonDto) {
    try {
      const lesson = await this.lessonRepo.manager.transaction(async entityManager => {
        const teachersArr: TeacherEntity[] = []

        if (dto.teacherId && dto.teacherId.length > 0) {
          const teachers = await entityManager.find(TeacherEntity, {
            where: {
              id: In(dto.teacherId),
            },
          })

          if (teachers.length === 0) {
            throw new GrpcNotFoundException('Учителя не найдены')
          }

          teachersArr.push(...teachers)
        }

        const createdLesson = await entityManager.save(LessonEntity, {
          classes: { id: +dto.classId },
          school: { id: +dto.schoolId },
          lessonName: dto.name,
          teacher: teachersArr,
        })

        return createdLesson
      })

      return { message: 'Ok', lesson }
    } catch (e) {
      throw e
    }
  }

  public async getAllLessons(dto: GetAllLessonsDto) {
    const take = dto.limit ? Number(dto.limit) : 10
    const skip = dto.page ? take * Number(Number(dto.page) - 1) : 0
    const whereObj = this.getWhereObjAllFilters(dto)

    const lessons = await this.lessonRepo.find({
      relations: {
        teacher: {
          userId: true,
        },
        classes: {
          chiefs: {
            userId: true,
          },
        },
      },
      where: {
        school: { id: +dto.schoolId },
        ...whereObj,
      },
      take,
      skip,
      order: {
        id: 'DESC',
      },
    })

    const count = await this.lessonRepo.countBy({
      school: { id: +dto.schoolId },
      ...whereObj,
    })

    return { count, data: lessons }
  }

  public async getLessonById(dto: GetOneLessonByIdDto) {
    const lesson = await this.lessonRepo.findOne({
      relations: {
        classes: {
          chiefs: {
            userId: true,
          },
          students: true,
        },
        teacher: {
          userId: true,
        },
      },
      where: {
        school: { id: +dto.schoolId },
        id: +dto.lessonId,
      },
    })

    if (!lesson) throw new GrpcNotFoundException('Урок не найден')

    return { message: 'Ok', lesson }
  }

  public async updateLesson(dto: UpdateLessonDto) {
    const updatedObj = await this.getUpdateObj(dto)

    const updatedLesson = await this.lessonRepo.update(
      { id: +dto.lessonId },
      {
        ...updatedObj,
      },
    )

    return { message: 'Ok', lesson: updatedLesson }
  }

  public async deleteLesson(dto: DeleteLessonByIdDto) {
    const isNotEmptyLesson = await this.lessonRepo.findOne({
      where: { id: dto.id, school: { id: dto.schoolId } },
    })

    if (!isNotEmptyLesson) throw new GrpcNotFoundException('Урок не найден')

    await this.lessonRepo.delete({ id: isNotEmptyLesson.id })

    return { message: 'Ok', lesson: isNotEmptyLesson }
  }

  private getWhereObjAllFilters(dto: GetAllLessonsDto) {
    const whereObj: Record<string, unknown> = {}

    if (dto.classId) {
      whereObj.classes = { id: +dto.classId }
    }

    if (dto.lessonName) {
      whereObj.lessonName = ILike(`%${dto.lessonName}%`)
    }

    if (dto.onlyMy && !isNaN(+dto.onlyMy)) {
      delete whereObj.teacher
      whereObj.teacher = { id: +dto.onlyMy }
    }

    if (dto.teacherId && !isNaN(+dto.teacherId)) {
      delete whereObj.teacher
      whereObj.teacher = { id: +dto.teacherId }
    }

    whereObj.isRequired = dto.isRequired

    return whereObj
  }

  private async getUpdateObj(dto: UpdateLessonDto) {
    const updateObj: Record<string, unknown> = {}

    if (dto.name) {
      updateObj.lessonName = dto.name
    }

    try {
      await this.lessonRepo.manager.transaction(async entityManager => {
        const lesson = await entityManager.findOne(LessonEntity, {
          where: { id: +dto.lessonId },
          relations: { teacher: true },
        })

        if (!lesson) throw new GrpcNotFoundException('Урок не найден')

        if (dto.classId && !isNaN(+dto.classId)) {
          const newClass = await entityManager.findOne(ClassEntity, {
            where: { id: +dto.classId },
          })

          if (!newClass) throw new GrpcNotFoundException('Класс не найден')

          updateObj.classes = newClass
        }

        const inNotEmptyTeachersArr = dto.teacherId && dto.teacherId.length > 0

        if (inNotEmptyTeachersArr && dto.isAddTeachers) {
          const teachers = await entityManager.find(TeacherEntity, {
            where: {
              id: In(dto.teacherId),
            },
          })

          if (teachers.length === 0) throw new GrpcNotFoundException('Учителя не найдены')

          updateObj.teacher = [...lesson.teacher, ...teachers]
        }

        if (inNotEmptyTeachersArr && dto.isAddTeachers === false) {
          const teachers = lesson.teacher.filter(teacher => !dto.teacherId.includes(teacher.id))

          updateObj.teacher = teachers
        }

        return
      })
    } catch (e) {
      throw e
    }

    return updateObj
  }
}
