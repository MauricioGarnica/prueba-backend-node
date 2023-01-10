import {Router} from 'express';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuario';
import { validarJWT } from '../middlewares/validar-JWT';

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
    validarJWT
], deleteUsuario);

export {
    router
}