import { Cache } from '@nestjs/cache-manager'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import type { Response } from 'express'

import { ADMINS_SERVICE_NAME, AdminsServiceClient, CookiesNames, RolesUser } from '@app/common'

import { RefreshRoleTokenDto } from './dto/refresh-role-token.dto'

@Injectable()
export class AdminsService implements OnModuleInit {
  private adminsService: AdminsServiceClient
  private mainCacheKey = '/api/my-accounts'

  constructor(
    @Inject(ADMINS_SERVICE_NAME) private client: ClientGrpc,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.adminsService = this.client.getService<AdminsServiceClient>(ADMINS_SERVICE_NAME)
  }

  async createOwner(userId: number, res: Response) {
    const { token, message } = await this.adminsService
      .createOwner({ userId, role: RolesUser.OWNER })
      .toPromise()

    res.cookie(CookiesNames.ROLE, token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    res.status(201).send({ message })
  }

  async createModerator(userId: number, res: Response) {
    const { token, message } = await this.adminsService
      .createModerator({ userId, role: RolesUser.MODERATOR })
      .toPromise()

    res.cookie(CookiesNames.ROLE, token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    res.status(201).send({ message })
  }

  async findAllAccounts(userId: number) {
    const key = `${this.mainCacheKey}/${userId}`
    const cacheValue = await this.cacheManager.get(key)

    if (cacheValue) return cacheValue

    const myAccounts = await this.adminsService.getAllAccountsByuserId({ userId }).toPromise()

    await this.cacheManager.set(key, myAccounts)

    return myAccounts
  }

  async deleteAdmin(deleteId: number, userId: number) {
    return this.adminsService.deleteModerator({ userId: userId, deleteId })
  }

  async refreshRoleToken(userId: number, dto: RefreshRoleTokenDto, res: Response) {
    const { token, message } = await this.adminsService
      .refreshRoleToken({ userId, ...dto })
      .toPromise()

    res.cookie(CookiesNames.ROLE, token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    res.status(201).send({ message })
  }
}
