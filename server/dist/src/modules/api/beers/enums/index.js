"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerType = exports.Order = exports.OrderBy = void 0;
var OrderBy;
(function (OrderBy) {
    OrderBy["BrewedAt"] = "brewedAt";
    OrderBy["Price"] = "price";
})(OrderBy = exports.OrderBy || (exports.OrderBy = {}));
var Order;
(function (Order) {
    Order["DESC"] = "DESC";
    Order["ASC"] = "ASC";
})(Order = exports.Order || (exports.Order = {}));
var ContainerType;
(function (ContainerType) {
    ContainerType["KEG"] = "KEG";
    ContainerType["BOTTLE"] = "BOTTLE";
})(ContainerType = exports.ContainerType || (exports.ContainerType = {}));
//# sourceMappingURL=index.js.map