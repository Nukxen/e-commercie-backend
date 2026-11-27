import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { GetRequestParams } from '../../common/interfaces/getPagination';
import { ProductsFindManyArgs } from '../../generated/prisma/models';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProduct, UpdateProduct } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly db: PrismaService) {}

  async createProduct(raw: CreateProduct) {
    await validateOrReject(raw);

    await this.db.products.create({ data: raw });
  }

  async updateProduct(raw: UpdateProduct) {
    await validateOrReject(raw);
    const { id, ...dto } = raw;

    await this.db.products.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteProduct(id: string) {
    await this.db.products.delete({
      where: { id },
    });
  }

  async getProduts(raw: GetRequestParams) {
    await validateOrReject(raw);
    const { categorys, itemPerPage, page } = raw;

    let query: ProductsFindManyArgs = { skip: page * itemPerPage };

    if (categorys.length > 0) {
      query.where = { category: { id: { in: categorys } } };
    }

    const result = await this.db.products.findMany(query);

    return result;
  }
}
