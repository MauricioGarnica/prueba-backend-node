"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cliente_1 = require("../controllers/cliente");
const validar_JWT_1 = require("../middlewares/validar-JWT");
const validar_rol_1 = require("../middlewares/validar-rol");
/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = (0, express_1.Router)();
exports.router = router;
/* Las peticiones que tienen los clientes */
router.get('/', [
    validar_JWT_1.validarJWT
], cliente_1.getClientes);
router.get('/:id', [
    validar_JWT_1.validarJWT
], cliente_1.getCliente);
router.post('/lat-y-lng', [
    validar_JWT_1.validarJWT
], cliente_1.getLatYLng);
router.post('/', [
    validar_JWT_1.validarJWT
], cliente_1.postCliente);
router.post('/buscar', [
    validar_JWT_1.validarJWT
], cliente_1.buscarClientes);
router.put('/:id', [
    validar_JWT_1.validarJWT
], cliente_1.putCliente);
router.delete('/:id', [
    validar_JWT_1.validarJWT,
    validar_rol_1.puedeEliminar
], cliente_1.deleteCliente);
//# sourceMappingURL=cliente.js.map