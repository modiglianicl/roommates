import express from 'express';
import { addGasto, getGastos, updateGasto, deleteGasto } from '../controllers/gastos.js';
import { home, addRoommate, getRoommates } from '../controllers/usuarios.js';
const router = express.Router()

router.post('/gasto', addGasto)
router.get('/gastos', getGastos)
router.put('/gasto', updateGasto)
router.delete('/gasto', deleteGasto)
router.get('/', home)
router.post('/roommate', addRoommate)
router.get('/roommates', getRoommates)  
router.post('/gasto', addGasto)
router.get('/gastos', getGastos)
router.put('/gasto', updateGasto)
router.delete('/gasto', deleteGasto)


router.get('*', (req, res)=>{
res.send('No existe está página!')
})


export {
    router
}
