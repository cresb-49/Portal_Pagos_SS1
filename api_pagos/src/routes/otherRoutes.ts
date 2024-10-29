import { Router } from 'express';
import { actualizarEmpresa, createEmpresa, deleteEmpresa, findAllEmpresas, updateDataCuenta } from '../controllers/otherController';

const router = Router();

router.get('/empresa/empresas', findAllEmpresas);
router.post('/empresa', createEmpresa);
router.delete('/empresa/:id', deleteEmpresa);
router.patch('/empresa/:id', actualizarEmpresa);

//Actualizacion de los datos de la cuenta
router.patch('/cuenta/:id', updateDataCuenta);

export default router;
