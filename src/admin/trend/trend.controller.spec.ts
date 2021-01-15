import { Test, TestingModule } from '@nestjs/testing';
import { TrendController } from './trend.controller';
import { TrendService } from './trend.service';

describe('TrendController', () => {
  let controller: TrendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrendController],
      providers: [TrendService],
    }).compile();

    controller = module.get<TrendController>(TrendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
