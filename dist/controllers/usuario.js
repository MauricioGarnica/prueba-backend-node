"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsuarios = (req, res) => {
    connection_1.default.query('CALL SP_USUARIOS_OBTENER_TODOS()', (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const usuarios = Object.values(JSON.parse(JSON.stringify(rows)));
        const users = usuarios[0];
        /* Mandamos el resultado */
        res.json({
            users
        });
    });
};
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    /* Obtenemos el id que fue pasado por parametro en la URL */
    const { id } = req.params;
    connection_1.default.query('CALL SP_USUARIOS_OBTENER_UNO(?)', [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const usuario = Object.values(JSON.parse(JSON.stringify(rows)));
        const user = usuario[0];
        /* Mandamos el resultado */
        res.json({
            user
        });
    });
};
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => {
    /* Obtenemos los datos del usuario que fueron pasados por el body en la URL */
    const { nombre, usuario, contrasenia, correo, rol_id, usuario_id } = req.body;
    /* Encriptamos la contraseña */
    const salt = bcrypt_1.default.genSaltSync();
    const password = bcrypt_1.default.hashSync(contrasenia, salt);
    connection_1.default.query('CALL SP_USUARIOS_INSERTAR(?, ?, ?, ?, ?, ?)', [nombre, usuario, password, correo, rol_id, usuario_id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Mandamos el resultado */
        res.json({
            msg: 'El usuario ha sido agregado con éxito',
            rows
        });
    });
};
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => {
    /* Obtenemos el ID que fue pasado por el params en la URL */
    const { id } = req.params;
    /* Obtenemos los datos del usuario que fueron pasados por el body en la URL */
    const { nombre, usuario, contrasenia, correo, rol_id, usuario_id } = req.body;
    /* Encriptamos la contraseña */
    const salt = bcrypt_1.default.genSaltSync();
    const password = bcrypt_1.default.hashSync(contrasenia, salt);
    connection_1.default.query('CALL SP_USUARIOS_MODIFICAR(?, ?, ?, ?, ?, ?, ?)', [id, nombre, usuario, password, correo, rol_id, usuario_id], (error, rows) => {
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
};
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => {
    /* Obtenemos el ID que fue pasado por el params en la URL */
    const { id } = req.params;
    const { usuario_id } = req.body;
    connection_1.default.query('CALL SP_USUARIOS_ELIMINAR(?, ?)', [id, usuario_id], (error, rows) => {
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
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.js.map