import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException, GrpcPermissionDeniedException } from 'nestjs-grpc-exceptions'
import { Repository } from 'typeorm'

import { CreateSchoolDto, GetOneSchoolDto, OwnerEntity, School, UpdateSchoolDto } from '@app/common'

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) private schoolRepo: Repository<School>,
    @InjectRepository(OwnerEntity) private ownerRepo: Repository<OwnerEntity>,
  ) {}

  public async createSchool(dto: CreateSchoolDto) {
    const owner = await this.checkOwner(dto.userId)

    const isEmpty = await this.schoolRepo.findOne({ where: { licenseNumber: dto.licenseNumber } })

    if (isEmpty) throw new GrpcPermissionDeniedException('Такая школа уже существует')

    const newSchool = await this.schoolRepo.save({ ...dto, owner: owner })

    return { message: 'Ok', schoolId: newSchool.id }
  }

  public async getSchoolById(dto: GetOneSchoolDto) {
    const whereObj = await this.getWhereOptions(dto)

    const school = await this.schoolRepo.findOne({
      relations: {
        owner: {
          userId: true,
        },
        classes: true,
        lessons: {
          classes: true,
        },
        teachers: {
          userId: true,
        },
        moderators: {
          userId: true,
        },
      },
      where: {
        id: dto.schoolId,
        ...whereObj,
      },
      cache: true,
    })

    if (!school) throw new GrpcNotFoundException('Школа не найдена')

    return { message: 'Ok', school }
  }

  public async updateSchoolMetadata(dto: UpdateSchoolDto) {
    const school = await this.schoolRepo.findOne({
      where: {
        owner: { id: dto.ownerId },
      },
    })

    if (!school) throw new GrpcNotFoundException('Школа не найдена')

    const updateObj = this.getUpdateSchoolObj(dto)

    await this.schoolRepo.update(
      { id: school.id },
      {
        ...updateObj,
      },
    )

    return { message: 'Ok', school }
  }

  private async getWhereOptions(dto: GetOneSchoolDto) {
    const whereObj: Record<string, unknown> = {}

    if (dto.moderatorId) {
      whereObj.moderators = { id: dto.moderatorId }
    }

    if (dto.ownerId) {
      whereObj.owner = { id: dto.ownerId }
    }

    if (dto.teacherId) {
      whereObj.teachers = { id: dto.teacherId }
    }

    return whereObj
  }

  private getUpdateSchoolObj(dto: UpdateSchoolDto) {
    const updateObj: Record<string, unknown> = {}

    if (dto.description) {
      updateObj.description = dto.description
    }

    if (dto.licenseNumber) {
      updateObj.licenseNumber = dto.licenseNumber
    }

    if (dto.location) {
      updateObj.location = dto.location
    }

    if (dto.name) {
      updateObj.name = dto.name
    }

    return updateObj
  }

  private async checkOwner(userId: number) {
    const owner = await this.ownerRepo.findOne({ where: { userId: { id: userId }, school: null } })

    if (!owner) throw new GrpcNotFoundException('Пользователь не найден')

    return owner
  }
}
