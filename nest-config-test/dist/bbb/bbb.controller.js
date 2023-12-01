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
exports.BbbController = void 0;
const common_1 = require("@nestjs/common");
const bbb_service_1 = require("./bbb.service");
const create_bbb_dto_1 = require("./dto/create-bbb.dto");
const update_bbb_dto_1 = require("./dto/update-bbb.dto");
const config_1 = require("@nestjs/config");
let BbbController = class BbbController {
    constructor(bbbService) {
        this.bbbService = bbbService;
    }
    create(createBbbDto) {
        return this.bbbService.create(createBbbDto);
    }
    findAll() {
        return {
            ccc: this.configService.get('aaa.bbb.ccc'),
            ddd: this.configService.get('ddd'),
        };
    }
    findOne(id) {
        return this.bbbService.findOne(+id);
    }
    update(id, updateBbbDto) {
        return this.bbbService.update(+id, updateBbbDto);
    }
    remove(id) {
        return this.bbbService.remove(+id);
    }
};
exports.BbbController = BbbController;
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], BbbController.prototype, "configService", void 0);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bbb_dto_1.CreateBbbDto]),
    __metadata("design:returntype", void 0)
], BbbController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BbbController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BbbController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bbb_dto_1.UpdateBbbDto]),
    __metadata("design:returntype", void 0)
], BbbController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BbbController.prototype, "remove", null);
exports.BbbController = BbbController = __decorate([
    (0, common_1.Controller)('bbb'),
    __metadata("design:paramtypes", [bbb_service_1.BbbService])
], BbbController);
//# sourceMappingURL=bbb.controller.js.map