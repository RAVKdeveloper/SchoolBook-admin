import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.LOGIN,
          pass: process.env.EMAIL_PASS,
        },
        secure: true,
        port: Number(process.env.EMAIL_PORT),
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
