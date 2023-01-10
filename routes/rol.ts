import { Router } from "express";
import { validarJWT } from "../middlewares/validar-JWT";
import { getRoles, getRol } from '../controllers/rol';

const router = Router();

router.get('/', [
    validarJWT
], getRoles);

router.get('/:id', [
    validarJWT
], getRol);

export {
    router
}