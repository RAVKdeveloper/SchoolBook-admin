import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException, GrpcPermissionDeniedException } from 'nestjs-grpc-exceptions'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

import {
  AcceptInviteModeratorDto,
  ClassEntity,
  CreateStudentInviteDto,
  CreateTeacherInviteDto,
  GetAccessStudentInviteDto,
  GetAccessTeacherInviteDto,
  GetAllInvitesQueryDto,
  InviteStudentEntity,
  InviteTeacherEntity,
  ModeratorEntity,
  School,
  StudentEntity,
  TeacherEntity,
} from '@app/common'

@Injectable()
export class InvitesService {
  constructor(
    @InjectRepository(ModeratorEntity) private moderatorRepo: Repository<ModeratorEntity>,
    @InjectRepository(InviteTeacherEntity)
    private inviteTeacherRepo: Repository<InviteTeacherEntity>,
    @InjectRepository(InviteStudentEntity)
    private inviteStudentRepo: Repository<InviteStudentEntity>,
    @InjectRepository(TeacherEntity) private teacherRepo: Repository<TeacherEntity>,
    @InjectRepository(ClassEntity) private classRepo: Repository<ClassEntity>,
    @InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>,
  ) {}

  public async acceptModeratorInvite(dto: AcceptInviteModeratorDto) {
    const moderator = await this.checkCredentialsModerator(dto.moderatorId)

    await this.moderatorRepo.update(
      {
        id: moderator.id,
      },
      { isActivated: dto.isAccept },
    )

    return { message: `Модератор с id: ${dto.moderatorId} принят в вашу организацию` }
  }

  public async getAllInvites(dto: GetAllInvitesQueryDto) {
    const take = Number(dto.limit ?? 10)
    const skip = dto.page ? take * Number(dto.page - 1) : 0

    const data = await this.moderatorRepo.manager.transaction(async manager => {
      const school = await manager.findOne(School, {
        where: {
          owner: { id: dto.userId },
        },
      })

      if (!school) throw new GrpcNotFoundException('Такой школы не существует')

      const moderators = await manager.find(ModeratorEntity, {
        where: {
          school: { id: school.id },
          isActivated: false,
        },
        order: {
          id: 'DESC',
        },
        relations: {
          userId: true,
        },
        take,
        skip,
      })
      const count = await manager.count(ModeratorEntity, {
        where: {
          school: { id: school.id },
          isActivated: false,
        },
      })

      return { accounts: moderators, count }
    })

    return data
  }

  public async createTeacherInvite(dto: CreateTeacherInviteDto) {
    const key = uuid()

    const createObj = this.checkOptionalValuesCreateTeacherInvite(dto)

    const teacherInvite = await this.inviteTeacherRepo.save({
      creator: { id: dto.userId },
      keyInvite: key,
      schoolId: dto.schoolId,
      ...createObj,
    })

    return { message: teacherInvite.keyInvite }
  }

  public async createStudentInvite(dto: CreateStudentInviteDto) {
    const key = `${dto.schoolId}-${uuid()}`

    const createObj = this.checkOptionalValuesCreateStudentInvite(dto)

    const studentInvite = await this.inviteStudentRepo.save({
      creator: { id: dto.userId },
      schoolId: dto.schoolId,
      classId: dto.classId,
      keyInvite: key,
      ...createObj,
    })

    return { message: studentInvite.keyInvite }
  }

  public async accessTeacherInvite(dto: GetAccessTeacherInviteDto) {
    const createObj: Record<string, unknown> = {}

    const invite = await this.inviteTeacherRepo.findOne({
      where: {
        keyInvite: dto.key,
      },
    })

    if (!invite) throw new GrpcNotFoundException('Приглашение не найдено')

    if (invite.maxCount === invite.count) {
      await this.inviteTeacherRepo.delete({ id: invite.id })

      throw new GrpcPermissionDeniedException('Доступ запрещен')
    }

    if (invite.lessonId) createObj.lesson = { id: invite.lessonId }

    if (invite.chiefClassId) {
      const schoolClass = await this.classRepo.findOne({
        where: { id: invite.chiefClassId },
        relations: { chiefs: true },
      })
      const teacher = await this.teacherRepo.findOne({
        where: { userId: { id: dto.userId } },
      })

      if (!schoolClass) throw new GrpcNotFoundException('Такого класса не существует')

      createObj.class = [...schoolClass.chiefs, teacher]
    }

    await this.teacherRepo.update(
      {
        id: dto.userId,
      },
      {
        isAdmit: true,
        school: { id: invite.schoolId },
        ...createObj,
      },
    )

    await this.inviteTeacherRepo.update(
      { id: invite.id },
      {
        maxCount: invite.count + 1,
      },
    )

    return { message: 'Ok' }
  }

  public async accessStudentInvite(dto: GetAccessStudentInviteDto) {
    const invite = await this.inviteStudentRepo.findOne({
      where: {
        keyInvite: dto.key,
      },
    })

    if (invite.maxCount === invite.count) {
      await this.inviteStudentRepo.delete({ id: invite.id })

      throw new GrpcPermissionDeniedException('Доступ запрещен')
    }

    const updateClassStudents = await this.returnClassToAddStudent(invite.classId, dto.userId)

    await this.studentRepo.update(
      { id: dto.userId },
      {
        isAdmit: true,
        school: { id: invite.schoolId },
        class: updateClassStudents,
      },
    )

    await this.inviteStudentRepo.update(
      { id: invite.id },
      {
        count: invite.count + 1,
      },
    )

    return { message: 'Ok' }
  }

  private async returnClassToAddStudent(classId: number, accountId: number) {
    const schoolClass = await this.classRepo.findOne({
      where: { id: classId },
      relations: { students: true },
    })
    const student = await this.studentRepo.findOne({
      where: { id: accountId },
    })

    if (!student) throw new GrpcNotFoundException('Аккаунт не найден')

    if (!schoolClass) throw new GrpcNotFoundException('Класс не найден')

    const updateStudentsClass = [...schoolClass.students, student]

    return updateStudentsClass
  }

  private checkOptionalValuesCreateTeacherInvite(dto: CreateTeacherInviteDto) {
    const whereObj: Record<string, string | number> = {}

    if (dto.chiefClassId) {
      whereObj.chiefClassId = dto.chiefClassId
    }

    if (dto.lessonId) {
      whereObj.lessonId = dto.lessonId
    }

    if (dto.maxCount) {
      whereObj.maxCount = dto.maxCount
    }

    return whereObj
  }

  private checkOptionalValuesCreateStudentInvite(dto: CreateStudentInviteDto) {
    const createObj: Record<string, string | number> = {}

    if (dto.maxCount) {
      createObj.maxCount = dto.maxCount
    }

    return createObj
  }

  private async checkCredentialsModerator(id: number) {
    const moderator = await this.moderatorRepo.findOne({
      where: { id },
    })

    if (!moderator) throw new GrpcNotFoundException('Модератор не найден')

    return moderator
  }
}
