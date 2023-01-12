import {Router} from 'express';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario, buscarUsuario } from '../controllers/usuario';
import { validarJWT } from '../middlewares/validar-JWT';
import { puedeEliminar } from '../middlewares/validar-rol';

const router = Router();

router.get('/', [
    validarJWT
], getUsuarios);

router.get('/:id', [
    validarJWT
], getUsuario);

router.post('/', [
    validarJWT
], postUsuario);

router.put('/:id', [
    validarJWT
], putUsuario);

router.delete('/:id', [
    validarJWT,
    puedeEliminar
], deleteUsuario);

router.post('/buscar', [
    validarJWT
], buscarUsuario);

export {
    router
}