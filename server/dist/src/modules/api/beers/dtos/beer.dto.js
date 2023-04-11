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
exports.BeerDTO = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../enums");
class BeerDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'ID' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'Name' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'Price' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'Brewed At' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "brewedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'tagline' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "tagline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'firstBrewed' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "firstBrewed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'description' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'imageUrl' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'abv' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "abv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'ibu' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "ibu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'targetFg' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "targetFg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'targetOg' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "targetOg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'ebc' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "ebc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'srm' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "srm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'ph' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "ph", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'attenuationLevel' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "attenuationLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'volume' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], BeerDTO.prototype, "volume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'boilVolume' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], BeerDTO.prototype, "boilVolume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'method' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], BeerDTO.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'foodPairing' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], BeerDTO.prototype, "foodPairing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'brewersTips' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "brewersTips", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'contributedBy' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "contributedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'currency' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'containerType' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "containerType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'amount' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'createdAt' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BeerDTO.prototype, "createdAt", void 0);
exports.BeerDTO = BeerDTO;
//# sourceMappingURL=beer.dto.js.map