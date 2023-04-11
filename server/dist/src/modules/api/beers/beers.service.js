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
exports.BeersService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const fs = require("fs");
const contansts_1 = require("../../logger/contansts");
const enums_1 = require("./enums");
const fsPromises = fs.promises;
let BeersService = class BeersService {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    async getFromJSON() {
        const rawDataBeers = await fsPromises.readFile('./data/final-beers.json', 'utf8');
        return JSON.parse(rawDataBeers);
    }
    async getList({ ids, limit = 50, offset = 0, name, containerType, orderBy, order, }) {
        let beers = await this.getFromJSON();
        if (ids) {
            beers = beers.filter((beer) => ids.includes(beer.id));
        }
        if (name) {
            beers = beers.filter((beer) => beer.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (containerType) {
            beers = beers.filter((beer) => beer.containerType === containerType);
        }
        if (orderBy === enums_1.OrderBy.Price) {
            beers = beers.sort((a, b) => order && order === enums_1.Order.ASC ? a.price - b.price : b.price - a.price);
        }
        if (orderBy === enums_1.OrderBy.BrewedAt) {
            beers = beers.sort((a, b) => order && order === enums_1.Order.ASC
                ? new Date(a.brewedAt) - new Date(b.brewedAt)
                : new Date(b.brewedAt) - new Date(a.brewedAt));
        }
        const total = beers.length;
        beers = beers.slice(offset, offset + limit);
        return { items: beers, total };
    }
    async findOne(id) {
        const beers = await this.getFromJSON();
        const beer = beers.find((b) => b.id === id);
        if (!beer) {
            throw new common_1.NotFoundException('Beer not found');
        }
        return beer;
    }
};
BeersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contansts_1.LOGGER_SERVICE)),
    __metadata("design:paramtypes", [winston_1.default.Logger])
], BeersService);
exports.BeersService = BeersService;
//# sourceMappingURL=beers.service.js.map