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
const getClientes = (req, res) => {
    connection_1.default.query('CALL SP_CLIENTES_OBTENER_TODOS()', (error, rows) => {
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        const clientes = rows[0];
        res.json({
            clientes
        });
    });
};
exports.getClientes = getClientes;
const getCliente = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('CALL SP_CLIENTES_OBTENER_UNO(?)', [id], (error, rows) => {
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        const cliente = rows[0];
        res.json({
            cliente
        });
    });
};
exports.getCliente = getCliente;
const getLatYLng = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { calle, colonia, cp } = req.body;
    let oracion = "";
    const calle_desestructurada = calle.split(' ');
    const colonia_desestructurada = colonia.split(' ');
    calle_desestructurada.forEach((calle) => {
        oracion = oracion + calle + "+";
    });
    colonia_desestructurada.forEach((colonia) => {
        oracion = oracion + colonia + "+";
    });
    oracion = oracion + cp;
    const result = yield (0, cross_fetch_1.default)(`https://geocode.search.hereapi.com/v1/geocode?q=${oracion}&apiKey=Zt_mvFl5zPMvNhOhmtrgZypThCHTUFLKBbQaTLZPa80`);
    const { items } = yield result.json();
    const latitud = items[0].position.lat;
    const longitud = items[0].position.lng;
    res.json({
        latitud,
        longitud
    });
});
exports.getLatYLng = getLatYLng;
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion } = req.body;
    const cliente = new cliente_1.default(razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion, 1);
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
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        res.json({
            msg: 'El cliente ha sido agregado con éxito',
            rows
        });
    });
});
exports.postCliente = postCliente;
const buscarClientes = (req, res) => {
    const { filtro } = req.body;
    connection_1.default.query('CALL SP_CLIENTES_BUSCAR(?)', [filtro], (error, rows) => {
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        const clientes = rows[0];
        res.json({
            clientes
        });
    });
};
exports.buscarClientes = buscarClientes;
const putCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion } = req.body;
    const cliente = new cliente_1.default(razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion, 1);
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
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        res.json({
            msg: 'El cliente ha sido modificado con éxito',
            rows
        });
    });
});
exports.putCliente = putCliente;
const deleteCliente = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('CALL SP_CLIENTES_ELIMINAR(?)', [id], (error, rows) => {
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        res.json({
            msg: 'El cliente ha sido eliminado con éxito',
            rows
        });
    });
};
exports.deleteCliente = deleteCliente;
//# sourceMappingURL=cliente.js.map