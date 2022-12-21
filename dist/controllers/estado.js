"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEstado = exports.getEstados = void 0;
const connection_1 = __importDefault(require("../database/connection"));
/*
 *  Función que permite la obtención de los estados al completo
*/
const getEstados = (req, res) => {
    /*
     * Iniciamos la consulta del procedimeinto almacenado
    */
    connection_1.default.query('CALL SP_ESTADOS_OBTENER_TODOS()', function (error, rows) {
        /*
         * Mandamos mensaje de error por si se da
        */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /*
         * Desestructuro la respuesta para hacerlo un arreglo de objetos
        */
        const estados = Object.values(JSON.parse(JSON.stringify(rows)));
        const states = estados[0];
        /*
         * Mandamos el resultado
        */
        res.json({
            states
        });
    });
};
exports.getEstados = getEstados;
/*
 *  Función que permite la obtención de un estado por su id
*/
const getEstado = (req, res) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const { id } = req.params;
    /*
     * Iniciamos la consulta del procedimeinto almacenado
    */
    connection_1.default.query('CALL SP_ESTADOS_OBTENER_UNO(?)', [id], (error, rows) => {
        /*
         * Mandamos mensaje de error por si se da.
        */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos  */
        const estado = Object.values(JSON.parse(JSON.stringify(rows)));
        const state = estado[0];
        /* Mandamos el resultado  */
        res.json({
            state
        });
    });
};
exports.getEstado = getEstado;
//# sourceMappingURL=estado.js.map