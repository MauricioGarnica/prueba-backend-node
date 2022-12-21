import express, {Application} from 'express';
import cors from 'cors';
import {router as RouterCliente} from '../routes/cliente';
import {router as RouterEstado} from '../routes/estado'
import {router as RouterCiudad} from '../routes/ciudad'

/* Elaboramos la clase del servidor, que hará que funcione la aplicación */
class Server {
    /* Declaración de variables */
    private app: Application;
    private port: String;
    private apiPaths = {
        clientes: '/api/clientes',
        estados: '/api/estados',
        ciudades: '/api/ciudades'
    };

    constructor(){
        /* Las variables que se inicializan al momento de llamar la clase */
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
        /* Es para que de manera local, pueda ver el puerto por donde acceder a la aplicación */
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: ${this.port}`);
        });
    };

    /*
     *Estas son las rutas en donde el usuario final puede hacer la consulta mediante el URL correcto 
     */
    routes(){
        this.app.use(this.apiPaths.clientes, RouterCliente);
        this.app.use(this.apiPaths.estados, RouterEstado);
        this.app.use(this.apiPaths.ciudades, RouterCiudad);
    };
};

export default Server;