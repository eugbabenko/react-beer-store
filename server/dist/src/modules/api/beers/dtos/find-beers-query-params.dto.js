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
exports.FindBeersQueryParamsDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../enums");
const transformToIntArray = ({ value }) => {
    if (value === undefined) {
        return value;
    }
    else if (Array.isArray(value)) {
        return value.map((id) => ((0, class_validator_1.isNumber)(+id) ? +id : id));
    }
    else if ((0, class_validator_1.isNumber)(value)) {
        return [value];
    }
    else if (typeof value === 'string') {
        return value.split(',').map((id) => ((0, class_validator_1.isNumber)(+id) ? +id : id));
    }
    else {
        return value;
    }
};
class FindBeersQueryParamsDTO {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: 'Limit' }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FindBeersQueryParamsDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: 'Offset' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FindBeersQueryParamsDTO.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: 'IDs', type: Number, isArray: true }),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_transformer_1.Transform)(transformToIntArray),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FindBeersQueryParamsDTO.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: 'Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindBeersQueryParamsDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: 'OrderBy', enum: enums_1.OrderBy }),
    (0, class_validator_1.IsEnum)(enums_1.OrderBy),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindBeersQueryParamsDTO.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: 'Order', enum: enums_1.Order }),
    (0, class_validator_1.IsEnum)(enums_1.Order),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindBeersQueryParamsDTO.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ title: 'Container Type', enum: enums_1.ContainerType }),
    (0, class_validator_1.IsEnum)(enums_1.ContainerType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindBeersQueryParamsDTO.prototype, "containerType", void 0);
exports.FindBeersQueryParamsDTO = FindBeersQueryParamsDTO;
//# sourceMappingURL=find-beers-query-params.dto.js.map