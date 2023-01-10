"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRol = exports.getRoles = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const getRoles = (req, res) => {
    connection_1.default.query("CALL SP_ROLES_OBTENER_TODOS()", (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const roles = Object.values(JSON.parse(JSON.stringify(rows)));
        const rols = roles[0];
        /* Mandamos el resultado */
        res.json({
            rols
        });
    });
};
exports.getRoles = getRoles;
const getRol = (req, res) => {
    const { id } = req.params;
    connection_1.default.query("CALL SP_ROLES_OBTENER_UNO(?)", [id], (error, rows) => {
        /* Mandamos mensaje de error por si se da */
        if (error) {
            res.status(400).json({
                msg: error
            });
        }
        /* Desestructuro la respuesta para hacerlo un arreglo de objetos */
        const rol = Object.values(JSON.parse(JSON.stringify(rows)));
        const role = rol[0];
        /* Mandamos el resultado */
        res.json({
            role
        });
    });
};
exports.getRol = getRol;
//# sourceMappingURL=rol.js.map