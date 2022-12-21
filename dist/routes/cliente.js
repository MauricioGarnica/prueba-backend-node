"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cliente_1 = require("../controllers/cliente");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', cliente_1.getClientes);
router.get('/:id', cliente_1.getCliente);
router.post('/', cliente_1.postCliente);
router.put('/:id', cliente_1.putCliente);
router.delete('/:id', cliente_1.deleteCliente);
//# sourceMappingURL=cliente.js.map