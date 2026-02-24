const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Matches your API spec: POST /chat
router.post('/', chatController.handleChat);

module.exports = router;