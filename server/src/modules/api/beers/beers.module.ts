import { Module } from '@nestjs/common';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';

@Module({
  imports: [],
  controllers: [BeersController],
  providers: [BeersService],
  exports: [BeersService],
})
export class BeersModule {}
