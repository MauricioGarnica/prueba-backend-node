import { Router } from "express";
import { getBitacoras, buscarBitacoras } from '../controllers/bitacora';
import { validarJWT } from "../middlewares/validar-JWT";

const router = Router();

router.get('/', [
    validarJWT
], getBitacoras);

router.post('/buscar', [
    validarJWT
], buscarBitacoras);

export {
    router
}