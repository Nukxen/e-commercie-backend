import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

//Uma dto relativo a criação de um registro de produto
export class CreateProduct {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

//
export class UpdateProduct extends PartialType(CreateProduct) {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
