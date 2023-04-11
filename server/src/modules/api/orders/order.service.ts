import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import winston from 'winston';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

import { OrderDTO } from './dtos/order.dto';
import { LOGGER_SERVICE } from '../../logger/contansts';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { BeersService } from '../beers/beers.service';
import { BeerDTO } from '../beers/dtos/beer.dto';
import { stripNumber } from '../../utils';

const fsPromises = fs.promises;

@Injectable()
export class OrderService {
  constructor(
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: winston.Logger,
    private readonly beersService: BeersService,
  ) {}

  private async getFromJSON(): Promise<OrderDTO[]> {
    const rawData = await fsPromises.readFile('./data/orders.json', 'utf8');

    return JSON.parse(rawData) as OrderDTO[];
  }

  private async putToJSON(orders: OrderDTO[]): Promise<void> {
    await fsPromises.writeFile(
      './data/orders.json',
      JSON.stringify(orders, null, 2),
    );
  }

  async create(createOrderDTO: CreateOrderDTO): Promise<OrderDTO> {
    const orders = await this.getFromJSON();

    const beers = await this.beersService.getList({
      ids: createOrderDTO.products.map((p) => p.id),
      limit: 10000,
    });

    const beersByID: { [key: string]: BeerDTO } = beers.items.reduce(
      (acc, beer) => {
        acc[beer.id] = beer;
        return acc;
      },
      {},
    );

    const beerPriceOnServer = stripNumber(
      createOrderDTO.products.reduce((acc, product) => {
        const beer = beersByID[product.id];
        if (!beer) {
          throw new BadRequestException(
            `Beer with id ${product.id} does not exist`,
          );
        }

        return acc + beer.price * product.quantity;
      }, 0),
    );

    if (beerPriceOnServer !== createOrderDTO.finalPrice) {
      throw new BadRequestException(
        `Final price is incorrect. Should be ${beerPriceOnServer} but got ${createOrderDTO.finalPrice}`,
      );
    }

    const order = { id: uuid(), ...createOrderDTO };
    orders.push(order);
    await this.putToJSON(orders);

    return order;
  }
}
