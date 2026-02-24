const express = require('express');
const router = express.Router();
const pitchController = require('../controllers/pitchController');

router.post('/generate', pitchController.generatePitch);
router.post('/export', pitchController.exportPitch);

module.exports = router;