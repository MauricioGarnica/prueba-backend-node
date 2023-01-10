import { Router } from "express";
import { login, logout } from '../controllers/auth';
import { validarJWT } from "../middlewares/validar-JWT";

const router = Router();

router.post('/login', login);
router.post('/logout', [
    validarJWT
], logout)

export {
    router
}