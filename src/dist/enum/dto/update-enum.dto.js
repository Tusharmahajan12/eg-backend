"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnumDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_enum_dto_1 = require("./create-enum.dto");
class UpdateEnumDto extends (0, mapped_types_1.PartialType)(create_enum_dto_1.CreateEnumDto) {
}
exports.UpdateEnumDto = UpdateEnumDto;
//# sourceMappingURL=update-enum.dto.js.map