import { Router } from "express";
import { buscarClientes, deleteCliente, getCliente, getClientes, getLatYLng, postCliente, putCliente } from '../controllers/cliente';

const router = Router();

router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/lat-y-lng', getLatYLng);
router.post('/', postCliente);
router.post('/buscar', buscarClientes);
router.put('/:id', putCliente);
router.delete('/:id', deleteCliente);

export {router}