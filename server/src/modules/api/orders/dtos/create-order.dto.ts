import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  MinLength,
  IsPositive,
  IsNumber,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDTO } from './order-product.dto';

export class CreateOrderDTO {
  @ApiProperty({ title: 'Price for all beers' })
  @IsNumber()
  @IsPositive()
  readonly finalPrice: number;

  @ApiProperty({ title: 'First Name' })
  @IsString()
  @MinLength(2)
  readonly firstName: string;

  @ApiProperty({ title: 'Last Name' })
  @IsString()
  @MinLength(2)
  readonly lastName: string;

  @ApiProperty({ title: 'Phone' })
  @IsString()
  @MinLength(6)
  readonly phone: string;

  @ApiProperty({ title: 'Shipping Address' })
  @IsString()
  @MinLength(5)
  readonly shippingAddress: string;

  @ApiProperty({ title: 'Products', type: [OrderProductDTO] })
  @Type(() => OrderProductDTO)
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  readonly products: OrderProductDTO[];
}
