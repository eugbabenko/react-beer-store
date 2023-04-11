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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const fs = require("fs");
const uuid_1 = require("uuid");
const contansts_1 = require("../../logger/contansts");
const beers_service_1 = require("../beers/beers.service");
const utils_1 = require("../../utils");
const fsPromises = fs.promises;
let OrderService = class OrderService {
    constructor(loggerService, beersService) {
        this.loggerService = loggerService;
        this.beersService = beersService;
    }
    async getFromJSON() {
        const rawData = await fsPromises.readFile('./data/orders.json', 'utf8');
        return JSON.parse(rawData);
    }
    async putToJSON(orders) {
        await fsPromises.writeFile('./data/orders.json', JSON.stringify(orders, null, 2));
    }
    async create(createOrderDTO) {
        const orders = await this.getFromJSON();
        const beers = await this.beersService.getList({
            ids: createOrderDTO.products.map((p) => p.id),
            limit: 10000,
        });
        const beersByID = beers.items.reduce((acc, beer) => {
            acc[beer.id] = beer;
            return acc;
        }, {});
        const beerPriceOnServer = (0, utils_1.stripNumber)(createOrderDTO.products.reduce((acc, product) => {
            const beer = beersByID[product.id];
            if (!beer) {
                throw new common_1.BadRequestException(`Beer with id ${product.id} does not exist`);
            }
            return acc + beer.price * product.quantity;
        }, 0));
        if (beerPriceOnServer !== createOrderDTO.finalPrice) {
            throw new common_1.BadRequestException(`Final price is incorrect. Should be ${beerPriceOnServer} but got ${createOrderDTO.finalPrice}`);
        }
        const order = Object.assign({ id: (0, uuid_1.v4)() }, createOrderDTO);
        orders.push(order);
        await this.putToJSON(orders);
        return order;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contansts_1.LOGGER_SERVICE)),
    __metadata("design:paramtypes", [winston_1.default.Logger, beers_service_1.BeersService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map