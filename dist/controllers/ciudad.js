"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCiudadesPorEstado = exports.getCiudad = exports.getCiudades = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const getCiudades = (req, res) => {
    connection_1.default.query('CALL SP_CIUDADES_OBTENER_TODOS()', (error, rows) => {
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        const ciudades = rows[0];
        res.json({
            ciudades
        });
    });
};
exports.getCiudades = getCiudades;
const getCiudad = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('CALL SP_CIUDADES_OBTENER_UNO(?)', [id], (error, rows) => {
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        const ciudad = rows[0];
        res.json({
            ciudad
        });
    });
};
exports.getCiudad = getCiudad;
const getCiudadesPorEstado = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('CALL SP_CIUDADES_OBTENER_TODOS_ESTADO(?)', [id], (error, rows) => {
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        const ciudades = rows[0];
        res.json({
            ciudades
        });
    });
};
exports.getCiudadesPorEstado = getCiudadesPorEstado;
//# sourceMappingURL=ciudad.js.map