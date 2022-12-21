"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* La clase del cliente que contiene los atributos de la base de datos */
class Cliente {
    constructor(razon_social, telefono, correo, referencia, calle, colonia, cp, ciudad_id, estado_id, latitud, longitud, fecha_creacion, usuario_creacion) {
        this.razon_social = razon_social;
        this.telefono = telefono;
        this.correo = correo;
        this.referencia = referencia;
        this.calle = calle;
        this.colonia = colonia;
        this.cp = cp;
        this.ciudad_id = ciudad_id;
        this.estado_id = estado_id;
        this.latitud = latitud;
        this.longitud = longitud;
        this.fecha_creacion = fecha_creacion;
        this.usuario_creacion = usuario_creacion;
    }
}
/* Exportamos la clase del cliente */
exports.default = Cliente;
//# sourceMappingURL=cliente.js.map