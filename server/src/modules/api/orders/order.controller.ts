import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { OrderService } from './order.service';
import { OrderDTO } from './dtos/order.dto';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create Order' })
  @ApiOkResponse({ type: OrderDTO })
  create(@Body() createOrderDTO: CreateOrderDTO): Promise<OrderDTO> {
    return this.orderService.create(createOrderDTO);
  }
}
