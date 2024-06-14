import { Injectable } from '@nestjs/common';

@Injectable()
export class TopQuestionsService {
  getHello(): string {
    return 'Hello World!';
  }
}
