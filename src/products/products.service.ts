import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { DataSource } from 'typeorm';
import { getRepselKey, querySearch } from './helpers';
import { Product } from 'src/interfaces';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('DB_ALIANZA_DATASOURCE') private dbAlianza: DataSource,
    @Inject('DB_FG_DATASOURCE') private dbFG: DataSource,
  ) {}

  async findAllPrices(repselGroup: number) {
    const query = querySearch(repselGroup);

    const products = await this.dbAlianza.query(query);

    //? By request of the marketing department all the comparison price property will be assigned to 0 before the prices are updated
    products.forEach((product) => (product.precio_comparacion = 0));

    if (products.length === 0)
      throw new NotFoundException('Error loading product prices');

    return {
      success: true,
      message: 'SAP products loaded correctly',
      products,
    };
  }

  async updatePrices(repselGroup: number) {
    const { products } = await this.findAllPrices(repselGroup);
    const repselKey = getRepselKey(repselGroup);

    const batchSize = 500;

    this.processBatches(products, batchSize, repselKey);

    return { message: 'Proceso de actualización iniciado.' };
  }

  private async processBatches(
    products: Product[],
    batchSize: number,
    repselKey: string,
  ) {
    const totalBatches = Math.ceil(products.length / batchSize);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * batchSize;
      const batch = products.slice(startIndex, startIndex + batchSize);

      console.log(`Procesando lote ${batchIndex + 1} de ${totalBatches}`);

      try {
        const { data } = await axios.put(
          'https://repsel.com.mx/api/actualizar-precios',
          { product: batch },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: repselKey,
            },
          },
        );

        console.log(`Lote ${batchIndex + 1} procesado con éxito:`);
        console.log(`Estatus: ${data.estatus} Mensaje: ${data.mensaje}`);
      } catch (error) {
        console.error(
          `Error al procesar el lote ${batchIndex + 1}:`,
          error.message,
        );
      }

      if (batchIndex < totalBatches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 60000));
      }
    }

    console.log('Todos los lotes procesados.');
  }
}
