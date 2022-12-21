"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cliente_1 = require("../controllers/cliente");
/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = (0, express_1.Router)();
exports.router = router;
/* Las peticiones que tienen los clientes */
router.get('/', cliente_1.getClientes);
router.get('/:id', cliente_1.getCliente);
router.post('/lat-y-lng', cliente_1.getLatYLng);
router.post('/', cliente_1.postCliente);
router.post('/buscar', cliente_1.buscarClientes);
router.put('/:id', cliente_1.putCliente);
router.delete('/:id', cliente_1.deleteCliente);
//# sourceMappingURL=cliente.js.map