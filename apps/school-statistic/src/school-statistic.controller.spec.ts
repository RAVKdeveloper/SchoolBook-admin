import { Test, TestingModule } from '@nestjs/testing';
import { SchoolStatisticController } from './school-statistic.controller';
import { SchoolStatisticService } from './school-statistic.service';

describe('SchoolStatisticController', () => {
  let schoolStatisticController: SchoolStatisticController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SchoolStatisticController],
      providers: [SchoolStatisticService],
    }).compile();

    schoolStatisticController = app.get<SchoolStatisticController>(SchoolStatisticController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(schoolStatisticController.getHello()).toBe('Hello World!');
    });
  });
});
