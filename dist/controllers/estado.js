"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEstado = exports.getEstados = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const getEstados = (req, res) => {
    connection_1.default.query('CALL SP_ESTADOS_OBTENER_TODOS()', function (error, rows) {
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        const estados = Object.values(JSON.parse(JSON.stringify(rows)));
        const states = estados[0];
        res.json({
            states
        });
    });
};
exports.getEstados = getEstados;
const getEstado = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('CALL SP_ESTADOS_OBTENER_UNO(?)', [id], (error, rows) => {
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        const estado = Object.values(JSON.parse(JSON.stringify(rows)));
        const state = estado[0];
        res.json({
            state
        });
    });
};
exports.getEstado = getEstado;
//# sourceMappingURL=estado.js.map