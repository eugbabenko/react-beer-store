import {
  IsInt,
  Max,
  Min,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  isNumber,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ContainerType, Order, OrderBy } from '../enums';

const transformToIntArray = ({ value }) => {
  if (value === undefined) {
    return value;
  } else if (Array.isArray(value)) {
    return value.map((id) => (isNumber(+id) ? +id : id));
  } else if (isNumber(value)) {
    return [value];
  } else if (typeof value === 'string') {
    return value.split(',').map((id) => (isNumber(+id) ? +id : id));
  } else {
    return value;
  }
};

export class FindBeersQueryParamsDTO {
  @ApiPropertyOptional({ title: 'Limit' })
  @Min(0)
  @Max(50)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number;

  @ApiPropertyOptional({ title: 'Offset' })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  readonly offset?: number;

  @ApiPropertyOptional({ title: 'IDs', type: Number, isArray: true })
  @IsInt({ each: true })
  @Transform(transformToIntArray)
  @IsOptional()
  readonly ids?: number[];

  @ApiPropertyOptional({ title: 'Name' })
  @IsString()
  @MinLength(0)
  @MaxLength(100)
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({ title: 'OrderBy', enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  readonly orderBy?: OrderBy;

  @ApiPropertyOptional({ title: 'Order', enum: Order })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order;

  @ApiPropertyOptional({ title: 'Container Type', enum: ContainerType })
  @IsEnum(ContainerType)
  @IsOptional()
  readonly containerType?: ContainerType;
}
