"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCiudadesPorEstado = exports.getCiudad = exports.getCiudades = void 0;
const connection_1 = __importDefault(require("../database/connection"));
/* Función que permite la obtención de las ciudades al completo */
const getCiudades = (req, res) => {
    /* Iniciamos la consulta del procedimeinto almacenado */
    connection_1.default.query('CALL SP_CIUDADES_OBTENER_TODOS()', (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const ciudades = Object.values(JSON.parse(JSON.stringify(rows)));
        const cities = ciudades[0];
        /* Mandamos el resultado */
        res.json({
            cities
        });
    });
};
exports.getCiudades = getCiudades;
/* Función que permite la obtención de una ciudad en específico gracias a un ID */
const getCiudad = (req, res) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const { id } = req.params;
    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro el ID */
    connection_1.default.query('CALL SP_CIUDADES_OBTENER_UNO(?)', [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const ciudad = Object.values(JSON.parse(JSON.stringify(rows)));
        const city = ciudad[0];
        /* Mandamos el resultado */
        res.json({
            city
        });
    });
};
exports.getCiudad = getCiudad;
/* Función que permite la obtención de las ciudades de un estado a traves de su ID */
const getCiudadesPorEstado = (req, res) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const { id } = req.params;
    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro el ID */
    connection_1.default.query('CALL SP_CIUDADES_OBTENER_TODOS_ESTADO(?)', [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const ciudades = Object.values(JSON.parse(JSON.stringify(rows)));
        const cities = ciudades[0];
        /* Mandamos el resultado */
        res.json({
            cities
        });
    });
};
exports.getCiudadesPorEstado = getCiudadesPorEstado;
//# sourceMappingURL=ciudad.js.map