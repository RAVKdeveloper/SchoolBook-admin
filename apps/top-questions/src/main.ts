import { NestFactory } from '@nestjs/core';
import { TopQuestionsModule } from './top-questions.module';

async function bootstrap() {
  const app = await NestFactory.create(TopQuestionsModule);
  await app.listen(3000);
}
bootstrap();
