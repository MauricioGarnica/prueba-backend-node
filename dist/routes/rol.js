"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const validar_JWT_1 = require("../middlewares/validar-JWT");
const rol_1 = require("../controllers/rol");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validar_JWT_1.validarJWT
], rol_1.getRoles);
router.get('/:id', [
    validar_JWT_1.validarJWT
], rol_1.getRol);
//# sourceMappingURL=rol.js.map