import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class OrderProductDTO {
  @ApiProperty({ title: 'Product ID' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ title: 'Quantity' })
  @IsInt()
  @IsPositive()
  readonly quantity: number;
}
