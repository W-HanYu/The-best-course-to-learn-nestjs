"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBbbDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bbb_dto_1 = require("./create-bbb.dto");
class UpdateBbbDto extends (0, mapped_types_1.PartialType)(create_bbb_dto_1.CreateBbbDto) {
}
exports.UpdateBbbDto = UpdateBbbDto;
//# sourceMappingURL=update-bbb.dto.js.map