import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(private dataSource: DataSource) {}

  async findAllPrices() {
    const query = `
      SELECT 
        ItemCode AS sku,
        Price AS precio,
        Price AS precio_comparacion,
        CASE 
          WHEN ISNULL(Currency, '') = '' THEN 'MXN' 
          ELSE Currency 
        END AS moneda
      FROM 
        ITM1 
      WHERE 
        PriceList = 3
        AND ItemCode IN (
          SELECT 
            ItemCode 
          FROM 
            OITM 
          WHERE 
            QryGroup7 IN ('Y')
        )
    `;

    const productsPrices = await this.dataSource.query(query);

    if (productsPrices.length === 0)
      throw new NotFoundException('Error loading product prices');

    return productsPrices;
  }

  async updatePrices() {
    const newProductPrices = await this.findAllPrices();
    const repselKey = process.env.REPSEL_KEY;

    try {
      const { data } = await axios.put(
        'https://repsel.com.mx/api/actualizar-precios',
        { product: newProductPrices },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: repselKey,
          },
        },
      );

      return data;
    } catch (error) {
      throw new BadRequestException('Fail to connect with respel API');
    }
  }
}
