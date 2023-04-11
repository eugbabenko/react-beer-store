import { OrderProductDTO } from './order-product.dto';
export declare class CreateOrderDTO {
    readonly finalPrice: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly phone: string;
    readonly shippingAddress: string;
    readonly products: OrderProductDTO[];
}
