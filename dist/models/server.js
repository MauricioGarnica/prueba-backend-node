"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cliente_1 = require("../routes/cliente");
const estado_1 = require("../routes/estado");
const ciudad_1 = require("../routes/ciudad");
/* Elaboramos la clase del servidor, que hará que funcione la aplicación */
class Server {
    constructor() {
        this.apiPaths = {
            clientes: '/api/clientes',
            estados: '/api/estados',
            ciudades: '/api/ciudades'
        };
        /* Las variables que se inicializan al momento de llamar la clase */
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        //Métodos iniciales
        this.middlewares();
        this.routes();
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    ;
    listen() {
        /* Es para que de manera local, pueda ver el puerto por donde acceder a la aplicación */
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: ${this.port}`);
        });
    }
    ;
    /*
     *Estas son las rutas en donde el usuario final puede hacer la consulta mediante el URL correcto
     */
    routes() {
        this.app.use(this.apiPaths.clientes, cliente_1.router);
        this.app.use(this.apiPaths.estados, estado_1.router);
        this.app.use(this.apiPaths.ciudades, ciudad_1.router);
    }
    ;
}
;
exports.default = Server;
//# sourceMappingURL=server.js.map