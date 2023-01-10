import { Router } from "express";
import { buscarClientes, deleteCliente, getCliente, getClientes, getLatYLng, postCliente, putCliente } from '../controllers/cliente';
import { validarJWT } from "../middlewares/validar-JWT";
import { puedeEliminar } from "../middlewares/validar-rol";

/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = Router();

/* Las peticiones que tienen los clientes */
router.get('/', [
    validarJWT
], getClientes);

router.get('/:id', [
    validarJWT
], getCliente);

router.post('/lat-y-lng', [
    validarJWT
], getLatYLng);

router.post('/', [
    validarJWT
], postCliente);

router.post('/buscar', [
    validarJWT
], buscarClientes);

router.put('/:id', [
    validarJWT
], putCliente);

router.delete('/:id', [
    validarJWT,
    puedeEliminar
], deleteCliente);

/* Exportamos el router del cliente */
export {
    router
}