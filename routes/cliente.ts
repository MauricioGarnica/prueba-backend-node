import { Router } from "express";
import { buscarClientes, deleteCliente, getCliente, getClientes, getLatYLng, postCliente, putCliente } from '../controllers/cliente';

/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = Router();

/* Las peticiones que tienen los clientes */
router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/lat-y-lng', getLatYLng);
router.post('/', postCliente);
router.post('/buscar', buscarClientes);
router.put('/:id', putCliente);
router.delete('/:id', deleteCliente);

/* Exportamos el router del cliente */
export {
    router
}