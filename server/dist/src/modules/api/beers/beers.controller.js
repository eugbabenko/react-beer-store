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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const beers_service_1 = require("./beers.service");
const beer_list_dto_1 = require("./dtos/beer-list.dto");
const beer_dto_1 = require("./dtos/beer.dto");
const find_beers_query_params_dto_1 = require("./dtos/find-beers-query-params.dto");
let BeersController = class BeersController {
    constructor(beersService) {
        this.beersService = beersService;
    }
    getAll(findBeersQueryParamsDTO) {
        return this.beersService.getList(findBeersQueryParamsDTO);
    }
    findOne(id) {
        return this.beersService.findOne(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find All' }),
    (0, swagger_1.ApiOkResponse)({ type: beer_list_dto_1.BeerListDTO }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_beers_query_params_dto_1.FindBeersQueryParamsDTO]),
    __metadata("design:returntype", Promise)
], BeersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Specific beer by ID' }),
    (0, swagger_1.ApiOkResponse)({ type: beer_dto_1.BeerDTO }),
    (0, swagger_1.ApiNotFoundResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BeersController.prototype, "findOne", null);
BeersController = __decorate([
    (0, common_1.Controller)('beers'),
    __metadata("design:paramtypes", [beers_service_1.BeersService])
], BeersController);
exports.BeersController = BeersController;
//# sourceMappingURL=beers.controller.js.map