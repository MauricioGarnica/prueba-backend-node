"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    constructor(cliente_id, razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, pais_id, latitud, longitud, observaciones, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion) {
        this.cliente_id = cliente_id;
        this.razon_social = razon_social;
        this.telefono = telefono;
        this.correo = correo;
        this.referencia = referencia;
        this.calle = calle;
        this.colonia = colonia;
        this.cp = cp;
        this.ciudad_id = ciudad_id;
        this.estado_id = estado_id;
        this.pais_id = pais_id;
        this.latitud = latitud;
        this.longitud = longitud;
        this.observaciones = observaciones;
        this.fecha_creacion = fecha_creacion;
        this.usuario_creacion = usuario_creacion;
        this.fecha_modificacion = fecha_modificacion;
        this.usuario_modificacion = usuario_modificacion;
    }
}
exports.default = Cliente;
//# sourceMappingURL=cliente.js.map