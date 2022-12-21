import { Router } from "express";
import { deleteCliente, getCliente, getClientes, postCliente, putCliente } from '../controllers/cliente';

const router = Router();

router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/', postCliente);
router.put('/:id', putCliente);
router.delete('/:id', deleteCliente);

export {router}