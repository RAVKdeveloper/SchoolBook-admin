import { Test, TestingModule } from '@nestjs/testing';
import { SchoolStatisticController } from './school-statistic.controller';
import { SchoolStatisticService } from './school-statistic.service';

describe('SchoolStatisticController', () => {
  let controller: SchoolStatisticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolStatisticController],
      providers: [SchoolStatisticService],
    }).compile();

    controller = module.get<SchoolStatisticController>(SchoolStatisticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
