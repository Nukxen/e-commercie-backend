import { PartialType } from '@nestjs/mapped-types';

//Uma dto relativo a criação de um registro de produto
export class CreateProduct {
  name: string;
  description?: string;
  price?: number;
}

//
export class UpdateProduct extends PartialType(CreateProduct) {
  id: string;
}
