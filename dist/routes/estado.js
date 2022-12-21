"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const estado_1 = require("../controllers/estado");
/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = (0, express_1.Router)();
exports.router = router;
/* Las peticiones que tienen los estados */
router.get('/', estado_1.getEstados);
router.get('/:id', estado_1.getEstado);
//# sourceMappingURL=estado.js.map