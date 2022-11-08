import express from 'express';
import Controller from './Specialist_day_slot.controller.js';

const router = express.Router();

router.post('/addDaySlot', Controller.addDaySlot)
router.get('/getData', Controller.getData)
router.get('/getDataSlotDay', Controller.getDataSlotDay)
router.get('/getAvailableSlot', Controller.getAvailableSlot)
router.get('/getAvailableDay', Controller.getAvailableDay)


export default router