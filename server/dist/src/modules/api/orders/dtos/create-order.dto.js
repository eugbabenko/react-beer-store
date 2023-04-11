"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const order_product_dto_1 = require("./order-product.dto");
class CreateOrderDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'Price for all beers' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderDTO.prototype, "finalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'First Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'Last Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'Phone' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'Shipping Address' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "shippingAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'Products', type: [order_product_dto_1.OrderProductDTO] }),
    (0, class_transformer_1.Type)(() => order_product_dto_1.OrderProductDTO),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], CreateOrderDTO.prototype, "products", void 0);
exports.CreateOrderDTO = CreateOrderDTO;
//# sourceMappingURL=create-order.dto.js.map