"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarBitacoras = exports.getBitacoras = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const getBitacoras = (req, res) => {
    /* Iniciamos la consulta del procedimeinto almacenado */
    connection_1.default.query("CALL SP_BITACORAS_OBTENER_TODOS()", (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const bitacoras = Object.values(JSON.parse(JSON.stringify(rows)));
        const logs = bitacoras[0];
        /* Mandamos el resultado */
        res.json({
            logs
        });
    });
};
exports.getBitacoras = getBitacoras;
const buscarBitacoras = (req, res) => {
    const { filtro } = req.body;
    connection_1.default.query('CALL SP_BITACORAS_BUSCAR(?)', [filtro], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const bitacoras = Object.values(JSON.parse(JSON.stringify(rows)));
        const logs = bitacoras[0];
        /* Mandamos el resultado */
        res.json({
            logs
        });
    });
};
exports.buscarBitacoras = buscarBitacoras;
//# sourceMappingURL=bitacora.js.map