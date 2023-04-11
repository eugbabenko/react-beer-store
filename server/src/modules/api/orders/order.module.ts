import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { BeersModule } from '../beers/beers.module';

@Module({
  imports: [BeersModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
