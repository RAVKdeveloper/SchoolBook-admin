import { Test, TestingModule } from '@nestjs/testing';
import { SchoolStatisticService } from './school-statistic.service';

describe('SchoolStatisticService', () => {
  let service: SchoolStatisticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolStatisticService],
    }).compile();

    service = module.get<SchoolStatisticService>(SchoolStatisticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
