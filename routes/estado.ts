import { Router } from "express";
import { getEstado, getEstados } from "../controllers/estado";
import { validarJWT } from "../middlewares/validar-JWT";

/* Declaramos el router de express, que ayudará para hacer las peticiones */
const router = Router();

/* Las peticiones que tienen los estados */
router.get('/', [
    validarJWT
], getEstados);
router.get('/:id', [
    validarJWT
], getEstado);

/* Exportamos el router del estado */
export {
    router
}