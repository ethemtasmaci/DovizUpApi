const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Sorun bildirimi oluştur
router.post('/', issueController.createIssue);

// Sorun bildirimlerini listele
router.get('/', issueController.getIssues);

module.exports = router;
