import { Router } from "express";
import { getCiudad, getCiudades, getCiudadesPorEstado } from '../controllers/ciudad';

const router = Router();

router.get('/', getCiudades);
router.get('/:id', getCiudad);
router.get('/porEstado/:id', getCiudadesPorEstado);

export {
    router
}