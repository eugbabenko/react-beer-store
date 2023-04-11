import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import winston from 'winston';
import * as fs from 'fs';

import { BeerListDTO } from './dtos/beer-list.dto';
import { LOGGER_SERVICE } from '../../logger/contansts';
import { FindBeersQueryParamsDTO } from './dtos/find-beers-query-params.dto';
import { BeerDTO } from './dtos/beer.dto';
import { Order, OrderBy } from './enums';

const fsPromises = fs.promises;

@Injectable()
export class BeersService {
  constructor(
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: winston.Logger,
  ) {}

  private async getFromJSON(): Promise<BeerDTO[]> {
    const rawDataBeers = await fsPromises.readFile(
      './data/final-beers.json',
      'utf8',
    );

    return JSON.parse(rawDataBeers) as BeerDTO[];
  }

  async getList({
    ids,
    limit = 50,
    offset = 0,
    name,
    containerType,
    orderBy,
    order,
  }: FindBeersQueryParamsDTO): Promise<BeerListDTO> {
    let beers = await this.getFromJSON();

    if (ids) {
      beers = beers.filter((beer) => ids.includes(beer.id));
    }

    if (name) {
      beers = beers.filter((beer) =>
        beer.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (containerType) {
      beers = beers.filter((beer) => beer.containerType === containerType);
    }

    if (orderBy === OrderBy.Price) {
      beers = beers.sort((a, b) =>
        order && order === Order.ASC ? a.price - b.price : b.price - a.price,
      );
    }

    if (orderBy === OrderBy.BrewedAt) {
      beers = beers.sort((a, b) =>
        order && order === Order.ASC
          ? (new Date(a.brewedAt) as any) - (new Date(b.brewedAt) as any)
          : (new Date(b.brewedAt) as any) - (new Date(a.brewedAt) as any),
      );
    }

    const total = beers.length;

    beers = beers.slice(offset, offset + limit);

    return { items: beers, total };
  }

  async findOne(id: number): Promise<BeerDTO> {
    const beers = await this.getFromJSON();

    const beer = beers.find((b) => b.id === id);

    if (!beer) {
      throw new NotFoundException('Beer not found');
    }

    return beer;
  }
}
