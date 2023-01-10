import { Router } from "express";
import { getCiudad, getCiudades, getCiudadesPorEstado } from '../controllers/ciudad';
import { validarJWT } from "../middlewares/validar-JWT";

/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = Router();

/* Las peticiones que tienen las ciudades */
router.get('/', [
    validarJWT
], getCiudades);
router.get('/:id', [
    validarJWT
], getCiudad);
router.get('/porEstado/:id', [
    validarJWT
], getCiudadesPorEstado);

/* Exportamos el router de la ciudad */
export {
    router
}