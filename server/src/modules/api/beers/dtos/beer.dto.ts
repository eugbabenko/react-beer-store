import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ContainerType } from '../enums';

export class BeerDTO {
  @ApiProperty({ title: 'ID' })
  @Expose()
  readonly id: number;

  @ApiProperty({ title: 'Name' })
  @Expose()
  readonly name: string;

  @ApiProperty({ title: 'Price' })
  @Expose()
  readonly price: number;

  @ApiProperty({ title: 'Brewed At' })
  @Expose()
  readonly brewedAt: string;

  @ApiProperty({ title: 'tagline' })
  @Expose()
  readonly tagline: string;

  @ApiProperty({ title: 'firstBrewed' })
  @Expose()
  readonly firstBrewed: string;

  @ApiProperty({ title: 'description' })
  @Expose()
  readonly description: string;

  @ApiProperty({ title: 'imageUrl' })
  @Expose()
  readonly imageUrl: string;

  @ApiProperty({ title: 'abv' })
  @Expose()
  readonly abv: number;

  @ApiProperty({ title: 'ibu' })
  @Expose()
  readonly ibu: number;

  @ApiProperty({ title: 'targetFg' })
  @Expose()
  readonly targetFg: number;

  @ApiProperty({ title: 'targetOg' })
  @Expose()
  readonly targetOg: number;

  @ApiProperty({ title: 'ebc' })
  @Expose()
  readonly ebc: number;

  @ApiProperty({ title: 'srm' })
  @Expose()
  readonly srm: number;

  @ApiProperty({ title: 'ph' })
  @Expose()
  readonly ph: number;

  @ApiProperty({ title: 'attenuationLevel' })
  @Expose()
  readonly attenuationLevel: number;

  @ApiProperty({ title: 'volume' })
  @Expose()
  readonly volume: { value: number; unit: string };

  @ApiProperty({ title: 'boilVolume' })
  @Expose()
  readonly boilVolume: { [key: string]: any };

  @ApiProperty({ title: 'method' })
  @Expose()
  readonly method: { [key: string]: any };

  @ApiProperty({ title: 'foodPairing' })
  @Expose()
  readonly foodPairing: string[];

  @ApiProperty({ title: 'brewersTips' })
  @Expose()
  readonly brewersTips: string;

  @ApiProperty({ title: 'contributedBy' })
  @Expose()
  readonly contributedBy: string;

  @ApiProperty({ title: 'currency' })
  @Expose()
  readonly currency: string;

  @ApiProperty({ title: 'containerType' })
  @Expose()
  readonly containerType: ContainerType;

  @ApiProperty({ title: 'amount' })
  @Expose()
  readonly amount: number;

  @ApiProperty({ title: 'createdAt' })
  @Expose()
  readonly createdAt: string;
}
