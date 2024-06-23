import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GrpcNotFoundException, GrpcPermissionDeniedException } from 'nestjs-grpc-exceptions'
import { Repository } from 'typeorm'

import {
  CreateRoleDto,
  DeleteRoleDto,
  GetAllRolesDto,
  ModeratorEntity,
  OwnerEntity,
  RefreshRoleTokenDto,
  RolesUser,
  TokensGenService,
} from '@app/common'
import { TokenGenRoleDto } from '@app/common/service/tokens/dto/token-gen-role.dto'

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(OwnerEntity) private ownerRepo: Repository<OwnerEntity>,
    @InjectRepository(ModeratorEntity) private moderatorRepo: Repository<ModeratorEntity>,
    private tokensService: TokensGenService,
  ) {}

  public async createOwner(dto: CreateRoleDto) {
    const newOwner = await this.ownerRepo.save({
      userId: { id: dto.userId },
      role: RolesUser.OWNER,
    })

    const payload: TokenGenRoleDto = {
      userId: dto.userId,
      role: RolesUser.OWNER,
      ownerId: newOwner.id,
    }

    const token = await this.getToken(payload)

    return { message: 'Ok', token }
  }

  public async createModerator(dto: CreateRoleDto) {
    const newModerator = await this.moderatorRepo.save({
      userId: { id: dto.userId },
      role: RolesUser.MODERATOR,
      isActivated: false,
    })

    const payload: TokenGenRoleDto = {
      userId: dto.userId,
      role: RolesUser.MODERATOR,
      moderatorId: newModerator.id,
    }

    const token = await this.getToken(payload)

    return { message: 'Ok', token }
  }

  public async getAllAccounts(dto: GetAllRolesDto) {
    const allModerators = await this.moderatorRepo.find({
      relations: {
        userId: true,
        school: true,
      },
      where: { userId: { id: dto.userId }, isActivated: true },
      order: { id: 'DESC' },
    })
    const allOwners = await this.ownerRepo.find({
      relations: {
        userId: true,
        school: true,
      },
      where: { userId: { id: dto.userId } },
      order: { id: 'DESC' },
    })

    return { accounts: [...allOwners, ...allModerators] }
  }

  public async deleteModerator(dto: DeleteRoleDto) {
    const moderator = await this.moderatorRepo.findOne({
      relations: { school: true },
      where: {
        id: dto.deleteId,
      },
    })
    const owner = await this.ownerRepo.findOne({
      relations: {
        school: true,
      },
      where: { userId: { id: dto.userId } },
    })

    if (owner.school == null || moderator.school == null) {
      throw new GrpcPermissionDeniedException('У сущностей нет школы')
    }

    if (!moderator) throw new GrpcNotFoundException('Модератор не найден')
    if (!owner) throw new GrpcNotFoundException('Директор не найден')

    if (owner.school.id !== moderator.school.id) {
      throw new GrpcPermissionDeniedException('Доступ запрещен')
    }

    await this.moderatorRepo.delete(moderator)

    return { message: 'Ok', token: '' }
  }

  public async refreshRoleToken(dto: RefreshRoleTokenDto) {
    const roleIdsObj: Record<string, number | string> = {
      role: '',
    }

    const checkOwner = await this.ownerRepo.findOne({
      where: {
        userId: { id: dto.userId },
        school: { id: dto.schoolId },
      },
    })

    if (checkOwner) {
      roleIdsObj.ownerId = checkOwner.id
      roleIdsObj.role = RolesUser.OWNER
    }

    const checkModerator = await this.moderatorRepo.findOne({
      where: {
        userId: { id: dto.userId },
        role: dto.role,
        school: { id: dto.schoolId },
      },
    })

    if (checkModerator) {
      roleIdsObj.moderatorId = checkModerator.id
      roleIdsObj.role = RolesUser.MODERATOR
    }

    if (!checkOwner && !checkModerator) throw new GrpcNotFoundException('Роли не найдены')

    const payload = {
      userId: dto.userId,
      role: roleIdsObj.role as string,
      schoolId: dto.schoolId,
      ...roleIdsObj,
    }

    const token = await this.getToken(payload)

    return { message: 'Ok', token }
  }

  private async getToken(dto: TokenGenRoleDto) {
    const roleToken = await this.tokensService.generateRoleTokens(dto)

    return roleToken
  }
}
