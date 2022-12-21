import { Router } from "express";
import { getEstado, getEstados } from "../controllers/estado";

/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = Router();

/* Las peticiones que tienen los estados */
router.get('/', getEstados);
router.get('/:id', getEstado);

/* Exportamos el router del estado */
export {
    router
}