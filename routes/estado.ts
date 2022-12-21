import { Router } from "express";
import { getEstado, getEstados } from "../controllers/estado";

const router = Router();

router.get('/', getEstados);
router.get('/:id', getEstado);

export {
    router
}