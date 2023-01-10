"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validar_JWT_1 = require("../middlewares/validar-JWT");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/login', auth_1.login);
router.post('/logout', [
    validar_JWT_1.validarJWT
], auth_1.logout);
//# sourceMappingURL=auth.js.map