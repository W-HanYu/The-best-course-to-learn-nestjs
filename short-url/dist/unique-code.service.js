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
exports.UniqueCodeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("./utils");
const UniqueCode_1 = require("./entities/UniqueCode");
const schedule_1 = require("@nestjs/schedule");
let UniqueCodeService = class UniqueCodeService {
    async generateCode() {
        const str = (0, utils_1.generateRandomStr)(6);
        const uniqueCode = await this.entityManager.findOneBy(UniqueCode_1.UniqueCode, {
            code: str,
        });
        if (!uniqueCode) {
            const code = new UniqueCode_1.UniqueCode();
            code.code = str;
            code.status = 0;
            return await this.entityManager.insert(UniqueCode_1.UniqueCode, code);
        }
        else {
            return this.generateCode();
        }
    }
    async batchGenerateCode() {
        for (let i = 0; i < 10000; i++) {
            this.generateCode();
        }
    }
};
exports.UniqueCodeService = UniqueCodeService;
__decorate([
    (0, typeorm_1.InjectEntityManager)(),
    __metadata("design:type", typeorm_2.EntityManager)
], UniqueCodeService.prototype, "entityManager", void 0);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UniqueCodeService.prototype, "generateCode", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_4AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UniqueCodeService.prototype, "batchGenerateCode", null);
exports.UniqueCodeService = UniqueCodeService = __decorate([
    (0, common_1.Injectable)()
], UniqueCodeService);
//# sourceMappingURL=unique-code.service.js.map