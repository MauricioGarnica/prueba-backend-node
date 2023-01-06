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
exports.login = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, usuario, password } = req.body;
    let usuarioEncontrado;
    try {
        /* Verificamos si el correo existe en la BD */
        connection_1.default.query('SELECT usuario_id, rol_id, correo, usuario, contrasenia, nombre, rol FROM usuarios INNER JOIN roles' +
            'ON usuarios.rol_id = roles.rol_id WHERE baja = 1 AND (correo = ? OR usuario = ?)', [correo, usuario], (error, rows) => {
            /* Mandamos mensaje de error por si se da */
            if (error) {
                return res.status(400).json({
                    msg: error
                });
            }
            /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
            const usuarios = Object.values(JSON.parse(JSON.stringify(rows)));
            usuarioEncontrado = Object.assign({}, usuarios[0]);
        });
        /* Verificamos la contraseña */
        const validPassword = bcrypt_1.default.compareSync(password, usuarioEncontrado.contrasenia);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es inválida, pruebe de nuevo'
            });
        }
        /* Generar el JWT */
        const token = yield (0, generar_jwt_1.generarJWT)(usuarioEncontrado.usuario_id);
        res.status(200).json({
            token,
            usuarioEncontrado
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
//# sourceMappingURL=auth.js.map