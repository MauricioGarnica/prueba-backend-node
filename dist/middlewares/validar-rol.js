"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.puedeEliminar = void 0;
const puedeEliminar = (req, res, next) => {
    if (!req.usuario) {
        return res.status(400).json({
            msg: 'Se quiere validar el rol sin antes validar el token'
        });
    }
    const { rol_id, usuario } = req.usuario[0];
    if (rol_id === 2) {
        return res.status(400).json({
            msg: `${usuario} no tiene el rol permitido para hacer la acción`
        });
    }
    next();
};
exports.puedeEliminar = puedeEliminar;
//# sourceMappingURL=validar-rol.js.map