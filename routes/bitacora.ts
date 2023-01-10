import { Router } from "express";
import { getBitacoras } from "../controllers/bitacora";
import { validarJWT } from "../middlewares/validar-JWT";

const router = Router();

router.get('/', [
    validarJWT
], getBitacoras);

export {
    router
}