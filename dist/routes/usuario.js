"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const validar_JWT_1 = require("../middlewares/validar-JWT");
const validar_rol_1 = require("../middlewares/validar-rol");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validar_JWT_1.validarJWT
], usuario_1.getUsuarios);
router.get('/:id', [
    validar_JWT_1.validarJWT
], usuario_1.getUsuario);
router.post('/', [
    validar_JWT_1.validarJWT
], usuario_1.postUsuario);
router.put('/:id', [
    validar_JWT_1.validarJWT
], usuario_1.putUsuario);
router.delete('/:id', [
    validar_JWT_1.validarJWT,
    validar_rol_1.puedeEliminar
], usuario_1.deleteUsuario);
router.post('/buscar', [
    validar_JWT_1.validarJWT
], usuario_1.buscarUsuario);
//# sourceMappingURL=usuario.js.map