import { ContainerType, Order, OrderBy } from '../enums';
export declare class FindBeersQueryParamsDTO {
    readonly limit?: number;
    readonly offset?: number;
    readonly ids?: number[];
    readonly name?: string;
    readonly orderBy?: OrderBy;
    readonly order?: Order;
    readonly containerType?: ContainerType;
}
