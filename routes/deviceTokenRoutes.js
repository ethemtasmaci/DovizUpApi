const express = require('express');
const router = express.Router();
const deviceTokenController = require('../controllers/deviceTokenController');

// Cihaz tokenı ekleme
router.post('/', deviceTokenController.createDeviceToken);

// Cihaz tokenlarını listeleme
router.get('/', deviceTokenController.getDeviceTokens);

module.exports = router;
