import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDTO {
  @ApiProperty({ title: 'ID' })
  @Expose()
  readonly id: number;
}
