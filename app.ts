import dotenv from 'dotenv';
import Server from './models/server';

//Configuramos el .env
dotenv.config();

//Damos de alta el servidor, para poder usar las REST APIs
const server = new Server();
server.listen();