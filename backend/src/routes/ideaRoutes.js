const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');

router.post('/generate', ideaController.generateIdea);
router.get('/:id', ideaController.getIdeaById);

module.exports = router;