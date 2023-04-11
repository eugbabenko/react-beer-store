import { OrderService } from './order.service';
import { OrderDTO } from './dtos/order.dto';
import { CreateOrderDTO } from './dtos/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDTO: CreateOrderDTO): Promise<OrderDTO>;
}
