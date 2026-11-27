import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { GetRequestParams } from '../../common/interfaces/getPagination';
import { CreateProduct, UpdateProduct } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/get')
  getProducts(@Body() raw: GetRequestParams) {
    return this.productsService.getProduts(raw);
  }

  @Post('/create')
  createProduct(@Body() raw: CreateProduct) {
    return this.productsService.createProduct(raw);
  }

  @Patch('/update')
  updateProduct(@Body() raw: UpdateProduct) {
    return this.productsService.updateProduct(raw);
  }

  @Delete('/delete')
  deleteProduct(@Param(':id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
