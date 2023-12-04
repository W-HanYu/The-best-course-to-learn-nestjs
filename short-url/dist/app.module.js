"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const UniqueCode_1 = require("./entities/UniqueCode");
const unique_code_service_1 = require("./unique-code.service");
const schedule_1 = require("@nestjs/schedule");
const ShortLongMap_1 = require("./entities/ShortLongMap");
const short_long_map_service_1 = require("./short-long-map.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'why262216',
                database: 'short_url',
                synchronize: true,
                logging: true,
                entities: [UniqueCode_1.UniqueCode, ShortLongMap_1.ShortLongMap],
                poolSize: 10,
                connectorPackage: 'mysql2',
                extra: {
                    authPlugin: 'sha256_password',
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, unique_code_service_1.UniqueCodeService, short_long_map_service_1.ShortLongMapService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map