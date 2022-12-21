"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ciudad_1 = require("../controllers/ciudad");
/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = (0, express_1.Router)();
exports.router = router;
/* Las peticiones que tienen las ciudades */
router.get('/', ciudad_1.getCiudades);
router.get('/:id', ciudad_1.getCiudad);
router.get('/porEstado/:id', ciudad_1.getCiudadesPorEstado);
//# sourceMappingURL=ciudad.js.map