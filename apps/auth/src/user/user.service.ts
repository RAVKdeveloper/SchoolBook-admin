import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { GrpcNotFoundException, GrpcPermissionDeniedException } from 'nestjs-grpc-exceptions'
import { Repository } from 'typeorm'

import {
  AuthCodeEntity,
  CreateUserDto,
  ForgotPasswordDto,
  LoginUserDto,
  MAIL_SERVICE_NAME,
  MailServiceClient,
  TokensGenService,
  UpdatePassDto,
  UserEntity,
  VerifyDto,
} from '@app/common'

@Injectable()
export class UserService implements OnModuleInit {
  private mailService: MailServiceClient

  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(AuthCodeEntity)
    private verifyCodeRepo: Repository<AuthCodeEntity>,
    private readonly tokenService: TokensGenService,
    @Inject(MAIL_SERVICE_NAME)
    private mailClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.mailService = this.mailClient.getService<MailServiceClient>(MAIL_SERVICE_NAME)
  }

  async register(dto: CreateUserDto) {
    const isEmptyUser = await this.userRepo.findOne({
      where: { email: dto.email },
    })

    if (isEmptyUser) throw new GrpcPermissionDeniedException('Такой пользователь уже существует')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userRepo.save({
      ...dto,
      password: hashPassword,
      isActivated: true,
    })

    const code = await this.createAuthCode({ ...user, password })

    this.mailService
      .sendOtpCode({
        to: user.email,
        code: code.toString(),
      })
      .toPromise()

    return user
  }

  async login(dto: LoginUserDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } })

    if (!user) throw new GrpcNotFoundException('Неверный логин или пароль')

    const isValidPass = await bcrypt.compare(dto.password, user.password)

    if (!isValidPass) throw new GrpcPermissionDeniedException('Неверный логин или пароль')

    const code = await this.createAuthCode(user)

    this.mailService
      .sendOtpCode({
        code: code.toString(),
        to: user.email,
      })
      .toPromise()

    return user
  }

  private async createAuthCode(user: UserEntity): Promise<number> {
    const code = Math.ceil(Math.random() * 10000)
    const createCode = await this.verifyCodeRepo.save({ code, userId: user })
    return createCode.code
  }

  async me(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userRepo.findOne({
      where: { id },
    })

    if (!user) throw new GrpcNotFoundException('Пользователь с таким id небыл найден')

    if (user.isActivated === false)
      throw new GrpcPermissionDeniedException('Аккаунт не активирован')

    return user
  }

  async forgotPass(dto: ForgotPasswordDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } })

    if (!user) throw new GrpcNotFoundException('Такого пользователя не существует')

    const code = await this.createAuthCode(user)

    this.mailService
      .sendOtpCode({
        code: code.toString(),
        to: user.email,
      })
      .toPromise()

    return user
  }

  async passwordUpdate(dto: UpdatePassDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.id } })

    if (!user) throw new GrpcNotFoundException('Такого пользователя не существует')

    await this.verifyAccount({ userId: dto.id, code: dto.code })

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    await this.userRepo.update({ id: dto.id }, { password: hashPassword })

    // await this.mailService.updatePassword(user.email);

    return { message: 'Пароль изменён' }
  }

  async verifyAccount(dto: VerifyDto) {
    const { userId, code } = dto

    const codeVer = await this.verifyCodeRepo.findOne({
      where: { code, userId: { id: userId } },
      relations: { userId: true },
    })

    if (!codeVer) throw new GrpcPermissionDeniedException('Неверный код доступа')

    await this.verifyCodeRepo.delete({ userId: { id: userId } })

    this.mailService.sendLoginMail({ to: codeVer.userId.email }).toPromise()

    const access_token = await this.tokenService.generateTokens({
      userId: codeVer.userId.id,
      userName: codeVer.userId.name,
    })

    return { message: 'Аккаунт подтверждён', token: access_token }
  }
}
