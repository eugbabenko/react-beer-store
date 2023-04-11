import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { BeersService } from './beers.service';
import { BeerListDTO } from './dtos/beer-list.dto';
import { BeerDTO } from './dtos/beer.dto';
import { FindBeersQueryParamsDTO } from './dtos/find-beers-query-params.dto';

@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  @ApiOperation({ summary: 'Find All' })
  @ApiOkResponse({ type: BeerListDTO })
  getAll(
    @Query() findBeersQueryParamsDTO: FindBeersQueryParamsDTO,
  ): Promise<BeerListDTO> {
    return this.beersService.getList(findBeersQueryParamsDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Specific beer by ID' })
  @ApiOkResponse({ type: BeerDTO })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: number): Promise<BeerDTO> {
    return this.beersService.findOne(id);
  }
}
