import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions'
import { And, In, Raw, Repository } from 'typeorm'

import {
  ClassEntity,
  CreateSchoolEventDto,
  DeleteSchoolEventDto,
  GetAllSchoolEventsDto,
  GetSchoolEventByIdDto,
  SchoolEventEntity,
  StudentEntity,
  TeacherEntity,
  UpdateSchoolEventDto,
} from '@app/common'

@Injectable()
export class SchoolEventsService {
  constructor(
    @InjectRepository(SchoolEventEntity) private schoolEventRepo: Repository<SchoolEventEntity>,
  ) {}

  public async create(dto: CreateSchoolEventDto) {
    const createObj: Record<string, unknown> = {}

    const event = await this.schoolEventRepo.manager.transaction(async entityManager => {
      if (dto.activeClasses && dto.activeClasses.length > 0) {
        const classes = await entityManager.find(ClassEntity, {
          where: {
            id: In(dto.activeClasses.map(item => item.classId)),
          },
        })

        createObj.activeClasses = classes
      }

      if (dto.activeStudents && dto.activeStudents.length > 0) {
        const students = await entityManager.find(StudentEntity, {
          where: {
            id: In(dto.activeStudents.map(item => item.studentId)),
          },
        })

        createObj.activeStudents = students
      }

      if (dto.activeTeachers && dto.activeTeachers.length > 0) {
        const teachers = await entityManager.find(TeacherEntity, {
          where: {
            id: In(dto.activeTeachers.map(item => item.teacherId)),
          },
        })

        createObj.activeTeachers = teachers
      }

      const newEvent = await entityManager.save(SchoolEventEntity, {
        creator: { id: dto.creatorId },
        school: { id: dto.schoolId },
        tags: dto.tags,
        title: dto.title,
        description: dto.description,
        isPrivate: dto.isPrivate,
        plannedDate: new Date(dto.plannedDate).toISOString(),
        ...createObj,
      })

      return newEvent
    })

    return { message: 'Ok', event }
  }

  public async getAllSchoolEvents(dto: GetAllSchoolEventsDto) {
    const take = Number(dto.limit) ?? 10
    const skip = dto.page ? take * Number(dto.page - 1) : 0

    const whereObj = this.getFiltersValueEvents(dto)

    const events = await this.schoolEventRepo.find({
      relations: {
        school: true,
        creator: true,
        activeClasses: true,
        activeStudents: true,
        activeTeachers: true,
      },
      where: {
        school: { id: dto.schoolId },
        ...whereObj,
      },
      take,
      skip,
      cache: true,
      order: {
        views: dto.isPopular ? 'DESC' : 'ASC',
      },
    })

    const count = await this.schoolEventRepo.countBy({ school: { id: dto.schoolId }, ...whereObj })

    return { count, data: events }
  }

  public async getSchoolEventById(dto: GetSchoolEventByIdDto) {
    const event = await this.schoolEventRepo.findOne({
      relations: {
        creator: true,
        activeClasses: true,
        activeStudents: {
          userId: true,
        },
        activeTeachers: {
          userId: true,
        },
      },
      where: {
        id: dto.schoolEventId,
      },
    })

    if (!event) throw new GrpcNotFoundException('Событие не найдено')

    await this.schoolEventRepo.update(
      { id: event.id },
      {
        views: event.views + 1,
      },
    )

    return { message: 'Ok', event }
  }

  public async updateSchoolEventsById(dto: UpdateSchoolEventDto) {
    const event = await this.schoolEventRepo.findOne({
      relations: {
        activeClasses: true,
        activeStudents: true,
        activeTeachers: true,
      },
      where: { creator: { id: dto.creatorId }, id: dto.eventId },
    })

    if (!event) throw new GrpcNotFoundException('Событие не найдено')

    const updateObj = await this.getUpdateEventObj(dto)

    await this.schoolEventRepo.update(
      { id: event.id },
      {
        activeClasses: [...event.activeClasses, updateObj.activeClasses],
        activeStudents: [...event.activeStudents, updateObj.activeStudents],
        activeTeachers: [...event.activeTeachers, updateObj.activeTeachers],
        ...updateObj,
      },
    )

    return { message: 'Updated', event }
  }

  public async deleteSchoolEvent(dto: DeleteSchoolEventDto) {
    const deletedEvent = await this.schoolEventRepo.delete({
      creator: { id: dto.creatorId },
      id: dto.id,
    })

    return { message: 'Delete', event: deletedEvent }
  }

  private getFiltersValueEvents(dto: GetAllSchoolEventsDto) {
    const whereObj: Record<string, unknown> = {}

    if (dto.onlyMy) {
      whereObj.creator = { id: dto.onlyMy }
    }

    if (dto.classes && dto.classes.length > 0) {
      whereObj.activeClasses = { id: In(dto.classes.map(item => item.classId)) }
    }

    if (dto.startDate && dto.endDate) {
      const startDate = new Date(dto.startDate).toISOString()
      const endDate = new Date(dto.endDate).toISOString()

      whereObj.plannedDate = And(
        Raw(alias => `${alias} > :startDate`, { startDate }),
        Raw(alias => `${alias} <= :endDate`, { endDate }),
      )
    }

    if (dto.tags) {
      whereObj.tags = In(dto.tags.map(item => [item.tag]))
    }

    return whereObj
  }

  private async getUpdateEventObj(dto: UpdateSchoolEventDto) {
    const updateObj: Record<string, unknown> = {
      activeClasses: [],
      activeStudents: [],
      activeTeachers: [],
    }

    if (dto.title) updateObj.title = dto.title

    if (dto.description) updateObj.description = dto.description

    if (dto.image) updateObj.image = dto.image

    if (dto.isPrivate) updateObj.isPrivate = dto.isPrivate

    if (dto.tags) updateObj.tags = dto.tags

    await this.schoolEventRepo.manager.transaction(async entityManager => {
      if (dto.activeClasses && dto.activeClasses.length > 0) {
        const classes = await entityManager.find(ClassEntity, {
          where: {
            id: In(dto.activeClasses.map(item => item.classId)),
          },
        })

        updateObj.activeClasses = classes
      }

      if (dto.activeStudents && dto.activeStudents.length > 0) {
        const students = await entityManager.find(StudentEntity, {
          where: {
            id: In(dto.activeStudents.map(item => item.studentId)),
          },
        })

        updateObj.activeStudents = students
      }

      if (dto.activeTeachers && dto.activeTeachers.length > 0) {
        const teachers = await entityManager.find(TeacherEntity, {
          where: {
            id: In(dto.activeTeachers.map(item => item.teacherId)),
          },
        })

        updateObj.activeTeachers = teachers
      }
    })

    return updateObj
  }
}
