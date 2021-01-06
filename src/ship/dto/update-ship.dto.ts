import { PartialType } from '@nestjs/mapped-types';
import { CreateShipDto } from './create-ship.dto';

export class UpdateShipDto extends PartialType(CreateShipDto) {
  name: string;
  price: number;
  logo: string;
  updatedAt: Date;
}
