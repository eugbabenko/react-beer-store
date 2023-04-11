import winston from 'winston';
import { OrderDTO } from './dtos/order.dto';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { BeersService } from '../beers/beers.service';
export declare class OrderService {
    private readonly loggerService;
    private readonly beersService;
    constructor(loggerService: winston.Logger, beersService: BeersService);
    private getFromJSON;
    private putToJSON;
    create(createOrderDTO: CreateOrderDTO): Promise<OrderDTO>;
}
