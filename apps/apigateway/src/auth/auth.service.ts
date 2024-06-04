import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import type { Response } from 'express';

import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common';

import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  registration(dto: CreateAuthDto) {
    return this.authService.registration(dto);
  }

  async login(dto: LoginAuthDto) {
    const user = await this.authService.loginUser(dto).toPromise();

    return user;
  }

  me(userId: number) {
    return this.authService.me({ userId });
  }

  async verifyUser(dto: VerifyUserDto, res: Response) {
    const { token } = await this.authService.verify(dto).toPromise();

    res.cookie('access_token_auth', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({ message: 'Ok' });
  }

  async logOut(res: Response) {
    res.clearCookie('access_token_auth', { httpOnly: true });

    res.send({ message: 'Ok' });
  }
}
