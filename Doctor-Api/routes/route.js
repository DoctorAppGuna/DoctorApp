const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');


router.post('/slot', controller.saveSlots);
router.get('/getSlot', controller.getSlots);
router.get('/getAllSlots', controller.getAllSlots);
router.post('/appointments', controller.saveAppointments);
router.get('/getAppointments', controller.getAppointments);



module.exports = router;