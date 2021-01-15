import { Test, TestingModule } from '@nestjs/testing';
import { ValueController } from './value.controller';
import { ValueService } from './value.service';

describe('ValueController', () => {
  let controller: ValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValueController],
      providers: [ValueService],
    }).compile();

    controller = module.get<ValueController>(ValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
