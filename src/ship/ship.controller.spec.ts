import { Test, TestingModule } from '@nestjs/testing';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';

describe('ShipController', () => {
  let controller: ShipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipController],
      providers: [ShipService],
    }).compile();

    controller = module.get<ShipController>(ShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
