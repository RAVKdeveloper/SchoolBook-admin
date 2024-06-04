import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { GrpcInternalException } from 'nestjs-grpc-exceptions';

import {
  CreateLoginMail,
  CreateOneAuthCode,
  MailSuccessfulCreateClassDto,
} from '@app/common';

@Injectable()
export class MailService implements OnModuleInit {
  constructor(private service: MailerService) {}

  onModuleInit() {}

  async sendAuthOneCod(dto: CreateOneAuthCode) {
    try {
      await this.service.sendMail({
        from: process.env.FROM_ADDRES,
        to: dto.to,
        subject: 'Код Подтверждения',
        text: 'Потвердите вход в SchoolBook',
        html: `<h1>${dto.code}</h1>`,
      });

      return { message: 'Message send' };
    } catch {
      throw new GrpcInternalException('Произошла Ошибка при отправке письма');
    }
  }

  async loginMail(dto: CreateLoginMail) {
    try {
      await this.service.sendMail({
        from: process.env.FROM_ADDRES,
        to: dto.to,
        subject: 'Вход в аккаунт',
        text: 'Вы вошли в аккаунт SchoolBook',
        html: `<div>
                 Аккаунт: ${dto.to}
               </div>
               <div>
                 Время: ${new Date().toLocaleDateString('ru-RU', {
                   year: 'numeric',
                   month: 'long',
                   day: 'numeric',
                   hour: 'numeric',
                   minute: 'numeric',
                 })}
               </div>
              `,
      });

      return { message: 'Message send' };
    } catch {
      throw new GrpcInternalException('Произошла Ошибка при отправке письма');
    }
  }

  async successfulCreateClass(dto: MailSuccessfulCreateClassDto) {
    try {
      await this.service.sendMail({
        from: process.env.FROM_ADDRES,
        to: dto.to,
        subject: 'Вы создали класс',
        text: 'Создание класса',
        html: `<div>
                     ID школы: ${dto.school}
                   </div>
                   <ul>
                   <li>
                   Класс: ${dto.class}
                   </li>
                   <li>
                   Создателя: ${dto.createrUsername}
                   </li>
                   </ul>
                   <div>
                     Время: ${new Date().toLocaleDateString('ru-RU', {
                       year: 'numeric',
                       month: 'long',
                       day: 'numeric',
                       hour: 'numeric',
                       minute: 'numeric',
                     })}
                   </div>
                `,
      });

      return { message: 'Message send' };
    } catch {
      throw new GrpcInternalException('Прозошла неизвестная ошибка');
    }
  }
}
