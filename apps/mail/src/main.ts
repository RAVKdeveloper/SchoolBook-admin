import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { Packages } from '@app/common';

import { MailModule } from './mail.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailModule,
    {
      transport: Transport.GRPC,
      options: {
        package: Packages.MAIL,
        protoPath: join(__dirname, '../mail.proto'),
        url: process.env.MAIL_URL,
      },
    },
  );
  await app.listen();
}
bootstrap();
