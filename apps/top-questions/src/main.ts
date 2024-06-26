import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { Packages } from '@app/common'

import { TopQuestionsModule } from './top-questions.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TopQuestionsModule, {
    transport: Transport.GRPC,
    options: {
      package: Packages.TOP_QUESTIONS,
      protoPath: join(__dirname, '../topQuestions.proto'),
      url: process.env.TOP_QUESTIONS_URL,
    },
  })

  await app.listen()
}
bootstrap()
