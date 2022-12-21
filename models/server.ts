import express, {Application} from 'express';
import cors from 'cors';
import {router as RouterCliente} from '../routes/cliente';
import {router as RouterEstado} from '../routes/estado'
import {router as RouterCiudad} from '../routes/ciudad'

class Server {
    private app: Application;
    private port: String;
    private apiPaths = {
        clientes: '/api/clientes',
        estados: '/api/estados',
        ciudades: '/api/ciudades'
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        
        //Métodos iniciales
        this.middlewares();
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use(express.json());

        this.app.use(express.static('public'));
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: ${this.port}`);
        });
    };

    routes(){
        this.app.use(this.apiPaths.clientes, RouterCliente);
        this.app.use(this.apiPaths.estados, RouterEstado);
        this.app.use(this.apiPaths.ciudades, RouterCiudad);
    };
};

export default Server;