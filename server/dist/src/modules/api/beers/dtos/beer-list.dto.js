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
exports.BeerListDTO = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const beer_dto_1 = require("./beer.dto");
const class_validator_1 = require("class-validator");
class BeerListDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Conscripts',
        description: 'A list of Beers',
        type: () => [beer_dto_1.BeerDTO],
        readOnly: true,
    }),
    (0, class_transformer_1.Type)(() => beer_dto_1.BeerDTO),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], BeerListDTO.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: 'Total items count' }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BeerListDTO.prototype, "total", void 0);
exports.BeerListDTO = BeerListDTO;
//# sourceMappingURL=beer-list.dto.js.map