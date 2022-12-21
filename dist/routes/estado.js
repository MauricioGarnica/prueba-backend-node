"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const estado_1 = require("../controllers/estado");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', estado_1.getEstados);
router.get('/:id', estado_1.getEstado);
//# sourceMappingURL=estado.js.map