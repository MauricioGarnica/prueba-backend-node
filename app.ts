import dotenv from 'dotenv';
import Server from './models/server';

//Configuramos el .env
dotenv.config();

const server = new Server();
server.listen();