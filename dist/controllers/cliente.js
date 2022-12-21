"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCliente = exports.putCliente = exports.buscarClientes = exports.postCliente = exports.getLatYLng = exports.getCliente = exports.getClientes = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const cliente_1 = __importDefault(require("../models/cliente"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
/* Función que permite la obtención de los clientes al completo */
const getClientes = (req, res) => {
    /* Iniciamos la consulta del procedimeinto almacenado */
    connection_1.default.query('CALL SP_CLIENTES_OBTENER_TODOS()', (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const clientes = Object.values(JSON.parse(JSON.stringify(rows)));
        const clients = clientes[0];
        /* Mandamos el resultado */
        res.json({
            clients
        });
    });
};
exports.getClientes = getClientes;
/* Función que permite la obtención de un cliente en específico gracias a su ID */
const getCliente = (req, res) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const { id } = req.params;
    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro el ID */
    connection_1.default.query('CALL SP_CLIENTES_OBTENER_UNO(?)', [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const cliente = Object.values(JSON.parse(JSON.stringify(rows)));
        const client = cliente[0];
        /* Mandamos el resultado */
        res.json({
            client
        });
    });
};
exports.getCliente = getCliente;
/* Función que permite consultar la longitud y la latitud de la dirección */
const getLatYLng = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* Obtenemos la calle, colonia y el cp que fue pasado por el body en la URL */
    const { calle, colonia, cp } = req.body;
    /* Variable donde se va a almacenar el resultado de la consulta */
    let oracion = "";
    /* API_KEY de la aplicación HERE */
    const key_api = process.env.API_KEY_HERE || 'Zt_mvFl5zPMvNhOhmtrgZypThCHTUFLKBbQaTLZPa80';
    /* Separamos la cadena de texto por espacios, para crear un arreglo de strings */
    const calle_desestructurada = calle.split(' ');
    const colonia_desestructurada = colonia.split(' ');
    /* En la oración, vamos a ir concatenando cada palabra encontrada junto con el caracter '+' para que funcione la consulta*/
    calle_desestructurada.forEach((calle) => {
        oracion = oracion + calle + "+";
    });
    colonia_desestructurada.forEach((colonia) => {
        oracion = oracion + colonia + "+";
    });
    /* Al final, concatenamos el cp para que la busqueda sea lo más exacta */
    oracion = oracion + cp;
    /* Realizamos la petición a la API */
    const result = yield (0, cross_fetch_1.default)(`https://geocode.search.hereapi.com/v1/geocode?q=${oracion}&apiKey=${key_api}`);
    const { items } = yield result.json();
    /* Obtenemos la latitud y la longitud del objeto */
    const latitud = items[0].position.lat;
    const longitud = items[0].position.lng;
    /* Mandamos el resultado */
    res.json({
        latitud,
        longitud
    });
});
exports.getLatYLng = getLatYLng;
/* Función que permite la inserción de un cliente a la BD */
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* Obtenemos los datos del cliente que fueron pasados por el body en la URL */
    const { razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion } = req.body;
    /* Agregamos los datos al cliente */
    const cliente = new cliente_1.default(razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion, 1);
    /* Ejecutamos la consulta para hacer la inserción */
    connection_1.default.query('CALL SP_CLIENTES_INSERTAR(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        cliente.razon_social,
        cliente.telefono,
        cliente.correo,
        cliente.referencia,
        cliente.calle,
        cliente.colonia,
        cliente.cp,
        cliente.ciudad_id,
        cliente.estado_id,
        cliente.latitud,
        cliente.longitud
    ], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Mandamos el resultado */
        res.json({
            msg: 'El cliente ha sido agregado con éxito',
            rows
        });
    });
});
exports.postCliente = postCliente;
/* Función que permite la busqueda de clientes a través de un parámetro */
const buscarClientes = (req, res) => {
    /* Obtenemos la palabra que fue pasada por el body en la URL */
    const { filtro } = req.body;
    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro la palabra a buscar */
    connection_1.default.query('CALL SP_CLIENTES_BUSCAR(?)', [filtro], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const clientes = Object.values(JSON.parse(JSON.stringify(rows)));
        const clients = clientes[0];
        /* Mandamos el resultado */
        res.json({
            clients
        });
    });
};
exports.buscarClientes = buscarClientes;
/*Función para modificar los datos del cliente de un cliente en específico */
const putCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* Obtenemos el ID que fue pasado por el params en la URL */
    const { id } = req.params;
    /* Obtenemos los datos del cliente que fueron pasados por el body en la URL */
    const { razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion } = req.body;
    /* Agregamos los datos al cliente */
    const cliente = new cliente_1.default(razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion, 1);
    /* Ejecutamos la consulta para hacer la modificación */
    connection_1.default.query('CALL SP_CLIENTES_MODIFICAR(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id,
        cliente.razon_social,
        cliente.telefono,
        cliente.correo,
        cliente.referencia,
        cliente.calle,
        cliente.colonia,
        cliente.cp,
        cliente.ciudad_id,
        cliente.estado_id,
        cliente.latitud,
        cliente.longitud
    ], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Mandamos el resultado */
        res.json({
            msg: 'El cliente ha sido modificado con éxito',
            rows
        });
    });
});
exports.putCliente = putCliente;
/* Función para eliminar un cliente de manera lógica */
const deleteCliente = (req, res) => {
    /* Obtenemos el ID que fue pasado por el params en la URL */
    const { id } = req.params;
    /* Iniciamos la consulta del procedimeinto almacenado pasando como parametro el ID */
    connection_1.default.query('CALL SP_CLIENTES_ELIMINAR(?)', [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Mandamos el resultado */
        res.json({
            msg: 'El cliente ha sido eliminado con éxito',
            rows
        });
    });
};
exports.deleteCliente = deleteCliente;
//# sourceMappingURL=cliente.js.map