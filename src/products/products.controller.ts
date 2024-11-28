import { Controller, Get, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/alianza')
  findAllAlianza() {
    return this.productsService.findAllPrices(7, 3);
  }

  @Get('/fg')
  findAllFG() {
    return this.productsService.findAllPrices(5, 3);
  }

  @Get('/fgm')
  findAllFGM() {
    return this.productsService.findAllPrices(2, 1);
  }

  @Put('/alianza')
  updateAlianza() {
    return this.productsService.updatePrices(7, 3);
  }

  @Put('/fg')
  updateFG() {
    return this.productsService.updatePrices(5, 3);
  }

  @Put('/fgm')
  updateFGM() {
    return this.productsService.updatePrices(2, 1);
  }
}
