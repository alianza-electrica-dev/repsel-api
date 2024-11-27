import { Controller, Get, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/alianza')
  findAllAlianza() {
    return this.productsService.findAllPrices(7);
  }

  @Get('/fg')
  findAllFG() {
    return this.productsService.findAllPrices(5);
  }

  @Put('/alianza')
  updateAlianza() {
    return this.productsService.updatePrices(7);
  }

  @Put('/fg')
  updateFG() {
    return this.productsService.updatePrices(5);
  }
}
