import { join } from 'path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { Packages, TOP_QUESTIONS_SERVICE_NAME } from '@app/common'

import { TopQuestionsController } from './top-questions.controller'
import { TopQuestionsService } from './top-questions.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TOP_QUESTIONS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: Packages.TOP_QUESTIONS,
          protoPath: join(__dirname, '../topQuestions.proto'),
          url: process.env.TOP_QUESTIONS_URL,
        },
      },
    ]),
  ],
  controllers: [TopQuestionsController],
  providers: [TopQuestionsService],
})
export class TopQuestionsModule {}
