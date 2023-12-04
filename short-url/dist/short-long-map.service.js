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
exports.ShortLongMapService = void 0;
const unique_code_service_1 = require("./unique-code.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ShortLongMap_1 = require("./entities/ShortLongMap");
const UniqueCode_1 = require("./entities/UniqueCode");
let ShortLongMapService = class ShortLongMapService {
    async generate(longUrl) {
        let uniqueCode = await this.entityManager.findOneBy(UniqueCode_1.UniqueCode, {
            status: 0,
        });
        if (!uniqueCode) {
            uniqueCode = await this.uniqueCodeService.generateCode();
        }
        const map = new ShortLongMap_1.ShortLongMap();
        map.shortUrl = uniqueCode.code;
        map.longUrl = longUrl;
        await this.entityManager.insert(ShortLongMap_1.ShortLongMap, map);
        await this.entityManager.update(UniqueCode_1.UniqueCode, {
            id: uniqueCode.id,
        }, {
            status: 1,
        });
        return uniqueCode.code;
    }
    async getLongUrl(code) {
        const map = await this.entityManager.findOneBy(ShortLongMap_1.ShortLongMap, {
            shortUrl: code,
        });
        if (!map) {
            return null;
        }
        return map.longUrl;
    }
};
exports.ShortLongMapService = ShortLongMapService;
__decorate([
    (0, typeorm_1.InjectEntityManager)(),
    __metadata("design:type", typeorm_2.EntityManager)
], ShortLongMapService.prototype, "entityManager", void 0);
__decorate([
    (0, common_1.Inject)(unique_code_service_1.UniqueCodeService),
    __metadata("design:type", unique_code_service_1.UniqueCodeService)
], ShortLongMapService.prototype, "uniqueCodeService", void 0);
exports.ShortLongMapService = ShortLongMapService = __decorate([
    (0, common_1.Injectable)()
], ShortLongMapService);
//# sourceMappingURL=short-long-map.service.js.map