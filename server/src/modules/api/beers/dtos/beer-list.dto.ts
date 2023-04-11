import { Expose, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { BeerDTO } from './beer.dto';
import { IsInt } from 'class-validator';

export class BeerListDTO {
  @ApiProperty({
    title: 'Conscripts',
    description: 'A list of Beers',
    type: () => [BeerDTO],
    readOnly: true,
  })
  @Type(() => BeerDTO)
  @Expose()
  readonly items: BeerDTO[];

  @ApiProperty({ title: 'Total items count' })
  @IsInt()
  @Expose()
  readonly total: number;
}
