import { Router } from "express";
import { getCiudad, getCiudades, getCiudadesPorEstado } from '../controllers/ciudad';

/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = Router();

/* Las peticiones que tienen las ciudades */
router.get('/', getCiudades);
router.get('/:id', getCiudad);
router.get('/porEstado/:id', getCiudadesPorEstado);

/* Exportamos el router de la ciudad */
export {
    router
}