import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException, GrpcPermissionDeniedException } from 'nestjs-grpc-exceptions'
import { In, Raw, Repository } from 'typeorm'

import { DayScheduleEntity, LessonEntity, TeacherEntity, WeekScheduleEntity } from '@entities/src'

import {
  AppUtils,
  CreateDayScheduleDto,
  CreateWeekScheduleDto,
  GetDayScheduleDto,
  GetWeekScheduleDto,
  HardDeleteScheduleDto,
  RecoverScheduleDto,
  ScheduleTypes,
  SoftDeleteScheduleDto,
  UpdateDayScheduleDto,
} from '@shared'

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(DayScheduleEntity)
    private readonly dayScheduleRepo: Repository<DayScheduleEntity>,
    @InjectRepository(WeekScheduleEntity)
    private readonly weekScheduleRepo: Repository<WeekScheduleEntity>,
    private utils: AppUtils,
  ) {}

  public async createWeekSchedule(dto: CreateWeekScheduleDto) {
    const date = this.utils.getDate()

    try {
      const newWeekSchedule = await this.weekScheduleRepo.manager.transaction(
        async entityManager => {
          const isEmptySchedule = await entityManager.findOne(WeekScheduleEntity, {
            where: {
              class: { id: dto.classId },
              currentWeek: date.week,
              year: date.year,
              school: { id: dto.schoolId },
            },
          })

          if (isEmptySchedule) {
            throw new GrpcPermissionDeniedException('Расписание уже существует')
          }

          return await entityManager.save(WeekScheduleEntity, {
            class: { id: dto.classId },
            currentWeek: date.week,
            year: date.year,
            timelineStart: new Date(date.timelineStart).toISOString(),
            timelineEnd: new Date(date.timelineEnd).toISOString(),
            school: { id: dto.schoolId },
          })
        },
      )

      if (dto.days && dto.days.length > 0) {
        Promise.all(
          dto.days.map(async day => {
            await this.createDaySchedule({ ...day, scheduleId: newWeekSchedule.id })
          }),
        )
      }

      return {
        message: 'Ok',
      }
    } catch (error) {
      throw error
    }
  }

  public async createDaySchedule(dto: CreateDayScheduleDto) {
    try {
      await this.dayScheduleRepo.manager.transaction(async entityManager => {
        const lessons: LessonEntity[] = []
        const teachers: TeacherEntity[] = []

        const isEmptyDaySchedule = await entityManager.findOne(DayScheduleEntity, {
          where: {
            schedule: { id: dto.scheduleId },
            dayName: dto.dayName,
            date: new Date(dto.date),
          },
        })

        if (isEmptyDaySchedule) {
          throw new GrpcPermissionDeniedException(`Расписание на ${dto.date} уже существует`)
        }

        if (dto.lessonsId && dto.lessonsId.length > 0) {
          const lessonsArray = await entityManager.find(LessonEntity, {
            where: {
              id: In(dto.lessonsId),
            },
          })

          if (lessonsArray.length === 0) {
            throw new GrpcNotFoundException('Уроки не найдены')
          }

          lessons.push(...lessonsArray)
        }

        if (dto.activeTeachersId && dto.activeTeachersId.length > 0) {
          const teachersArray = await entityManager.find(TeacherEntity, {
            where: {
              id: In(dto.activeTeachersId),
            },
          })

          if (teachersArray.length === 0) {
            throw new GrpcNotFoundException('Учителя не найдены')
          }

          teachers.push(...teachersArray)
        }

        return await entityManager.save(DayScheduleEntity, {
          schedule: { id: dto.scheduleId },
          dayName: dto.dayName,
          lessons,
          activeTeachers: teachers,
          date: new Date(dto.date).toISOString(),
        })
      })

      return { message: 'Ok' }
    } catch (err) {
      throw err
    }
  }

  public async getWeekSchedule(dto: GetWeekScheduleDto) {
    const { skip, whereTimeObj } = this.getWeekScheduleWhereTimeFilter(dto)

    const weekSchedule = await this.weekScheduleRepo.find({
      relations: {
        days: {
          lessons: {
            teacher: {
              userId: true,
            },
          },
          emptyStudents: {
            userId: true,
          },
          points: {
            student: {
              userId: true,
            },
          },
        },
      },
      where: {
        class: { id: +dto.classId },
        school: { id: +dto.schoolId },
        ...whereTimeObj,
      },
      order: {
        id: 'DESC',
      },
      skip,
      take: 1,
    })

    const count = await this.weekScheduleRepo.countBy({
      class: { id: +dto.classId },
      school: { id: +dto.schoolId },
    })

    if (weekSchedule.length === 0) {
      throw new GrpcNotFoundException('Расписание на неделю не найдено')
    }

    return {
      schedule: weekSchedule[0],
      count,
      message: 'Ok',
    }
  }

  public async getDaySchedule(dto: GetDayScheduleDto) {
    const whereDateObj: Record<string, unknown> = {}

    if (dto.date) {
      whereDateObj.date = Raw(alias => `${alias} = :startDate`, {
        startDate: new Date(dto.date).toISOString().substring(0, 10),
      })
    } else {
      whereDateObj.date = Raw(alias => `${alias} = :date`, {
        date: new Date().toISOString().substring(0, 10),
      })
    }

    const daySchedule = await this.dayScheduleRepo.findOne({
      relations: {
        lessons: {
          teacher: {
            userId: true,
          },
        },
        emptyStudents: {
          userId: true,
        },
        activeTeachers: {
          userId: true,
        },
        points: {
          student: {
            userId: true,
          },
        },
      },
      where: {
        schedule: { class: { id: +dto.classId, school: { id: +dto.schoolId } } },
        ...whereDateObj,
      },
      order: {
        id: 'DESC',
      },
    })

    if (!daySchedule) {
      throw new GrpcNotFoundException('Расписание на день не найдено')
    }

    return {
      message: 'Ok',
      daySchedule,
    }
  }

  public async updateSchedule(dto: UpdateDayScheduleDto) {
    const updateObj = await this.getUpdateScheduleObj(dto)

    await this.dayScheduleRepo.update(
      {
        id: dto.scheduleId,
      },
      updateObj,
    )

    return { message: 'Ok' }
  }

  public async softDeleteSchedule(dto: SoftDeleteScheduleDto) {
    if (dto.typeSchedule === ScheduleTypes.WEEK) {
      const isNotEmptySchedule = await this.weekScheduleRepo.findOne({
        where: {
          id: dto.scheduleId,
          school: { id: dto.schoolId },
        },
      })

      if (!isNotEmptySchedule) {
        throw new GrpcNotFoundException('Расписание не найдено')
      }

      await this.weekScheduleRepo.softDelete({
        id: isNotEmptySchedule.id,
      })
    }

    if (dto.typeSchedule === ScheduleTypes.DAY) {
      const isNotEmptySchedule = await this.dayScheduleRepo.findOne({
        where: {
          id: dto.scheduleId,
        },
      })

      if (!isNotEmptySchedule) {
        throw new GrpcNotFoundException('Расписание не найдено')
      }

      await this.dayScheduleRepo.softDelete({
        id: isNotEmptySchedule.id,
      })
    }

    return { message: 'Ok' }
  }

  public async hardDeleteSchedule(dto: HardDeleteScheduleDto) {
    if (dto.typeSchedule === ScheduleTypes.WEEK) {
      const isNotEmptySchedule = await this.weekScheduleRepo.findOne({
        where: {
          id: dto.scheduleId,
          school: { id: dto.schoolId },
        },
      })

      if (!isNotEmptySchedule) {
        throw new GrpcNotFoundException('Расписание не найдено')
      }

      await this.weekScheduleRepo.delete({
        id: isNotEmptySchedule.id,
      })
    }

    if (dto.typeSchedule === ScheduleTypes.DAY) {
      const isNotEmptySchedule = await this.dayScheduleRepo.findOne({
        where: {
          id: dto.scheduleId,
        },
      })

      if (!isNotEmptySchedule) {
        throw new GrpcNotFoundException('Расписание не найдено')
      }

      await this.dayScheduleRepo.delete({
        id: isNotEmptySchedule.id,
      })
    }

    return { message: 'Ok' }
  }

  public async recoverSchedule(dto: RecoverScheduleDto) {
    if (dto.typeSchedule === ScheduleTypes.WEEK) {
      const isNotEmptySchedule = await this.weekScheduleRepo.findOne({
        where: {
          id: dto.scheduleId,
          school: { id: dto.schoolId },
        },
        withDeleted: true,
      })

      if (!isNotEmptySchedule || isNotEmptySchedule.deletedAt === null) {
        throw new GrpcNotFoundException('Расписание не найдено')
      }

      await this.weekScheduleRepo.update(
        {
          id: isNotEmptySchedule.id,
        },
        { deletedAt: null },
      )
    }

    if (dto.typeSchedule === ScheduleTypes.DAY) {
      const isNotEmptySchedule = await this.dayScheduleRepo.findOne({
        where: {
          id: dto.scheduleId,
        },
        withDeleted: true,
      })

      if (!isNotEmptySchedule || isNotEmptySchedule.deletedAt === null) {
        throw new GrpcNotFoundException('Расписание не найдено')
      }

      await this.dayScheduleRepo.update(
        {
          id: isNotEmptySchedule.id,
        },
        { deletedAt: null },
      )
    }

    return { message: 'Ok' }
  }

  private getWeekScheduleWhereTimeFilter(dto: GetWeekScheduleDto) {
    const skip = dto.page ? (+dto.page - 1) * 1 : 0
    const whereTimeObj: Record<string, unknown> = {}

    if (isNaN(+dto.classId) || isNaN(+dto.schoolId)) {
      throw new GrpcNotFoundException('Невалидные id')
    }

    if (!dto.page) {
      const firstDay = this.utils.getFirstDayOfCurrentWeek()
      const lastDay = this.utils.getLastDayOfCurrentWeek()

      lastDay.setHours(27, 0, 0, 0)
      firstDay.setHours(-21, 0, 0, 0)

      const lastDayInTheWeek = lastDay.toISOString()
      const firstDayInTheWeek = firstDay.toISOString()

      whereTimeObj.timelineStart = Raw(alias => `${alias} > :startDay`, {
        startDay: firstDayInTheWeek,
      })
      whereTimeObj.timelineEnd = Raw(alias => `${alias} < :lastDay`, { lastDay: lastDayInTheWeek })
    }

    return {
      whereTimeObj,
      skip,
    }
  }

  private async getUpdateScheduleObj(dto: UpdateDayScheduleDto) {
    const isNotEmptySchedule = await this.dayScheduleRepo.findOne({
      where: {
        id: dto.scheduleId,
      },
      relations: {
        lessons: true,
        activeTeachers: true,
      },
    })
    const updateObj: Record<string, unknown> = {}

    if (!isNotEmptySchedule) {
      throw new GrpcNotFoundException(`Расписание с id: ${dto.scheduleId} не найдено`)
    }

    if (dto.date) {
      updateObj.date = new Date(dto.date).toISOString()
    }

    if (dto.dayName) {
      updateObj.dayName = dto.dayName
    }

    try {
      await this.dayScheduleRepo.manager.transaction(async entityManager => {
        if (dto.addLessonsId && dto.addLessonsId.length > 0) {
          const lessons = await entityManager.find(LessonEntity, {
            where: {
              id: In(dto.addLessonsId),
            },
          })

          updateObj.lessons = [...isNotEmptySchedule.lessons, ...lessons]
        }

        if (dto.removeLessonsId && dto.removeLessonsId.length > 0) {
          if (updateObj.lessons && (updateObj.lessons as Array<LessonEntity>).length > 0) {
            updateObj.lessons = (updateObj.lessons as Array<LessonEntity>).filter(({ id }) => {
              !dto.removeLessonsId.includes(id)
            })
          } else {
            updateObj.lessons = isNotEmptySchedule.lessons.filter(({ id }) => {
              !dto.removeLessonsId.includes(id)
            })
          }
        }

        if (dto.addTeachersId && dto.addTeachersId.length > 0) {
          const teachers = await entityManager.find(TeacherEntity, {
            where: {
              id: In(dto.addTeachersId),
            },
          })

          updateObj.activeTeachers = [...isNotEmptySchedule.activeTeachers, ...teachers]
        }

        if (dto.removeTeachersId && dto.removeTeachersId.length > 0) {
          if (
            updateObj.activeTeachers &&
            (updateObj.activeTeachers as Array<TeacherEntity>).length > 0
          ) {
            updateObj.activeTeachers = (updateObj.activeTeachers as Array<TeacherEntity>).filter(
              ({ id }) => {
                return !dto.removeLessonsId.includes(id)
              },
            )
          } else {
            updateObj.activeTeachers = isNotEmptySchedule.activeTeachers.filter(({ id }) => {
              return !dto.removeTeachersId.includes(id)
            })
          }
        }
      })
    } catch (err) {
      throw err
    }

    return updateObj
  }
}
