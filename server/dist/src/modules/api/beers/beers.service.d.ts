import winston from 'winston';
import { BeerListDTO } from './dtos/beer-list.dto';
import { FindBeersQueryParamsDTO } from './dtos/find-beers-query-params.dto';
import { BeerDTO } from './dtos/beer.dto';
export declare class BeersService {
    private readonly loggerService;
    constructor(loggerService: winston.Logger);
    private getFromJSON;
    getList({ ids, limit, offset, name, containerType, orderBy, order, }: FindBeersQueryParamsDTO): Promise<BeerListDTO>;
    findOne(id: number): Promise<BeerDTO>;
}
