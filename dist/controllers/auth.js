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
exports.logout = exports.login = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const promise_1 = __importDefault(require("mysql2/promise"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo_usuario, password } = req.body;
    let usuarioEncontrado;
    try {
        const connection = yield promise_1.default.createConnection({
            host: process.env.HOST || 'localhost',
            user: process.env.USER || 'root',
            password: process.env.PASSWORD || 'root',
            database: process.env.DATABASE || 'prueba_backend',
            port: 3306 || process.env.DB_PORT
        });
        /* Verificamos si el correo existe en la BD */
        const [rows] = yield connection.execute('SELECT usuarios.usuario_id, usuarios.correo, usuarios.usuario, usuarios.contrasenia, usuarios.nombre, roles.rol_id, roles.rol FROM usuarios INNER JOIN roles ON roles.rol_id = usuarios.rol_id WHERE usuarios.baja = 1 AND (usuarios.correo LIKE ? OR usuarios.usuario LIKE ?)', [correo_usuario, correo_usuario]);
        /* Mandamos mensaje de error por si se da */
        if (!rows) {
            return res.status(400).json({
                msg: "El correo o el usuario es invalido, pruebe de nuevo",
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const usuarios = Object.values(JSON.parse(JSON.stringify(rows)));
        usuarioEncontrado = Object.assign({}, usuarios[0]);
        /* Verificamos la contraseña */
        const validPassword = bcrypt_1.default.compareSync(password, usuarioEncontrado.contrasenia);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es inválida, pruebe de nuevo'
            });
        }
        /* Generar el JWT */
        const token = yield (0, generar_jwt_1.generarJWT)(usuarioEncontrado["usuario_id"]);
        /* Mandamos a llamar al SP de Inicio de sesion para guardar el token en la BD y registrar el movimiento en la bitacora */
        connection_1.default.query('CALL SP_USUARIOS_INICIO_SESION(?, ?)', [usuarioEncontrado["usuario_id"], token], (error, rows) => {
            if (error) {
                res.status(400).json({
                    msg: error
                });
            }
            res.status(200).json({
                token,
                usuarioEncontrado
            });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id } = req.body;
    connection_1.default.query("CALL SP_USUARIOS_CERRAR_SESION(?)", [usuario_id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Mandamos el resultado */
        res.status(200).json({
            msg: "Sesión cerrada con éxito"
        });
    });
});
exports.logout = logout;
//# sourceMappingURL=auth.js.map