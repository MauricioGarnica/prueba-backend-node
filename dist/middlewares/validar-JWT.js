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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const promise_1 = __importDefault(require("mysql2/promise"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const connection = yield promise_1.default.createConnection({
            host: process.env.HOST || 'localhost',
            user: process.env.USER || 'root',
            password: process.env.PASSWORD || 'root',
            database: process.env.DATABASE || 'prueba_backend',
            port: 3306 || process.env.DB_PORT
        });
        const { id } = jsonwebtoken_1.default.verify(token, (process.env.SECRETORPRIVATEKEY) ? process.env.SECRETORPRIVATEKEY : '2rKJ6vq:%P72$W/c4n');
        /* Verificamos si el usuario existe o esta dado de baja */
        const [rows, fields] = yield connection.execute("CALL SP_USUARIOS_OBTENER_UNO(?)", [id]);
        if (!rows) {
            res.status(400).json({
                msg: "No esta el usuario disponible en la BD",
                rows
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const usuario = Object.values(JSON.parse(JSON.stringify(rows)));
        const user = usuario[0];
        /* Ponemos el usuario en el req para obtener las propiedades de el con las demás validaciones */
        req.usuario = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-JWT.js.map