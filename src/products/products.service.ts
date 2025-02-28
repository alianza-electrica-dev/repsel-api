import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { DataSource } from 'typeorm';
import { getRepselKey, querySearch } from './helpers';
import { Product } from 'src/interfaces';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @Inject('DB_ALIANZA_DATASOURCE') private dbAlianza: DataSource,
    @Inject('DB_FG_DATASOURCE') private dbFG: DataSource,
    @Inject('DB_FGM_DATASOURCE') private dbFGM: DataSource,
    @Inject('DB_PACIFICO_DATASOURCE') private dbPacifico: DataSource,
  ) {}

  async findAllPrices(repselGroup: number, priceList: number) {
    const query = querySearch(repselGroup, priceList);
    let products = null;

    if (repselGroup === 7) {
      products = await this.dbAlianza.query(query);
    } else if (repselGroup === 5) {
      products = await this.dbFG.query(query);
    } else if (repselGroup === 2) {
      products = await this.dbFGM.query(query);
    } else if (repselGroup === 1) {
      products = await this.dbPacifico.query(query);
    }

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

  async updatePrices(repselGroup: number, priceList: number) {
    const { products } = await this.findAllPrices(repselGroup, priceList);
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

      this.logger.log(`Procesando lote ${batchIndex + 1} de ${totalBatches}`);

      if (!repselKey) {
        throw new UnauthorizedException('Falta la clave de autorización');
      }

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

        this.logger.log(`Lote ${batchIndex + 1} procesado con éxito:`);
        this.logger.log(`Estatus: ${data.estatus} Mensaje: ${data.mensaje}`);
      } catch (error) {
        Logger.error(
          `Error al procesar el lote ${batchIndex + 1}:`,
          error.message,
        );
      }

      if (batchIndex < totalBatches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 60000));
      }
    }

    this.logger.log('Todos los lotes procesados.');
  }
}
