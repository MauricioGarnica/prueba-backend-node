"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const bitacora_1 = require("../controllers/bitacora");
const validar_JWT_1 = require("../middlewares/validar-JWT");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validar_JWT_1.validarJWT
], bitacora_1.getBitacoras);
//# sourceMappingURL=bitacora.js.map