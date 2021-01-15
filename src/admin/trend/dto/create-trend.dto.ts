export class CreateTrendDto {
  name: string;
  slug: string;
  avatar: string;
  active: boolean;
  nav_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
