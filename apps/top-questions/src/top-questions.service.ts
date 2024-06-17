import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException, GrpcPermissionDeniedException } from 'nestjs-grpc-exceptions'
import { MoreThan, Repository } from 'typeorm'

import {
  CreateQuestionsDto,
  GetPopularQuestionsDto,
  GetQuestionByIdDto,
  QuestionsEntity,
  RolesUser,
} from '@app/common'

@Injectable()
export class TopQuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity) private questionRepo: Repository<QuestionsEntity>,
  ) {}

  public async getPopularQuestions(dto: GetPopularQuestionsDto) {
    const roleObj = this.getWhereObjQuestions(dto)

    const questions = await this.questionRepo.find({
      relations: {
        creator: true,
        likes: true,
        questionComments: true,
      },
      where: {
        school: { id: dto.schoolId },
        likesCount: MoreThan(20),
        ...roleObj,
      },
      order: {
        likesCount: 'DESC',
        id: 'DESC',
      },
      take: 5,
    })

    const count = await this.questionRepo.countBy({
      school: { id: dto.schoolId },
      likesCount: MoreThan(20),
      ...roleObj,
    })

    return { count, data: questions }
  }

  public async createQuestion(dto: CreateQuestionsDto) {
    const question = await this.questionRepo.save({
      title: dto.title,
      school: { id: dto.schoolId },
      creator: { id: dto.creatorId },
      comment: dto.comment,
      role: dto.role,
      likesCount: 0,
    })

    return { message: 'Ok', question }
  }

  public async getQuestionById(dto: GetQuestionByIdDto) {
    const question = await this.questionRepo.findOne({
      relations: {
        likes: true,
        creator: true,
        questionComments: true,
      },
      where: { id: dto.id },
    })

    if (!question) throw new GrpcNotFoundException('Вопрос не найден')

    return { message: 'Ok', question }
  }

  private getWhereObjQuestions(dto: GetPopularQuestionsDto) {
    const rolesArray = [
      RolesUser.MODERATOR,
      RolesUser.OWNER,
      RolesUser.PARENT,
      RolesUser.STUDENT,
      RolesUser.TEACHER,
    ] as string[]

    const whereObj: Record<string, string> = {}

    if (dto.userRole === RolesUser.STUDENT || dto.userRole === RolesUser.PARENT) {
      throw new GrpcPermissionDeniedException('Доступ запрещен')
    }

    if (dto.role && dto.role === RolesUser.TEACHER) {
      whereObj.role = RolesUser.TEACHER
    }

    if (dto.role && dto.role === RolesUser.MODERATOR) {
      whereObj.role = RolesUser.MODERATOR
    }

    if (!rolesArray.includes(dto.userRole)) {
      throw new GrpcPermissionDeniedException('Доступ запрещен')
    }

    if (!rolesArray.includes(dto.role)) {
      throw new GrpcPermissionDeniedException('Неверная роль')
    }

    return whereObj
  }
}
