"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jsonwebtoken_1.default.sign(payload, (process.env.SECRETORPRIVATEKEY) ? process.env.SECRETORPRIVATEKEY : '2rKJ6vq:%P72$W/c4n', {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
//# sourceMappingURL=generar-jwt.js.map